const { Command } = require('discord-akairo');
const moment = require('moment');

class UserInfoCommand extends Command {
    constructor() {
        super('userinfo', {
            aliases: ['userinfo', 'ui'],
            description: {
                content: "voir les information d'un utilisateur",
                usage: "<membre>",
                exemples: ["", "@member"]
            },
            args: [
                { id: "member", type: 'member' }
            ]
        });
    }

    async exec(message, args) {

        const flags = {
            DISCORD_EMPLOYEE: 'Discord Employee',
            DISCORD_PARTNER: 'Discord Partner',
            BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
            BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
            HYPESQUAD_EVENTS: 'HypeSquad Events',
            HOUSE_BRAVERY: 'House of Bravery',
            HOUSE_BRILLIANCE: 'House of Brilliance',
            HOUSE_BALANCE: 'House of Balance',
            EARLY_SUPPORTER: 'Early Supporter',
            TEAM_USER: 'Team User',
            SYSTEM: 'System',
            VERIFIED_BOT: 'Verified Bot',
            VERIFIED_DEVELOPER: 'Verified Bot Developer'
        };

        let member;
        if (args.member) { member = args.member; } else { member = message.author; }
        member = this.client.guilds.cache.get(message.guild.id).members.cache.get(member.id);
        const mbr = this.client.guilds.cache.get(message.guild.id).members.fetch({ user: member.id, withPresences: true })
        const roles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role.toString())
            .slice(0, -1);
        const userFlags = member.user.flags.toArray();

        var lenRole = 5;

        let embed = this.client.functions.embed(message, this.client)
            .setTitle('Information Utilisateur')
            .setDescription(member.user.tag)
            .setThumbnail(member.user.displayAvatarURL({ type: 'png', dynamic: true, size: 512 }))
            .setColor(member.displayColor || 'BLACK');

        let user = `**❯❯ Nom:** ${member.user.username}`;
        user = user + `\n**❯❯ Discriminator:** ${member.user.discriminator}`;
        user = user + `\n**❯❯ ID:** ${member.user.id}`;
        user = user + `\n**❯❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`;
        user = user + `\n**❯❯ Avatar:** [[lien vers l'avatar]](${member.user.displayAvatarURL({ type: 'png', dynamic: true })})`;
        //user = user + `\n**❯❯ Crée le:** //${moment(message.user.createdTimestamp).format('LT')} ${moment(message.user.createdTimestamp).format('LL')} ${moment(message.user.createdTimestamp).fromNow()}`;
        user = user + `\n**❯❯ Statut:** ${await mbr.presence?.status}`;
        user = user + `\n**❯❯ Device:** ${await mbr.then(
            m => {
                let devices = [];
                if (!m.user.bot) {
                    if (m.presence?.clientStatus.mobile === ("online" || "idle" || "dnd" || "offline")) devices.push("📱");
                    if (m.presence?.clientStatus.desktop === ("online" || "idle" || "dnd" || "offline")) devices.push("💻");
                    if (m.presence?.clientStatus.web === ("online" || "idle" || "dnd" || "offline")) devices.push("🌐");
                } else { devices.push("🤖") }
                return devices.join(', ')
            }
        )}`;
        user = user + `\n**❯❯ ${member.presence?.activities["type"] || 'Jeu'}:** ${member.presence.activities["name"] || 'Ne joue a aucun jeu'}`;
        user = user + `\n\u200b`;


        let membre = `**❯❯ Role n°1:** ${member.roles.highest.id === message.guild.id ? "None" : member.roles.highest.name}`;
        membre = membre + `\n**❯❯ Rejoint le serveur le:** ${moment(member.joinetAt).format('LL LTS')}`;
        membre = membre + `\n**❯❯ Role Group:** ${member.roles.hoist ? member.roles.hoist.name : "None"}`;
        membre = membre + `\n**❯❯ Roles [${roles.length}]:** ${roles.length < lenRole ? roles.join(', ') : roles.length > lenRole ? this.client.utils.trimArray(roles, lenRole) : "None"}`;
        membre = membre + `\n\u200b`;

        embed.addField('User', user)
            .addField('Member', membre)

        return message.reply({
            embeds: [embed]
        });
    }
}

module.exports = UserInfoCommand;
