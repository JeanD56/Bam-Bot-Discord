const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "purge",
    description: "efface 1 ou plusieurs message",
    inDev: true,

    run: async(client, message, args) => {
        return
    },
    options: [
        {
            name: "message",
            description: "Le nombre de message a effacer",
            type: ApplicationCommandOptionType.Number,
            required: true
        }, {
            name: "cible",
            description: "Le utilisateur à effacer",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ],
    runInteraction: async(client, interaction) => {
        const nAEffacer = interaction.options.getNumber('message');
        if (nAEffacer < 0) return interaction.reply({
            content: `Le nombre doit etre supperieur a 0`,
            ephemeral: true
        });
        const cible = interaction.options.getMember('cible');

        const messageAEffacer = await interaction.channel.messages.fetch();

        if (cible) {
            let i = 0; let j = 0;
            const MessageFiltrer = [[]];
            (await messageAEffacer).filter(msg => {
                if (i > 100) {
                    i = 0; j++;
                }
                if (msg.author.id == cible.id && nAEffacer > i + j * 100) {
                    MessageFiltrer[j].push(msg); i++;
                }
            })
            for (let k = 0; k <= j; k++) {
                if (k < j) await interaction.channel.bulkDelete(MessageFiltrer[k], true);
                else await interaction.channel.bulkDelete(MessageFiltrer[k], true).then(msgs => {
                    interaction.reply({
                        content: `+de ${msgs.size + k*100} message de l'utilisateur ${cible} ont été supprimer`,
                        ephemeral: true
                    })
                })
            }
        } else {
            let i = 0; let j = 0;
            const MessageFiltrer = [[]];
            (await messageAEffacer).filter(msg => {
                if (i > 100) {
                    i = 0; j++;
                }
                if (nAEffacer > i + j * 100) {
                    MessageFiltrer[j].push(msg); i++;
                }
            })
            for (let k = 0; k <= j; k++) {
                if (k < j) await interaction.channel.bulkDelete(MessageFiltrer[k], true);
                else await interaction.channel.bulkDelete(MessageFiltrer[k], true).then(msgs => {
                    interaction.reply({
                        content: `+de ${msgs.size + k*100} message de l'utilisateur ${cible} ont été supprimer`,
                        ephemeral: true
                    })
                })
            }
        }
    }
}