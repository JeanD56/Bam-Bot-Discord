const { Command } = require('discord-akairo');

class AddAniversaireCommand extends Command {
    constructor() {
        super('addAnnivesaire', {
            aliases: ['addAnnivesaire', 'aa'],
            description: {
                content: "",
                usage: "",
                exemples: [""]
            },
            args: [
                { id: 'member', type: 'member' },
                { id: 'date', type: 'string' },
                { id: 'channels', type: 'textChannel' },
            ],
            userPermissions: ['BAN_MEMBERS'],
            clientPermissions: ['BAN_MEMBERS']
        });
    }

    async exec(message, { member, date, channels }) {

        if(!member) return message.reply("veulliez ping un membre");

        if(!date) return message.reply("veulliez rajouter une date comme exemple: \`\`24-dec\`\`");

        let channel = channels;
        if(!channels) channel = message.channel;
        
        let membreID = member.id;
        let DATE = date.split('-');
        
        let GuildDB = this.client.guildSettings.get(message.guild);
        let anniversaires = GuildDB.anniversaires;
        console.log(anniversaires);

        let anniv = {
            id: membreID,
            date: `${DATE[0]} ${DATE[1]}`,
            channels: channel.id,
        }
        anniversaires = anniversaires.push(anniv);

        await Guild.findOne({ id: message.guild.id }).then(data => { data.anniversaires = anniversaires; data.save(); });
    }   
}

module.exports = AddAniversaireCommand;