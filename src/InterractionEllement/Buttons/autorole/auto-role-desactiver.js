const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

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
    name: "auto-role-desactiver",

    runInteraction: async (client, interaction) => {

        let db = await client.f.db.guild.get(interaction.guild);
        db.settings.autoRole.active = false;
        await client.f.db.guild.update(interaction.guild, db);

        autoRoleButtons.components[1].setDisabled(true);
        autoRoleButtons.components[0].setDisabled(false);

        interaction.message.edit({
            content: `L'autoRole est actuellement \`\`Desactiver\`\``,
            components: [interaction.message.components[0], autoRoleButtons]
        });

        await interaction.reply({
            content: 'Desactiver',
            ephemeral: true
        })
    }
}