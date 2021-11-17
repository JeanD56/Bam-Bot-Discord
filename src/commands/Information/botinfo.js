const { Command } = require('discord-akairo');

class BotInfoCommand extends Command {
    constructor() {
        super('botinfo', {
            aliases: ['botinfo', 'bi'],
        });
    }

    async exec(message) {
        console.log(this.client.application);
        let embed = this.client.functions.embed(message, this.client)
            .setTitle('**Information bot**')
            .setDescription(typeof this.client.application.description === "null" ? this.client.application.description : "Pas de description defini")
            .setAuthor(`${this.client.user.tag}`, this.client.user.displayAvatarURL({ format: 'png' }))
            .setColor(this.client.user.hexAccentColor)
            .setThumbnail(this.client.user.displayAvatarURL({ format: 'png' }))
            .addField("**Nom du bot :**", this.client.user.username, false)
            .addField("Crée par :", `JeanD56`, false)
            .addField("Crée le :", this.client.user.createdAt.toString(), false)
            .setFooter(`${this.client.user.tag}`, this.client.user.displayAvatarURL({ format: 'png' }));

        message.delete();
        return message.reply({
            embeds: [embed]
        })
    }
}

module.exports = BotInfoCommand;