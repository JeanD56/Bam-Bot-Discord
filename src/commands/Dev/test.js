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
            slashOptions: []
        });
    }

    /**
     * @param {Message | AkairoMessage} message
     * @param {any} args
     */

    async exec(message) {
        
    }
}

module.exports = TestCommand;
