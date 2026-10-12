@echo off
setlocal
title Jakaria Habib Portfolio - 1-Click Auto Publisher

echo ========================================================
echo       Jakaria Habib Academic Portfolio - Auto Publisher
echo ========================================================
echo.

:: 1. Navigate to current script directory dynamically
cd /d "%~dp0"
echo [*] Project Folder: %CD%

:: 2. Locate Git Executable
set "GIT_CMD="
where git >nul 2>nul
if %errorlevel% equ 0 set "GIT_CMD=git"
if "%GIT_CMD%"=="" if exist "%LOCALAPPDATA%\Programs\MinGit\cmd\git.exe" set "GIT_CMD=%LOCALAPPDATA%\Programs\MinGit\cmd\git.exe"
if "%GIT_CMD%"=="" if exist "%ProgramFiles%\Git\cmd\git.exe" set "GIT_CMD=%ProgramFiles%\Git\cmd\git.exe"
if "%GIT_CMD%"=="" if exist "%ProgramFiles(x86)%\Git\cmd\git.exe" set "GIT_CMD=%ProgramFiles(x86)%\Git\cmd\git.exe"
if "%GIT_CMD%"=="" if exist "%LOCALAPPDATA%\Programs\Git\cmd\git.exe" set "GIT_CMD=%LOCALAPPDATA%\Programs\Git\cmd\git.exe"

if "%GIT_CMD%"=="" (
    echo [ERROR] Git could not be located on your computer!
    echo.
    pause
    exit /b 1
)

echo [*] Git Engine: "%GIT_CMD%"
echo.

:: 3. Run single line PowerShell helper to auto copy latest data*.js from Downloads
powershell -NoProfile -Command "$dl = Join-Path $env:USERPROFILE 'Downloads'; $files = Get-ChildItem -Path $dl -Filter 'data*.js' -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending; if ($files) { $latest = $files[0]; Copy-Item $latest.FullName -Destination 'js\data.js' -Force; Write-Host ('[*] Auto-detected & copied: ' + $latest.Name); Remove-Item $latest.FullName -Force -ErrorAction SilentlyContinue; }"

:: 4. Stage, Check Changes and Push
echo [*] Checking changes...
"%GIT_CMD%" add .

"%GIT_CMD%" diff --cached --quiet
if %errorlevel% equ 0 (
    echo [INFO] No new changes detected. Your website is already up to date!
    echo.
    echo Live URL: https://jakariahabib1.github.io
    echo.
    echo Press any key to exit...
    pause >nul
    exit /b 0
)

echo [*] Committing updates...
"%GIT_CMD%" commit -m "Auto Update Portfolio Data"

echo.
echo [*] Uploading to GitHub (origin main)...
"%GIT_CMD%" push origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================================
    echo  [SUCCESS] All updates published to GitHub successfully!
    echo  Live URL: https://jakariahabib1.github.io
    echo ========================================================
) else (
    echo.
    echo [ERROR] Push failed. Please check your internet connection.
)

echo.
echo Press any key to exit...
pause >nul
