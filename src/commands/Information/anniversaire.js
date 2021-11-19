const { Command } = require('discord-akairo');
const { Guild } = require('../../structures/Models');

class ddAniversaireCommand extends Command {
    constructor() {
        super('annivesaire', {
            aliases: ['annivesaire', 'anniv'],
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
        });
    }

    async exec(message, { member, date, channels }) {
        const GuildDB = await this.client.guildSettings.get(message.guild);

        if (member && !date) {
            const annivMembre = GuildDB.anniversaires.length == 0 ? '_' : "inDev"
            return message.reply(`l'annivesaire de <@${member.id}> est le:\n${annivMembre}`);
        }

        if (!date) return message.reply("veulliez rajouter une date comme exemple: \`\`24-dec\`\`");

        let channel = channels;
        if (!channels) channel = message.channel;

        const membreID = member.id;
        const DATE = date.split('-');

        let annivList = []; let annivUpdate;

        let annivObj = {
            id: membreID,
            date: `${DATE[0]} ${DATE[1].toLowerCase()}`,
            channels: [channel.id],
        }
        annivUpdate = annivList.push(annivObj)

        if (GuildDB.anniversaires.length != 0) {
            annivList = GuildDB.anniversaires;
            annivUpdate = annivList.concat([{
                id: membreID,
                date: `${DATE[0]} ${DATE[1].toLowerCase()}`,
                channels: [channel.id],
            }]);
        }

        await Guild.findOne({ id: message.guild.id }).then(data => { data.anniversaires = annivUpdate; data.save(); });
        return message.reply("Anniv ajouter dans la DB");
    }
}

module.exports = ddAniversaireCommand;