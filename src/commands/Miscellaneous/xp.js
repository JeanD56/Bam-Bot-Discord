const { Command } = require('discord-akairo');
const { MessageAttachment } = require('discord.js');
const { createCanvas, loadImage } = require('canvas');
const { GuildMember } = require('../../structures/Models');

class XpCommand extends Command {
    constructor(){
        super('xp', {
            aliases: ['xp'],
            description: {
                content: "",
                usage: "",
                exemples: ["xp"]
            },
            args: [{
                id: "membre",
                type: "user"
            }]
        });
    }

    async exec(message, args) {
        let member;

        if(!args.membre) member = message.author;
        else member = message.guild.members.cache.get(args.membre) //args.membre;

        const canvas = createCanvas(800, 333);
        const ctx = canvas.getContext('2d');

        const background = await loadImage('https://images.photowall.com/products/58243/galaxy-1.jpg');
        const profilPicture = await loadImage(member.displayAvatarURL({format: 'png'}));

        let data = await GuildMember.findOne({userID: message.author.id, guildID: message.guild.id});
        let lvl = data.xp.levels
        let xp = data.xp.number
        let xpPourcent = xp;

        const Rect = {
            x: 600,
            y: 25,
            Px: 120,
            Py: 156,
        }

        ctx.beginPath();

        ctx.lineWidth = 1;
        ctx.globalAlpha = 0.1;
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, 800, 333)

        ctx.drawImage(background, 0, 0 , canvas.width, canvas.height);
        ctx.drawImage(profilPicture, 25, 25, 100, 100);


        ctx.lineWidth = 0.1;
        ctx.strokeStyle = "#fff";
        ctx.globalAlpha = 0.4;
        ctx.fillStyle = "#000";
        ctx.fillRect(Rect.Px, Rect.Py, Rect.x, Rect.y);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#dfa";
        ctx.fillRect(Rect.Px, Rect.Py, Rect.x*xpPourcent, Rect.y);
        ctx.strokeRect(Rect.Px, Rect.Py, Rect.x, Rect.y);

        const attachement = new MessageAttachment(canvas.toBuffer(), "log.png");

        message.channel.send({
            content: null,
            files: [attachement]             
        })
    }
}

module.exports = XpCommand;
