const { Command, AkairoMessage } = require('discord-akairo');
const { Message, VoiceChannel } = require('discord.js');

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
            slashOnly: true,
            slashOptions: [
                /*{
                    name: 'channela',
                    type: 'CHANNEL',
                    channelTypes: ["GUILD_STAGE_VOICE", "GUILD_VOICE"],
                    required: false,
                    description: '<>'
                },*/{
                    name: 'channel Destination',
                    type: 'CHANNEL',
                    channelTypes: ["GUILD_STAGE_VOICE", "GUILD_VOICE"],
                    required: true,
                    description:'<>'
                }/*,{
                    name: 'membre',
                    type: 'USER',
                    required: false,
                    description: '<>'
                }*/, {
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
     */

    async execSlash(message, args) {
        let channel_depart = message.guild.members.cache.get(message.author.id).voice.channel;
        let channel_destination = this.client.guilds.cache.get(message.guild.id).channels.cache.get(args.channelb);
        let nbMembre = 0;
        channel_depart.members.each(async m => {
            await m.voice.setChannel(channel_destination.id, `${!args.reason ? `pas de raison en particulier` : args.reason}`);
            nbMembre++;
        });
        return await message.interaction.reply(`${nbMembre} Membre(s):\n <#${channel_depart.id}> => <#${channel_destination.id}>`);
    }
}

module.exports = MoveAllCommand;
