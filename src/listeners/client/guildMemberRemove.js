const { createCanvas, loadImage } = require('canvas');
const { ListenerHandler, Listener } = require('discord-akairo');
const { MessageAttachment } = require('discord.js');
const { Guild, User } = require('../../structures/Models');

class GuildMemberRemoveListner extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }

    async exec(member) {
        const guildData = await this.client.guildSettings.get(member.guild);
        console.log(guildData);
        
        if(!member.user.bot){
            const nMember = [] 
    
            guildData.members.forEach(m => {
                if(m.id != member.id){
                    nMember.push(m);
                }
            });

            this.client.guildSettings.add(member.guild, {members: nMember});
            console.log(`New Member -> ${member.guild.name} <- ${member.user.tag}`);
        }else{
            const nBot = [];
            
            guildData.bots.forEach(b => {
                if(b.id != member.id){
                    nBot.push(b);
                }
            });
            nBot.push(BotObj);
            
            this.client.guildSettings.add(member.guild, {bots: nBot});
            console.log(`New Bot -> ${member.guild.name} <- ${member.user.username}`);
        }
    }
}

module.exports = GuildMemberRemoveListner;