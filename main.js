
const { Client, Collection } = require('discord.js');
const { TOKEN } = require('./Token.json');
const bot = new Client({disableEveryone: true});

var now     = new Date();
var annee   = now.getFullYear();
var mois    = now.getMonth() + 1;
var jour    = now.getDate();
var heure   = now.getHours();
var minute  = now.getMinutes();
var seconde = now.getSeconds();

["commands", "alias"].forEach(x => bot[x] = new Collection());
["console", "command", "event"].forEach(x => require(`./Handlers/${x}`)(bot));

bot.login(TOKEN);
