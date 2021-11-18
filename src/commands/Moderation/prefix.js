const { Command } = require('discord-akairo');

class PrefixCommand extends Command {
    constructor() {
        super('prefix', {
            aliases: ['prefix'],
            description: {
                content: "changer de prefix pour le serveur",
                usage: "<nouveau préfix>",
                exemples: ["prefix"]
            },
            args: [{
                id: 'newPrefix',
                type: 'string'
            }],
            userPermissions: ['ADMINISTRATOR']
        });
    }

    async exec(message, args) {
        let Vprefix = await this.handler.prefix(message)
        if (!args.newPrefix) return message.channel.send(`\`\`Prefix actuel   ->   ${Vprefix}\`\``)
        await this.client.guildSettings.update(message.guild, { settings: { prefix: args.newPrefix } });

        return message.channel.send({
            content: `Le prefix est passé de:\n \`\`${Vprefix}\`\`   ->   \`\`${args.newPrefix}\`\``
        });
    }
}

module.exports = PrefixCommand;
