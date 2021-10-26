const Discord = require('discord.js');
const config = require('../../config.json');
const color = require('../../colors.json');

module.exports= {
    config: {
        name:"Serveur Info",
        command:"serverinfo",
        alias:["si", "serveurinfo"],
        category: "Divers",
        usage: "",
        description: "Information a propos de ce serveur Discord",
        autorisation: "MEMBER"
    },
    run : async (bot, message, args) =>{
        message.delete();   
        
        let isEmbed = new Discord.MessageEmbed()
            .setColor(color.Info)
            .setTitle("Info Serveur")
            .setThumbnail(message.guild.iconURL())
            .setAuthor(`${message.guild.name} Info`, message.guild.iconURL())
            .addField("**Nom Serveur**:", `${message.guild.name}`, true)
            .addField("**Proprio:**", `${message.guild.owner}`, true)
            .addField("**Nombre de Membre**", `${message.guild.memberCount}`, true)
            .addField("**Nombre Rôle**", `${message.guild.roles.size}`, true)
            .addField("**Crée le :**", message.guild.createdAt, true)
            .addField("**Vous avez rejoint ce server le :**", message.member.joinedAt, true)
            .setFooter(`${bot.user.tag}`, bot.user.displayAvatarURL());
            
        message.channel.send({embed: isEmbed});
    }
}