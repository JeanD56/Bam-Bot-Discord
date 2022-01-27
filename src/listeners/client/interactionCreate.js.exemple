const { ListenerHandler, Listener } = require('discord-akairo');
const { Guild, User } = require('../../structures/Models');

class InteractionCreateListner extends Listener {
    constructor() {
        super('interaction  Create', {
            emitter: 'client',
            event: 'interaction Create'
        });
    }

    async exec(interaction) {
        console.log("Slash")
    }
}

module.exports = InteractionCreateListner;