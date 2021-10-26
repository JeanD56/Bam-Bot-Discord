const { prefix } = require(`../../config.json`);

module.exports = async (bot, message) => {

    if(message.author.bot || message.channel.type === "dm") return;

    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    //console.log(messageArray, cmd, args);

    let commandfile = bot.commands.get(cmd.slice(prefix.length)) || bot.commands.get(bot.alias.get(cmd.slice(prefix.length)))
    if(commandfile) commandfile.run(bot, message, args)
}