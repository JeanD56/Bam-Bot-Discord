const Command = require('../../Structures/Command.js');
const { MessageEmbed, Emoji } = require('discord.js');
const moment = require('moment');

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

module.exports = class extends Command {
  constructor(...args) {
      super(...args, {
          aliases:['si', 'guildinfo']
      });
  }

  async run(message, args){
    const roles = message.guild.roles.cache.sort((a,b) => b.position - a.position).map(role => role.toString());
    const members = message.guild.members.cache;
    const channels = message.guild.channels.cache;
	const emojis = message.guild.emojis.cache;

	console.log(members);

	const embed = new MessageEmbed();

	embed.setDescription(`**Information pour le serveur __${message.guild.name}__**`);
	embed.setColor(`BLUE`);
	embed.setThumbnail(message.guild.iconURL({dynamic: true}));
	embed.setAuthor(message.author.tag, );
	embed.addField(`__General__`, [
		`**❯❯ Nom:** ${message.guild.name}`,
		`**❯❯ ID:** ${message.guild.id}`,
		`**❯❯ Proprio:** ${message.guild.owner.user.tag} | <@${message.guild.ownerID}>`,
		`**❯❯ Region:** ${message.guild.region}`,
		`**❯❯ Boost Tier:** ${message.guild.PreniumTier ? `Tier ${message.guild.PreniumTier}` : 'None'}`,
		`**❯❯ Filtre:** ${filterLevels[message.guild.explicitContentFilter]}`,
		`**❯❯ Niveau de Verification:** ${verificationLevels[message.guild.verificationLevel]}`,
		`**❯❯ Date de création:** ${moment(message.guild.createdTimestamp).format('LT')} ${moment(message.guild.createdTimestamp).format('LL')} il y a ${moment(message.guild.createdTimestamp).fromNow()}`,
		'\u200b'
	]);
	embed.addField('__Statistics__', [
		`**❯❯ Roles:** ${roles.length}`,
		`**❯❯ emojis Annimé:** ${emojis.filter(emoji => emoji.animated).size}`,
		`**❯❯ emojis Normal:** ${emojis.filter(emoji => !emoji.animated).size}`,
		`**❯❯ Membres:** ${message.guild.memberCount}`,
		`**❯❯ Humains:** ${members.filter(member => !member.user.bot).size}`,
		`**❯❯ BOT:** ${members.filter(member => member.user.bot).size}`,
		//`**❯❯ Channels:** ${channels.filter(channel => channel.type === 'text').size + channels.filter(channel => channel.type === 'voice').size}`,
		`**❯❯ Channels Textuel:** ${channels.filter(channel => channel.type === 'text').size}`,
		`**❯❯ Channels Vocaux:** ${channels.filter(channel => channel.type === 'voice').size}`,
		`**❯❯ Boost:** ${message.guild.PreniumSubcriiptionCount || '0'}`,
		'\u200b'		
	]);
	/*embed.addField('__Presences__', [
		`**❯❯ Online:** ${members.filter(member => member.presence.status === 'online').size}`,
		`**❯❯ Absent:** ${members.filter(member => member.presence.status === 'idle').size}`,
		`**❯❯ Ne Pas Déranger:** ${members.filter(member => member.presence.status === 'dnd').size}`,
		`**❯❯ Déconnecter:** ${members.filter(member => member.presence.status === 'offline').size}`,
		'\u200b'
	]);*/
	var roleLen = 5;
	embed.addField(`__Roles [${roles.length}]__`, roles.length < roleLen ? roles.join(', ') : roles.length > roleLen ? this.client.utils.trimArray(roles, roleLen) : 'None');
	//embed.setFooter(this.name);
	embed.setTimestamp();

	message.channel.send(embed);
  }
}