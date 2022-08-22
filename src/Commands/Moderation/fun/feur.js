const { ActionRowBuilder, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");

const roleMenu = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
            .setCustomId(`menuRoleParam`)
            .setPlaceholder(`choisir un role dans la liste`)
            .setMinValues(1)
    );

module.exports = {
    name: "feur",
    description: "repond feur a casi tout les message qui finnisent par 'quoi'",
    inDev: true,
    ownerOnly: false,

    options: [
        {
            name: "activer",
            description: "-",
            type: ApplicationCommandOptionType.Boolean,
        }
    ],
    runInteraction: async (client, interaction) => {
        return
    }
}