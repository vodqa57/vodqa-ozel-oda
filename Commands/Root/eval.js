const Discord = require('discord.js');
module.exports = {
  conf: {
    name: "eval",
    aliases: ["root"],
    help: "eval [Kod]",
    owner: true,
    category: "owner"
  },
  Cyrstal: async (client, message, args) => {
    if (!args[0]) {
      await message.react(message.guild.emojiGöster(client.config.Emoji.no));
      return await message.reply({ content: "Bir kod belirtmelisin!" }).sil(15);
    }

    try {
      const code = args.join(" ");
      const yasakli = [
        client.token,
        "client.token",
        "process.env",
        client.config.Bot?.Token,
        "process",
        "token"
      ];

      if (yasakli.some(kelime => code.toLowerCase().includes(kelime.toLowerCase()))) {
        await message.react(message.guild.emojiGöster(client.config.Emoji.no));
        return await message.reply({
          content: "Bu işlem güvenlik nedeniyle engellendi. Token gibi kritik verileri görüntüleyemezsin."
        }).sil(15);
      }

      let evaled = clean(await eval(code));
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      const arr = splitMessages(evaled, { maxLength: 1950, char: "\n" });
      arr.forEach(async (element) => {
        await message.react(message.guild.emojiGöster(client.config.Emoji.yes));
        message.channel.send({ content: `\`\`\`js\n${element}\n\`\`\`` });
      });
    } catch (err) {
      await message.react(message.guild.emojiGöster(client.config.Emoji.no));
      message.channel.send(`\`HATA\` \`\`\`xl\n${clean(err)}\n\`\`\``);
    }

    function splitMessages(text, options = {}) {
      const maxLength = options.maxLength || 2000;
      const char = options.char || "\n";
      const messages = [];

      const lines = text.split(char);
      let currentMessage = "";
      let currentLength = 0;

      for (const line of lines) {
        if (currentLength + line.length + char.length <= maxLength) {
          currentMessage += line + char;
          currentLength += line.length + char.length;
        } else {
          messages.push(currentMessage);
          currentMessage = line + char;
          currentLength = line.length + char.length;
        }
      }

      if (currentMessage.length > 0) {
        messages.push(currentMessage);
      }

      return messages;
    }

    function clean(text) {
      if (typeof text === "string")
        return text
          .replace(/`/g, "`" + String.fromCharCode(8203))
          .replace(/@/g, "@" + String.fromCharCode(8203));
      else return text;
    }
  }
};
