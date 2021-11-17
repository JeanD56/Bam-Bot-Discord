<<<<<<< HEAD
const { createCanvas, loadImage } = require('canvas');
const { ListenerHandler, Listener } = require('discord-akairo');
const { MessageAttachment } = require('discord.js');
const { Guild, User, GuildMember } = require('../../structures/Models');

class GuildMemberAddListner extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }

    async exec(member) {
         
        /*if(!await User.findOne({id: member.id})){
            await User.create({
                id: member.user.id,
                name: member.user.username,
                discriminator: member.user.discriminator,
                tag: member.user.tag,
                bot: member.user.bot
            }, err => {
                if (err) return console.log("Erreur\n", err);
            })
        }
        if(!await GuildMember.findOne({guildID: member.guild.id, userID: member.user.id})){
            await GuildMember.create({
                guildID: member.guild.id,
                userID: member.user.id,
            })
        }*/

        console.log(`Nouveau Membre -> ${member.user.tag} -> ${member.guild.name}`);
    }
}

=======
const { createCanvas, loadImage } = require('canvas');
const { ListenerHandler, Listener } = require('discord-akairo');
const { MessageAttachment } = require('discord.js');
const { Guild, User, GuildMember } = require('../../structures/Models');

class GuildMemberAddListner extends Listener {
    constructor() {
        super('guildMemberAdd', {
            emitter: 'client',
            event: 'guildMemberAdd'
        });
    }

    async exec(member) {
         
        /*if(!await User.findOne({id: member.id})){
            await User.create({
                id: member.user.id,
                name: member.user.username,
                discriminator: member.user.discriminator,
                tag: member.user.tag,
                bot: member.user.bot
            }, err => {
                if (err) return console.log("Erreur\n", err);
            })
        }
        if(!await GuildMember.findOne({guildID: member.guild.id, userID: member.user.id})){
            await GuildMember.create({
                guildID: member.guild.id,
                userID: member.user.id,
            })
        }*/

        console.log(`Nouveau Membre -> ${member.user.tag} -> ${member.guild.name}`);
    }
}

>>>>>>> 3161726 (ajout fichier ou modification)
module.exports = GuildMemberAddListner;