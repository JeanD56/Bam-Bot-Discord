const { Moderation } = require("../../../Models");

module.exports = {
    name: "create",

    run: async function () {
        const createdMod = new Moderation({
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
        createdMod.save().then(m => console.log("creation de la collection de Moderation"));
    }
}