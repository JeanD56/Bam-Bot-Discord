const googleTranslate = require('google-translate');
const Command = require('../../Structures/Command.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            aliases: ['pong']
        });
    }

    async run(message, args){
        const msg = await message.channel.send('pinging...');

        googleTranslate.getSupportedLanguages(function(err, languageCodes) {
            console.log(languageCodes);
            // => ['af', 'ar', 'be', 'bg', 'ca', 'cs', ...]
          });

        const latency = msg.createdTimestamp - message.createdTimestamp;
        console.log(googleTranslate);
        const choix = googleTranslate.translate(['C\'est vraiment mon ping ?', 'c\'est ok ? Je ne peut pas voir', 'j\'espère que ce n\'est pas mauvais'], 'en');
        const response = choix[Math.floor(Math.random()*choix.length)];

        msg.edit(` ${response} -\n\tBot Latency: \`${latency}ms\`\n\tAPI Latency: \`${Math.round(this.client.ws.ping)}ms\``);
    }
}