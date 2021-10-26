const {MessageEmbed} = require('discord.js');
const {R6} = require('../../colors.json');


module.exports = {
    config: {
        name: "R6 stat",
        command: "r6",
        description: "Donne les stats d'un joueur R6",
        usage: "<nom-joueur> (platform) (région)",
        category: "Divers",
        autorisation: "MEMBER"
        
    },
    run: async (bot, message, args, cmd) => {
        message.delete();
        
        /*let commd = bot.commands.get(bot.alias.get(cmd.toLowerCase()) || cmd.toLowerCase());
        if(commd.autorisation === "MEMBER" || !commd.autorisation){

        }else if(commd.autorisation){
            if(!hasPermission(commd.autorisation)) return message.channel.send("vous n'avez pas la permission pour cette command");
        } */
        


    }
}
