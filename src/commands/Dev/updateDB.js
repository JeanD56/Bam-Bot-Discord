const { Command } = require('discord-akairo');
const { Guild } = require('../../structures/Models');

class UpdateDBCommand extends Command {
    constructor() {
        super('updateDB', {
            aliases: ["updateDB", "udb"],
            ownerOnly: true,
        });
    }
    
    async exec(message) {
        
    }
}

module.exports = UpdateDBCommand;