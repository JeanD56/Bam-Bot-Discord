<<<<<<< HEAD
const { Command } = require('discord-akairo');
const { Guild } = require('../../structures/Models');

class TestCommand extends Command {
    constructor(){
        super('test', {
            aliases: ['test'],
            ownerOnly: true,
            args: [{
                id: "txt",
                type: "String"
            }]
        });
    }

    async exec(message, args) {
        
    }
}

module.exports = TestCommand;
=======
const { Command } = require('discord-akairo');
const { Guild } = require('../../structures/Models');

class TestCommand extends Command {
    constructor(){
        super('test', {
            aliases: ['test'],
            ownerOnly: true,
            args: [{
                id: "txt",
                type: "String"
            }]
        });
    }

    async exec(message, args) {
        
    }
}

module.exports = TestCommand;
>>>>>>> 3161726 (ajout fichier ou modification)
