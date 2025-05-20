# vodqa Özel Oda Sistemi

OzelOda, gelişmiş ve özelleştirilebilir bir Discord botudur. Bot; komut sistemi, event yönetimi, veri saklama, otomatik başlatma, özel yapılandırmalar ve kolay kurulum sistemi ile donatılmıştır.

---

## İçindekiler

- [Özellikler](#özellikler)
- [Kurulum](#kurulum)
- [Yapılandırma](#yapılandırma)
- [Komutlar](#komutlar)
- [Event Sistemi](#event-sistemi)
- [Başlatma](#başlatma)
- [Geliştirici Notları](#geliştirici-notları)
- [Lisans](#lisans)

---

## Özellikler

- Slash komut desteği
- JSON tabanlı veri kaydı (`database.json`)
- `dotenv` destekli çevresel değişkenler
- Otomatik PM2 başlatma (Linux/VPS için)
- Kolay Windows kurulumu (kurulum.bat / baslat.bat)
- Gelişmiş modüler yapı: `Client.js`, `Events`, `Commands`
- Admin logları ve detaylı işlem geçmişi

---

## Kurulum

### 1. Gereksinimler

- Node.js (v18 veya üstü)
- Discord bot tokeni
- `pm2` (opsiyonel - Linux için)

### 2. Bağımlılıkları yükleme

```bash
npm install

###

.setup ile kurabilirsiniz. (Prefix Değişkenli)

## Yapımcı

Yapımcı | .vodqa
