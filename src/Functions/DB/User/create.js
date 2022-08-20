const { User } = require("../../../Models");

module.exports = {
    name: "create",

    run: async function (user) {
        await User.create({
            id: user.id,
            name: user.username,
            discriminator: user.discriminator,
            tag: user.tag,
            bot: user.bot,
        })
        console.log(`New User -> ${user.tag}`);
    }
}