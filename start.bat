@echo off
echo ========================================
echo Starting Gloria Ondah ^& Associates
echo ========================================
echo.
echo Backend API: http://localhost:3001
echo Frontend: http://localhost:5000
echo Admin: http://localhost:5000/#/admin
echo.
echo Press Ctrl+C to stop both servers
echo ========================================
echo.

REM Start both servers in parallel
start "GOA API Server" cmd /k "npm run api"
timeout /t 3 /nobreak >nul
start "GOA Frontend" cmd /k "npm run dev"

echo.
echo Both servers are starting in separate windows...
echo.
pause
