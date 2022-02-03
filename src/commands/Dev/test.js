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
            }]
        });
    }

    /**
     * @param {Message | AkairoMessage} message
     * @param {any} args
     * @param {args.txt} txt
     */

    async exec(message, { txt }) {
        return message.reply(txt)
    }
}

module.exports = TestCommand;
