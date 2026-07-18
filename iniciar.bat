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
echo ╚════════════════════════════════════════╝
color 0B
echo.
color 0D
echo.

REM Verifica se o Node.js está instalado
color 01
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    color 0C
    echo ❌ Node.js não foi encontrado!
    echo.
    color 0E
    echo Baixe e instale Node.js em: https://nodejs.org/
    color 0A
    echo Certifique-se de adicionar Node.js ao PATH durante a instalação.
    color 0B
    echo.
    pause
    exit /b 1
)

REM Verifica se as dependências estão instaladas
color 0D
if not exist "node_modules" (
    color 0A
    echo 📦 Dependências não encontradas!
    echo.
    color 0B
    echo Deseja instalar as dependências agora? (S/N)
    color 0E
    set /p instalar="Opção: "
    
    if /i "%instalar%"=="S" (
        color 09
        echo.
        echo 📥 Instalando dependências...
        echo.
        call npm install
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
    set /p reinstalar="Deseja reinstalar/atualizar as dependências? (S/N): "
    
    if /i "%reinstalar%"=="S" (
        color 0D
        echo.
        echo 📥 Atualizando dependências...
        color 09
        echo.
        call npm install
        echo.
    )
)

REM Inicia o bot
color 0C
echo ✅ Iniciando o BXCleaner...
color 0E
echo.
node index.js

color 0A
pause
