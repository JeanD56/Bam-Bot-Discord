const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

const buttons = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('primary-button')
            .setLabel('PRIMARY')
            .setStyle(ButtonStyle.Primary),
        new ButtonBuilder()
            .setCustomId('secondary-button')
            .setLabel('SECONDARY')
            .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
            .setCustomId('danger-button')
            .setLabel('DANGER')
            .setStyle(ButtonStyle.Danger),
        new ButtonBuilder()
            .setCustomId('sucess-button')
            .setLabel('SUCCESS')
            .setStyle(ButtonStyle.Success),
        new ButtonBuilder()
            .setURL('https://github.com/')
            .setLabel('LINK')
            .setStyle(ButtonStyle.Link)
    );

module.exports = {
    name: "button",
    description: "test les bouttons",
    ownerOnly: false,
    inDev: true,

    run: (client, message, args) => {
        return message.reply({
            content: 'voici les differents bouttons',
            components: [buttons]
        })
    },

        runInteraction: async (client, interaction) => {
            return interaction.reply({
                content: 'voici les differents bouttons',
                components: [buttons]
            })
        }
}