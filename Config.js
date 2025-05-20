module.exports = {
  Bot: {
    Token: "",           // Bot tokeni, Discord geliştirici portalından alınan gizli anahtar.
    BotPrefix: ".",      // Botun prefixi, komutlar bu işaretle başlar (örnek: .komut).
    GuildID: "",         // Botun aktif olacağı Discord sunucusunun ID'si.
    Owner: ["", "", ""], // Bot sahiplerinin Discord kullanıcı ID'leri, genellikle yetkili kullanıcılar.
    BotPresence: [       // Botun durum mesajları, burada çoklu durum tanımlanabilir.
      "New Private Rooms", // Örnek: Botun Discord'da görünen durumu.
      ".vodqa <3"          // Diğer durum mesajı.
    ],
  },

  Emoji: {
    yes: ":tada:", // Başarılı durumları göstermek için kullanılan emoji (Discord emoji kodu).
    no: ":tada:",  // Başarısız durumları göstermek için kullanılan emoji (burada aynı emoji, isteğe göre değiştirilebilir).
  }
}
