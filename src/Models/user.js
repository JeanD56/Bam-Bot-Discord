const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
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

module.exports = mongoose.model('User', userSchema);