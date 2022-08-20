const { Guild } = require("../../../Models");

module.exports = {
    name: "create",

    run: async function (guild) {
        let memberListDB = []; let botListDB = [];
        const members = [];
        guild.members.cache.map(m => members.push(m));
        members.forEach(async m => {
            if (!m.user.bot) {
                let member = {
                    id: m.id,
                    name: m.displayName,
                    xp: {
                        levels: 0,
                        number: 0,
                    },
                    bot: m.bot
                }
                memberListDB.push(member)
                console.log(`New Member -> ${guild.name} <- ${m.user.tag}`);
            } else {
                let Bot = {
                    id: m.id,
                    name: m.displayName,
                }
                botListDB.push(Bot)
                console.log(`New Bot -> ${guild.name} <- ${m.user.username}`);
            }
        })

        await Guild.create({
            id: guild.id,
            name: guild.name,
            owner: guild.ownerId,
            joinedAt: guild.joinedAt,
            members: memberListDB,
            bots: botListDB,
            settings: { prefix: process.env.Prefix }
        });
        console.log(`New Guild -> ${guild.name}`);
    }
}