const Discord = require('discord.js');
const { Dev } = require('../../config.json');
const couleur = require('../../colors.json');


module.exports = {
    config: {
        name: "Bot Info",
        command: "botinfo",
        alias: ["bi"],
        usage: "",
        category: "Divers",
        description: "Information a propos de moi c:",
        autorisation: "MEMBER"
    },
    run: async (bot, message, args) => {

        message.delete();   
        let botembed = new Discord.MessageEmbed()
        .setTitle('**Information bot**')
        .setAuthor(`${bot.user.tag}`, bot.user.displayAvatarURL())
        .setColor(couleur.Default)
        .setThumbnail(bot.user.displayAvatarURL())
        .addField("**Nom du bot :**", bot.user.username, false)
        .addField("Crée par :", `<@${Dev}>`+" | alias Jean", true)
        .addField("Crée le :", bot.user.createdAt, true)
        .setFooter(`${bot.user.tag}`, bot.user.displayAvatarURL());

        return message.channel.send(botembed);
    }
}
