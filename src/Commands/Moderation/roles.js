const { ActionRowBuilder, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");

const roleMenu = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
            .setCustomId(`menuRoleParam`)
            .setPlaceholder(`choisir un role dans la liste`)
            .setMinValues(1)
    );

module.exports = {
    name: "roles",
    description: "nouvelle version de reaction role",

    run: (client, message, args) => {
        return
    },

    options: [
        {
            name: 'message',
            description: "le message pour le reaction Roles",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ],
    runInteraction: async (client, interaction) => {
        const roles = []; let i = 0;
        interaction.guild.roles.cache.each(r => {

            if (!(r.name == "@everyone" || r.tags.botID) && r.editable) {
                roles.push({
                    label: r.name,
                    value: r.id
                })
            }
        })
        roleMenu.components[0]
            .setMaxValues(roles.length)
            .setOptions(roles)
        return interaction.reply({
            content: 'voici le menu',
            components: [roleMenu],
            ephemeral: true
        })
    }
}