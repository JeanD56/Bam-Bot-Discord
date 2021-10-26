const Command = require('../../Structures/Command.js');
const { MessageEmbed, Emoji } = require('discord.js');
const moment = require('moment');

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

module.exports = class extends Command {
  constructor(...args) {
      super(...args, {
          aliases:['ui', 'user']
      });
  }

  async run(message, args){
    const member = message.mentions.members.last() /*|| message.guild.members.cache.get(target)*/ || message.member;
    const roles = member.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString())
        .slice(0, -1);
    const userFlags = member.user.flags.toArray();

    var lenRole = 5;

    const embed = new MessageEmbed()
        .setThumbnail(member.user.displayAvatarURL({dynamic: true, size: 512}))
        .setColor(member.discplayHexColor || 'BLACK')
        .addField('User', [
            `**❯❯ Nom:** ${member.user.username}`,
            `**❯❯ Discriminator:** ${member.user.discriminator}`,
            `**❯❯ ID:** ${member.user.id}`,
            `**❯❯ Flags:** ${userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'None'}`,
            `**❯❯ Avatar:** [[lien vers l'avatar]](${member.user.displayAvatarURL({ dynamic: true })})`,
            //`**❯❯ Crée le:** //${moment(message.user.createdTimestamp).format('LT')} ${moment(message.user.createdTimestamp).format('LL')} ${moment(message.user.createdTimestamp).fromNow()}`,
            `**❯❯ Statut:** ${member.user.presence.statuts}`,
            `**❯❯ Jeu:** ${member.user.presence.game || 'Ne joue a aucun jeu'}`,
            `\u200b`
        ])
        .addField('Member', [
            `**❯❯ Role n°1:** ${member.roles.highest.id === message.guild.id ? "None" : member.roles.highest.name}`,
            `**❯❯ Rejoin le serveur le:** ${moment(member.joinetAt).format('LL LTS')}`,
            `**❯❯ Role Group:** ${member.roles.hoist ? member.roles.hoist.name : "None"}`,
            `**❯❯ Roles [${roles.length}]:** ${roles.length < lenRole ? roles.join(', ') : roles.length > lenRole ? this.client.utils.trimArray(roles, lenRole) : "None"}`,
            `\u200b`
        ]);

	message.channel.send(embed);
  }
}