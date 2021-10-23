const { Command } = require('discord-akairo');

class PingCommand extends Command {
    constructor(){
        super('ping', {
            aliases: ['ping'],
            description: {
                content: "mettre de tester le ping du bot",
                usage: "ping",
                exemples: ["ping"]
            }
        });
    }

    async exec(message) {

        const sentMessage = await message.channel.send('pong');

        const timeStamp = message.editedTimestamp ? message.editedTimestamp : message.createdTimestamp;
        const botLatency = `${'```'}\n${Math.round(sentMessage.createdTimestamp - timeStamp)}ms${'```'}`;
        const apiLatency = `${'```'}\n${Math.round(message.client.ws.ping)}ms${'```'}`;

        const embed = this.client.functions.embed(message)
            .setTitle("Latence")
            .addField('bot', botLatency, true)
            .addField('API', apiLatency, true)

        return message.reply({
            content: null,
            embeds: [embed]
        });
    }
}

module.exports = PingCommand;
