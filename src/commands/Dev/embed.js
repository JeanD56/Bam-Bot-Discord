<<<<<<< HEAD
const { Command } = require('discord-akairo');

class EmbedCommand extends Command {
    constructor(){
        super('embed', {
            aliases: ['embed'],
            ownerOnly: true
        });
    }

    exec(message) {

        message.channel.send({ embeds: [
            this.client.functions.embed()
                .setDescription("Test")
        ]});
    }
}

module.exports = EmbedCommand;
=======
const { Command } = require('discord-akairo');

class EmbedCommand extends Command {
    constructor(){
        super('embed', {
            aliases: ['embed'],
            ownerOnly: true
        });
    }

    exec(message) {

        message.channel.send({ embeds: [
            this.client.functions.embed()
                .setDescription("Test")
        ]});
    }
}

module.exports = EmbedCommand;
>>>>>>> 3161726 (ajout fichier ou modification)
