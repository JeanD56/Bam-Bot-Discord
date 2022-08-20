const { EmbedBuilder, ApplicationCommandType } = require("discord.js");

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

module.exports = {
    name: "userInfo",
    type: ApplicationCommandType.User, //'CHAT_INPUT' 'MESSAGE'

    async runInteraction(client, interaction) {
        const member = await interaction.guild.members.fetch(interaction.targetId);

        const embed = new EmbedBuilder()
            .setAuthor({ name: `${member.user.tag} <${member.user.id}>`, iconURL: interaction.member.user.displayAvatarURL({ type: 'png', dynamic: true }) })
            .setColor('#458565')
            .setImage(member.user.displayAvatarURL({ type: 'png', dynamic: true }))
            .addFields(
                { name: '** Nom:**', value: `${member.displayName}`, inline: true },
                /*{ name: '** Discriminator:**', value: `${member.user.discriminator}`, inline: true },
                { name: '** ID:**', value: `${member.user.id}`, inline: true },
                { name: '** Flags:**', value: `${member.user.flags.toArray().length ? member.user.flags.toArray().map(flag => flags[flag]).join(', ') : 'None'}`, inline: false },
                { name: '** Avatar:** ', value: `[[lien vers l'avatar]](${member.user.displayAvatarURL({ type: 'png', dynamic: true })})`, inline: true },*/
                { name: 'Modérateur', value: `${!member.kickable ? '🟢' : '🔴'}`, inline: true },
                { name: 'Bot', value: `${member.user.bot ? '🟢' : '🔴'}`, inline: true },
                { name: 'Roles', value: `${member.roles.cache.map(role => role).join(', ').replace(', @everyone', '')}`, inline: true },
                { name: 'Crée le', value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f>`, inline: true },
                { name: 'Rejoint le', value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f>`, inline: true },
        );

        return interaction.reply({ embeds: [embed], ephemeral: true });
    }
}