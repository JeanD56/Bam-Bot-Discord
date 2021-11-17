const { Command } = require('discord-akairo');
const ms = require('ms')

class PurgeCommand extends Command {
    constructor(){
        super('purge', {
            aliases: ['purge', 'prune'],
            description: {
                content: "permet de supprimer plusieurs message",
                usage: "<member> <nombre> <channel>",
                exemples: ["purge"]
            },
            args: [
                {id: 'nombre',type: 'integer', require: true},
                {id: 'member', type: 'member', require: false},
                {id: 'channel', type: 'textChannel', require: false},
            ],
            userPermissions: ['MANAGE_MESSAGES'],
            clientPermissions: ['ADMINISTRATOR'],
        });
    }

    async exec(message, {member, nombre, channel}) {
        try {
            let boucle = 0;
            if(!nombre){
                let newChannel = this.client.channels.cache.get(channel.id).clone();
                console.log(newChannel.id);
                channel.delete();
                return newChannel.send('le channel est desormais purgé VIVE LA PURGE !!!!!');
            }
            if(nombre > 99);
            const messages = message.channel.messages.fetch()
            const filtered = [];
            let i = 0;
            if(member){
                 (await messages).filter(m =>{
                    if(Date.now() - m.createdTimestamp < ms("14 days")){
                        if(m.author.id === member.id  && m.id !== message.id && nombre > 1 && i < nombre){
                            filtered.push(m);
                            i++;
                    }}
                })
                await message.channel.bulkDelete(filtered, true).then(m => {
                    return message.reply(`${m.size} message supprimer du channel`)
                })
            }else {
                (await messages).filter(m =>{
                    if(Date.now() - m.createdTimestamp < ms("14 days")){
                        if( m.id !== message.id && nombre > 1 && i < nombre){
                            filtered.push(m);
                            i++;
                    }}
                })
                await message.channel.bulkDelete(filtered, true).then(m => {
                    return message.reply(`${m.size} message supprimer du channel`)
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = PurgeCommand;
