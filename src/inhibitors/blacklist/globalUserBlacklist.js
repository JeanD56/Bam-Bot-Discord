const { Inhibitor } = require('discord-akairo')

class globalUserBlacklistInhibitor extends Inhibitor {
    constructor(){
        super('globalUserBlacklist', {
            reason: 'vous avez été blacklist',
            type: 'post',
            priority: 4
        })
    }

    async exec(message){
        if(this.client.ownerID == message.author.id) return 0;

        const userBlacklist = await this.client.userSettings.get(message.author);
        return userBlacklist.blacklisted;
    }
}

module.exports = globalUserBlacklistInhibitor;