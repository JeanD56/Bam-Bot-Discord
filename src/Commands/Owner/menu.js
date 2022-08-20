const { ActionRowBuilder, SelectMenuBuilder } = require("discord.js");

const selectMenu = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
            .setCustomId(`menu`)
            .setPlaceholder(`choisir un role dans la liste`)
            .setMinValues(0)
            .setMaxValues(3)
            .setOptions([
                {
                    label: '1',
                    description: ` description 1`,
                    value: `1`
                },
                {
                    label: '2',
                    description: ` description 2`,
                    value: `2`
                },
                {
                    label: '3',
                    description: ` description 3`,
                    value: `3`
                }
            ])
    );

module.exports = {
    name: "menu",
    description: "test sur les menus",
    ownerOnly: true,

    run: (client, message, args) => {
        return message.reply({
            content: 'voici le menu',
            components: [selectMenu]
        })
    },

    runInteraction: async (client, interaction) => {
        return interaction.reply({
            content: 'voici le menu',
            components: [selectMenu]
        })
    }
}