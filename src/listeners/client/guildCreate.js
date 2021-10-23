const { Listener } = require('discord-akairo');
const { Guild, User, GuildMember } = require('../../structures/Models');

class GuildCreateListner extends Listener {
    constructor() {
        super('guildCreate', {
            emitter: 'client',
            event: 'guildCreate'
        });
    }

    async exec(guild) {
        try {
            if (!await Guild.findOne({ id: guild.id })) {
                await Guild.create({
                    id: guild.id,
                    name: guild.name,
                    owner: guild.ownerId,
                    joinedAt: guild.joinedAt
                })
            } else {
                console.log("Erreur -> DB -> Guild déja rejoint");
            }

            /*guild.members.cache.forEach(async member => {
                if (!await User.findOne({ id: member.user.id })) {
                    this.client.emit("guildMemberAdd", member);
                }
                if (! await GuildMember.findOne({guildID: member.guild.id, userID: member.user.id})){
                    this.client.emit("guildMemberAdd", member);
                }
            });*/
            console.log('Guild Rejoint');
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = GuildCreateListner;