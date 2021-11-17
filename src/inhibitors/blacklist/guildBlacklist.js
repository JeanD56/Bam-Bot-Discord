const { Inhibitor } = require('discord-akairo')

class guildBlacklistInhibitor extends Inhibitor {
    constructor(){
        super('guildBlacklist', {
            reason: 'la guild a été blacklist',
            type: 'post',
            priority: 3
        })
    }

    async exec(message){
        if(this.client.ownerID == message.author.id) return 0;

        let guildBlacklist = await this.client.guildSettings.get(message.guild);
        return guildBlacklist.blacklisted;
    }
}

module.exports = guildBlacklistInhibitor;