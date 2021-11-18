const { Command } = require('discord-akairo');

class closeAllThreadCommand extends Command {
    constructor() {
        super('closeAllThread', {
            aliases: ['closeAllThread', "cat"],
            description: {
                content: "",
                usage: "",
                exemples: [""]
            },
            args: [
                { id: 'channel', type: 'textCannel' },
            ],
            userPermissions: ['KICK_MEMBERS'],
            clientPermissions: ['KICK_MEMBERS']
        });
    }

    async exec(message, { channel }) {
        let Channel;
        Channel = this.client.channels.cache.get(message.channel.id);

        const Threads = [] 
        Channel.threads.cache.filter(async t => {
            if(t.ownerId == this.client.user.id && t.invitable == null) {
                Threads.push(t);
                t.delete();
                return true
            }
            return false
        });
        
        return message.reply(`${Threads.length} Thread Public de <@!${this.client.user.id}> ont été supprimer !`)

    }
}

module.exports = closeAllThreadCommand;