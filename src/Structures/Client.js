const { Client, Collection } = require('discord.js');
const Util = require('./Util.js');

module.exports = class BotClient extends Client{
    constructor(options = {}) {
        super({
            disableMentions: 'everyone'
        })
        this.validate(options);

        this.commands = new Collection();

        this.aliases = new Collection();

        this.utils = new Util(this);

        this.once('ready', () => {
            console.log(`Connecter en tant que ${this.user.username}! ^^`);
        });

        this.on('message', async (message) => {
            const mentionRegex = RegExp(`<@!${this.user.id}>$`);
            const mentionRegexPrefix = RegExp(`<@!${this.user.id}>$`);

            if(!message.guild || message.author.bot) return;

            if(message.content.match(mentionRegex)) message.channel.send(`Mon prefix pour ${this.user.name} est \`${this.prefix}\`.`);

            const prefix = message.content.match(mentionRegexPrefix) ?
                message.content.match(mentionRegexPrefix)[0] : this.prefix; // condition ? true : false

            // eslink-disable    
            const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);

            const command = this.commands.get(cmd.toLowerCase()) || this.commands.get(this.aliases.get(cmd.toLowerCase()));
            if(command) {
                command.run(message, args);

                var temps = new Date();
                console.log(`\n\t'${command.name}' \n\targument(s): "${args}"\n\tutilisateur: '${message.author.id}'\n\talias: '${message.author.username}'\n\tserveur '${message.guild}'  \n${temps}`);
            }
        })
    }

    validate(options) {
        if(typeof options !== 'object') throw new TypeError('l option doit etre un Objet');
        
        if (!options.token) throw new Error('Tu Dois donner un Token pour le Client');
        this.token = options.token;

        if(!options.prefix) throw new Error('Tu dois donner un Préfix pour le Client');
        if(typeof options.prefix !== 'string') throw new TypeError('Le prefix doit etre un string');
        this.prefix = options.prefix;
    }

    async login(token = this.token){
        this.utils.loadCommands();
        super.login(token);
    }
};