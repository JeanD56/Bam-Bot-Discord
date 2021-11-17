<<<<<<< HEAD
const { Guild } = require('./Models');

class GuildsProvider {
    async get(guild) {
        const data = await Guild.findOne({ id: guild.id });
        if (data) return data;
    }

    async update(guild, settings){
        let data = await this.get(guild);
        if(typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] == settings[key]
        }
        return data.updateOne(settings);
    }

    async add(guild, settings){
        let data = await this.get(guild);
        if(typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] == data[key] + settings[key]
        }
        return data.updateOne(settings);
    }
}

class UserProvider {
    async get(user) {
        const data = await Guild.findOne({ id: user.id });
        if (data) return data;
    }

    async update(user, settings){
        let data = await this.get(user);
        if(typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] == settings[key]
        }
        return data.updateOne(settings);
    }

    async add(user, settings){
        let data = await this.get(user);
        if(typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] == data[key] + settings[key]
        }
        return data.updateOne(settings);
    }
}

class GuildMemberProvider {
    async get(guild, user) {
        const data = await Guild.findOne({ userID: user.id, guildID: guild.id });
        if (data) return data;
    }

    async update(guild, user, settings){
        let data = await this.get(guild, user);
        if(typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] == settings[key]
        }
        return data.updateOne(settings);
    }
}

module.exports = {
    GuildsProvider,
    UserProvider,
    GuildMemberProvider,
=======
const { Guild } = require('./Models');

class GuildsProvider {
    async get(guild) {
        const data = await Guild.findOne({ id: guild.id });
        if (data) return data;
    }

    async update(guild, settings){
        let data = await this.get(guild);
        if(typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] == settings[key]
        }
        return data.updateOne(settings);
    }

    async add(guild, settings){
        let data = await this.get(guild);
        if(typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] == data[key] + settings[key]
        }
        return data.updateOne(settings);
    }
}

class UserProvider {
    async get(user) {
        const data = await Guild.findOne({ id: user.id });
        if (data) return data;
    }

    async update(user, settings){
        let data = await this.get(user);
        if(typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] == settings[key]
        }
        return data.updateOne(settings);
    }

    async add(user, settings){
        let data = await this.get(user);
        if(typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] == data[key] + settings[key]
        }
        return data.updateOne(settings);
    }
}

class GuildMemberProvider {
    async get(guild, user) {
        const data = await Guild.findOne({ userID: user.id, guildID: guild.id });
        if (data) return data;
    }

    async update(guild, user, settings){
        let data = await this.get(guild, user);
        if(typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] == settings[key]
        }
        return data.updateOne(settings);
    }
}

module.exports = {
    GuildsProvider,
    UserProvider,
    GuildMemberProvider,
>>>>>>> 3161726 (ajout fichier ou modification)
}