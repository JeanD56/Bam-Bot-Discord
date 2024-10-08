﻿const { EmbedBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "poll",
    description: "fait un sondage",
    permissions: ["ADMINISTRATOR"],
    inDev: true,

    run: (client, message, args) => {
        return
    },

    options: [
        {
            name: "title",
            description: "choisir un event a émettre",
            type: ApplicationCommandOptionType.String,
            required: true,
        }, {
            name: "content",
            description: "blablabla",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    runInteraction: async (client, interaction) => {
        const titre = interaction.options.getString('title');
        const contenu = interaction.options.getString('content');

        const pollEmbed = new EmbedBuilder()
            .setTitle(titre)
            .setColor("AQUA")
            .setDescription(contenu);

        const poll = await interaction.reply({ embeds: [pollEmbed], fetchReply: true});
        poll.react("😂");
        poll.react("🙃");
    }
}