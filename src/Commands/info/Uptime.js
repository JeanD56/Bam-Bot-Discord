const Command = require('../../Structures/Command.js');
const ms = require('ms');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {

        });
    }

    async run(message, args){
        message.channel.send(`je suis lancé depuis \`${ms(this.client.uptime, { long: true})}\``);
    }
}