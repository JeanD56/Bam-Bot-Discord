const { Command } = require('discord-akairo');
const { Guild } = require('../../structures/Models');

class TestCommand extends Command {
    constructor(){
        super('test', {
            aliases: ['test'],
            ownerOnly: true,
            args: [{
                id: "txt",
                type: "String"
            }]
        });
    }

    async exec(message, args) {
        
    }
}

module.exports = TestCommand;
