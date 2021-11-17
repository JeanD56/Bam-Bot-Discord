const { Inhibitor } = require('discord-akairo')

class userBlacklistInhibitor extends Inhibitor {
    constructor(){
        super('userBlacklist', {
            reason: 'vous avez été blacklist',
            type: 'post',
            priority: 2
        })
    }

    async exec(message){
        if(this.client.ownerID == message.author.id) return 0;

        const userBlacklist = await this.client.guildSettings.get(message.guild);
        return userBlacklist.settings.blacklist.users.includes(message.author.id);
    }
}

module.exports = userBlacklistInhibitor;