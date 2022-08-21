const { Client, Collection, Partials } = require('discord.js');
const dotenv = require("dotenv"); dotenv.config();
const mongoose = require('mongoose');

const client = new Client({
    intents: 3276799,
    partials: [
        Partials.Message,
        Partials.Channel,
        Partials.Reaction,
        Partials.User,
        Partials.GuildScheduledEvent,
        Partials.ThreadMember,
        Partials.GuildMember
    ]
});

client.config = {
    ownerID: ["284302403975643146"],
    dev: {
        ownerID: [process.env.OwnerID],
        inDev: process.env.InDEV,
        guildDevID: [process.env.GuildDevID]
    },
    commandHandler: {
        prefix: process.env.Prefix,
        autoRegisterSlash: true,
        automateCategories: true,
        blockBots: true,
        defaultCooldown: 2000,
        directory: './src/Commands',
        allowMention: false,
        defaultOption: {
            description: '<Pas de Description>',
            slashCommand: true,
            inDev: false,
            ownerOnly: false,
            run: async _ => {return},
            runInteraction: async _ => {return},
        }
    },
    eventHandler: {
        directory: './src/Events'
    },
    handler: {
        folder: './Utils/Handlers',
    }
};


["commands", "commandsInteract", "slashInDev", "interactionElement", "interactionElement", "f", "models", "log"].forEach(i => client[i] = new Collection());
client.f.db = new Collection();
["guild", "moderation", "user"].forEach(i => client.f.db[i] = new Collection());
["buttons", "selectMenus"].forEach(i => client.interactionElement[i] = new Collection());

require(`./Utils/Logger`)(client);

["ButtonUtils", "SelectMenuUtils", "EventUtils", "CommandUtils", "FunctionUtils", "DbUtils"].forEach(handler =>
    require(`./Utils/Handlers/${handler}.js`)(client)
);

process.on('exit', code => { client.log.get("client")(`le processus s'est arreté avec le code: ${code}`) });
process.on('uncaughtException', (err, origin) => { client.log.get("error")(`uncaughtException: ${err}`, `Origin: ${origin}`) });
process.on('unhandledRejection', (reason, promise) => {
    client.log.get("warn")(`unhandledRejection: ${reason}`);
    console.log(promise);
});
process.on('warning', (...args) => { client.log.get("warn")(...args) });

mongoose.connect(process.env.MONGOOSTRING, {
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4
}).then(_ => { client.log.get('client')(`DataBase connected`) })
.catch(err => { client.log.get('error')(err) });

client.login(process.env.TOKEN)