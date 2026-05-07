@echo off
echo ========================================
echo Gloria Ondah ^& Associates - Setup
echo ========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo [1/5] Node.js version:
node --version
echo.

REM Check if PostgreSQL is installed
where psql >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [WARNING] PostgreSQL CLI not found in PATH
    echo Make sure PostgreSQL is installed and running
    echo.
)

REM Check if .env exists
if not exist .env (
    echo [2/5] Creating .env file from template...
    copy .env.example .env
    echo [INFO] Please edit .env file with your database credentials
    echo.
) else (
    echo [2/5] .env file already exists
    echo.
)

REM Install dependencies
echo [3/5] Installing dependencies...
call npm install
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)
echo.

echo [4/5] Setup complete!
echo.
echo ========================================
echo Next Steps:
echo ========================================
echo 1. Edit .env file with your credentials
echo 2. Create PostgreSQL database: goa_law
echo 3. Start API server: npm run api
echo 4. Start frontend: npm run dev
echo 5. Visit: http://localhost:5000
echo.
echo Admin Dashboard: http://localhost:5000/#/admin
echo Default Password: GOA-Admin-2024
echo ========================================
echo.

pause
