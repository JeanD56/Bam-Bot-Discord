const { ListenerHandler, Listener } = require('discord-akairo');

class CommandFinishedListner extends Listener {
    constructor() {
        super('commandFinished', {
            emitter: 'commandHandler',
            event: 'commandFinished'
        });
    }

    async exec(message, command, args) {
        try {
            message.delete();
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CommandFinishedListner;