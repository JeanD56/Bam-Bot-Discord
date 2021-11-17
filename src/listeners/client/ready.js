<<<<<<< HEAD
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

=======
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

        require('../../structures/dashboard')(this.client);

        const status = [
            "bonsoir",
            "comment ça vas ?"
        ];

        let i = 0;
        setInterval(_ => {
            if(i == status.length) i = 0;
            this.client.user.setActivity(status[i]);
            i++;
        }, 5000);
    }
}

>>>>>>> 3161726 (ajout fichier ou modification)
module.exports = ReadyListner;