const { Guild } = require("../../../Models");

module.exports = {
    name: "get",

    run: async function (guild) {
        const data = await Guild.findOne({ id: guild.id });
        return data;
    }
}