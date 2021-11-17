const { Command } = require('discord-akairo');
const moment = require('moment');

class ServeurInfoCommand extends Command {
    constructor() {
        super('serveurinfo', {
            aliases: ['serveurinfo', 'si'],
            description: {
                content: "voir les informations du serveur",
                usage: "",
                exemples: [""]
            }
        });
    }

    async exec(message) {
        var roleLen = 5;

        const filterLevels = {
            DISABLED: 'Off',
            MEMBERS_WITHOUT_ROLES: 'No Role',
            ALL_MEMBERS: 'Everyone'
        };
        const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: '(╯°□°）╯︵ ┻━┻ (HIGH !)',
            VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻ (VERY HIGH !!!!!!!)'
        };

        const roles = this.client.guilds.cache.get(message.guild.id).roles.cache.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = this.client.guilds.cache.get(message.guild.id).members.fetch({withPresences: true})
        const channels = this.client.guilds.cache.get(message.guild.id).channels.cache 
        const emojis = message.guild.emojis.cache;

        const embed = this.client.functions.embed(message, this.client)
            .setTitle(`__${message.guild.name}__`)
            .setDescription(`**Information pour le serveur **`)
            .setColor(message.author.hexAccentColor)
            .setThumbnail(message.guild.iconURL({ dynamic: true }));

        let general = `**❯❯ Nom:** ${message.guild.name}`;
        general = general + `\n**❯❯ ID:** ${message.guild.id}`;
        //general = general + `\n**❯❯ Proprio:** ${members.get(message.guild.ownerid).tag} | <@${message.guild.ownerId}>`;
        general = general + `\n**❯❯ Region:** ${message.guild.preferredLocale}`;
        general = general + `\n**❯❯ Boost Tier:** ${message.guild.PreniumTier ? `Tier ${message.guild.PreniumTier}` : 'None'}`;
        general = general + `\n**❯❯ Filtre:** ${filterLevels[message.guild.explicitContentFilter]}`;
        general = general + `\n**❯❯ Niveau de Verification:** ${verificationLevels[message.guild.verificationLevel]}`;
        general = general + `\n**❯❯ Date de création:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} il y a ${moment(message.guild.createdTimestamp).fromNow()}`;
        general = general + `\n\u200b`;
        
        let stats = `**❯❯ Roles:** ${roles.length}`;
        stats = stats + `\n**❯❯ emojis Annimé:** ${emojis.filter(emoji => emoji.animated).size}`;
        stats = stats + `\n**❯❯ emojis Normal:** ${emojis.filter(emoji => !emoji.animated).size}`;
        stats = stats + `\n**❯❯ Membres:** ${message.guild.memberCount}`;
        stats = stats + `\n**❯❯ Humains:** ${(await members).filter(member => !member.user.bot).size}`;
        stats = stats + `\n**❯❯ BOT:** ${(await members).filter(member => member.user.bot).size}`;
        stats = stats + `\n**❯❯ Channels:** ${channels.filter(channel => channel.type !== 'GUILD_CATEGORY').size}`;
        stats = stats + `\n**❯❯ Channels Textuel:** ${channels.filter(channel => channel.type === 'GUILD_TEXT').size}`;
        stats = stats + `\n**❯❯ Channels Vocaux:** ${channels.filter(channel => channel.type === 'GUILD_VOICE').size}`;
        stats = stats + `\n**❯❯ Thread Public:** ${channels.filter(channel => channel.type === 'GUILD_PUBLIC_THREAD').size}`;
        stats = stats + `\n**❯❯ Thread Priver:** ${channels.filter(channel => channel.type === 'GUILD_PRIVATE_THREAD').size}`;
        stats = stats + `\n**❯❯ Conference:** ${channels.filter(channel => channel.type === 'GUILD_STAGE_VOICE').size}`;
        stats = stats + `\n**❯❯ Boost:** ${message.guild.PreniumSubcriiptionCount || '0'}`;
        stats = stats + '\n\u200b'
        
        let presence = `**❯❯ Online:** ${(await members).filter(
            member => !member.user?.bot && member.presence?.status === 'online').map(member => member).length}`;
        presence = presence + `\n**❯❯ Absent:** ${(await members).filter(
            member => !member.user?.bot && member.presence?.status === 'idle').map(member => member).length}`;
        presence = presence + `\n**❯❯ Ne Pas Déranger:** ${(await members).filter(
            member => !member.user?.bot && member.presence?.status === 'dnd').map(member => member).length}`;
        presence = presence + `\n**❯❯ Déconnecter:** ${(await members).filter(
            member => !member.user?.bot && member.presence?.status === 'offline').map(member => member).length}`;
        presence = presence + '\n\u200b';

        let device = `\n**❯❯ Mobile:** ${(await members).filter(
            member => member.presence?.clientStatus.mobile === ("online" || "idle" || "dnd" || "offline")).map(member => member).length}`;
        device = device + `\n**❯❯ App:** ${(await members).filter(
            member => member.presence?.clientStatus.desktop === ("online" || "idle" || "dnd" || "offline")).map(member => member).length}`;
        device = device + `\n**❯❯ Web:** ${(await members).filter(
            member => member.presence?.clientStatus.web === ("online" || "idle" || "dnd" || "offline")).map(member => member).length}`;
        device = device + '\n\u200b';
        
        let rolesField = "";
        if(roles.length > roleLen){
            let rolesArray = [];
            roles.forEach(r => {
                if(r.length <= roleLen){
                    rolesArray.push(r);
                    console.log(`${r} -> ${rolesArray}`);
                }
            });
            rolesField = rolesArray.join(', ');
        }else if(roles.length < roleLen){
            rolesField = roles.join(', ');
        }else{
            rolesField = "None";
        }
        
        embed.addField(`__General__`, general);
        embed.addField('__Statistics__', stats);
        embed.addField('__Presences__', presence);
        embed.addField('__Device__', device);

        embed.addField(`__Roles [${roles.length}]__`, rolesField+ " Err");

        embed.setTimestamp();

        return message.reply({
            embeds: [embed]
        });
    }
}

module.exports = ServeurInfoCommand;
