const CooldownCommands = new Map();
const client = global.client;
const Discord = require("discord.js");

module.exports = async (message) => {
    if(!message) return;
    if (message.author.bot || !message.guild) return;
    let prefix = message.content.startsWith(client.config.Bot.BotPrefix)
    if (message.author.bot || !message.guild || !prefix) return;
    let args = message.content.substring(prefix.length).trim().split(" ");
    if(!args[0]) return;
    let commandName = args[0].toLowerCase().trim().substring(client.config.Bot.BotPrefix.length);
    const embed = new Discord.EmbedBuilder().setColor("Random").setFooter({ text: `${message.guild.name}`, iconURL: message.author.avatarURL({ dynamic: true })}).setAuthor({ name: message.author.username, iconURL: message.author.avatarURL({ dynamic: true })}).setTimestamp();
    args = args.splice(1);
    let cmd = client.commands.has(commandName) ? client.commands.get(commandName) : client.commands.get(client.aliases.get(commandName));
    if (cmd) {
        if (cmd.conf.owner && !client.config.Bot.Owner.includes(message.author.id) && message.guild.ownerId !== message.author.id) {
            await message.react(message.guild.emojiGöster(client.config.Emoji.no));
            return message.reply({content: `${message.guild.emojiGöster(emojis.nocommand)} Bu Komutu Kullanamazsın!`}).sil(15);
        }
        if (cmd.conf.cooldown > 0) {
            const Cooldowns = GetRemainingCooldown(message.author.id, cmd);
            if (Cooldowns > 0 && !message.member.permissions.has(Discord.PermissionFlagsBits.Administrator) && !client.config.Bot.Owner.includes(message.author.id)) {
                const timestamp = Math.floor(Date.now() / 1000) + Math.round(Cooldowns / 1);
                await message.react(message.guild.emojiGöster(client.config.Emoji.no));
                return await message.reply({content: `${message.author}, Bu Komutu Tekrar Kullanabilmek İçin <t:${timestamp}:R> Denemelisin!`}).sil(Cooldowns);
            }
        }
        cmd.Cyrstal(client, message, args, embed, prefix);
        if (cmd.conf.cooldown > 0) CooldownApply(message.author.id, cmd);
    }
}

module.exports.conf = {
    name: "messageCreate"
}

function CooldownApply(memberId, cmd) {
    const key = cmd.name + '|' + memberId;
    CooldownCommands.set(key, Date.now());
}

function GetRemainingCooldown(memberId, cmd) {
    const key = cmd.name + '|' + memberId;
    if (CooldownCommands.has(key)) {
        const remaining = (Date.now() - CooldownCommands.get(key)) * 0.001;
        if (remaining > cmd.conf.cooldown) {
            CooldownCommands.delete(key);
            return 0;
        }
        return cmd.conf.cooldown - remaining;
    }
    return 0;
}