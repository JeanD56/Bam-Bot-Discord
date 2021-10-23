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
    }
}

module.exports = ReadyListner;