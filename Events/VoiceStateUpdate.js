const client = global.client;
const Discord = require("discord.js");
module.exports = async (oldState, newState) => {
    if (!oldState || !newState) return;
    if (oldState.member.user.bot || newState.member.user.bot) return;
    const data = await client.databaseGet(oldState.member.id, "user");
    const guildData = await client.databaseGet(newState.guild.id, "guild");
    if (oldState?.channelId !== guildData?.data[0]?.voiceID && newState?.channelId === guildData?.data[0]?.voiceID) {
        if (data && Array.isArray(data.data) && data.data.length > 0 && data.data[0].channelID.length > 0) {
        return await newState.member.voice.setChannel(data.data[0].channelID, "Özel odası varken başka bir oda oluşturamaz.").catch(() => {});
        }
        try {
            const channel = await newState.guild.channels.create({
                name: `${oldState.member.user.username}'s Room`,
                type: Discord.ChannelType.GuildVoice,
                userLimit: 1,
                parent: guildData.data[0].categoryID,
                permissionOverwrites: [
                    {
                        id: newState.guild.id,
                        deny: [Discord.PermissionFlagsBits.Connect, Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.Speak],
                    },
                    {
                        id: oldState.member.id,
                        allow: [Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.Connect, Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.PrioritySpeaker, Discord.PermissionFlagsBits.RequestToSpeak, Discord.PermissionFlagsBits.Speak, Discord.PermissionFlagsBits.Stream],
                    },
                ],
            });
            for (let role of guildData.data[0].jailRoles) {
                await channel.permissionOverwrites.create(role, {Connect: false, ViewChannel: false, Speak: false});
            }
            for (let role of guildData.data[0].unregisterRoles) {
                await channel.permissionOverwrites.create(role, {Connect: false, ViewChannel: false, Speak: false});
            }
            for (let role of guildData.data[0].memberRoles) {
                await channel.permissionOverwrites.create(role, {Connect: false, ViewChannel: true, UseVAD: true, PrioritySpeaker: true, RequestToSpeak: true, Speak: true});
            }
            await client.databasePush(oldState.member.id, [
                {
                    guildID: newState.guild.id,
                    channelID: channel.id,
                    date: Date.now(),
                    lock: true,
                    members: []
                }
            ], "user");
            await newState.setChannel(channel.id, "Kullanıcı özel oda oluşturdu.").catch(() => {});
            const row = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("privateroomsdelete")
                        .setLabel("Odayı Sil")
                        .setStyle(Discord.ButtonStyle.Secondary),
                    new Discord.ButtonBuilder()
                        .setCustomId("privateroomslock")
                        .setLabel("Odayı Kilitle")
                        .setStyle(Discord.ButtonStyle.Secondary),
                    new Discord.ButtonBuilder()
                        .setCustomId("privateroomsunlock")
                        .setLabel("Odayı Aç")
                        .setStyle(Discord.ButtonStyle.Secondary),
                     new Discord.ButtonBuilder()
                        .setCustomId("privateroomsrename")
                        .setLabel("Odayı Yeniden Adlandır")
                        .setStyle(Discord.ButtonStyle.Secondary),
                        new Discord.ButtonBuilder()
                        .setCustomId("privateroomslimit")
                        .setLabel("Oda Limitini Değiştir")
                        .setStyle(Discord.ButtonStyle.Secondary)
                );
                const row2 = new Discord.ActionRowBuilder()
                .addComponents(
                    new Discord.ButtonBuilder()
                        .setCustomId("privateroomsuserremove")
                        .setLabel("Kullanıcı Çıkar")
                        .setStyle(Discord.ButtonStyle.Secondary),
                        new Discord.ButtonBuilder()
                        .setCustomId("privateroomsuseradd")
                        .setLabel("Kullanıcı Ekle")
                        .setStyle(Discord.ButtonStyle.Secondary),
                        new Discord.ButtonBuilder()
                        .setCustomId("privateroomsinfo")
                        .setLabel("Özel Oda Bilgileri")
                        .setStyle(Discord.ButtonStyle.Secondary)
                );
                await channel.send({embeds: [new Discord.EmbedBuilder().setColor("Random").setAuthor({name: newState.member.user.username, iconURL: newState.member.user.avatarURL({dynamic: true})}).setFooter({text: newState.guild.name, iconURL: newState.guild.iconURL({dynamic: true})}).setThumbnail(newState.guild.iconURL({dynamic: true}))
                 .setDescription(`➥ ${newState.member} Başarıyla Özel Odan Oluşturuldu. [Tıkla!](https://discord.com/channels/${newState.guild.id}/${channel.id}/)

➥ **Oda Sahibi:** ${newState.member}
➥ **Oda Bilgisi:** ${channel} [\`${channel.name}\`] (\`${channel.id}\`)
➥ **Oda Limiti:** ${channel.userLimit || "Limitsiz"}
➥ **Oda Durumu:** Kilitli
➥ **Oda Oluşturulma Tarihi:** ${Discord.time(Date.now())} (${Discord.time(Date.now(), "F")}`)], content: `${newState.member}`, components: [row, row2]}).catch(() => {});
const logChannel = newState.guild.channels.cache.get(guildData.data[0].logChannelID)
if (logChannel) logChannel.send({embeds: [new Discord.EmbedBuilder().setColor("Random").setAuthor({name: newState.member.user.username, iconURL: newState.member.user.avatarURL({dynamic: true})}).setFooter({text: newState.guild.name, iconURL: newState.guild.iconURL({dynamic: true})}).setThumbnail(newState.guild.iconURL({dynamic: true}))
.setDescription(`➥ ${newState.member} Kişisi ${channel} [\`${channel.name}\`] (\`${channel.id}\`) İsimli Özel Odayı Oluşturdu.

➥ **Oda Sahibi:** ${newState.member}
➥ **Oda Limiti:** ${channel.userLimit || "Limitsiz"}
➥ **Oda Durumu:** Kilitli
➥ **Oda Oluşturulma Tarihi:** ${Discord.time(Date.now())} (${Discord.time(Date.now(), "F")})`)]}).catch(() => {});
        } catch (error) {
            console.error("Özel kanal oluşturulurken hata oluştu:", error);
        }
    }
    if (data && Array.isArray(data.data) && data.data.length > 0 && oldState?.channelId === data.data[0]?.channelID && newState?.channelId !== data.data[0]?.channelID) {
        const channelID = data.data[0].channelID;
        const channel = oldState.guild.channels.cache.get(channelID) || await oldState.guild.channels.fetch(channelID).catch(() => null);
        if (channel && channel.members.size === 0) {
            await client.databaseDelete(oldState.member.id, "user");
            const logChannel = oldState.guild.channels.cache.get(guildData.data[0].logChannelID);
            if (logChannel) logChannel.send({embeds: [new Discord.EmbedBuilder().setColor("Random").setAuthor({name: oldState.member.user.username, iconURL: oldState.member.user.avatarURL({dynamic: true})}).setFooter({text: oldState.guild.name, iconURL: oldState.guild.iconURL({dynamic: true})}).setThumbnail(oldState.guild.iconURL({dynamic: true}))
.setDescription(`➥ ${oldState.member} Kişisi ${channel} [\`${channel.name}\`] (\`${channel.id}\`) İsimli Özel Odadan Ayrıldı.

➥ **Oda Sahibi:** ${oldState.member}
➥ **Oda Limiti:** ${channel.userLimit || "Limitsiz"}
➥ **Oda Durumu:** Kilitli
➥ **Oda Oluşturulma Tarihi:** ${Discord.time(data.data[0].date)} (${Discord.time(data.data[0].date, "F")})`)]}).catch(() => {});
            await channel.delete("Kullanıcı özel odadan ayrıldı.").catch(() => {});
        }
    }
    if(newState.channel && newState.channel.parentId === guildData.data[0].categoryID && newState.channel.id !== guildData.data[0].voiceID) {
       const AllData = await client.databaseAll()
       const Data = AllData.find(x => x.data.some(y => y.channelID === newState.channel.id));
         if(Data) {
            if (Data.data[0].lock === true && !Data.data[0].members.includes(newState.member.id) && newState.member.id !== Data.userID) {
                const channel = newState.guild.channels.cache.get(Data.data[0].channelID);
                if(channel) channel.send({content: `${newState.guild.members.cache.get(Data.userID)}, ${newState.member} Özel odaya giriş yapmaya çalıştı fakat odaya giriş izni bulunmamaktadır.`}).sil(20);
                return newState.member.voice.disconnect("Özel odası kilitli.").catch(() => {});
              }
         }
    }
};

module.exports.conf = {
    name: "voiceStateUpdate"
};
