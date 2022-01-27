const { Command } = require('discord-akairo');

class MoveAllCommand extends Command {
    constructor() {
        super('moveall', {
            aliases: ['moveall'],
            description: {
                content: "Permet de deplacer tout les member d'un channelVocal vers un autre",
                usage: "<#id du channelVocal>",
                exemples: ["moveall <#186556841387446>"]
            },
            args: [
                //{ id: 'channelA', type: 'VoiceChannel', require: false },
                { id: 'channelB', type: 'channel', require: true },
                { id: 'reason', type: 'String' }
            ],
            userPermissions: ['KICK_MEMBERS'],
            clientPermissions: ['KICK_MEMBERS']
        });
    }
    async exec(message, { channelB, reason }) {
        if (channelB.type !== "GUILD_VOICE" && channelB.type != "GUILD_STAGE_VOICE") return message.reply("le channel qui a été ping n'est pas un channel Vocal");
        let channel_depart = message.guild.members.cache.get(message.author.id).voice.channel;
        let nbMembre = 0;
        this.client.guilds.cache.get(message.guild.id).channels.cache.get(channel_depart.id).members.each(m => {
            m.voice.setChannel(channelB.id, reason);
            nbMembre++;
        });
        return message.reply(`${nbMembre} Membre(s):\n <#${channel_depart.id}> => <#${channelB.id}>`)
    }
}

module.exports = MoveAllCommand;
