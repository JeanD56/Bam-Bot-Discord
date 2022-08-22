const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    name: "emit",
    description: "emet un evenement",
    ownerOnly: false,
    inDev: true,

    run: (client, message, args) => {
        if (args[0] || !args[0].match(/^(guildMemberAdd|guildMemberRemove)$/)) return message.reply("merci de mettre un event valide");

        switch (args[0]) {
            case "guildMemberAdd":
                client.emit(event, message.member);
                message.reply({ content: 'l\'event a ete emit' });
                break;
            case "guildMemberRemove":
                client.emit(event, message.member);
                message.reply({ content: 'l\'event a ete emit' });
                break;
        }
    },

    options: [
        {
            name: "event",
            description: "choisir un event a émettre",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: 'guildMemberAdd',
                    value: 'guildMemberAdd',
                }, {
                    name: 'guildMemberRemove',
                    value: 'guildMemberRemove'
                }
            ]
        }   
    ],
    runInteraction: (client, interaction) => {
        const event = interaction.options.getString('event');

        switch (event) {
            case "guildMemberAdd":
                client.emit(event, interaction.member);
                interaction.reply({ content: 'l\'event a ete emit', ephemereal: true });
                break;
            case "guildMemberRemove":
                client.emit(event, interaction.member);
                interaction.reply({ content: 'l\'event a ete emit', ephemereal: true });
                break;
        }
    }
}