const { Command } = require('discord-akairo');
const { Guild } = require('../../structures/Models');

class UpdateAllCommand extends Command {
    constructor() {
        super('updateall', {
            aliases: ["updateall", "ua"],
            ownerOnly: true,
        });
    }
    
    async exec(message) {
        
    }
}

module.exports = UpdateAllCommand;