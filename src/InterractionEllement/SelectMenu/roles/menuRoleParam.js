const { ActionRowBuilder, SelectMenuBuilder } = require("discord.js");

const roleMenu = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
            .setCustomId(`menuRole`)
            .setPlaceholder(`choisir un ou plusieurs role dans la liste`)
            .setMinValues(0)
    );

module.exports = {
    name: "menuRoleParam",

    runInteraction: async (client, interaction) => {
        let message = "biseufdosqefi"
        let roles = [];
        interaction.values.forEach(r => {
            roles.push(
                {
                    label: `${interaction.guild.roles.cache.get(r).name}`,
                    value: r
                }
            )
        })

        roleMenu.components[0]
            .setMaxValues(roles.length)
            .setOptions(roles);
        return interaction.channel.send({
            content: `message`,
            components: [roleMenu],
            ephemeral: false
        })
    }
}