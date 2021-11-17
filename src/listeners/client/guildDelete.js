const { Listener } = require('discord-akairo');
const { Guild } = require('../../structures/Models')

class guildDeleteListner extends Listener {
    constructor() {
        super('guildDelete', {
            emitter: 'client',
            event: 'guildDelete'
        });
    }

    async exec(guild) {
        
    }
}

module.exports = guildDeleteListner;