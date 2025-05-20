const { Client, GatewayIntentBits, Partials, Events , ChannelType, ActivityType} = require('discord.js');
const fs = require('fs');
let db = [];
const Database = require('./database.json');
class PrivateRooms extends Client {
   constructor(options) {
       super({
           options,
           fetchAllMembers: true,
           intents: Object.values(GatewayIntentBits),
           partials: Object.values(Partials),
           restRequestTimeout: 30000,
           ws: { version: 10, properties: { $browser: 'discord.js' } },
           rest: { version: 10, hashLifetime: Infinity, rejectOnRateLimit: false },
       });
       this.on('rateLimit', (rate) => console.warn(rate));
       this.on(Events.Warn, (warn) => console.warn(warn));
       this.on(Events.Error, (error) => console.error(error));
       process.on('warning', (warn) => console.warn(warn));
       process.on('unhandledRejection', (reason) => console.error(reason));
       process.on('uncaughtException', (error) => console.error(error));
   }
   static async login(client, token) {
       await client.login(token).catch(() => {
       console.error(`[PRİVATE ROOM] Bot Giriş Yapamadı! Token'i Kontrol Edin!`)
       process.exit(1);
       }).then(() => {
       console.log(`[PRİVATE ROOM] Bot ${client.user.username} İsmi İle Giriş Yaptı!`)
      });
      client.on(Events.ClientReady, async () => {
               setInterval(() => {
                   const oynuyor = client.config.Bot.BotPresence;
                   const index = Math.floor(Math.random() * (oynuyor.length));
                   client.user.setPresence({
                       activities: [{
                           name: `${oynuyor[index]}`,
                           type: ActivityType.Playing
                       }],
                       status: 'dnd'
                   });
               }, 10000);
               setInterval(async() => {
                   await PrivateRoomsController();
               }, 10000);
            async function PrivateRoomsController() {
                const guild = client.guilds.cache.get(client.config.Bot.GuildID);
                if(!guild) return;
                const data = await client.databaseGet(guild.id, "guild");
                if (data && Array.isArray(data.data) && data.data.length > 0) {
                    const channel = await guild.channels.fetch();
                    for(let channels of channel.filter(x => x.type === ChannelType.GuildVoice && x.parentId === data.data[0].categoryID && x.id != data.data[0].voiceID && x.members.size < 1).map(x => x)) {
                        if(!channels) continue;
                        const channelData = Database.find(x => x.data.some(y => y.channelID === channels.id));
                        await channels.delete().catch(() => {});
                        if(channelData) {
                            await client.databaseDelete(channelData.userID, "user");
                        }
                    }
                }
            }
      });
   }
   static async loadCommands(client, dir) {
    fs.readdir(dir, (err, files) => {
               if (err) console.error(err);
     files.forEach(f => {
     fs.readdir(dir + f, (err, files2) => {
                        files2.forEach(file => {
      let props = require(`${dir + f}/${file}`);
              client.commands.set(props.conf.name, props);
     props.conf.aliases.forEach(alias => {
              client.aliases.set(alias, props.conf.name);
               });
     })
                     })
     });
              });
         }
                 static async loadEvents(client, dir) {
         fs.readdir(dir, (err, files) => {
           if (err) return console.error(err);
           files
            .filter((file) => file.endsWith(".js"))
          .forEach((file) => {
                let prop = require(`${dir}/${file}`);
             if (!prop.conf) return;
                 client.on(prop.conf.name, prop);
          console.log(`[PRİVATE ROOMS - EVENT] ${prop.conf.name} Eventi Yüklendi!`);
          });
                  });
         }
         static async Database(client) {
            const loadDatabase = () => {
                try {
                    const data = fs.readFileSync('database.json', 'utf8');
                    db = JSON.parse(data);
                } catch (err) {
                    db = [];
                }
               };
               const saveDatabase = () => {
                fs.writeFile('database.json', JSON.stringify(db, null, 2), (err) => {
                    if (err) console.error("Database kayıt hatası:", err);
                });
               };
               loadDatabase();
               client.databaseGet = async function (id, type) {
                if(type == "user") {
                 const data = db.find(x => x.userID === id);
                 return data || "Veri bulunamadı.";
                } else if(type == "guild") {
                 const data = db.find(x => x.guildID === id);
                 return data || "Veri bulunamadı.";
                }
                };

                client.databaseSet = async function (id, data, type) {
                if(type == "user") {
                 const index = db.findIndex(x => x.userID === id);
                 if (index === -1) {
                     db.push({ userID: id, data });
                 } else {
                     db[index].data = data;
                 }
                 saveDatabase();
                 return index === -1 ? "Veri Başarıyla Kaydedildi." : "Veri Başarıyla Güncellendi.";
                } else if(type == "guild") {
                 const index = db.findIndex(x => x.guildID === id);
                 if (index === -1) {
                     db.push({ guildID: id, data });
                 } else {
                     db[index].data = data;
                 }
                 saveDatabase();
                 return index === -1 ? "Veri Başarıyla Kaydedildi." : "Veri Başarıyla Güncellendi.";
                }
                };

                client.databaseDelete = async function (id, type) {
                if(type == "user") {
                 const index = db.findIndex(x => x.userID === id);
                 if (index === -1) return "Veri bulunamadı.";

                 db.splice(index, 1);
                 saveDatabase();
                 return "Veri Başarıyla Silindi.";
                 } else if(type == "guild") {
                 const index = db.findIndex(x => x.guildID === id);
                 if (index === -1) return "Veri bulunamadı.";

                 db.splice(index, 1);
                 saveDatabase();
                 return "Veri Başarıyla Silindi.";
                 }
                };

                client.databasePush = async function (id, data, type) {
                if(type == "user") {
                 const index = db.findIndex(x => x.userID === id);
                 if (index === -1) {
                     db.push({ userID: id, data });
                 } else {
                     db[index].data.push(data);
                 }
                 saveDatabase();
                 return "Veri Başarıyla Eklendi.";
                } else if(type == "guild") {
                 const index = db.findIndex(x => x.guildID === id);
                 if (index === -1) {
                     db.push({ guildID: id, data });
                 } else {
                     db[index].data.push(data);
                 }
                 saveDatabase();
                 return "Veri Başarıyla Eklendi.";
                }
                };

                client.databaseHas = async function (id, type) {
                if(type == "user") {
                 return db.some(x => x.userID === id);
                } else if(type == "guild") {
                 return db.some(x => x.guildID === id);
                }
                };
                client.databasePull = async function (id, data, type) {
                if(type == "user") {
                 const index = db.findIndex(x => x.userID === id);
                 if (index === -1) return "Veri bulunamadı.";

                 db[index].data = db[index].data.filter(x => x !== data);
                 saveDatabase();
                 return "Veri Başarıyla Silindi.";
                } else if(type == "guild") {
                 const index = db.findIndex(x => x.guildID === id);
                 if (index === -1) return "Veri bulunamadı.";

                 db[index].data = db[index].data.filter(x => x !== data);
                 saveDatabase();
                 return "Veri Başarıyla Silindi.";
                }
                }
                client.databaseAll = async function () {
                 return db;
                };
            }
}

module.exports = { PrivateRooms };
