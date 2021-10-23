const { Command } = require('discord-akairo');

class PurgeCommand extends Command {
    constructor(){
        super('purge', {
            aliases: ['purge', 'prune'],
            description: {
                content: "permet de supprimer plusieurs message",
                usage: "<nombre>",
                exemples: ["purge"]
            },
            args: [{
                id: 'nombre',
                type: 'integer'
            }],
            userPermissions: ['ADMINISTRATOR'],
            clientPermissions: ['ADMINISTRATOR']
        });
    }

    async exec(message, args) {
        message.delete();
        if(!args.nombre) return message.channel.send("oO");
        if(args.nombre > 100){
            return message.channel.send('Attend la tu m\'en demande beaucoup trop vas <100');
        }else{
            message.channel.bulkDelete(args.nombre).then(() => {
                if(args.nombre == 1){
                    return message.channel.send(`Le message est supprimer ! \nVive la purge ^^`);
                }else{
                    return message.channel.send(`Les ${args.nombre} messages sont supprimer ! \nVive la purge ^^`);
                }
            });
        }

    }
}

module.exports = PurgeCommand;
