
module.exports = {
    name: "update",

    run: async function (user, settings) {
        let data = await this.get(user);
        if (typeof data !== 'object') data = {};
        for (const key in settings) {
            if (data[key] !== settings[key]) data[key] == settings[key]
        }
        return data.updateOne(settings);
    }
}