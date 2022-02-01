'use strict';

const process = require('node:process');
const Action = require('./Action');
const { Events, InteractionTypes, MessageComponentTypes, ApplicationCommandTypes } = require('../../util/Constants');
const Structures = require('../../util/Structures');

let deprecationEmitted = false;

class InteractionCreateAction extends Action {
  handle(data) {
    const client = this.client;

    // Resolve and cache partial channels for Interaction#channel getter
    this.getChannel(data);

    let InteractionType;
    switch (data.type) {
      case InteractionTypes.APPLICATION_COMMAND:
        switch (data.data.type) {
          case ApplicationCommandTypes.CHAT_INPUT:
            InteractionType = Structures.get('CommandInteraction');
            break;
          case ApplicationCommandTypes.USER:
            InteractionType = Structures.get('UserContextMenuInteraction');
            break;
          case ApplicationCommandTypes.MESSAGE:
            InteractionType = Structures.get('MessageContextMenuInteraction');
            break;
          default:
            client.emit(
              Events.DEBUG,
              `[INTERACTION] Received application command interaction with unknown type: ${data.data.type}`,
            );
            return;
        }
        break;
      case InteractionTypes.MESSAGE_COMPONENT:
        switch (data.data.component_type) {
          case MessageComponentTypes.BUTTON:
            InteractionType = Structures.get('ButtonInteraction');
            break;
          case MessageComponentTypes.SELECT_MENU:
            InteractionType = Structures.get('SelectMenuInteraction');
            break;
          default:
            client.emit(
              Events.DEBUG,
              `[INTERACTION] Received component interaction with unknown type: ${data.data.component_type}`,
            );
            return;
        }
        break;
      case InteractionTypes.APPLICATION_COMMAND_AUTOCOMPLETE:
        InteractionType = Structures.get('AutocompleteInteraction');
        break;
      default:
        client.emit(Events.DEBUG, `[INTERACTION] Received interaction with unknown type: ${data.type}`);
        return;
    }

    const interaction = new InteractionType(client, data);

    /**
     * Emitted when an interaction is created.
     * @event Client#interactionCreate
     * @param {Interaction} interaction The interaction which was created
     */
    client.emit(Events.INTERACTION_CREATE, interaction);

    /**
     * Emitted when an interaction is created.
     * @event Client#interaction
     * @param {Interaction} interaction The interaction which was created
     * @deprecated Use {@link Client#event:interactionCreate} instead
     */
    if (client.emit('interaction', interaction) && !deprecationEmitted) {
      deprecationEmitted = true;
      process.emitWarning('The interaction event is deprecated. Use interactionCreate instead', 'DeprecationWarning');
    }
  }
}

module.exports = InteractionCreateAction;
