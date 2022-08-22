const { ActionRowBuilder, SelectMenuBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle } = require("discord.js");

const autoRoleMenu = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
            .setCustomId(`auto-role-param`)
            .setPlaceholder(`choisir un role dans la liste`)
            .setMinValues(0)
    );

const autoRoleButtons = new ActionRowBuilder()
    .addComponents(
        new ButtonBuilder()
            .setCustomId('auto-role-activer')
            .setLabel('Activer')
            .setStyle(ButtonStyle.Success)
            .setDisabled(true),
        new ButtonBuilder()
            .setCustomId('auto-role-desactiver')
            .setLabel('Descativer')
            .setStyle(ButtonStyle.Danger)
            .setDisabled(true),
    );

module.exports = {
    name: "auto-role",
    description: "système d'autorole",

    run: (client, message, args) => {
        return
    },
    runInteraction: async (client, interaction) => {
        const roles = []; let i = 0;
        let dbGuild = await client.f.db.guild.get(interaction.guild);

        if (dbGuild.settings.autoRole.roles) dbGuild.settings.autoRole.roles.map(rID => {
            roles.push({
                label: interaction.guild.roles.cache.get(rID).name,
                value: rID,
                default: true
            })
        })
        interaction.guild.roles.cache.each(r => {
            let k = 0;
            dbGuild.settings.autoRole.roles.map(rID => {
                if (r.id == rID) return k = 1;
            })
            if (!(r.name == "@everyone" || r.tags.botID) && r.editable && k == 0) {
                roles.push({
                    label: r.name,
                    value: r.id,
                    default: false
                })
            }
        });

        autoRoleMenu.components[0]
            .setMaxValues(roles.length)
            .setOptions(roles);

        if (dbGuild.settings.autoRole.active) autoRoleButtons.components[1].setDisabled(false);
        else if (!dbGuild.settings.autoRole.active) autoRoleButtons.components[0].setDisabled(false);

        return interaction.reply({
            content: `L'autoRole est actuellement \`\`${dbGuild.settings.autoRole.active ? `Activer` : `Desactiver`}\`\``,
            components: [autoRoleMenu, autoRoleButtons],
            ephemeral: false
        })
    }
}
