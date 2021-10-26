const GoogleTranslate = require('google-translate');
const Command = require('../../Structures/Command.js');
const { MessageEmbed, } = require('discord.js');
const wol = require('wol');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['wake on lan']
        });
    }

    async run(message, args){

        let pc = "40:B0:76:11:FD:A3";
        wol.wake(pc);
        const embed = new MessageEmbed()
        .addField("PC Réveiller", [
            `Jean Desktop: ${pc}`,
            '\u200b'
        ]);

        message.channel.send(embed);
    }
}