const { ListenerHandler, Listener } = require('discord-akairo');

class MissingPermissionsListner extends Listener {
    constructor() {
        super('missingPermissions', {
            emitter: 'commandHandler',
            event: 'missingPermissions'
        });
    }

    async exec(message, command, type, missing) {
        try {
            if(type == 'client'){
                return message.reply({
                    content: `je n'ai pas actuellement le(s) droit(s) me permetant d'executer cette command **[${command.id}]**\nil me manque actuellement ce(s) droit(s):\n\`\`\`${missing}\`\`\``
                })
            }else{
                return message.reply({
                    content: `tu n'as pas actuellement le(s) droit(s) me permetant d'executer cette command **[${command.id}]**\nil te manque actuellement ce(s) droit(s):\n\`\`\`${missing}\`\`\``
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = MissingPermissionsListner;