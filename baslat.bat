@echo off
title .vodqa | Bot Baslatiliyor
cls
echo ----------------------------------------
echo .vodqa Bot PM2 ile baslatiliyor...
echo ----------------------------------------

REM PM2 kurulu mu kontrol et
pm2 -v >nul 2>&1
if errorlevel 1 (
    echo PM2 bulunamadi, once PM2'yi yukleyelim...
    echo (Yonetici olarak calistirin)
    npm install -g pm2
    if errorlevel 1 (
        echo PM2 yuklenemedi, lutfen manuel kurun!
        pause
        exit /b
    )
)

REM PM2 ile botu baslat, otomatik izleme aktif
pm2 start ecosystem.config.js --watch

echo ----------------------------------------
echo Bot baslatildi ve izleniyor.
echo PM2 listesi icin "pm2 list" komutunu kullanabilirsiniz.
echo Botu durdurmak icin "pm2 stop ecosystem.config.js" yazin.
echo ----------------------------------------
pause
