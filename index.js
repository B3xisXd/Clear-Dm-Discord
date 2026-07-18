const { Client } = require('discord.js');
const config = require('./config.js');
const readline = require('readline');

const client = new Client({ intents: [] });

let deletedCount = 0;
let isDeleting = false;

// Interface para input do usuário
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

client.on('ready', async () => {
  console.log('\n╔════════════════════════════════════════╗');
  console.log('║       BXCleaner v1.0                   ║');
  console.log('╠════════════════════════════════════════╣');
  console.log(`║ Conectado como: ${client.user.username.padEnd(28)}║`);
  console.log('╚════════════════════════════════════════╝\n');

  try {
    const channelId = await askQuestion('📝 Digite o ID do canal: ');
    
    if (!channelId || channelId.trim() === '') {
      console.log('❌ ID do canal inválido!');
      process.exit(1);
    }

    const channel = await client.channels.fetch(channelId.trim()).catch(() => null);

    if (!channel) {
      console.log('❌ Canal não encontrado! Verifique o ID.');
      process.exit(1);
    }

    if (channel.isDMBased()) {
      console.log('❌ Este é um canal DM. Use o ID de um canal de servidor.');
      process.exit(1);
    }

    const confirmation = await askQuestion(
      `\n⚠️  Tem certeza que quer deletar TODAS as mensagens do canal "${channel.name}"? (sim/não): `
    );

    if (confirmation.toLowerCase() !== 'sim') {
      console.log('❌ Operação cancelada.');
      process.exit(1);
    }

    await deleteMessages(channel);

  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
});

async function deleteMessages(channel) {
  if (isDeleting) return;
  isDeleting = true;
  deletedCount = 0;

  console.log(`\n⏳ Iniciando limpeza em ${config.START_DELAY / 1000} segundos...\n`);
  await new Promise(resolve => setTimeout(resolve, config.START_DELAY));

  let lastMessageId = null;

  while (true) {
    try {
      // Buscar mensagens (limite de 100 por vez)
      const messages = await channel.messages.fetch({ limit: 100, before: lastMessageId });

      if (messages.size === 0) {
        console.log('\n✅ Limpeza concluída!');
        console.log(`📊 Total de mensagens deletadas: ${deletedCount}`);
        console.log('Encerrando em 3 segundos...\n');
        
        setTimeout(() => {
          process.exit(0);
        }, 3000);
        break;
      }

      for (const message of messages.values()) {
        try {
          // Deletar apenas mensagens do usuário (selfbot)
          if (message.author.id === client.user.id) {
            await message.delete();
            deletedCount++;
            console.log(`✓ Mensagem deletada | Total: ${deletedCount}`);
            
            // Respeitar intervalo para evitar rate limit
            await new Promise(resolve => setTimeout(resolve, config.DELETE_INTERVAL));
          }
        } catch (error) {
          if (error.code === 429) {
            // Rate limit
            const retryAfter = error.retryAfter * 1000;
            console.log(`⏸️  Rate limit! Aguardando ${(retryAfter / 1000).toFixed(1)}s...`);
            await new Promise(resolve => setTimeout(resolve, retryAfter));
          } else if (error.code !== 10008) {
            // 10008 = Mensagem não encontrada (já foi deletada)
            console.error('❌ Erro ao deletar:', error.message);
          }
        }
      }

      lastMessageId = messages.last().id;

    } catch (error) {
      if (error.code === 429) {
        const retryAfter = error.retryAfter * 1000;
        console.log(`⏸️  Rate limit! Aguardando ${(retryAfter / 1000).toFixed(1)}s...`);
        await new Promise(resolve => setTimeout(resolve, retryAfter));
      } else {
        console.error('❌ Erro durante a limpeza:', error.message);
        break;
      }
    }
  }
}

client.on('error', error => {
  console.error('❌ Erro do cliente:', error);
});

// Login com token
if (!config.TOKEN || config.TOKEN === 'sua_token_aqui') {
  console.log('❌ ERRO: Configure sua token no arquivo config.js!');
  process.exit(1);
}

client.login(config.TOKEN).catch(error => {
  console.error('❌ Erro ao conectar:', error.message);
  console.log('Verifique se sua token está correta no config.js');
  process.exit(1);
});
