@echo off
echo ========================================
echo Testing Database Connection and Seeding
echo ========================================
echo.

echo Starting API server to initialize database...
echo This will create tables and seed 6 blog posts
echo.
echo Press Ctrl+C to stop after you see "[DB] Tables ready"
echo.

cd /d "%~dp0"
node server/index.js
