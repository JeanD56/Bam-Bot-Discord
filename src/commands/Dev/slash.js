const { Command, AkairoMessage } = require('discord-akairo');
const { Message } = require('discord.js');
const { Guild } = require('../../structures/Models');

class SlashCommand extends Command {
    constructor() {
        super('slash', {
            aliases: ['slash'],
            ownerOnly: true,
            args: [{
                id: "txt",
                type: "String"
            }],
            slash: true,
            slashOnly: false,
            slashOptions: [
                {
                    name: "txt",
                    type: "STRING",
                    description: "permet de testé"
                }, {
                    name: "member",
                    type: "USER",
                    description: "permet de testé"
                },{
                    name: "bool",
                    type: "BOOLEAN",
                    description: "permet de testé"
                }, {
                    name: "channel",
                    type: "CHANNEL",
                    channelTypes: ["GUILD_STAGE_VOICE", "GUILD_VOICE"],
                    description: "permet de testé"
                }
            ]
        });
    }

    /**
     * @param {Message | AkairoMessage} message
     * @param {any} args
     */

    async exec(message) {
        /////////////////////////* https://github.com/NotEnoughUpdates/discord-akairo/wiki/updates *////////////////////////
        if (!message.util.isSlash) return await message.reply('chibre');
        if (message.util.isSlash) return await message.interaction.reply('penis');
        
    }
}

module.exports = SlashCommand;
