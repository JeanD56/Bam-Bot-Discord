const { Inhibitor } = require('discord-akairo')

class channelBlacklistInhibitor extends Inhibitor {
    constructor(){
        super('channelBlacklist', {
            reason: 'les commandes ne sont pas authoriser dans ce channel',
            type: 'post',
            priority: 1
        })
    }

    async exec(message){
        if(this.client.ownerID == message.author.id) return 0;

        let channelBlacklist = await this.client.guildSettings.get(message.guild);
        return channelBlacklist.settings.blacklist.channels.includes(message.channel.id);
    }
}

module.exports = channelBlacklistInhibitor;