
module.exports = {
    name: "danger-button",

    runInteraction: async (client, interaction) => {
        await interaction.reply({
            content: ' bonjour je suis le boutton danger',
            ephemeral: true
        })
    }
}