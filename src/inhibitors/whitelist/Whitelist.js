const { Inhibitor } = require('discord-akairo')

class WhitelistInhibitor extends Inhibitor {
    constructor(){
        super('Whitelist', {
            reason: 'Vous n\'etes pas authoriser par le serveur',
            type: 'post',
            priority: 1
        })
    }

    async exec(message){
        const guildData = await this.client.guildSettings.get(message.guild);
        let blocker = false;
        
        if(this.client.ownerID == message.author.id) return blocker = false;
        if(message.member.permissions.has('ADMINISTRATOR', 1)) return blocker = false;

        if (guildData.settings.whitelisted == false){
            blocker = false;
        }else if(guildData.settings.whitelisted == true && guildData.settings.whitelist.users.includes(message.author.id)){
            blocker = false;
        }else if(guildData.settings.whitelisted == true && guildData.settings.whitelist.roles.includes(message.member.roles)){
            blocker = false;
        }else{
            blocker = true;
        }
        return blocker;
    }
}

module.exports = WhitelistInhibitor;