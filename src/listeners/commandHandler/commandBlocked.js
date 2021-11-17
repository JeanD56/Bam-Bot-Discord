const { ListenerHandler, Listener } = require('discord-akairo');

class CommandBlockedListner extends Listener {
    constructor() {
        super('commandBlocked', {
            emitter: 'commandHandler',
            event: 'commandBlocked'
        });
    }

    async exec(message, command, reason) {
        message.reply(`Votre commande \`\`${command}\`\` a été blocker car \n\`\`${reason}\`\``);
    }
}

module.exports = CommandBlockedListner;