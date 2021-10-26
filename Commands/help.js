const Discord = require('discord.js');
const config = require('../config.json');
const color = require('../colors.json');


module.exports.run = async (bot, message, args) => {

    if(args[0]){
        let command = args[0];
        if(bot.command.has(command)){
            command = bot.command.get(command);

            var hEmbed = new Discord.MessageEmbed()
            .setColor(color.Help)
            .setAuthor(`${bot.user.name} Help`, message.author.displayAvatarURL())
            .setDescription(`Le prefix est: ${config.prefix}\n\n**Nom:** ${command.config.name}\n**Commande**: ${command.config.command}\n**Description:** ${command.config.description ||"pas de description"}\n**Utilisation:** ${command.config.utilisation ||"pas d'utilisation"}\n**Alias:** ${command.config.alias}`) 
            .setFooter(`${bot.user.tag}`, bot.user.displayAvatarURL());

            message.channel.send(hEmbed);
        }
    }

    if(!args[0]){
        let h1Embed = new Discord.MessageEmbed()
        .setColor(color.Help)
        .setAuthor(`${bot.user.name} Help`, message.author.displayAvatarURL())
        .setDescription(`${message.author.name} Vas dans tes MP`) 
        .setFooter(`${bot.user.tag}`, bot.user.displayAvatarURL());

        let h2Embed = new Discord.MessageEmbed()
        .setColor(color.Help)
        .setAuthor(`${bot.user.name} Help`, message.author.displayAvatarURL())
        .setTimestamp()
        .setDescription(`Voici les commandes disponible`)
        .addField("Commands", ".....") 
        .setFooter(`${bot.user.tag}`, bot.user.displayAvatarURL());

        message.channel.send(h1Embed).them(n => n.delete(10000));
        message.author.send(h2Embed)
    }
}

module.exports.config = {
    name: "Help",
    command: "help",
    utilisation: `${config.prefix}help`,
    description: "",
    alias: ["h"]
}