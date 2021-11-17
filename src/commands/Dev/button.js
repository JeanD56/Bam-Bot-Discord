<<<<<<< HEAD
const { Command } = require('discord-akairo');
const { MessageActionRow, MessageButton } = require('discord.js');

class ButtonCommand extends Command {
    constructor(){
        super('button', {
            aliases: ['button', 'bp'],
            ownerOnly: true,
        });
    }

    exec(message) {
        let row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('primary')
                .setLabel('primary')
                .setStyle('PRIMARY')
                .setDisabled(false),
            new MessageButton()
                .setCustomId('secondary')
                .setLabel('secondary')
                .setStyle('SECONDARY')
                .setDisabled(false),
            new MessageButton()
                .setCustomId('success')
                .setLabel('success')
                .setStyle('SUCCESS')
                .setDisabled(false),
            new MessageButton()
                .setCustomId('danger')
                .setLabel('danger')
                .setStyle('DANGER')
                .setDisabled(false),
            new MessageButton()
                .setLabel('link')
                .setURL('https://discord.gg/')
                .setStyle('LINK')
                .setDisabled(true)
        );

        message.channel.send({ 
            content: "c:",
            embeds: [
                this.client.functions.embed()
                    .setDescription('Voici les diffrerents Bouttons')
            ],
            components: [row],
        });
    }
}

module.exports = ButtonCommand;
=======
const { Command } = require('discord-akairo');
const { MessageActionRow, MessageButton } = require('discord.js');

class ButtonCommand extends Command {
    constructor(){
        super('button', {
            aliases: ['button', 'bp'],
            ownerOnly: true,
        });
    }

    exec(message) {
        let row = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('primary')
                .setLabel('primary')
                .setStyle('PRIMARY')
                .setDisabled(false),
            new MessageButton()
                .setCustomId('secondary')
                .setLabel('secondary')
                .setStyle('SECONDARY')
                .setDisabled(false),
            new MessageButton()
                .setCustomId('success')
                .setLabel('success')
                .setStyle('SUCCESS')
                .setDisabled(false),
            new MessageButton()
                .setCustomId('danger')
                .setLabel('danger')
                .setStyle('DANGER')
                .setDisabled(false),
            new MessageButton()
                .setLabel('link')
                .setURL('https://discord.gg/')
                .setStyle('LINK')
                .setDisabled(true)
        );

        message.channel.send({ 
            content: "c:",
            embeds: [
                this.client.functions.embed()
                    .setDescription('Voici les diffrerents Bouttons')
            ],
            components: [row],
        });
    }
}

module.exports = ButtonCommand;
>>>>>>> 3161726 (ajout fichier ou modification)
