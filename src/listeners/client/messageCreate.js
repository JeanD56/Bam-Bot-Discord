const { ListenerHandler, Listener } = require('discord-akairo');
const { Guild, User } = require('../../structures/Models');

class MessageCreateListner extends Listener {
    constructor() {
        super('messageCreate', {
            emitter: 'client',
            event: 'messageCreate'
        });
    }

    async exec(message) {
        if(message.author.bot) return;
        
    }
}

module.exports = MessageCreateListner;