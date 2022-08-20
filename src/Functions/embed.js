const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "embed",

    run: function (message, client) {
        if (!message) { return };
        if (!client) {
            return new EmbedBuilder()
                .setTitle("embed")
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ type: 'png', dynamic: true }))
                .setTimestamp();
        } else {
            return new EmbedBuilder()
                .setTitle("embed")
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ type: 'png', dynamic: true }))
                .setFooter(`${client.user.username}`, client.user.displayAvatarURL({ type: 'png', dynamic: true }))
                .setTimestamp();
        }
    }
}