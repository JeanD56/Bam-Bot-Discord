const { Command } = require('discord-akairo');
const moment = require('moment');

class ConvertToFieldCommand extends Command {
    constructor() {
        super('convertToField', {
            aliases: ['convertToField', "ctf", "-"],
            description: {
                content: "",
                usage: "",
                exemples: ["", ""]
            },
        });
    }

    async exec(message, { Membre }) {

        let Messages = [];

        if (!message.reference) return message.reply("Vous devez reply un message");

        let messageDebut = this.client.guilds.cache.get(message.reference.guildId)
            .channels.cache.get(message.reference.channelId)
            .messages.cache.get(message.reference.messageId);

        this.client.guilds.cache.get(message.guild.id)
            .channels.cache.get(message.channel.id).messages.fetch()
            .then(msgs => {
                msgs.filter(m => {
                    if (m.createdAt >= messageDebut.createdAt && m != message) {
                        Messages.push(m);
                    }
                })
            }).catch(console.error);

            
            
            message.channel.send("Archive en Cours")
            .then(messageBot => {
                messageBot.startThread({
                    name: "test",
                    //autoArchiveDuration: 4320,
                    reason: "Reason",
                }).then( threadBot => {
                    let i = 0;
                    Messages.reverse().forEach(m => {
                        threadBot.send(`<@!${m.member.id}> ${moment(m.createdAt).format("_h:mm:ss a_")} :\n${m.content}`).then(_ => {
                            i++;
                            if(Messages.length == i) return messageBot.edit("Archiver !");
                        });
                    });
                });
            });


    }
}

module.exports = ConvertToFieldCommand;
