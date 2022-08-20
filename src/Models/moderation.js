const mongoose = require('mongoose');


const moderationSchema = mongoose.Schema({
    id: { type: Number, default: 1 },
    prefixDefault: { type: String, default: "+" },
    GitHubLink: { type: String, default: "https://github.com/JeanD56/Bam-Bot-Discord" },
    ownersID: [{ type: String }],
    status: [{
        messages: { type: String, default: "Bonsoir !" },
        status: { type: String, default: "dnd" },
        type: { type: String, default: "LISTENING" },
        url: { type: String, default: "" },
    }],
    dashboard: {
        clientID: { type: String, default: "" },
        oauthSecret: { type: String, default: "" },
        callbackurl: { type: String, default: "http://localhost:3030/callback" },
        secret: { type: String, default: "" },
        domaine: { type: String, default: "localhost" },
        port: { type: String, default: "3030" },
    }
})

module.exports = mongoose.model('Moderation', moderationSchema);