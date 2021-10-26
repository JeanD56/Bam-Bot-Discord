const { Utils } = require('erela.js');
const {MessageEmbed} = require('discord.js');
const couleur = require('../../colors.json');


module.exports = {
    config: {
        name: "Dé",
        command: "de",
        description: "fonction de lance un dé (possedant un nombre de face choissit) de façon aleatoire",
        usage: "(nombre face, par defaut 6)",
        category: "Divers",
        alias: [],
        autorisation: "MEMBER"
        
    },
    run: async (bot, message, args) => {
        message.delete();

        let pieceEmbed = new MessageEmbed();
        pieceEmbed.setColor(couleur.Ramdom);
        pieceEmbed.setAuthor("", message.author.displayAvatarURL());

        if(!args[0]){
            args[0]=6;
        }

        let result = random(1, args[0]);
        let reponse = result
        
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
