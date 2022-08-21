const { InteractionType, ComponentType } = require("discord.js");

module.exports = {
    name: "interactionCreate",

    async execute(client, interaction) {
        if (interaction.type === InteractionType.ApplicationCommand || interaction.type === ComponentType.ActionRow) {
            const cmd = client.commandsInteract.get(interaction.commandName);
            const cmdInDev = client.slashInDev.get(interaction.commandName);
            if (!cmd && !cmdInDev) return interaction.reply({ content: `Cette commande n'hexiste pas`, ephemeral: true });
            if (cmd) client.emit('debutCommande', interaction, cmd);
            if (cmd) cmd.runInteraction(client, interaction);

            if (cmdInDev) client.emit('debutCommande', interaction, cmdInDev);
            if (cmdInDev) cmdInDev.runInteraction(client, interaction);
        }
        else if (interaction.type === ComponentType.Button) {
            const btn = client.interactionElement.buttons.get(interaction.customId);
            //if (!btn) return interaction.reply(`ce Boutton n'est pas definie`);
            if(btn) btn.runInteraction(client, interaction);
        }
        else if (interaction.type === ComponentType.SelectMenu) {
            const stcMenu = client.interactionElement.selectMenus.get(interaction.customId);
            //if (!stcMenu) return interaction.reply(`ce menu n'est pas definie`);
            if (stcMenu) stcMenu.runInteraction(client, interaction);
        }
    }
}