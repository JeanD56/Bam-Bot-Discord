const discord = require('discord.js');
const couleur = require('../../colors.json');


module.exports = {
    config: {
        name: "Uptime",
        command: "uptime",
        description: "",
        usage: "",
        category: "Divers",
        alias: [],
        autorisation: "MEMBER"
        
    },
    run: async (bot, message, args) => {
        message.delete();

        let embed = new discord.MessageEmbed();
        embed.setColor(couleur.Info);
        embed.setAuthor("", message.author.displayAvatarURL());
        embed.addField("**Je suis en ligne depuis:**", duration(bot.uptime));


        function duration(ms){
            const sec = Math.floor((ms / 1000) %60 ).toString()
            const min = Math.floor((ms / (1000 * 60)) %60 ).toString()
            const heure = Math.floor((ms / (1000 *3600)) %60 ).toString()
            const jour = Math.floor((ms / (1000 *3600 *24)) %60 ).toString()

            if(jour.padStart(1, "0") === "0"){
                if(heure.padStart(2, "0") === "00"){
                    if(min.padStart(2, "0") === "00"){
                        return `${sec.padStart(2, "0")} secondes.`
                    }else{
                        return `${min.padStart(2, "0")} minutes, ${sec.padStart(2, "0")} secondes.`
                    }
                }else{
                    return `${heure.padStart(2, "0")} heures, ${min.padStart(2, "0")} minutes, ${sec.padStart(2, "0")} secondes`
                }
            }else{
                return `${jour.padStart(1, "0")} jours, ${heure.padStart(2, "0")} heures, ${min.padStart(2, "0")} minutes, ${sec.padStart(2, "0")} secondes.`
            }
        }

        message.channel.send(embed)
    }
}
