const { Inhibitor } = require('discord-akairo')

class MuteGuildInhibitor extends Inhibitor {
    constructor() {
        super('MuteGuild', {
            reason: 'Vous avez été mute de la Guild',
            type: 'post',
            priority: 0
        })
    }

    async exec(message) {

        if(this.client.ownerID == message.author.id) return false;
        if(message.member.permissions.has('ADMINISTRATOR', 1)) return false;

        // let guild = this.client.guildSettings.get(message.guild);
        // let muteList = guild.settings.mute.global;
        // let mutedUser = muteList.include({ user: message.author.id});
        // let messageMutedUser = "Err";

        // if (mutedUser) {
        //     if (message.createdAt < mutedUser.fin || !mutedUser.fin) {
        //         if(mutedUser.fin){
        //             messageMutedUser = `Vous avez été mute il vous reste \`\`${message.createdAt-mutedUser.fin}s\`\` pour la Guild \`\`${message.guild.name}\`\``;
        //         }else{
        //             messageMutedUser = `Vous avez été mute pendant un temps indeterminer de la Guild \`\`${message.guild.name}\`\``;
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

module.exports = MuteGuildInhibitor;