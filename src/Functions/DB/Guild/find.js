const { Guild } = require("../../../Models");

module.exports = {
    name: "find",

    run: async function (param) {
        const data = await Guild.find(param);
        return data;
    }
}