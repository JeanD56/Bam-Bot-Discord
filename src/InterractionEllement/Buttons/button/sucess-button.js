
module.exports = {
    name: "sucess-button",

    runInteraction: async (client, interaction) => {
        await interaction.reply({
            content: ' bonjour je suis le boutton Succes',
            ephemeral: true
        })
    }
}