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
        /*if(!await User.findOne({id: message.author.id})){
            if(!await Guild.findOne({id: message.guild.id})){
                this.client.emit("guildCreate", message.guild);
            }else{
                this.client.emit('guildMemberAdd', message.member);
            }
        }else{
            
        }*/
    }
}

module.exports = MessageCreateListner;