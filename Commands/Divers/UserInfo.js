const Discord = require('discord.js');
const config = require('../../config.json');
const color = require('../../colors.json');

module.exports = {
    config: {
        name:"User Info",
        command:"userinfo",
        alias:["ui"],
        usage: "",
        category: "Divers",
        description: "Information a propos de toi",
        autorisation: "MEMBER"
    },
    run: async (bot, message, args) =>{
        
        message.delete();   
        let iuEmbed = new Discord.MessageEmbed()
            .setColor(color.Info)
            .setTitle("Info Utilisateur")
            .setThumbnail(message.author.displayAvatarURL(true))
            .setAuthor(`${message.author.username}#${message.author.discriminator} Info`, message.author.displayAvatarURL())
            .addField("**Nom Utilisateur**", `${message.member.displayName}`, false)
            .addField("**Alias**", `${message.author.username}`, true)
            .addField("**Discriminateur**", `#${message.author.discriminator}`, true)
            .addField("**ID**", `${message.author.id}`, false)
            .addField("**Etat**", `${message.author.presence.status}`, true)
            .addField("**Crée Le :**", `${message.author.createdAt}`, false)
            .setFooter(`${bot.user.tag}`, bot.user.displayAvatarURL());

        message.channel.send({embed: iuEmbed});
    }
}