const { Command } = require('discord-akairo');

class SpamCommand extends Command {
    constructor() {
        super('spam', {
            aliases: ["spam", "fdp"],
            description: {
                content: "Spam un channel pour je ne sais quel raison",
                usage: "<nombre> <mot>",
                exemples: ["purge"]
            },
            ownerOnly: false,
            args: [
                { id: 'nombre', type: 'integer'},
                { id: 'text', type: 'string', match: 'restContent' },
            ],
        });
    }

    exec(message, { nombre, text }) {
        
        if (!nombre) return message.channel.send("oO");

        if (!text) return message.channel.send("Envoyer un message a spamer oO")

        for (let i = 0; i <= (nombre - 1); i++) {
            message.channel.send({
                content: text
            });
        }
        return
    }

    async execSlash(AkairoMessage, { nombre, text }) {

        if (!nombre) return AkairoMessage.reply("oO");

        if (!text) return AkairoMessage.reply("Envoyer un message a spamer oO")

        for (let i = 0; i <= (nombre - 1); i++) {
            AkairoMessage.reply({
                content: text
            });
        }
        return
    }
}

module.exports = SpamCommand;
