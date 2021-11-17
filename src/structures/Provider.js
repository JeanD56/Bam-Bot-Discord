const { Guild, User, Moderation } = require('./Models');

class GuildsProvider {
    async create(guild) {
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

    async get(guild) {
        const data = await Guild.findOne({ id: guild.id });
        if (data) return data;
    }

    async find(param) {
        const data = await Guild.find(param);
        if (data) return data;
    }

    async update(guild, settings) {
        let data = await this.get(guild);
        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] == settings[key]
        }
        return data.updateOne(settings);
    }

    async add(guild, settings) {
        let data = await this.get(guild);
        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] == data[key] + settings[key]
        }
        return data.updateOne(settings);
    }
}

class UserProvider {
    async create(user) {
        await User.create({
            id: user.id,
            name: user.username,
            discriminator: user.discriminator,
            tag: user.tag,
            bot: user.bot,
        })
        console.log(`New User -> ${user.tag}`);
    }

    async get(user) {
        const data = await User.findOne({ id: user.id });
        if (data) return data;
    }

    async find(param) {
        const data = await User.find(param);
        if (data) return data;
    }

    async update(user, settings) {
        let data = await this.get(user);
        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] == settings[key]
        }
        return data.updateOne(settings);
    }

    async add(user, settings) {
        let data = await this.get(user);
        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] == data[key] + settings[key]
        }
        return data.updateOne(settings);
    }
}

class ModerationProvider {
    async get() {
        const data = await Moderation.findOne({ id: 1 });
        if (data) return data
    }

    async create() {
        await Moderation.create({
            id: 1,
            ownersID: ["284302403975643146"],
            status: [{
                messages: process.env.Prefix + "help Pour plus d'info",
                status: "idle",
                type: "LISTENING",
                url: "",
            }],
            prefixDefault: process.env.Prefix,
            dashboard: {
                clientID: process.env.ClientID,
                oauthSecret: process.env.OauthSecret,
                callbackurl: "http://localhost:3030/callback",
                secret: process.env.DSecret,
                domaine: "localhost",
                port: "3030",
            }
        });
        console.log("creation de la collection de Moderation");
    }
}


module.exports = {
    GuildsProvider,
    UserProvider,
    ModerationProvider,
}