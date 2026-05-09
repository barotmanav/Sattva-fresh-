@echo off
cd /d "%~dp0"
echo Starting E Kitchens website...
start "" http://127.0.0.1:5173/
npm.cmd run dev
