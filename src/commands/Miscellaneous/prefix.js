const { Command } = require('discord-akairo');

class PrefixCommand extends Command {
    constructor() {
        super('prefix', {
            aliases: ['prefix'],
            description: {
                content: "",
                usage: "prefix <nouveau préfix>",
                exemples: ["prefix"]
            },
            args: [{
                id: 'newPrefix',
                type: 'string'
            }]
        });
    }

    async exec(message, args) {
        let Vprefix = await this.handler.prefix(message)
        if (!args.newPrefix) return message.channel.send(`\`\`Prefix actuel   ->   ${Vprefix}\`\``)
        await this.client.guildSettings.update(message.guild, { prefix: args.newPrefix });

        return message.channel.send({
            content: `Le prefix est passé de:\n \`\`${Vprefix}\`\`   ->   \`\`${args.newPrefix}\`\``
        });
    }
}

module.exports = PrefixCommand;
