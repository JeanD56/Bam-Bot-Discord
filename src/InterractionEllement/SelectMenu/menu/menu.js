
module.exports = {
    name: "menu",

    runInteraction: async (client, interaction) => {
        await interaction.reply({
            content: `options pris en compte <${interaction.values}>`,
            ephemeral: true
        })
    }
}