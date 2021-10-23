const { ListenerHandler, Listener } = require('discord-akairo');

class CooldownListner extends Listener {
    constructor() {
        super('cooldown', {
            emitter: 'commandHandler',
            event: 'cooldown'
        });
    }

    async exec(message, command, remaining) {
        message.reply({
            content: `Il reste actuellement '${Math.round(remaining /1000)}s' pour pouvoir utilisez la command [${command.id}]`
        })
    }
}

module.exports = CooldownListner;