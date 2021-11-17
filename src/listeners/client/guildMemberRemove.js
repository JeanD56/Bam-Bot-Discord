<<<<<<< HEAD
const { createCanvas, loadImage } = require('canvas');
const { ListenerHandler, Listener } = require('discord-akairo');
const { MessageAttachment } = require('discord.js');
const { Guild, User, GuildMember } = require('../../structures/Models');

class GuildMemberRemoveListner extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }

    async exec(member) {
        try {            
            if(await GuildMember.findOne({guildID: member.guild.id, userID: member.user.id})){
                await GuildMember.deleteOne({
                    guildID: member.guild.id,
                    userID: member.user.id,
                })
            }

            console.log(`leave -> ${member.user.tag} -> ${member.guild.name}`);
        } catch (error) {
            console.log(error);
        }
    }
}

=======
const { createCanvas, loadImage } = require('canvas');
const { ListenerHandler, Listener } = require('discord-akairo');
const { MessageAttachment } = require('discord.js');
const { Guild, User, GuildMember } = require('../../structures/Models');

class GuildMemberRemoveListner extends Listener {
    constructor() {
        super('guildMemberRemove', {
            emitter: 'client',
            event: 'guildMemberRemove'
        });
    }

    async exec(member) {
        try {            
            if(await GuildMember.findOne({guildID: member.guild.id, userID: member.user.id})){
                await GuildMember.deleteOne({
                    guildID: member.guild.id,
                    userID: member.user.id,
                })
            }

            console.log(`leave -> ${member.user.tag} -> ${member.guild.name}`);
        } catch (error) {
            console.log(error);
        }
    }
}

>>>>>>> 3161726 (ajout fichier ou modification)
module.exports = GuildMemberRemoveListner;