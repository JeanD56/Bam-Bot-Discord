const { ActionRowBuilder, SelectMenuBuilder } = require("discord.js");

module.exports = {
    name: "auto-role-param",

    runInteraction: async (client, interaction) => {
        let message = " "
        let roles = [];
        interaction.values.forEach(r => {
            roles.push(r)
        })

        let db = await client.f.db.guild.get(interaction.guild);
        db.settings.autoRole.roles = roles;
        await client.f.db.guild.update(interaction.guild, db);

        return interaction.reply({
            content: `les roles \`\`${roles.join("\n")}\`\`on été defini`,
            ephemeral: true
        })
    }
}