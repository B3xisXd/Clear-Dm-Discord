# 🧹 BXCleaner - Discord Selfbot Message Cleaner

Um selfbot em Node.js para limpar automaticamente suas mensagens no Discord com respeito aos rate limits.

## 📋 Requisitos

- **Node.js** v14+ ([Baixe aqui](https://nodejs.org/))
- **Discord** - Conta pessoal ou servidor
- **Token do Discord** - Seu token de usuário

## 🚀 Como Usar

### 1️⃣ Clonar o Repositório

```bash
git clone https://github.com/B3xisXd/Clear-Dm.git
cd Clear-Dm
```

### 2️⃣ Instalar Dependências

```bash
npm install
```

Ou execute `iniciar.bat` (Windows) que faz isso automaticamente.

### 3️⃣ Configurar o Token

Abra o arquivo `config.js` e adicione seu token Discord:

```javascript
TOKEN: "seu_token_aqui_começa_com_eyJ"
```

**Como obter seu token:**
- Abra Discord no navegador
- Pressione `F12` para abrir Developer Tools
- Vá em `Application` → `Local Storage` → `https://discord.com`
- Procure por `token` (começa com `eyJ...`)
- Copie e cole em `config.js`

### 4️⃣ Executar

**Windows:**
```bash
iniciar.bat
```

**Linux/Mac:**
```bash
node index.js
```

### 5️⃣ Usar o Bot

1. Digite o **ID do canal** (clique direito no canal → Copiar ID)
2. Confirme a limpeza digitando `sim`
3. Aguarde enquanto o bot deleta suas mensagens

## ⚙️ Configuração

Edite o arquivo `config.js` para customizar:

```javascript
{
  TOKEN: "seu_token_aqui",           // Seu token Discord
  DELETE_INTERVAL: 750,               // Intervalo entre deletações (ms)
  START_DELAY: 2000                   // Delay antes de iniciar (ms)
}
```

### Intervalos Recomendados

- **500ms**: Mais rápido (⚠️ risco de rate limit)
- **750ms**: Balanceado ✅ (padrão)
- **1000ms**: Mais seguro
- **2000ms**: Muito seguro (mais lento)

## 🔒 Segurança

⚠️ **IMPORTANTE:**
- ✓ Nunca compartilhe seu token com ninguém
- ✓ Não faça commit de `config.js` com seu token
- ✓ O arquivo `config.js` está protegido em `.gitignore`
- ✓ Apenas suas mensagens serão deletadas

## 📊 Funcionalidades

✅ Delete todas as suas mensagens de um canal
✅ Respeita rate limits do Discord automaticamente
✅ Interface colorida e amigável (Windows)
✅ Validação de token e canais
✅ Logs informativos durante a limpeza

## ⚠️ Limitações

- Só funciona com canais de texto
- Apenas deleta mensagens SUAS
- Rate limits do Discord podem atrasar a limpeza
- Não funciona com canais privados sem permissão

## 🐛 Troubleshooting

### "Token inválido"
- Verifique se o token está correto em `config.js`
- Certifique-se de que começa com `eyJ`

### "Canal não encontrado"
- Confira se o ID está correto
- Certifique-se de ter acesso ao canal

### "Rate limit"
- O bot aguardará automaticamente
- Aumente o `DELETE_INTERVAL` em `config.js`

## 📝 Estrutura do Projeto

```
.
├── index.js          # Bot principal (API REST)
├── config.js         # Configurações
├── iniciar.bat       # Launcher Windows
├── package.json      # Dependências
├── README.md         # Este arquivo
└── .gitignore        # Arquivos ignorados
```

## 📦 Dependências

- `axios` - Requisições HTTP para API Discord

## 📄 Licença

Este projeto é fornecido como está. Use por sua conta e risco.

## ⚖️ Aviso Legal

Este bot é para uso pessoal apenas. Use-o responsavelmente e respeite os Termos de Serviço do Discord.
