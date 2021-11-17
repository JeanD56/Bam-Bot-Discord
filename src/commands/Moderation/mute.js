const { stripIndents } = require('common-tags');
const { Command } = require('discord-akairo');
const { Guild } = require('../../structures/Models');

class MuteCommand extends Command {
    constructor() {
        super('mute', {
            aliases: ['mute'],
            description: {
                content: "in comming",
                usage: "",
                exemples: ["", ""]
            },
            args: [
                { id: 'user', type: 'member' },
                { id: 'channel', type: 'channel' },
                { id: 'dateFinMute', type: 'date', default: -1 },
            ],
            userPermissions: ['ADMINISTRATOR']
        });
    }


    async exec(message, { user, channel, dateFinMute }) {
        let userMute = {}; let messageDestinataire; let messageModo; let muteList = [];
        let guildDB = await this.client.guildSettings.get(message.guild);

        let channelMuted = guildDB.settings.mute.channel;
        let globalMuted = guildDB.settings.mute.global;

        channelMuted = channelMuted.length == 0 ? '_' : channelMuted
            .map(c => stripIndents`
                {\n\tUser: ${this.client.users.cache.get(c.user).username}\n\tChannel: ${this.client.channels.cache.get(c.channel).name}\n\tFin: ${!c.fin ? "indeterminer" : c.fin}\n}`)
            .join(', ');
        globalMuted = globalMuted.length == 0 ? '_' : globalMuted
            .map(g => stripIndents`
                {\n\tUser: ${this.client.users.cache.get(g.user).username}\n\tFin: ${!g.fin ? "indeterminer" : g.fin}\n}`)
            .join(',');

        if (!user) {
            messageModo = stripIndents`__**Utilisateur Muté**__
            \`\`\`js
            Channel: ${channelMuted}
            \`\`\`\`\`\`js
            Global: ${globalMuted}
            \`\`\``

            return message.channel.send({
                content: messageModo
            });
        }

        if (!channel) {
            if (dateFinMute == -1) {
                userMute = {
                    user: user.user.id,
                    debut: message.createAt,
                    global: true,
                };
                messageDestinataire = `Vous avez été mute:\nGuild: \`\`${message.guild.name}\`\`\nDurée: \`\`indefinie\`\``;
                messageModo = `Vous avez mute:\nMember: \`\`${this.client.users.cache.get(user.user.id).username}\`\`\nDurée: \`\`indefinie\`\``;
            } else {
                userMute = {
                    user: user.user.id,
                    debut: message.createAt,
                    fin: dateFinMute,
                    global: true,
                };
                messageDestinataire = `Vous avez été mute:\nGuild: \`\`${message.guild.name}\`\`\nDurée: \`\`${dateFinMute}s\`\``;
                messageModo = `Vous avez mute:\nMember: \`\`${this.client.users.cache.get(user.user.id).username}\`\`\nDurée: \`\`${dateFinMute}s\`\``;
            }
            muteList = guildDB.settings.mute.global;
        } else {
            if (dateFinMute == -1) {
                userMute = {
                    user: user.user.id,
                    debut: message.createAt,
                    global: false,
                    channel: message.channel.id
                };
                messageDestinataire = `Vous avez été mute:\nGuild: \`\`${message.guild.name}\`\`\nChannel: ${channel.name}\nDurée: \`\`indefinie\`\``;
                messageModo = `Vous avez mute:\nMember: \`\`${this.client.users.cache.get(user.user.id).username}\`\`\nChannel: ${channel.name}\nDurée: \`\`indefinie\`\``;
            } else {
                userMute = {
                    user: user.user.id,
                    debut: message.createAt,
                    fin: dateFinMute,
                    global: false,
                    channel: message.channel.id
                };
                messageDestinataire = `Vous avez été mute:\nGuild: \`\`${message.guild.name}\`\`\nChannel: ${channel.name}\nDurée: \`\`${dateFinMute}s\`\``;
                messageModo = `Vous avez mute:\nMember: \`\`${this.client.users.cache.get(user.user.id).username}\`\`\nChannel: ${channel.name}\nDurée: \`\`${dateFinMute}s\`\``;
            }
            muteList = guildDB.settings.mute.channel;
        }

        muteList.push(userMute);

        switch (!channel) {
            case true:
                await Guild.findOne({ id: message.guild.id }).then(data => { data.settings.mute.global = muteList; data.save(); });
                break;
            case false:
                await Guild.findOne({ id: message.guild.id }).then(data => { data.settings.mute.channel = muteList; data.save(); });
                break;
        }
        if (!this.client.users.cache.get(user.user.id).bot) this.client.users.cache.get(user.user.id).send({ content: messageDestinataire });
        return message.channel.send({ content: messageModo });
    }
}

module.exports = MuteCommand;
