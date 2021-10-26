const BotClient = require('./Structures/Client');
const config = require('../config.json');

const client = new BotClient(config);
client.login();