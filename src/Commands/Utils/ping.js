module.exports = {
    name: "ping",
    description: "permet de pinguer le bot",
    inDev: true,

    run: (client, message, args) => {
        return message.channel.send('pong');
    },

    runInteraction: (client, interaction) => {
        return interaction.reply({content: `Pong`, ephemeral: true})
    }
}