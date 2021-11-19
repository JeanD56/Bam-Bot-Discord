const { Schema, model } = require('mongoose');

const defaultPrefix = process.env.Prefix

const guildSchema = Schema({
    id: String,
    name: String,
    owner: String,
    members: [{
        id: String,
        name: String,
        xp: {
            levels: { type: Number, default: 0 },
            number: { type: Number, default: 0 },
        },
        bot: Boolean
    }],
    bots: [{
        id: String,
        name: String,
    }],
    joinedAt: Date,
    anniversaires: [{
        id: String,
        date: String,
        channels: [String]
    }],
    settings: {
        prefix: { type: String, default: defaultPrefix },
        log: {
            logChannel: { type: String, default: null },
            memberJoin: { type: Boolean, default: false },
            memberLeave: { type: Boolean, default: false },
            image: { type: String, default: "https://images.photowall.com/products/58243/galaxy-1.jpg?h=699&q=85" },
        },
        mute: {
            global: [{
                user: String,   //userID
                debut: Date,
                fin: Date,
            }],
            channel: [{
                user: String,   //userID
                channel: String,//channelID
                debut: Date,
                fin: Date
            }]
        },
        blacklist: {
            channels: [String],
            users: [String],
        },
        whitelist: {
            users: [String],
            roles: [String]
        },
        xp: {
            global: { type: Boolean, default: true }
        },
        whitelisted: { type: Boolean, default: false }
    },
    blacklisted: { type: Boolean, default: false }
});


const userSchema = Schema({
    id: String,
    name: String,
    discriminator: String,
    tag: String,
    xp: {
        levels: { type: Number, default: 0 },
        number: { type: Number, default: 0 }
    },
    bot: { type: Boolean, default: false },
    premium: { type: Boolean, default: false },
    blacklisted: { type: Boolean, default: false }
});

const moderationSchema = Schema({
    id: { type: Number, default: 1 },
    prefixDefault: { type: String, default: defaultPrefix },
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

module.exports = {
    Guild: model('Guild', guildSchema),
    User: model('User', userSchema),
    Moderation: model('Moderation', moderationSchema)
}