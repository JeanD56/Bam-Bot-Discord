const BotClient = require('./structures/BotClient');
const dotenv = require('dotenv').config();

let botClient = new BotClient({ defaultPrefix: process.env.Prefix });

botClient.start(
    process.env.TOKEN,
    process.env.MONGOOSTRING
)
