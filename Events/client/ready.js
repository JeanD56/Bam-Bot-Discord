const { ErelaClient, Utils } = require('erela.js');
const config = require('../../config.json');

var now     = new Date();
var annee   = now.getFullYear();
var mois    = now.getMonth() + 1;
var jour    = now.getDate();
var heure   = now.getHours();
var minute  = now.getMinutes();
var seconde = now.getSeconds();

module.exports = bot => {
    console.log(`\n✅\t\"${bot.user.username}\" est connecté ! \t✅\n\t${heure}:${minute}:${seconde} ${jour}/${mois}/${annee}\n\tbip bip boup c:\n`);
    
    
    bot.music = new ErelaClient(bot, config.nodes)
        //.on("nodeError", console.log)
        .on("nodeConnect", () => console.log("Nouveau Node Connecter"))
        .on("queueEnd", player => {
        player.textChannel.send("Queue Terminer !");
        return bot.music.players.destroy(player.guild.id)
    })
    .on("trackStart", ({textChannel}, {title, duration}) => textChannel.send(`Lecture en cours: **${title}** \`${Utils.formatTime(duration, true)}\``).then(m => m.delete(15000)));
    

    bot.levels = new Map()   
        .set("none", 0.0)
        .set("low", 0.10)
        .set("medium", 0.15)
        .set("high", 0.25);
    
    let statuses = [
        //`${bot.guilds.size} Serveurs !`,
        //`plus de ${bot.users.size} utilisateur !`,
        `${config.prefix}help`,
        `Made in Confinement`
    ]
    
    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "PLAYING"});
        
    }, 5000)
}