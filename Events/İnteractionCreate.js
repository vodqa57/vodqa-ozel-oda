const client = global.client;
const Discord = require("discord.js");

module.exports = async (interaction) => {
    if (!interaction) return;
    if (!interaction.guild) return;

    if (interaction.customId === "jailrolesselect") {
        const role = interaction.values;
        if (!role) return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Lütfen Bir Rol Seçin!**`, flags: 64 });

        const data = await client.databaseGet(interaction.guild.id, "guild");
        if (!data || !Array.isArray(data.data) || data.data.length < 1) {
            for (let i = 0; i < role.length; i++) {
                await client.databasePush(interaction.guild.id, [
                    {
                        categoryID: "",
                        voiceID: "",
                        jailRoles: [role[i]],
                        unregisterRoles: [],
                        memberRoles: [],
                        logChannelID: ""
                    }
                ], "guild");
            }
            return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.yes)} ${interaction.member} **Ceza Rolleri Başarıyla Ayarlandı!**`, flags: 64 });
        }

        if (data && Array.isArray(data.data) && data.data.length > 0) {
            for (let i = 0; i < role.length; i++) {
                await client.databaseSet(interaction.guild.id, [
                    {
                        categoryID: data.data[0].categoryID.length < 1 ? "" : data.data[0].categoryID,
                        voiceID: data.data[0].voiceID.length < 1 ? "" : data.data[0].voiceID,
                        jailRoles: data.data[0].jailRoles.concat(role[i]) || [],
                        unregisterRoles: data.data[0].unregisterRoles.length < 1 ? [] : data.data[0].unregisterRoles,
                        memberRoles: data.data[0].memberRoles.length < 1 ? [] : data.data[0].memberRoles,
                        logChannelID: data.data[0].logChannelID.length < 1 ? "" : data.data[0].logChannelID
                    }
                ], "guild");
            }
            return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.yes)} ${interaction.member} **Ceza Rolleri Başarıyla Ayarlandı!**`, flags: 64 });
        }
    }

    if (interaction.customId === "kayitsizrolesselect") {
        const role = interaction.values;
        if (!role) return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Lütfen Bir Rol Seçin!**`, flags: 64 });

        const data = await client.databaseGet(interaction.guild.id, "guild");
        if (!data || !Array.isArray(data.data) || data.data.length < 1) {
            for (let i = 0; i < role.length; i++) {
                await client.databasePush(interaction.guild.id, [
                    {
                        categoryID: "",
                        voiceID: "",
                        jailRoles: [],
                        unregisterRoles: [role[i]],
                        memberRoles: [],
                        logChannelID: ""
                    }
                ], "guild");
            }
            return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.yes)} ${interaction.member} **Kayıtsız Rolleri Başarıyla Ayarlandı!**`, flags: 64 });
        }

        if (data && Array.isArray(data.data) && data.data.length > 0) {
            for (let i = 0; i < role.length; i++) {
                await client.databaseSet(interaction.guild.id, [
                    {
                        categoryID: data.data[0].categoryID.length < 1 ? "" : data.data[0].categoryID,
                        voiceID: data.data[0].voiceID.length < 1 ? "" : data.data[0].voiceID,
                        jailRoles: data.data[0].jailRoles.length < 1 ? [] : data.data[0].jailRoles,
                        unregisterRoles: data.data[0].unregisterRoles.concat(role[i]) || [],
                        memberRoles: data.data[0].memberRoles.length < 1 ? [] : data.data[0].memberRoles,
                        logChannelID: data.data[0].logChannelID.length < 1 ? "" : data.data[0].logChannelID
                    }
                ], "guild");
            }
            return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.yes)} ${interaction.member} **Kayıtsız Rolleri Başarıyla Ayarlandı!**`, flags: 64 });
        }
    }

    if (interaction.customId === "memberrolesselect") {
        const role = interaction.values;
        if (!role) return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Lütfen Bir Rol Seçin!**`, flags: 64 });

        const data = await client.databaseGet(interaction.guild.id, "guild");
        if (!data || !Array.isArray(data.data) || data.data.length < 1) {
            for (let i = 0; i < role.length; i++) {
                await client.databasePush(interaction.guild.id, [
                    {
                        categoryID: "",
                        voiceID: "",
                        jailRoles: [],
                        unregisterRoles: [],
                        memberRoles: [role[i]],
                        logChannelID: ""
                    }
                ], "guild");
            }
            return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.yes)} ${interaction.member} **Üye Rolleri Başarıyla Ayarlandı!**`, flags: 64 });
        }

        if (data && Array.isArray(data.data) && data.data.length > 0) {
            for (let i = 0; i < role.length; i++) {
                await client.databaseSet(interaction.guild.id, [
                    {
                        categoryID: data.data[0].categoryID.length < 1 ? "" : data.data[0].categoryID,
                        voiceID: data.data[0].voiceID.length < 1 ? "" : data.data[0].voiceID,
                        jailRoles: data.data[0].jailRoles.length < 1 ? [] : data.data[0].jailRoles,
                        unregisterRoles: data.data[0].unregisterRoles.length < 1 ? [] : data.data[0].unregisterRoles,
                        memberRoles: data.data[0].memberRoles.concat(role[i]) || [],
                        logChannelID: data.data[0].logChannelID.length < 1 ? "" : data.data[0].logChannelID
                    }
                ], "guild");
            }
            return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.yes)} ${interaction.member} **Üye Rolleri Başarıyla Ayarlandı!**`, flags: 64 });
        }
    }

    if (interaction.customId === "privateroomsdelete") {
        const gdata = await client.databaseGet(client.config.Bot.GuildID, "guild");
        const data = await client.databaseGet(interaction.member.id, "user");
        if (!gdata || !gdata.data) {
            return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Özel Oda Ayarlanmamış!**`, flags: 64 });
        }
        if (data && !data.data) {
            return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Özel Oda Ayarlanmamış!**`, flags: 64 });
        }
        if (data && Array.isArray(data.data) && data.data.length > 0 && data.data[0].channelID.length > 0) {
            await client.databaseDelete(interaction.member.id, "user");
            const channel = interaction.guild.channels.cache.get(data.data[0].channelID);
            const logChannel = interaction.guild.channels.cache.get(gdata.data[0].logChannelID);
            if(logChannel) logChannel.send({embeds: [new Discord.EmbedBuilder().setColor("Random").setAuthor({name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({dynamic: true})}).setFooter({text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic: true})}).setThumbnail(interaction.guild.iconURL({dynamic: true}))
                .setDescription(`➥ ${interaction.member} Özel Odasını Sildi!

                ➥ **Oda Sahibi:** ${interaction.member}
                ➥ **Silinme Tarihi:** <t:${Math.floor(Date.now() / 1000)}:R>`)]}).catch(() => {});
                await interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.yes)} ${interaction.member} **Özel Oda Başarıyla Silindi!**`, flags: 64 }).catch(() => { });
            if (channel) channel.delete().catch(() => { });
    }
}
     if (interaction.customId === "privateroomslock") {
        const gdata = await client.databaseGet(client.config.Bot.GuildID, "guild");
        const data = await client.databaseGet(interaction.member.id, "user");
        if (!gdata || !gdata.data) {
            return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Özel Oda Ayarlanmamış!**`, flags: 64 });
        }
        if (data && !data.data) {
            return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Özel Oda Ayarlanmamış!**`, flags: 64 });
        }
        if (data && Array.isArray(data.data) && data.data.length > 0 && data.data[0].channelID.length > 0) {
            if (data.data[0].lock === true) {
                return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Özel Oda Zaten Kilitli!**`, flags: 64 });
            }
            const channel = interaction.guild.channels.cache.get(data.data[0].channelID);
            if (channel) {
                for (let role of gdata.data[0].memberRoles) {
                    await channel.permissionOverwrites.create(role, { Connect: false, ViewChannel: false, Speak: false });
                }
                await client.databaseSet(interaction.member.id, [
                    {
                        guildID: client.config.Bot.GuildID,
                        channelID: data.data[0].channelID,
                        date: data.data[0].date,
                        lock: true,
                        members: []
                    }
                ], "user");
                const logChannel = interaction.guild.channels.cache.get(gdata.data[0].logChannelID);
                if(logChannel) logChannel.send({embeds: [new Discord.EmbedBuilder().setColor("Random").setAuthor({name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({dynamic: true})}).setFooter({text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic: true})}).setThumbnail(interaction.guild.iconURL({dynamic: true}))
                    .setDescription(`➥ ${interaction.member} Özel Odasını Kilitledi! [Tıkla!](https://discord.com/channels/${interaction.guild.id}/${channel.id}/)

                    ➥ **Oda Sahibi:** ${interaction.member}
                    ➥ **Kilitlenme Tarihi:** <t:${Math.floor(Date.now() / 1000)}:R>`)]}).catch(() => {});
            }
        }
        return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.yes)} ${interaction.member} **Özel Oda Başarıyla Kilitlendi!**`, flags: 64 });
    }
     if (interaction.customId === "privateroomsunlock") {
        const gdata = await client.databaseGet(client.config.Bot.GuildID, "guild");
        const data = await client.databaseGet(interaction.member.id, "user");
        if (!gdata || !gdata.data) {
            return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Özel Oda Ayarlanmamış!**`, flags: 64 });
        }
        if (data && !data.data) {
            return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Özel Oda Ayarlanmamış!**`, flags: 64 });
        }
        if (data && Array.isArray(data.data) && data.data.length > 0 && data.data[0].channelID.length > 0) {
            if (data.data[0].lock === false) {
                return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Özel Oda Zaten Açık!**`, flags: 64 });
            }
            const channel = interaction.guild.channels.cache.get(data.data[0].channelID);
            if (channel) {
                for (let role of gdata.data[0].memberRoles) {
                    await channel.permissionOverwrites.create(role, { Connect: true, ViewChannel: true, UseVAD: true, PrioritySpeaker: true, RequestToSpeak: true, Speak: true });
                }
                await client.databaseSet(interaction.user.id, [
                    {
                        guildID: client.config.Bot.GuildID,
                        channelID: data.data[0].channelID,
                        date: data.data[0].date,
                        lock: false,
                        members: []
                    }
                ], "user");
                const logChannel = interaction.guild.channels.cache.get(gdata.data[0].logChannelID);
                if(logChannel) logChannel.send({embeds: [new Discord.EmbedBuilder().setColor("Random").setAuthor({name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({dynamic: true})}).setFooter({text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic: true})}).setThumbnail(interaction.guild.iconURL({dynamic: true}))
                    .setDescription(`➥ ${interaction.member} Özel Odasını Açtı! [Tıkla!](https://discord.com/channels/${interaction.guild.id}/${channel.id}/)

                    ➥ **Oda Sahibi:** ${interaction.member}
                    ➥ **Açılma Tarihi:** <t:${Math.floor(Date.now() / 1000)}:R>`)]}).catch(() => {});
            }
        }
        return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.yes)} ${interaction.member} **Özel Oda Başarıyla Açıldı!**`, flags: 64 });
    }
     if (interaction.customId === "privateroomsrename") {
        const modal = new Discord.ModalBuilder()
            .setTitle("Özel Oda Adını Değiştir")
            .setCustomId("privateroomsrenames");
        const text = new Discord.TextInputBuilder()
            .setCustomId("privateroomsrenametext")
            .setPlaceholder("Yeni Oda Adı")
            .setLabel("Yeni Oda Adı")
            .setMinLength(1)
            .setStyle(1);
        const actionRow1 = new Discord.ActionRowBuilder().addComponents(text);
        modal.addComponents(actionRow1);
        await interaction.showModal(modal).catch(err => { { } });
    }
     if (interaction.customId === "privateroomslimit") {
        const modal = new Discord.ModalBuilder()
            .setTitle("Özel Oda Limitini Değiştir")
            .setCustomId("privateroomslimits");
        const text = new Discord.TextInputBuilder()
            .setCustomId("privateroomslimittext")
            .setPlaceholder("Yeni Oda Limiti")
            .setLabel("Yeni Oda Limiti")
            .setMinLength(1)
            .setStyle(1);
        const actionRow1 = new Discord.ActionRowBuilder().addComponents(text);
        modal.addComponents(actionRow1);
        await interaction.showModal(modal).catch(err => { { } });
    }
     if (interaction.customId === "privateroomsuserremove") {
        const row = new Discord.ActionRowBuilder()
            .addComponents(new Discord.UserSelectMenuBuilder().setCustomId("privateroomsuserremoves").setPlaceholder("Kullanıcı Seç").setMinValues(1).setMaxValues(1));
        await interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.yes)} ${interaction.member} **Kullanıcı Kaldır**`, components: [row], flags: 64 });
    }
     if (interaction.customId === "privateroomsuseradd") {
        const row = new Discord.ActionRowBuilder()
            .addComponents(new Discord.UserSelectMenuBuilder().setCustomId("privateroomsuseradds").setPlaceholder("Kullanıcı Seç").setMinValues(1).setMaxValues(1));
        await interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.yes)} ${interaction.member} **Kullanıcı Ekle**`, components: [row], flags: 64 });
    }
    if (interaction.customId === "privateroomsuserremoves") {
    const data = await client.databaseGet(interaction.member.id, "user");
    const gdata = await client.databaseGet(client.config.Bot.GuildID, "guild");
    if (!gdata || !gdata.data) {
        return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Özel Oda Ayarlanmamış!**`, flags: 64 });
    }
    if (!data || !data.data) {
        return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Özel Oda Ayarlanmamış!**`, flags: 64 });
    }
    const user = interaction.values;
    if (!user) return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Lütfen Bir Kullanıcı Seçin!**`, flags: 64 });
    const channel = interaction.guild.channels.cache.get(data.data[0].channelID);
    const log = interaction.guild.channels.cache.get(gdata?.data[0]?.logChannelID);
    if(channel) {
        const member = interaction.guild.members.cache.get(user[0]);
        if (member) {
            await member.voice.setChannel(null).catch(() => { });
            await channel.permissionOverwrites.delete(member.id).catch(() => { });
            await client.databaseSet(interaction.member.id, [
                {
                    guildID: client.config.Bot.GuildID,
                    channelID: data.data[0].channelID,
                    date: data.data[0].date,
                    lock: data.data[0].lock,
                    members: data.data[0].members.filter(x => x !== member.id)
                }
            ], "user");
            await interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.yes)} ${interaction.member} **Kullanıcı Başarıyla Çıkarıldı!**`, flags: 64 });
            if (log) log.send({embeds: [new Discord.EmbedBuilder().setColor("Random").setAuthor({name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({dynamic: true})}).setFooter({text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic: true})}).setThumbnail(interaction.guild.iconURL({dynamic: true}))
                .setDescription(`➥ ${interaction.member} Özel Odasından Kullanıcı Çıkardı!

                ➥ **Oda Sahibi:** ${interaction.member}
                ➥ **Kullanıcı:** ${member}
                ➥ **Çıkarılma Tarihi:** <t:${Math.floor(Date.now() / 1000)}:R>`)]}).catch(() => {});
        }
    }
    }
    if (interaction.customId === "privateroomsuseradds") {
        const data = await client.databaseGet(interaction.member.id, "user");
        const gdata = await client.databaseGet(client.config.Bot.GuildID, "guild");
        if (!gdata || !gdata.data) {
            return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Özel Oda Ayarlanmamış!**`, flags: 64 });
        }
        if (!data || !data.data) {
            return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Özel Oda Ayarlanmamış!**`, flags: 64 });
        }
        const user = interaction.values;
        if (!user) return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Lütfen Bir Kullanıcı Seçin!**`, flags: 64 });
        const channel = interaction.guild.channels.cache.get(data.data[0].channelID);
        const log = interaction.guild.channels.cache.get(gdata?.data[0]?.logChannelID);
        if(channel) {
            const member = interaction.guild.members.cache.get(user[0]);
            if (member) {
                await member.voice.setChannel(channel.id).catch(() => { });
                await channel.permissionOverwrites.create(member.id, {SendMessages: true, Connect: true, ViewChannel: true, UseVAD: true, PrioritySpeaker: true, RequestToSpeak: true, Speak: true, Stream: true });
                await interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.yes)} ${interaction.member} **Kullanıcı Başarıyla Eklendi!**`, flags: 64 });
                await client.databaseSet(interaction.member.id, [
                    {
                        guildID: client.config.Bot.GuildID,
                        channelID: data.data[0].channelID,
                        date: data.data[0].date,
                        lock: data.data[0].lock,
                        members: data.data[0].members.concat(member.id)
                    }
                ], "user");
                if (log) log.send({embeds: [new Discord.EmbedBuilder().setColor("Random").setAuthor({name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({dynamic: true})}).setFooter({text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic: true})}).setThumbnail(interaction.guild.iconURL({dynamic: true}))
                    .setDescription(`➥ ${interaction.member} Özel Odasına Kullanıcı Eklendi!

                    ➥ **Oda Sahibi:** ${interaction.member}
                    ➥ **Kullanıcı:** ${member}
                    ➥ **Ekleme Tarihi:** <t:${Math.floor(Date.now() / 1000)}:R>`)]}).catch(() => {});
        }
    }
}
    if (interaction.customId === "privateroomsrenames") {
        const data = await client.databaseGet(interaction.member.id, "user");
        const gdata = await client.databaseGet(client.config.Bot.GuildID, "guild");
        if (!gdata || !gdata.data) {
            return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Özel Oda Ayarlanmamış!**`, flags: 64 });
        }
        if (!data || !data.data) {
            return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Özel Oda Ayarlanmamış!**`, flags: 64 });
        }
        const text = interaction.fields.getTextInputValue("privateroomsrenametext");
        if (!text) return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Lütfen Bir İsim Belirtin!**`, flags: 64 });
        const channel = interaction.guild.channels.cache.get(data.data[0].channelID);
        if (channel) {
            await channel.setName(text).catch(() => { });
            const logChannel = interaction.guild.channels.cache.get(gdata?.data[0]?.logChannelID);
            if(logChannel) logChannel.send({embeds: [new Discord.EmbedBuilder().setColor("Random").setAuthor({name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({dynamic: true})}).setFooter({text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic: true})}).setThumbnail(interaction.guild.iconURL({dynamic: true}))
                .setDescription(`➥ ${interaction.member} Özel Odasının Adı Değiştirildi!

                ➥ **Oda Sahibi:** ${interaction.member}
                ➥ **Yeni Oda Adı:** ${text}
                ➥ **Değiştirilme Tarihi:** <t:${Math.floor(Date.now() / 1000)}:R>`)]}).catch(() => {});
        }
        return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.yes)} ${interaction.member} **Özel Oda Başarıyla Adlandırıldı!**`, flags: 64 });
    }

    if (interaction.customId === "privateroomslimits") {
        const data = await client.databaseGet(interaction.member.id, "user");
        const gdata = await client.databaseGet(client.config.Bot.GuildID, "guild");
        if (!gdata || !gdata.data) {
            return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Özel Oda Ayarlanmamış!**`, flags: 64 });
        }
        if (!data || !data.data) {
            return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Özel Oda Ayarlanmamış!**`, flags: 64 });
        }
        const text = interaction.fields.getTextInputValue("privateroomslimittext");
        if (!text) return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Lütfen Bir Limit Belirtin!**`, flags: 64 });
        const channel = interaction.guild.channels.cache.get(data.data[0].channelID);
        if (channel) {
            await channel.setUserLimit(text).catch(() => { });
            const logChannel = interaction.guild.channels.cache.get(gdata?.data[0]?.logChannelID);
            if(logChannel) logChannel.send({embeds: [new Discord.EmbedBuilder().setColor("Random").setAuthor({name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({dynamic: true})}).setFooter({text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic: true})}).setThumbnail(interaction.guild.iconURL({dynamic: true}))
                .setDescription(`➥ ${interaction.member} Özel Odasının Limiti Değiştirildi!

                ➥ **Oda Sahibi:** ${interaction.member}
                ➥ **Yeni Oda Limiti:** ${text}
                ➥ **Değiştirilme Tarihi:** <t:${Math.floor(Date.now() / 1000)}:R>`)]}).catch(() => {});
        }
        return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.yes)} ${interaction.member} **Özel Oda Başarıyla Limiti Değiştirildi!**`, flags: 64 });
    }
    if(interaction.customId === "privateroomsinfo") {
    const data = await client.databaseGet(interaction.member.id, "user");
    const gdata = await client.databaseGet(client.config.Bot.GuildID, "guild");
    if (!gdata || !gdata.data) {
        return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Özel Oda Ayarlanmamış!**`, flags: 64 });
    }
    if (!data || !data.data) {
        return interaction.reply({ content: `${interaction.guild.emojiGöster(client.config.Emoji.no)} ${interaction.member} **Özel Oda Ayarlanmamış!**`, flags: 64 });
    }
    const channel = interaction.guild.channels.cache.get(data.data[0].channelID);
    if (channel) {
        const members = data.data[0].members.filter(x => interaction.guild.members.cache.get(x)).map(x => `${interaction.guild.members.cache.get(x).displayName} [${interaction.guild.members.cache.get(x).user.username}] (${interaction.guild.members.cache.get(x).id})`).join("\n");
        await interaction.reply({embeds: [new Discord.EmbedBuilder().setColor("Random").setAuthor({name: interaction.member.user.username, iconURL: interaction.member.user.avatarURL({dynamic: true})}).setFooter({text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic: true})}).setThumbnail(interaction.guild.iconURL({dynamic: true}))
            .setDescription(`➥ ${interaction.member} Özel Oda Bilgileri

            ➥ **Oda Sahibi:** ${interaction.member}
            ➥ **Oda Bilgisi:** ${channel} [\`${channel.name}\`] (\`${channel.id}\`)
            ➥ **Oda Limiti:** ${channel.userLimit || "Limitsiz"}
            ➥ **Oda Durumu:** ${data.data[0].lock === true ? "Kilitli" : "Açık"}
            ➥ **Oda Oluşturulma Tarihi:** <t:${Math.floor(data.data[0].date / 1000)}:R>
            ➥ **Oda Üyeleri:**
            ${Discord.codeBlock("yaml", `${members.length < 1 ? "Oda Üyesi Yok!" : members}`)}`)], flags: 64}).catch(() => {});
    }
    }
}

module.exports.conf = {
    name: "interactionCreate"
}