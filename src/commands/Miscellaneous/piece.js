const { Command } = require('discord-akairo');

class PieceCommand extends Command {
    constructor() {
        super('piece', {
            aliases: ['piece', "pf"],
            description: {
                content: "permet de lancer un pile ou face",
                usage: "",
                exemples: [""]
            }
        });
    }

    async exec(message, args) {
        let pieceEmbed = this.client.functions.embed(message, this.client);

        let min1 = 1;
        let max1 = 2;
        
        let rand = Math.floor(Math.random() * (max1 - min1 +1) + min1);
    
        let reponse = "erreur";

        if(rand == "1"){
            reponse = "face"
        }else if(rand == "2"){
            reponse = "pile"
        }
        
        pieceEmbed.setTitle(`${reponse}`);
        
        return message.channel.send({
            embeds: [pieceEmbed]
        })

    }
}

module.exports = PieceCommand;
