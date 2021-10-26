const path = require('path');
const { promisify } = require('util');
const glob = promisify(require('glob'));
const Command = require('./Command.js');

module.exports = class Until {
    constructor(client) {
        this.client = client;
    }

    isClass(input) {
        return typeof input === 'function' &&
        typeof input.prototype === 'object' &&
        input.toString().substring(0, 5) === 'class';
    }

    get directory() {
        return `${path.dirname(require.main.filename)}${path.sep}`
    }

    async loadCommands() {
        return glob(`${this.directory}Commands/**/*.js`).then(commands => {
            for(const commandFile of commands) {
                delete require.cache[commandFile];
                const { name } = path.parse(commandFile);
                const File = require(commandFile);
                if(!this.isClass(File)) throw new TypeError(`Commande ${name} ne peu etre exporté`);
                const command = new File(this.client, name.toLowerCase());
                if(!(command instanceof Command)) throw new TypeError(`Commande ${name} ne peu etre une command`);
                this.client.commands.set(command.name, command);
                if(command.aliases.length){
                    for (const alias of command.aliases){
                        this.client.aliases.set(alias, command.name);
                    }
                }
                console.log(`\t${name}   c:`);
            }
        })
    }

    trimArray(arr, maxlen = len){
        if(arr.length > maxlen){
            const len = arr.length - maxlen;
            arr = arr.slice(0, maxlen);
            arr.push(`${len} more...`);
        }
        return arr;
    }

};