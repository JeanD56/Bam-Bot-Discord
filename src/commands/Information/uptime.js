const { Command } = require('discord-akairo');
const moment = require('moment');

class UptimeCommand extends Command {
    constructor(){
        super('uptime', {
            aliases: ['uptime'],
            description: {
                content: "mettre de voir depuis quand est lancer le bot",
                usage: "",
                exemples: [""]
            }
        });
    }

    async exec(message) {
        moment.locale("fr");
        const timeStamp = this.client.readyTimestamp;

        const embed = this.client.functions.embed(message, this.client)
            .setTitle("**Uptime**")
            .addField('depuis: ', `${moment(timeStamp).format("Do MMMM YYYY, hh:mm:ss")}`, true);

        return message.reply({
            embeds: [embed]
        });
    }
}

module.exports = UptimeCommand;
