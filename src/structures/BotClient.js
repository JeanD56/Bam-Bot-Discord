const f = require('../util/function');
const { AkairoClient, CommandHandler, ListenerHandler } = require('discord-akairo');
const mongoose = require('mongoose');
const { GuildsProvider, UserProvider } = require('./Provider')
const { TOKEN, MONGOOSTRING } = require('../util/config');

module.exports = class BotClient extends AkairoClient {
    constructor(config = {}) {
        super(
            { ownerID: config.ownersID },
            {
                allowedMentions: {
                    parse: [
                        'everyone',
                        'roles',
                        'users'
                    ],
                    repliedUser: false
                },
                partials: [
                    'CHANNEL',
                    'GUILD_MEMBER',
                    'MESSAGE',
                    'REACTION',
                    'USER'
                ],
                presence: {
                    status: 'idle',
                    activities: [{
                        name: 'in comming',
                        type: 'LISTENING',
                        url: 'https://discord.gg/',
                        buttons: ['https://discord.gg/'],
                        details: "Bonsoir ^^"
                    }],
                    afk: false
                },
                intents: [
                    'DIRECT_MESSAGES',
                    'DIRECT_MESSAGE_REACTIONS',
                    'DIRECT_MESSAGE_TYPING',
                    'GUILDS',
                    'GUILD_BANS',
                    'GUILD_EMOJIS_AND_STICKERS',
                    'GUILD_INTEGRATIONS',
                    'GUILD_INVITES',
                    'GUILD_MEMBERS',
                    'GUILD_MESSAGES',
                    'GUILD_MESSAGE_REACTIONS',
                    'GUILD_MESSAGE_TYPING',
                    'GUILD_PRESENCES',
                    'GUILD_VOICE_STATES',
                    'GUILD_WEBHOOKS'
                ]
            }
        );

        this.CommandHandler = new CommandHandler(this, {
            allowMention: true,
            typing: true,
            prefix: async message => {
                const guildPrefix = await this.guildSettings.get(message.guild);
                if (guildPrefix) return guildPrefix.prefix;
                return config.prefix;
            },
            blockBots: true,
            defaultCooldown: 2000,
            directory: './src/commands/',
            automateCategories: true,
            argumentDefaults: 'non defini',
        });

        this.listenerHandler = new ListenerHandler(this, {
            directory: './src/listeners'
        })

        this.functions = {
            embed: f.embed
        }
        this.guildSettings = new GuildsProvider();
        this.userSettings = new UserProvider();
        this.guildMemberSettings = new GuildsProvider();
    }

    init() {
        this.CommandHandler.useListenerHandler(this.listenerHandler);
        this.CommandHandler.loadAll();
        console.log(`Commande   -> ${this.CommandHandler.modules.size}`);
        this.listenerHandler.loadAll();
        console.log(`Event      -> ${this.listenerHandler.modules.size}`);
    }

    async start() {
        try {
            await mongoose.connect(MONGOOSTRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            console.log("DB connecter");
            await this.init();
            return this.login(TOKEN);
        } catch (e) {
            console.log("DB non connecter\n", e);
        }

    }
}