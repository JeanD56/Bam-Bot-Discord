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
        if(message.tts){
            /*return message.reply({
                content: "https://media.tenor.co/videos/9dba6101a1bb0e74dc641bfa9f19e8bb/mp4"
            })*/
        }
    }
}

module.exports = MessageCreateListner;
