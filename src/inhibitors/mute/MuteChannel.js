const { Inhibitor } = require('discord-akairo')

class MuteChannellistInhibitor extends Inhibitor {
    constructor() {
        super('MuteChannel', {
            reason: 'Vous avez été mute de ce channel',
            type: 'post',
            priority: 0
        })
    }

    async exec(message) {

        if(this.client.ownerID == message.author.id) return false;
        if(message.member.permissions.has('ADMINISTRATOR', 1)) return false;

        // let guild = this.client.guildSettings.get(message.guild);
        // let muteList = guild.settings.mute.channel;
        // let mutedUser = muteList.include({ user: message.author.id, channel: message.channel.id});
        // let messageMutedUser = "Err";


        // if (mutedUser) {
        //     if (message.createdAt < mutedUser.fin || !mutedUser.fin) {
        //         if(mutedUser.fin){
        //             messageMutedUser = `Vous avez été mute il vous reste \`\`${message.createdAt-mutedUser.fin}s\`\` pour le channel \`\`${message.channel.name}\`\``;
        //         }else{
        //             messageMutedUser = `Vous avez été mute pendant un temps indeterminer du channel \`\`${message.channel.name}\`\``;
        //         }
        //         message.delete();
        //         return message.author.send({content: messageMutedUser});
        //     } else if (message.createdAt > mutedUser.fin && mutedUser.fin) {
        //         muteList = muteList.splice(mutedUser, 1);
        //         Guild.findOne({ id: message.guild.id }).then(data => { data.settings.mute = muteList; data.save(); })
        //         return 0;
        //     }
        // } else {
        //     return 0;
        // }
    }
}

module.exports = MuteChannellistInhibitor;