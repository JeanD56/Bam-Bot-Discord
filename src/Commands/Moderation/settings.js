const { ActionRowBuilder, SelectMenuBuilder } = require("discord.js");

const roleMenu = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
            .setCustomId(`menuRoleParam`)
            .setPlaceholder(`choisir un role dans la liste`)
            .setMinValues(1)
    );

module.exports = {
    name: "settings",
    description: "nouvelle version de reaction role",
    ownerOnly: false,
    inDev: true,

    /*options: [

    ],*/
    runInteraction: async (client, interaction) => {
        return
    }
}