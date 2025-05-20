const Discord = require('discord.js');
const config = require("../../Config.js")
module.exports = {
conf: {
name: "setup",
aliases: ["kur"],
help: "setup",
owner: true,
category: "owner"
},
Cyrstal: async (client, message, args) => {
const row = new Discord.ActionRowBuilder()
.addComponents(
new Discord.ButtonBuilder()
.setCustomId("jailroles")
.setLabel("Jail Rol Ayarla")
.setStyle(Discord.ButtonStyle.Secondary),
new Discord.ButtonBuilder()
.setCustomId("kayitsizroles")
.setLabel("Kayıtsız Rol Ayarla")
.setStyle(Discord.ButtonStyle.Secondary),
new Discord.ButtonBuilder()
.setCustomId("memberroles")
.setLabel("Üye Rol Ayarla")
.setStyle(Discord.ButtonStyle.Secondary),
new Discord.ButtonBuilder()
.setCustomId("privateroomscreate")
.setLabel("Özel Oda Oluştur")
.setStyle(Discord.ButtonStyle.Secondary),
new Discord.ButtonBuilder()
.setCustomId("privateroomsdelete")
.setLabel("Özel Oda Sil")
.setStyle(Discord.ButtonStyle.Secondary))
const msg = await message.channel.send({ content: `${message.member} **Sunucu Kurulum Menüsüne Hoşgeldin!**`, components: [row] });
let filter = (interaction) => interaction.user.id === message.author.id;
const collector = msg.createMessageComponentCollector({ filter });
collector.on("collect", async (interaction) => {
if(interaction.customId === "jailroles") {
const row2 = new Discord.ActionRowBuilder()
.addComponents(new Discord.RoleSelectMenuBuilder().setCustomId("jailrolesselect").setPlaceholder("Bir Rol Seçin").setMinValues(1).setMaxValues(10))
await interaction.reply({ content: `${interaction.member} **Jail Rol Ayarlamak İçin Aşağıdan Bir Rol Seçin!**`, components: [row2], flags: 64 });
} else if(interaction.customId === "kayitsizroles") {
const row2 = new Discord.ActionRowBuilder()
.addComponents(new Discord.RoleSelectMenuBuilder().setCustomId("kayitsizrolesselect").setPlaceholder("Bir Rol Seçin").setMinValues(1).setMaxValues(10))
await interaction.reply({ content: `${interaction.member} **Kayıtsız Rol Ayarlamak İçin Aşağıdan Bir Rol Seçin!**`, components: [row2], flags: 64 });
} else if(interaction.customId === "memberroles") {
const row2 = new Discord.ActionRowBuilder()
.addComponents(new Discord.RoleSelectMenuBuilder().setCustomId("memberrolesselect").setPlaceholder("Bir Rol Seçin").setMinValues(1).setMaxValues(10))
await interaction.reply({ content: `${interaction.member} **Üye Rol Ayarlamak İçin Aşağıdan Bir Rol Seçin!**`, components: [row2], flags: 64 });
} else if(interaction.customId === "privateroomscreate") {
const data = await client.databaseGet(interaction.guild.id, "guild");
if(data && !data.data) {
return interaction.reply({ content: `${interaction.member} **Jail Rolü veya Kayıtsız Rolü Ayarlanmamış!**`, flags: 64 });
}
if(data && data?.data[0]?.categoryID || data?.data[0]?.voiceID || data?.data[0]?.logChannelID) {
return interaction.reply({ content: `${interaction.member} **Özel Oda Zaten Ayarlanmış!**`, flags: 64 });
}
if(data && data?.data[0]?.jailRoles.length < 1) {
return interaction.reply({ content: `${interaction.member} **Jail Rolü Ayarlanmamış!**`, flags: 64 });
}
if(data && data?.data[0]?.unregisterRoles.length < 1) {
return interaction.reply({ content: `${interaction.member} **Kayıtsız Rolü Ayarlanmamış!**`, flags: 64 });
}
if(data && data?.data[0]?.memberRoles.length < 1) {
return interaction.reply({ content: `${interaction.member} **Üye Rolü Ayarlanmamış!**`, flags: 64 });
}
const category = await interaction.guild.channels.create({
name: "Private Rooms",
type: Discord.ChannelType.GuildCategory,
permissionOverwrites: [
{
id: interaction.guild.id,
deny: [Discord.PermissionFlagsBits.Connect, Discord.PermissionFlagsBits.ViewChannel, Discord.PermissionFlagsBits.Speak],
}]})
const textChannel = await interaction.guild.channels.create({
name: "özeloda-log",
type: Discord.ChannelType.GuildText,
parent: category.id,
permissionOverwrites: [
{
id: interaction.guild.id,
deny: [Discord.PermissionFlagsBits.SendMessages, Discord.PermissionFlagsBits.ViewChannel],
}]}).catch(() => {});
const channel = await interaction.guild.channels.create({
name: "Private Room",
type: Discord.ChannelType.GuildVoice,
parent: category.id,
permissionOverwrites: [
{
id: interaction.guild.id,
deny: [Discord.PermissionFlagsBits.Connect, Discord.PermissionFlagsBits.ViewChannel],
}]})
interaction.reply({ content: `${interaction.member} **Özel Oda Başarıyla Ayarlandı!**`, flags: 64 });
for(let role of data.data[0].jailRoles) {
await channel.permissionOverwrites.create(role,{Connect: false, ViewChannel: false, Speak: false});
await category.permissionOverwrites.create(role,{Connect: false, ViewChannel: false, Speak: false});
await textChannel.permissionOverwrites.create(role,{SendMessages: false, ViewChannel: false});
}
for(let role of data.data[0].unregisterRoles) {
await channel.permissionOverwrites.create(role,{Connect: false, ViewChannel: false, Speak: false});
await category.permissionOverwrites.create(role,{Connect: false, ViewChannel: false, Speak: false});
await textChannel.permissionOverwrites.create(role,{SendMessages: false, ViewChannel: false});
}
for(let role of data.data[0].memberRoles) {
await channel.permissionOverwrites.create(role,{Connect: true, ViewChannel: true, UseVAD: true, PrioritySpeaker: true, RequestToSpeak: true, Speak: true});
await category.permissionOverwrites.create(role,{Connect: true, ViewChannel: true, UseVAD: true, PrioritySpeaker: true, RequestToSpeak: true, Speak: true});
}
await client.databaseSet(interaction.guild.id, [
{
categoryID: category.id,
voiceID: channel.id,
jailRoles: data?.data[0].jailRoles,
unregisterRoles: data?.data[0].unregisterRoles,
memberRoles: data?.data[0].memberRoles,
logChannelID: textChannel.id,
}], "guild");
} else if(interaction.customId === "privateroomsdelete") {
const data = await client.databaseGet(interaction.guild.id, "guild");
if(!data || !data.data) {
return interaction.reply({ content: `${interaction.member} **Özel Oda Ayarlanmamış!**`, flags: 64 });
}
if(data && !data.data[0]?.categoryID || !data.data[0]?.voiceID || !data.data[0]?.logChannelID) {
return interaction.reply({ content: `${interaction.member} **Özel Oda Ayarlanmamış!**`, flags: 64 });
}
const category = interaction.guild.channels.cache.get(data.data[0].categoryID);
const channel = interaction.guild.channels.cache.get(data.data[0].voiceID);
const textChannel = interaction.guild.channels.cache.get(data.data[0].logChannelID);
if(category) category.delete().catch(() => {});
if(channel) channel.delete().catch(() => {});
if(textChannel) textChannel.delete().catch(() => {});
await client.databaseDelete(interaction.guild.id, "guild");
return interaction.reply({ content: `${interaction.member} **Özel Oda Başarıyla Silindi!**`, flags: 64 });
}
});
}
};
