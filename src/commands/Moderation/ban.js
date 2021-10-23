const { Command } = require('discord-akairo');

class BanCommand extends Command {
    constructor() {
        super('ban', {
            aliases: ['ban'],
            description: {
                content: "",
                usage: "@member <raison du ban>",
                exemples: [""]
            },
            args: [
                { id: 'member', type: 'member' },
                { id: 'raison', type: 'string', match: 'restContent', default: "Raison non spécifiée !"}
            ],
            userPermissions: ['BAN_MEMBERS'],
            clientPermissions: ['BAN_MEMBERS']
        });
    }

    async exec(message, { member, raison }) { 

        if(!member){
            return message.reply(`${member} n'existe pas`);
        }else{
            member.ban({
                reason: raison,
            });
            
            const embed = this.client.functions.embed(message)
                .setTitle("Ban")
                .setDescription(raison);
            return message.reply({
                embeds: [embed]
            })
        }
    }
}

module.exports = BanCommand;