const { createCanvas, loadImage } = require('canvas');
const { ListenerHandler, Listener } = require('discord-akairo');
const { MessageAttachment } = require('discord.js');
const { Guild, User } = require('../../structures/Models');

class GuildMemberAddListner extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }

    async exec(member) {
        const guildData = await this.client.guildSettings.get(member.guild);
        console.log(guildData);
        if(!await this.client.userSettings.find({id: member.id})){
            this.client.userSettings.create(member);
        }
        
        if(!member.user.bot){
            let memberObj = {
                id: member.id,
                name: member.displayName,
                xp: {
                    levels: 0,
                    number: 0,
                },
                bot: member.user.bot
            }
            const nMember = [] 
            if(!guildData.members){
                nMember= guildData.members.push(memberObj);
            }else{
                guildData.members.forEach(m => {
                    nMember.push(m);
                });
                nMember.push(memberObj);
            }
            this.client.guildSettings.add(member.guild, {members: nMember});
            console.log(`New Member -> ${member.guild.name} <- ${member.user.tag}`);
        }else{
            let BotObj = {
                id: member.id,
                name: member.displayName,
            }
            const nBot = [];
            if(!guildData.bots){
                nBot = BotObj;
            }else{
                guildData.bots.forEach(b => {
                    nBot.push(b);
                });
                nBot.push(BotObj);
            }
            this.client.guildSettings.add(member.guild, {bots: nBot});
            console.log(`New Bot -> ${member.guild.name} <- ${member.user.username}`);
        }
    }
}

module.exports = GuildMemberAddListner;