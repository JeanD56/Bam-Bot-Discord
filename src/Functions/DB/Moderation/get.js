const { Moderation } = require("../../../Models");

module.exports = {
    name: "get",

    run: async function () {
        const data = await Moderation.findOne({ id: 1 });
        return data
    }
}   