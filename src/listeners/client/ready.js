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

        /////////////////////////
    require('../../structures/dashboard')(this.client);
        /////////////////////////
    }
}

module.exports = ReadyListner;