<<<<<<< HEAD
const BotClient = require('./structures/BotClient');
const config = require('./util/config.js');

let botClient = new BotClient({
    ownersID: config.OWNERID,
    prefix:  config.PREFIX,
});

=======
const BotClient = require('./structures/BotClient');
const config = require('./util/config.js');

let botClient = new BotClient({
    ownersID: config.OWNERID,
    prefix:  config.PREFIX,
});

>>>>>>> 3161726 (ajout fichier ou modification)
botClient.start(config.TOKEN, config.MONGOOSTRING)