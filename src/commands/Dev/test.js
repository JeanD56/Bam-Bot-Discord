const { Command, AkairoMessage } = require('discord-akairo');
const { Message } = require('discord.js');
const { Guild } = require('../../structures/Models');

class TestCommand extends Command {
    constructor() {
        super('test', {
            aliases: ['test'],
            ownerOnly: true,
            args: [{
                id: "txt",
                type: "String"
            }],
            slash: true,
            slashOptions: [{
                name: "txt",
                type: "STRING",
                description: "permet de testé"
            }]
        });
    }

    /**
     * 
     * @param {Message | AkairoMessage} message
     * @param {any} args
     */

    async exec(message) {
        /////////////////////////* https://github.com/NotEnoughUpdates/discord-akairo/wiki/updates *////////////////////////
        console.log("yoo");
        if (message.util.isSlash) await (message === AkairoMessage).interaction.deferReply();
        message.channel.send("coucou");
        message.until.reply("oui !!!");
    }
}

module.exports = TestCommand;
