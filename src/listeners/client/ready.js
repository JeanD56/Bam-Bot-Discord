const { ListenerHandler, Listener } = require('discord-akairo');

class ReadyListner extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    exec() {
        console.log("I'm Ready !");

        let statuses = [
            'Bonsoir',
            'comment allez vous',
            'moi ?',
            'super',
        ]

        /*setInterval(function() {
            let status = statuses[Math.floor(Math.random() * statuses.length)];
            bot.client.user.setPresence({
                activities: [{
                    name: status,
                    type: 'LISTENING'
                }],
                status: 'idle'
            });
            
        }, 1000);*/
    }
}

module.exports = ReadyListner;