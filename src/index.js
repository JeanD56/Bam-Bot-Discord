const BotClient = require('./structures/BotClient');
const config = require('./util/config.js');

let botClient = new BotClient({
    ownersID: config.OWNERID,
    prefix:  config.PREFIX,
});

botClient.start(config.TOKEN, config.MONGOOSTRING)