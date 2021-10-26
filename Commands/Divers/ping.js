const discord = require('discord.js');
const couleur = require('../../colors.json');


module.exports = {
    config: {
        name: "Ping",
        command: "ping",
        description: "donne le ping du bot, l'api est cassée",
        usage: "",
        category: "Divers",
        alias: [],
        autorisation: "MEMBER"
        
    },
    run: async (bot, message, args) => {
        message.delete();

        let pingEmbed = new discord.MessageEmbed();
        pingEmbed.setColor(couleur.Info);
        pingEmbed.setAuthor("", message.author.displayAvatarURL());

        message.channel.send("Pinging ...").then(m =>{
            let ping = m.createdTimestamp - message.createdTimestamp
            let choix = ["C'est vraiment mon ping", "Pas si mauvais c:", "OK."]
            let reponse = choix[Math.floor(Math.random()*choix.length)]

            pingEmbed.setDescription(`**Bot Ping:** \`${ping}\` ms\n**Api Ping:** \`${Math.fround(bot.ping)}\``);

            m.edit("Ping :");
            m.edit(pingEmbed);
        })
    }
}
