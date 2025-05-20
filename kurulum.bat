@echo off
title .vodqa | Kurulum Baslatiliyor
cls
echo ----------------------------------------
echo .vodqa Bot Kurulum Asamasi
echo ----------------------------------------
echo Node.js ve npm yüklü mü kontrol ediliyor...
node -v >nul 2>&1
if errorlevel 1 (
    echo Hata: Node.js sisteminizde kurulu degil!
    echo Lutfen https://nodejs.org adresinden yukleyin.
    pause
    exit /b
)

echo Moduller yukleniyor, lutfen bekleyin...
npm install

echo ----------------------------------------
echo Kurulum Basarili!
echo Artik 'baslat.bat' dosyasini calistirarak botu acabilirsiniz.
echo ----------------------------------------
pause
