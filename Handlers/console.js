const { Channel } = require('../config.json');
var { channelConsolAllow, nbChannelConsolAllow } = require('../config.json')

module.exports = (bot) => {
    let prompt = process.openStdin();

    prompt.addListener("data", res => {
        let x = res.toString().trim().split(/ +/g)

            for(let i=0; i<channelConsolAllow; i++){
                bot.channels.resolve(channelConsolAllow[i]).send(x.join(" "));
            }
        });
    }