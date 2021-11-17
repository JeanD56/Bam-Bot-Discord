const { Listener } = require('discord-akairo');
const { Guild, User } = require('../../structures/Models');

class GuildCreateListner extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }

    async exec(guild) {
        this.client.guildSettings.create(guild);
    }
}

module.exports = GuildCreateListner;