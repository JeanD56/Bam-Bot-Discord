<<<<<<< HEAD
const { Listener } = require('discord-akairo');
const { Guild, GuildMember } = require('../../structures/Models')

class guildDeleteListner extends Listener {
    constructor() {
        super('guildDelete', {
            emitter: 'client',
            event: 'guildDelete'
        });
    }

    async exec(guild) {
        try {
            if (await Guild.findOne({ id: guild.id })) {
                await Guild.deleteOne({ id: guild.id })
            } else {
                console.log("Erreur -> DB -> Guild déja Supprimer");
            }

            for(const membre of await GuildMember.find({guildID: guild.id})){
                if(await GuildMember.findOne({guildID: guild.id, userID: membre.userID})){
                    await GuildMember.deleteOne({
                        guildID: guild.id,
                        userID: membre.userID,
                    })
                }
            }

        } catch (error) {
            console.log(error);
        }
    }
}

=======
const { Listener } = require('discord-akairo');
const { Guild, GuildMember } = require('../../structures/Models')

class guildDeleteListner extends Listener {
    constructor() {
        super('guildDelete', {
            emitter: 'client',
            event: 'guildDelete'
        });
    }

    async exec(guild) {
        try {
            if (await Guild.findOne({ id: guild.id })) {
                await Guild.deleteOne({ id: guild.id })
            } else {
                console.log("Erreur -> DB -> Guild déja Supprimer");
            }

            for(const membre of await GuildMember.find({guildID: guild.id})){
                if(await GuildMember.findOne({guildID: guild.id, userID: membre.userID})){
                    await GuildMember.deleteOne({
                        guildID: guild.id,
                        userID: membre.userID,
                    })
                }
            }

        } catch (error) {
            console.log(error);
        }
    }
}

>>>>>>> 3161726 (ajout fichier ou modification)
module.exports = guildDeleteListner;