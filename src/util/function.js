const { MessageEmbed } = require("discord.js")

module.exports = {
    embed: function(message) {

        if(!message){
            return new MessageEmbed()
                .setDescription("embed")
        }else{
            return new MessageEmbed()
                .setTitle("embed")
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                //.setFooter(`${this.client.user.username}`, this.client.user.displayAvatarURL())
        }
    }
}