
module.exports = {
    name: "secondary-button",

    runInteraction: async (client, interaction) => {
        await interaction.reply({
            content: ' bonjour je suis le boutton Secondaire',
            ephemeral: true
        })
    }
}