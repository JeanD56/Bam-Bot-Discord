const { Formatters } = require("discord.js");
const dayjs = require('dayjs');

module.exports = {
    name: "guildMemberAdd",

    async execute(client, member) {
        const logChannel = client.channels.cache.get("544351989056667648");

        const Timestamp = {
            constant: Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.ShortDateTime),
            relative: Formatters.time(dayjs(member.joinedTimestamp).unix(), Formatters.TimestampStyles.RelativeTime)
        }

        logChannel.send({
            content: `${member.user.tag} viens de rejoindre le didi à ${Timestamp.constant} (${Timestamp.relative})`
        })
    }
}