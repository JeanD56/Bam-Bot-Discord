const { ActionRowBuilder, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");

const roleMenu = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
            .setCustomId(`menuRoleParam`)
            .setPlaceholder(`choisir un role dans la liste`)
            .setMinValues(1)
    );

module.exports = {
    name: "feur",
    description: "repond feur a casi tout les message qui finnisent par 'quoi'",
    inDev: true,
    ownerOnly: false,

    options: [
        {
            name: "changer",
            description: "-",
            type: ApplicationCommandOptionType.Boolean,
        }
    ],
    runInteraction: async (client, interaction) => {
        let dbGuild = await client.f.db.guild.get(interaction.guild);
        if (interaction.options.getBoolean('activer')){
            dbGuild.settings.fun.feur != not dbGuild.settings.fun.feur;
            client.f.db.guild.set(interraction.guild, dbGuild);
            return await interraction.reply({
                content: "la commande a été modifier"
            });
        } else {
            return await interraction.reply({
                content: `cet commande est actuelement a ${dbGuild.settings.fun.feur}`
            });
        }
    }
}
