const { Command } = require('discord-akairo');
const moment = require('moment')

class BotInfoCommand extends Command {
    constructor() {
        super('botinfo', {
            aliases: ['botinfo', 'bi'],
            description: {
                content: "voir les informations du bot",
                usage: "",
                exemples: [""]
            }
        });
    }

    async exec(message) {
        let embed = this.client.functions.embed(message, this.client)
            .setTitle('**Information bot**')
            .setDescription(typeof this.client.application.description === "null" ? this.client.application.description : "Pas de description defini")
            .setAuthor(`${this.client.user.tag}`, this.client.user.displayAvatarURL({ format: 'png' }))
            .setColor(this.client.user.accentColor)
            .setThumbnail(this.client.user.displayAvatarURL({ format: 'png' }))
            .addField("**Nom du bot :**", this.client.user.username, false)
            .addField("Crée par :", `JeanD56`, false)
            .addField("Crée le :", moment(this.client.user.createdAt).format('LL LTS'), false)
            .setFooter(`${this.client.user.tag}`, this.client.user.displayAvatarURL({ format: 'png' }));

        return message.reply({
            embeds: [embed]
        })
    }
}

module.exports = BotInfoCommand;