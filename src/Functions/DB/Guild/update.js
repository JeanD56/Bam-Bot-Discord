
module.exports = {
    name: "update",

    run: async function (guild, settings) {
        let data = await this.get(guild);
        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] == settings[key]
        }
        return data.updateOne(settings);    
    }
}