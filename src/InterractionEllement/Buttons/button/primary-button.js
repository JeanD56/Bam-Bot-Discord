
module.exports = {
    name: "primary-button",

    runInteraction: async (client, interaction) => {
        await interaction.reply({
            content: ' bonjour je suis le boutton Primaire',
            ephemeral: true
        })
    }
}