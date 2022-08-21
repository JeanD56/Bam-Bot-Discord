module.exports = {
    name: "help",
    description: "information sur plusieurs commands",
    inDev: true,

    run: (client, message, args) => {
        return message.channel.send('pong');
    },

    runInteraction: (client, interaction) => {
        return interaction.reply({ content: `Pong`, ephemeral: true })
    }
}