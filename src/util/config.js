const Config = require('../../config.json')

module.exports = {
    TOKEN: process.env.TOKEN || Config.TOKEN,
    OWNERID: process.env.OWNERSID || Config.OwnerID,
    PREFIX: process.env.PREFIX || Config.Prefix,
    MONGOOSTRING: process.env.MOONGOSTRING || Config.MOONGOSTRING
}
