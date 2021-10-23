const { Schema, model } = require('mongoose');
const { PREFIX } = require('../util/config');

const guildSchema = Schema({
    id: String,
    name: String,
    prefix: { type: String, default: PREFIX },
    owner: String,
    log: {
        logChannel: { type: String, default: null },
        memberJoin: { type: Boolean, default: false },
        memberLeave: { type: Boolean, default: FontFaceSetLoadEvent },
        image: { type: String, default: "https://images.photowall.com/products/58243/galaxy-1.jpg?h=699&q=85" },
        autorole: {
            active: {type: Boolean, default: false},
            role: [String]
        }
    },
    xp: {
        global: { type: Boolean, default: true }
    },
    joinedAt: Date
});

const commandSchema = Schema({
    cmdName: String
});

const guildMemberSchema = Schema({
    guildID: String,
    userID: String,
    xp: {
        levels: { type: Number, default: 0 },
        number: { type: Number, default: 0 }
    },
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
    baned: {type: Boolean, default: false}
});

module.exports = {
    Guild: model('Guild', guildSchema),
    User: model('User', userSchema),
    GuildMember: model('GuildMember', guildMemberSchema),
    Command: model('Command', commandSchema)
}