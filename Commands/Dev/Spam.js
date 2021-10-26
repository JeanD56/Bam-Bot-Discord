const Discord = require("discord.js");
const config = require('../../config.json');
const color = require('../../colors.json');

module.exports = {
    config: {
        name: "Spam",
        command: "spam",
        alias: ["fdp"],
        category: "Owner",
        usage: "<nombre> <mot>",
        description: "Spam un channel pour je ne sais quel raison",
        autorisation: ""
    },
    run: async (bot, message, args) => {
        
        message.delete();

        if(!args[0]) return message.channel.send("oO");
        
        let argMessage = " ";

        if(!args[1]) /*args[1]=("...")*/ return message.channel.send("Envoyer un message a spamer oO")

        argMessage = args.slice(1).join(' ');

        for(let i=0; i <= (args[0]-1); i++){
            message.channel.send(`${argMessage}`);
        }
        return
    }
}
