const { ListenerHandler, Listener } = require('discord-akairo');

class CooldownListner extends Listener {
    constructor() {
        super('cooldown', {
            emitter: 'commandHandler',
            event: 'cooldown'
        });
    }

    async exec(message, command, remaining) {
        try {
            message.reply({
                content: `Il reste actuellement '${Math.round(remaining /1000)}s' pour pouvoir utilisez la command [${command.id}]`
            })
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = CooldownListner;