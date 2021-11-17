const { Command } = require('discord-akairo');
const moment = require('moment');

class ServeurInfoCommand extends Command {
    constructor() {
        super('serveurinfo', {
            aliases: ['serveurinfo', 'si'],
            description: {
                content: "mettre de tester le ping du bot",
                usage: "ping",
                exemples: ["ping"]
            }
        });
    }

    async exec(message) {

        const filterLevels = {
            DISABLED: 'Off',
            MEMBERS_WITHOUT_ROLES: 'No Role',
            ALL_MEMBERS: 'Everyone'
        };
        const verificationLevels = {
            NONE: 'None',
            LOW: 'Low',
            MEDIUM: 'Medium',
            HIGH: '(╯°□°）╯︵ ┻━┻',
            VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
        };

        const roles = this.client.guilds.cache.get(message.guild.id).roles.cache //.sort((a, b) => b.position - a.position).map(role => role.toString());
        const members = this.client.guilds.cache.get(message.guild.id).members.fetch({withPresences: true})
        const channels = this.client.guilds.cache.get(message.guild.id).channels.cache 
        const emojis = message.guild.emojis.cache;

        var roleLen = 5;

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
        /*stats = stats + `\n**❯❯ Humains:** ${members.filter(member => !member.user.bot).size}`;
        stats = stats + `\n**❯❯ BOT:** ${members.filter(member => member.user.bot).size}`;*/
        stats = stats + `\n**❯❯ Channels:** ${channels.filter(channel => channel.type !== 'GUILD_CATEGORY').size}`;
        stats = stats + `\n**❯❯ Channels Textuel:** ${channels.filter(channel => channel.type === 'GUILD_TEXT').size}`;
        stats = stats + `\n**❯❯ Channels Vocaux:** ${channels.filter(channel => channel.type === 'GUILD_VOICE').size}`;
        stats = stats + `\n**❯❯ Thread Public:** ${channels.filter(channel => channel.type === 'GUILD_PUBLIC_THREAD').size}`;
        stats = stats + `\n**❯❯ Thread Priver:** ${channels.filter(channel => channel.type === 'GUILD_PRIVATE_THREAD').size}`;
        stats = stats + `\n**❯❯ Conference:** ${channels.filter(channel => channel.type === 'GUILD_STAGE_VOICE').size}`;
        stats = stats + `\n**❯❯ Boost:** ${message.guild.PreniumSubcriiptionCount || '0'}`;
        stats = stats + '\n\u200b'
        
        console.log(this.client.guilds.cache.get(message.guild.id).members.cache.get(message.author.id).presence.status);
        console.log(this.client.guilds.cache.get(message.guild.id).members.cache.get(message.author.id).presence.clientStatus);
        
        let presence = `**❯❯ Online:** ${members.then(members => { 
            return members.filter((member) => !member.user?.bot && member.presence?.status === 'online').map(member => member);}).size}`;
        presence = presence + `\n**❯❯ Absent:** ${members.then(members => {
            return members.filter((member) => !member.user?.bot && member.presence?.status === 'offline').map(member => member);}).size}`;
        presence = presence + `\n**❯❯ Ne Pas Déranger:** ${members.then(members => { 
            return members.filter((member) => !member.user?.bot && member.presence?.status === 'idle').map(member => member);}).size}`;
        presence = presence + `\n**❯❯ Déconnecter:** ${members.then(members => { 
            return members.filter((member) => !member.user?.bot && member.presence?.status === 'offline').map(member => member);}).size}`;
        presence = presence + '\n\u200b';

        let device = `\n**❯❯ Mobile:** ${members.then(members => {
            return members.filter(member => member.presence?.clientStatus.mobile === ("online" || "idle" || "offline")).map(member => member);}).size}`;
        device = device + `\n**❯❯ App:** ${members.then(members => {
            return members.filter(member => member.presence?.clientStatus.desktop === ("online" || "idle" || "offline")).map(member => member);}).size}`;
        device = device + `\n**❯❯ Web:** ${members.then(members => {
            return members.filter(member => member.presence?.clientStatus.web === ("online" || "idle" || "offline")).map(member => member);}).size}`;
        device = device + '\n\u200b';
        
        
        embed.addField(`__General__`, general);
        embed.addField('__Statistics__', stats);
        embed.addField('__Presences__', presence);
        embed.addField('__Device__', device);

        embed.addField(`__Roles [${roles.length}]__`, roles.length < roleLen ? roles.join(', ') : roles.length > roleLen ? roles.each(r => r.length < roleLen).join(', ')+" ..." : 'None');

        embed.setTimestamp();

        return message.reply({
            embeds: [embed]
        });
    }
}

module.exports = ServeurInfoCommand;
