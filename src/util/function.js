const { MessageEmbed } = require("discord.js")

module.exports = {
    embed: function(message, client) {

        if(!message){
            return new MessageEmbed();
        }else{
            if(!client){
                return new MessageEmbed()
                    .setTitle("embed")
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({type: 'png', dynamic: true}))
                    .setTimestamp();
            }else{
                return new MessageEmbed()
                    .setTitle("embed")
                    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({type: 'png', dynamic: true}))
                    .setFooter(`${client.user.username}`, client.user.displayAvatarURL({type: 'png', dynamic: true}))
                    .setTimestamp();
            }
        }
    }
}