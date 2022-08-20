const { User } = require("../../../Models");

module.exports = {
    name: "get",

    run: async function (user) {
        const data = await User.findOne({ id: user.id });
        if (data) return data;
    }
}