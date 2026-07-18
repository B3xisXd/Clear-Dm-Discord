const axios = require('axios');
const config = require('./config.js');
const readline = require('readline');

const API_URL = 'https://discord.com/api/v10';
const headers = {
  'Authorization': config.TOKEN,
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
};

let deletedCount = 0;
let isDeleting = false;
let userId = null;

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
}

async function verifyToken() {
  try {
    const response = await axios.get(`${API_URL}/users/@me`, { headers });
    userId = response.data.id;
    return response.data.username;
  } catch (error) {
    if (error.response?.status === 401) {
      throw new Error('Token inválido! Verifique config.js');
    }
    throw error;
  }
}

async function getChannelInfo(channelId) {
  try {
    const response = await axios.get(`${API_URL}/channels/${channelId}`, { headers });
    return response.data;
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Canal não encontrado!');
    }
    throw error;
  }
}

async function getMessages(channelId, beforeId = null) {
  try {
    let url = `${API_URL}/channels/${channelId}/messages?limit=100`;
    if (beforeId) url += `&before=${beforeId}`;
    
    const response = await axios.get(url, { headers });
    return response.data;
  } catch (error) {
    if (error.response?.status === 429) {
      const retryAfter = (error.response.headers['retry-after'] || 1) * 1000;
      console.log(`⏸️  Rate limit! Aguardando ${(retryAfter / 1000).toFixed(1)}s...`);
      await new Promise(resolve => setTimeout(resolve, retryAfter));
      return getMessages(channelId, beforeId);
    }
    throw error;
  }
}

async function deleteMessage(channelId, messageId) {
  try {
    await axios.delete(`${API_URL}/channels/${channelId}/messages/${messageId}`, { headers });
    deletedCount++;
    console.log(`✓ Mensagem deletada | Total: ${deletedCount}`);
    await new Promise(resolve => setTimeout(resolve, config.DELETE_INTERVAL));
  } catch (error) {
    if (error.response?.status === 429) {
      const retryAfter = (error.response.headers['retry-after'] || 1) * 1000;
      console.log(`⏸️  Rate limit! Aguardando ${(retryAfter / 1000).toFixed(1)}s...`);
      await new Promise(resolve => setTimeout(resolve, retryAfter));
      return deleteMessage(channelId, messageId);
    } else if (error.response?.status === 404) {
      return;
    }
    throw error;
  }
}

async function main() {
  try {
    console.log('\n╔════════════════════════════════════════╗');
    console.log('║       BXCleaner v1.0                   ║');
    console.log('║          (Selfbot Mode)                ║');
    console.log('╚════════════════════════════════════════╝\n');

    console.log('🔐 Verificando token...');
    const username = await verifyToken();
    console.log(`✅ Conectado como: ${username}\n`);

    const channelId = await askQuestion('📝 Digite o ID do canal: ');
    
    if (!channelId || channelId.trim() === '') {
      console.log('❌ ID do canal inválido!');
      process.exit(1);
    }

    console.log('🔍 Buscando informações do canal...');
    const channel = await getChannelInfo(channelId.trim());

    const confirmation = await askQuestion(
      `\n⚠️  Tem certeza que quer deletar TODAS as mensagens do canal "${channel.name || 'desconhecido'}"? (sim/não): `
    );

    if (confirmation.toLowerCase() !== 'sim') {
      console.log('❌ Operação cancelada.');
      process.exit(1);
    }

    await deleteMessages(channelId.trim());

  } catch (error) {
    console.error('❌ Erro:', error.message);
    process.exit(1);
  }
}

async function deleteMessages(channelId) {
  if (isDeleting) return;
  isDeleting = true;
  deletedCount = 0;

  console.log(`\n⏳ Iniciando limpeza em ${config.START_DELAY / 1000} segundos...\n`);
  await new Promise(resolve => setTimeout(resolve, config.START_DELAY));

  let beforeId = null;

  while (true) {
    try {
      const messages = await getMessages(channelId, beforeId);

      if (messages.length === 0) {
        console.log('\n✅ Limpeza concluída!');
        console.log(`📊 Total de mensagens deletadas: ${deletedCount}`);
        console.log('Encerrando em 3 segundos...\n');
        
        setTimeout(() => {
          process.exit(0);
        }, 3000);
        break;
      }

      for (const message of messages) {
        if (message.author.id === userId) {
          await deleteMessage(channelId, message.id);
        }
      }

      beforeId = messages[messages.length - 1].id;

    } catch (error) {
      if (error.response?.status === 429) {
        const retryAfter = (error.response.headers['retry-after'] || 1) * 1000;
        console.log(`⏸️  Rate limit! Aguardando ${(retryAfter / 1000).toFixed(1)}s...`);
        await new Promise(resolve => setTimeout(resolve, retryAfter));
      } else {
        console.error('❌ Erro durante a limpeza:', error.message);
        break;
      }
    }
  }
}

if (!config.TOKEN || config.TOKEN === 'sua_token_aqui') {
  console.log('❌ ERRO: Configure sua token no arquivo config.js!');
  process.exit(1);
}

main().catch(error => {
  console.error('❌ Erro fatal:', error.message);
  process.exit(1);
});
