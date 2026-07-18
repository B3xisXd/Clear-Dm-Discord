@echo off
chcp 65001 >nul
cls

REM Efeito Rainbow
color 0C
cls
echo.
echo ╔════════════════════════════════════════╗
color 0E
echo ║  BXCleaner - Launcher                  ║
color 0A
echo ║     Selfbot para Limpeza Discord       ║
color 0B
echo ╚════════════════════════════════════════╝
color 0D
echo.
echo 📋 Instruções:
color 0E
echo   1. Coloque seu token no arquivo config.js
color 0A
echo   2. Execute este programa
echo   3. Digite o ID do canal a limpar
color 0B
echo   4. Confirme e o bot começará a deletar
color 0C
echo.
echo ⚠️  AVISO: Apenas mensagens suas serão deletadas!
color 0D
echo.
pause

REM Verifica se o Node.js está instalado
color 09
echo 🔍 Verificando se Node.js está instalado...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo.
    echo ❌ Node.js não foi encontrado!
    echo.
    color 0E
    echo 📥 Para usar o BXCleaner, você precisa instalar Node.js:
    echo    → https://nodejs.org/
    color 0A
    echo ✓ Baixe a versão LTS (recomendada)
    echo ✓ Durante a instalação, marque "Add to PATH"
    color 0B
    echo ✓ Reinicie o computador após instalar
    color 0D
    echo.
    pause
    exit /b 1
)

color 0A
echo ✅ Node.js encontrado!
echo.

REM Verifica se as dependências estão instaladas
if not exist "node_modules" (
    color 0C
    echo ❌ Dependências não encontradas!
    echo.
    color 0E
    echo 📝 O que é isso?
    echo    → Bibliotecas necessárias para o bot funcionar
    echo    → Serão baixadas automaticamente do npm
    color 0A
    echo.
    color 0B
    set /p instalar="Deseja instalar as dependências agora? [S/N]: "
    
    if /i "%instalar%"=="S" (
        color 0D
        echo.
        echo 📥 Instalando dependências...
        echo.
        call npm install
        echo.
        color 0A
        echo ✅ Instalação concluída!
        echo.
    ) else (
        color 0C
        echo ❌ Dependências não instaladas. O bot pode não funcionar.
        color 0E
        echo.
    )
) else (
    color 0A
    echo ✅ Dependências encontradas!
    echo.
    color 0B
    set /p reinstalar="Deseja reinstalar/atualizar as dependências? [S/N]: "
    
    if /i "%reinstalar%"=="S" (
        color 0D
        echo.
        echo 📥 Atualizando dependências...
        color 09
        echo.
        call npm install
        echo.
        color 0A
        echo ✅ Atualização concluída!
        echo.
    )
)

REM Menu de opções
color 0C
echo ╔════════════════════════════════════════╗
color 0E
echo ║         ESCOLHA UMA OPÇÃO              ║
color 0A
echo ╠════════════════════════════════════════╣
color 0B
echo ║ 1 - Iniciar o BXCleaner               ║
color 0D
echo ║ 2 - Informações de uso                ║
color 09
echo ║ 3 - Sair                              ║
color 0C
echo ╚════════════════════════════════════════╝
color 0E
echo.
set /p opcao="Digite a opção [1-3]: "

if "%opcao%"=="1" (
    goto iniciar_bot
) else if "%opcao%"=="2" (
    goto info
) else if "%opcao%"=="3" (
    exit /b 0
) else (
    color 0C
    echo.
    echo ❌ Opção inválida!
    echo.
    pause
    cls
    goto menu_opcoes
)

:iniciar_bot
color 0C
echo.
echo ✅ Iniciando o BXCleaner...
echo.
color 0E
echo 🚀 Conectando à API do Discord...
echo.
node index.js
pause
exit /b 0

:info
cls
color 0C
echo ╔════════════════════════════════════════╗
color 0E
echo ║      INFORMAÇÕES DE USO                ║
color 0A
echo ╚════════════════════════════════════════╝
color 0B
echo.
echo 📖 COMO USAR:
color 0D
echo.
echo 1️⃣  CONFIGURAR O TOKEN:
color 0E
echo   • Abra o arquivo "config.js" com um editor de texto
echo   • Coloque seu token do Discord no lugar de "sua_token_aqui"
echo   • Para pegar o token:
echo     - Abra Discord no navegador
echo     - Pressione F12 (Developer Tools)
echo     - Vá em "Application" > "Local Storage"
echo     - Procure por "token" (começa com "eyJ...")
color 0A
echo.
echo 2️⃣  OBTER ID DO CANAL:
color 0B
echo   • No Discord, clique com botão direito no canal
echo   • Escolha "Copiar ID do Canal"
color 0C
echo.
echo 3️⃣  INICIAR A LIMPEZA:
color 0D
echo   • Execute este programa
echo   • Digite o ID do canal
echo   • Confirme a operação
color 0E
echo.
echo ⚠️  IMPORTANTE:
color 0C
echo   ✓ Apenas mensagens SUAS serão deletadas
echo   ✓ O processo respeita rate limits do Discord
color 0A
echo   ✓ Não compartilhe seu token com ninguém!
color 0B
echo.
pause
cls
goto menu_opcoes

:menu_opcoes
color 0C
echo ╔════════════════════════════════════════╗
color 0E
echo ║         ESCOLHA UMA OPÇÃO              ║
color 0A
echo ╠════════════════════════════════════════╣
color 0B
echo ║ 1 - Iniciar o BXCleaner               ║
color 0D
echo ║ 2 - Informações de uso                ║
color 09
echo ║ 3 - Sair                              ║
color 0C
echo ╚════════════════════════════════════════╝
color 0E
echo.
set /p opcao="Digite a opção [1-3]: "

if "%opcao%"=="1" (
    goto iniciar_bot
) else if "%opcao%"=="2" (
    goto info
) else if "%opcao%"=="3" (
    exit /b 0
) else (
    color 0C
    echo.
    echo ❌ Opção inválida!
    echo.
    pause
    cls
    goto menu_opcoes
)
