const { AkairoMessage, Command } = require('discord-akairo');

class DeCommand extends Command {
    constructor() {
        super('de', {
            aliases: ['de'],
            description: {
                content: "oui",
                usage: "(nombre face, par defaut 6)",
                exemples: ["", "24"]
            },
            args: [{
                id: 'faces',
                type: 'integer',
                default: 6
            }],
            slash: true,
            slashOptions: [
                {
                    name: "faces",
                    type: "STRING",
                    description: "permet de mettre autre chose que 6",
                    required: false
                }
            ]
        });
    }

/**
 * @param {Message | AkairoMessage} message
 */


    async exec(message, { faces }) {

        let deEmbed = this.client.functions.embed();

        let result = random(1, faces);
        let reponse = result.toString()

        deEmbed.setTitle(`${reponse}`);

        return message.channel.send({
            embes: [deEmbed]
        })

        function random(min1, max1) {
            let rand = 0;
            rand = Math.floor(Math.random() * (max1 - min1 + 1) + min1);

            return rand;
        }

    }
}

module.exports = DeCommand;
