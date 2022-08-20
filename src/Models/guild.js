const mongoose = require('mongoose');


const guildSchema = mongoose.Schema({
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
        fun: {
            feur: { type: Boolean, default: false }
        },
        prefix: { type: String, default: "*" },
        log: {
            logChannel: { type: String, default: null },
            memberJoin: { type: Boolean, default: false },
            memberLeave: { type: Boolean, default: false },
            image: { type: String, default: "https://images.photowall.com/products/58243/galaxy-1.jpg?h=699&q=85" },
        },
        mute: {
            global: [{
                user: String,
                debut: Date,
                fin: Date,
            }],
            channel: [{
                user: String,
                channel: String,
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

module.exports = mongoose.model('Guild', guildSchema);