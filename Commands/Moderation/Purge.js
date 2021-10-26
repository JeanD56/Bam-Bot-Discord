const Discord = require("discord.js");
const config = require('../../config.json');
const color = require('../../colors.json');

module.exports = {
    config: {
        name: "Purge",
        command: "purge",
        alias: ["prune"],
        category: "Moderation",
        usage: "<nombre>",
        description: "Efface \"nombre\" message dans ce channel",
        autorisation: "MEMBER"
    },
    run: async (bot, message, args) => {

        message.delete();
        if(!args[0]) return message.channel.send("oO")/*.then/(message => message.delete(1000))*/;
        message.channel.bulkDelete(args[0]).then(() => {
            if(args[0] == 1){
                return message.channel.send(`Le message est supprimer ! \nVive la purge ^^`)/*.then(message => message.delete(1000))*/;
            }else{
                return message.channel.send(`Les ${args[0]} messages sont supprimer ! \nVive la purge ^^`)/*.then(message => message.delete(1000))*/;
            }
        });
    }
}