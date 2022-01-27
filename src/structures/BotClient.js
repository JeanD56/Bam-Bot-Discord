const f = require('../util/function');
const { AkairoClient, CommandHandler, ListenerHandler, InhibitorHandler } = require('discord-akairo');
const mongoose = require('mongoose');
const { GuildsProvider, UserProvider, ModerationProvider } = require('./Provider');
const { stripIndents } = require('common-tags');

module.exports = class BotClient extends AkairoClient {
    constructor(config = {}) {
        super(
            {
                ownerID: config.ownerID = ["284302403975643146"],
            },
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
                        name: 'Starting !',
                        type: 'LISTENING',
                        url: 'https://discord.gg/',
                        // buttons: ['https://discord.gg/'],
                        // details: "Bonsoir ^^"
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

        this.config = config;

        this.commandHandler = new CommandHandler(this, {
            allowMention: true,
            typing: true,
            prefix: async message => {
                let guildPrefix;
                if (message) guildPrefix = await this.guildSettings.get(message.guild);
                const moderationPrefix = await this.moderation.get(); 
                if(message) if (guildPrefix.settings.prefix) return guildPrefix.settings.prefix;
                if (moderationPrefix.prefixDefault) return moderationPrefix.prefixDefault;
                return config.defaultPrefix;
            },
            blockClient: true,
            blockBots: true,
            defaultCooldown: 2000,
            directory: './src/commands/',
            automateCategories: true,
            argumentDefaults: 'non defini',
            autoRegisterSlashCommands: true,
        });

        this.ListenerHandler = new ListenerHandler(this, {
            directory: './src/listeners/'
        });

        this.inhibitorHandler = new InhibitorHandler(this, {
            directory: './src/inhibitors/',
            automateCategories: true,

        })

        this.functions = {
            embed: f.embed
        }

        this.guildSettings = new GuildsProvider();
        this.userSettings = new UserProvider();
        this.moderation = new ModerationProvider();
    }

    async init() {
        this.commandHandler.useListenerHandler(this.ListenerHandler);
        this.commandHandler.useInhibitorHandler(this.inhibitorHandler);
        this.ListenerHandler.setEmitters({
            commandHandler: this.commandHandler,
        });
        await this.commandHandler.loadAll();
        console.log(`Cammande pret      -> ${this.commandHandler.modules.size}`);
        await this.ListenerHandler.loadAll();
        console.log(`Listener pret      -> ${this.ListenerHandler.modules.size}`);
        await this.inhibitorHandler.loadAll();
        console.log(`Inhibiteur pret    -> ${this.inhibitorHandler.modules.size}`);
    }

    async start(TOKEN, MONGOOSTRING) {
        try {
            await mongoose.connect(MONGOOSTRING, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            console.log("DataBase connecter");
            await this.init();
            return this.login(TOKEN);
        } catch (e) {
            console.log("DataBase non connecter\n", e);
        }
    }
}
