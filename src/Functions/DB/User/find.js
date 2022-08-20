const { User } = require("../../../Models");

module.exports = {
    name: "find",

    run: async function (param) {
        const data = await User.find(param);
        if (data) return data;
    }
}