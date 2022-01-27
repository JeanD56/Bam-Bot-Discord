const { Listener } = require("discord-akairo");
const { Interaction, MessageActionRow, MessageButton } = require("discord.js");

class interactionCreate extends Listener {
  constructor() {
    super("interactionCreate", {
      emitter: "client",
      event: "interactionCreate",
      category: "client",
    });
  }

  async exec(interaction) {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === "ping") {
      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("primary")
          .setLabel("Primary")
          .setStyle("PRIMARY")
      );

      await interaction.reply({ content: "Pong!", components: [row] });
    }
  }
}