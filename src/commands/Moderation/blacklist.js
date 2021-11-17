const { stripIndents } = require('common-tags');
const { Command } = require('discord-akairo');
const { Guild, User } = require('../../structures/Models');

class BlacklistCommand extends Command {
    constructor() {
        super('blacklist', {
            aliases: ['blacklist', "bl"],
            description: {
                content: "permet de blocker les commandes des utilisateur ou channel ou guild dans la blacklist",
                usage: `[user | channel | guild | globalUser] <add|rm> (@member | #channel | <id>)`,
                exemples: ["", "user add @member", "channel rm <id>", "channel add @channel"]
            },
            args: [
                { id: 'target', type: 'string' },
                { id: 'action', type: 'string' },
                { id: 'id', type: 'string' }
            ],
            userPermissions: ['ADMINISTRATOR'],
        });
    }

    async exec(message, { target, action, id }) {
        const guildBL = await this.client.guildSettings.get(message.guild);
        const guildBlacklisted = await this.client.guildSettings.find({ blacklisted: true });
        const globalUserBlacklisted = await this.client.userSettings.find({ blacklisted: true });

        const userBlacklistID = guildBL.settings.blacklist.users.length == 0 ? '_' : this.client.users.cache.filter(m => guildBL.settings.blacklist.users.includes(m.id)).map(m => `${m.username}#${m.discriminator} `);
        const channelsBlacklistID = guildBL.settings.blacklist.channels.length == 0 ? '_' : guildBL.settings.blacklist.channels.join(', ');
        const guildBlackListID = guildBlacklisted.length == 0 ? '_' : guildBlacklisted.filter(g => g.name).join(', ');
        const globalUserBlacklistID = globalUserBlacklisted.length == 0 ? '_' : globalUserBlacklisted.filter(u => u.name).join(', ');

        if (!target) {
            let message0 = "";
            let message1 = stripIndents`\`\`\`
            User: ${userBlacklistID}
            Channel: ${channelsBlacklistID}
            \`\`\``;

            let messageOwner = stripIndents`\`\`\`
            Global User: ${globalUserBlacklistID}
            Guild: ${guildBlackListID}
            \`\`\``;

            if (this.client.ownerID.includes(message.author.id)) {
                message0 = "__**Blacklist**__" + message1 + " **__Blacklist__-__Owner__**\n" + messageOwner;
            } else { message0 = "__**Blacklist**__" + message1; }

            return message.channel.send(message0);
        } else {
        }

        target = target.toLowerCase();
        if (!target.match(/^(channel|guild|user|global)$/)) return message.channel.send(`\`${target}\` n'est pas un argument valide`)

        let idTargeted;
        let idToBlacklist;
        let targetToBlacklist;
        switch (target) {
            case "user":
                idTargeted = userBlacklistID;
                targetToBlacklist = guildBL.settings.blacklist.users;
                break;
            case "channel":
                idTargeted = channelsBlacklistID;
                targetToBlacklist = guildBL.settings.blacklist.channels;
                break;
            case "guild":
                idTargeted = guildBlackListID;
                targetToBlacklist = "";
                break;
            case "global":
                idTargeted = globalUserBlacklistID;
                targetToBlacklist = "";
                break;
        }

        if (target && !action) {
            return message.channel.send(`\`\`\` ${target.charAt(0).toUpperCase() + target.slice(1).toLowerCase()}: ${idTargeted} \`\`\``);
        }

        action = action.toUpperCase();
        if (!action.match(/^(ADD|RM)$/)) return message.channel.send(`\`${action}\` n'est pas un action valide`);

        if (!id) {
            return message.channel.send(`Noublier de donner un id`);
        } else {
            switch (id.charAt(0) + id.charAt(1)) {
                case "<@":
                    if (target != "user" || "global") return message.reply('tu ne peux pas blacklist un utilisateur aileurs que dans leur category');
                    idToBlacklist = id.replace("<@!", "").replace(">", "");
                    break;
                case "<#":
                    if (target != "channel") return message.reply('tu ne peux pas blacklist un channel ailleurs que dans la category channel');
                    idToBlacklist = id.replace("<#", "").replace(">", "");
                    break;
                default:
                    idToBlacklist = id;
                    break;
            }
        }
        if (/[^0-9]$/i.test(parseInt(idToBlacklist))) return message.channel.send(`l'ID doit etre un nombre.`);
        console.log(idToBlacklist);

        if (action == "ADD") {
            targetToBlacklist.push(idToBlacklist);
        } else {
            const idToRemove = targetToBlacklist.findIndex(ID => ID == idToBlacklist);
            if (idToRemove == -1) return message.reply(`${id} n'est pas dans la blacklist`);
            targetToBlacklist.splice(idToRemove, 1);
        }

        if (target.match(/^(guild|global)$/) && ownerID.includes(message.author.id)) return message.reply(`vous n'avez pas les droits pour ce genre de blacklist`);

        switch (target) {
            case "user":
                await Guild.findOne({ id: message.guild.id }).then(data => { data.settings.blacklist.users = targetToBlacklist; data.save(); });
                break;
            case "channel":
                await Guild.findOne({ id: message.guild.id }).then(data => { data.settings.blacklist.channels = targetToBlacklist; data.save(); });
                break;
            case "guild":
                await Guild.findOne({ id: message.guild.id }).then(data => { data.blacklisted = ""/*true || false*/; data.save(); });
                break;
            case "global":
                await User.findOne({ id: message.guild.id }).then(data => { data.blacklisted = ""/*true || false*/; data.save(); });
                break;
        }

        return message.reply(`__**Blacklist**__\n${id} a bien été blacklist!`);
    }
}

module.exports = BlacklistCommand;