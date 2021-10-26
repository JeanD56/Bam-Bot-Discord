const { Utils } = require('erela.js');
const {MessageEmbed} = require('discord.js');
const couleur = require('../../colors.json');


module.exports = {
    config: {
        name: "Pile ou face",
        command: "piece",
        description: "",
        usage: "",
        category: "Divers",
        alias: ["pf", "pileface"],
        autorisation: "MEMBER"
        
    },
    run: async (bot, message, args) => {
        message.delete();

        let pieceEmbed = new MessageEmbed();
        pieceEmbed.setColor(couleur.Ramdom);
        pieceEmbed.setAuthor("", message.author.displayAvatarURL());

        let result = random(1, 2);
        let reponse

        if(result == "1"){
            reponse = "face"
        }else if(result == "2"){
            reponse = "pile"
        }
        
        pieceEmbed.setDescription(`${reponse}`);
        
        return message.channel.send(pieceEmbed)/*.then(m => m.delete(10000))*/

        function random(min1, max1) {
            let rand = 0;
            //min1 = Math.ceil(1);
            //max1 = Math.floor(2);
            rand = Math.floor(Math.random() * (max1 - min1 +1) + min1);
        
            return rand;
        }
    }
}
