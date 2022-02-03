const { Command, AkairoMessage } = require('discord-akairo');
const { Message } = require('discord.js');

class MoveAllCommand extends Command {
    constructor() {
        super('moveall', {
            aliases: ['moveall'],
            description: {
                content: "Permet de deplacer tout les member d'un channelVocal vers un autre",
                usage: "<#id du channelVocal>",
                exemples: ["<#186556841387446>"]
            },
            args: [
                //{ id: 'channelA', type: 'channel', require: false },
                { id: 'channelb', type: 'channel', require: true },
                { id: 'reason', type: 'String' }
            ],
            userPermissions: ['KICK_MEMBERS'],
            clientPermissions: ['KICK_MEMBERS'],
            slash: true,
            slashOnly: false,
            slashEphemeral: true,
            slashOptions: [
                {
                    name: 'channela',
                    type: 'CHANNEL',
                    channelTypes: ["GUILD_STAGE_VOICE", "GUILD_VOICE"],
                    required: false,
                    description: '<>'
                },{
                    name: 'channelb',
                    type: 'CHANNEL',
                    channelTypes: ["GUILD_STAGE_VOICE", "GUILD_VOICE"],
                    required: false,
                    description:'<>'
                },{
                    name: 'membre',
                    type: 'USER',
                    required: false,
                    description: '<>'
                }, {
                    name: 'raison',
                    type: 'STRING',
                    required: false,
                    description: "<>"
                }
            ]
        });
    }

    /**
     * 
     * @param {Message | AkairoMessage} message
     * @param {any} args
     * //@param {any.channelb} channelB
     * //@param {any.channela} channelA
     * //@param {any.member} Mber
     * //@param {any.reason} reason
     */

    async exec(message, args/*{ channelB, channelA, Mber, reason }*/) {
        /*if (channelB.type !== "GUILD_VOICE" && channelB.type != "GUILD_STAGE_VOICE") return message.reply("le channel qui a été ping n'est pas un channel Vocal");
        if (channelA && channelA.type !== "GUILD_VOICE" && channelA.type != "GUILD_STAGE_VOICE") return message.reply("le channel qui a été ping n'est pas un channel Vocal");
        let channel_depart = message.guild.members.cache.get(message.author.id).voice.channel;
        let nbMembre = 0;
        this.client.guilds.cache.get(message.guild.id).channels.cache.get(channel_depart.id).members.each(m => {
            m.voice.setChannel(channelB.id, reason);
            nbMembre++;
        });
        return message.reply(`${nbMembre} Membre(s):\n <#${channel_depart.id}> => <#${channelB.id}>`)*/
    }
}

module.exports = MoveAllCommand;
