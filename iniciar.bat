@echo off
setlocal enabledelayedexpansion

node -v >nul 2>&1
if errorlevel 1 (
    cls
    echo.
    echo ERRO: Node.js nao encontrado!
    echo Baixe em: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

if not exist "node_modules" (
    echo Instalando dependencias...
    call npm install
)

:menu
cls
echo.
echo =================================
echo    BXCleaner - Discord Cleaner
echo =================================
echo.
echo 1 - Iniciar BXCleaner
echo 2 - Configuracao
echo 3 - Sair
echo.
set /p opcao="Escolha uma opcao: "

if "!opcao!"=="1" goto start
if "!opcao!"=="2" goto config
if "!opcao!"=="3" exit /b 0

goto menu

:start
cls
echo.
echo Iniciando BXCleaner...
echo.
node index.js
echo.
pause
goto menu

:config
cls
echo.
echo COMO USAR:
echo.
echo 1. Configure seu TOKEN em config.js
echo    - Abra Discord no navegador
echo    - Pressione F12
echo    - Va em Application > Local Storage
echo    - Copie o valor de "token"
echo.
echo 2. Obtenha o ID do CANAL
echo    - Clique direito no canal no Discord
echo    - Escolha "Copiar ID do Canal"
echo.
echo 3. Execute o programa e inicie
echo.
echo AVISOS:
echo - Apenas SUAS mensagens serao deletadas
echo - NUNCA compartilhe seu token!
echo.
pause
goto menu
