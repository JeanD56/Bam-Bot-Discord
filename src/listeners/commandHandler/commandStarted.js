const { ListenerHandler, Listener } = require('discord-akairo');

class CommandStartedListner extends Listener {
    constructor() {
        super('commandStarted', {
            emitter: 'commandHandler',
            event: 'commandStarted'
        });
    }

    async exec(message, command, args) {
        try {
            
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CommandStartedListner;