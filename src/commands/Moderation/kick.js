const { Command } = require('discord-akairo');

class KickCommand extends Command {
    constructor() {
        super('kick', {
            aliases: ['kick'],
            description: {
                content: "",
                usage: "@member <raison du kick>",
                exemples: [""]
            },
            args: [
                { id: 'member', type: 'member' },
                { id: 'raison', type: 'string', match: 'restContent', default: "Raison non spécifiée !"}
            ],
            userPermissions: ['KICK_MEMBERS'],
            clientPermissions: ['KICK_MEMBERS']
        });
    }

    async exec(message, { member, raison }) {
        member? member.kick(raison): message.reply(`${member.tag} n'existe pas`);

        const embed = this.client.functions.embed(message)
            .setTitle("Kick!")
            .setDescription(raison);
        await message.reply({
            embeds: [embed]
        })
    }
}

module.exports = KickCommand;