const { InteractionType, ComponentType } = require("discord.js");

module.exports = {
    name: "interactionCreate",

    async execute(client, interaction) {
        if (interaction.type === InteractionType.ApplicationCommand || interaction.type === ComponentType.ActionRow) {
            const cmd = client.commands.get(interaction.commandName);
            if (!cmd) return interaction.reply({ content: `Cette commande n'hexiste pas`, ephemeral: true });
            client.emit('debutCommande', interaction, cmd);
            cmd.runInteraction(client, interaction)
        }
        else if (interaction.type === ComponentType.Button) {
            const btn = client.interactionElement.buttons.get(interaction.customId);
            if (!btn) return interaction.reply(`ce Boutton n'est pas definie`);
            btn.runInteraction(client, interaction);
        }
        else if (interaction.type === ComponentType.SelectMenu) {
            const stcMenu = client.interactionElement.selectMenus.get(interaction.customId);
            if (!stcMenu) return interaction.reply(`ce menu n'est pas definie`);
            stcMenu.runInteraction(client, interaction);
        }
    }
}