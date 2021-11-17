const { stripIndents } = require('common-tags');
const { Command } = require('discord-akairo');
const { Guild } = require('../../structures/Models');

class WhitelistCommand extends Command {
    constructor() {
        super('whitelist', {
            aliases: ['whitelist', "wl"],
            description: {
                content: "si activer:\n\tpermet de blocker les commandes de @everyone sauf si la personne est un admin ou est dans la whitelist",
                usage: `(user|roles (activate)) (@member | @roles (false|true)) {add|rm}`,
                exemples: ["", "activate true", "user @member add", "roles @roles rm"]
            },
            args: [
                { id: 'target', type: 'string' },
                { id: 'action', type: 'string' },
                { id: 'id', type: 'string' },
            ],
            userPermissions: ['ADMINISTRATOR'],
        });
    }

    async exec(message, { target, action, id }) {
        const guildWl = await this.client.guildSettings.get(message.guild);

        const userWhitelistID = guildWl.settings.whitelist.users.length == 0 ? '_' : guildWl.settings.whitelist.users.join(', ');
        const rolesWhitelistID = guildWl.settings.whitelist.roles.length == 0 ? '_' : guildWl.settings.whitelist.roles.join(', ');

        if (!target) {
            let message0 = "__**Whitelist**__";
            let message1 = stripIndents`\`\`\`
            User: ${userWhitelistID}
            Roles: ${rolesWhitelistID}
            \`\`\``;

            if(guildWl.settings.whitelisted == true){
                message0 = message0 + "\t\t Activer";
            }else{message0 = message0 + "\t\t Desactiver"}
            message0 = message0 + message1;

            return message.channel.send(message0);
        } else {
        }

        target = target.toLowerCase();
        if (!target.match(/^(user|roles|activate)$/)) return message.channel.send(`\`${target}\` n'est pas un argument valide`)

        let idTargeted;
        let idToWhitelist = "";
        let targetToWhitelist = [];
        switch (target) {
            case "user":
                idTargeted = userWhitelistID;
                targetToWhitelist = guildWl.settings.whitelist.users;
                break;
            case "roles":
                idTargeted = rolesWhitelistID;
                targetToWhitelist = guildWl.settings.whitelist.roles;
                break;
            case "activate":
                action = action.toLowerCase();
                if (!action.match(/^(true|false)$/)) return message.channel.send(`\`${action}\` n'est pas un action valide`);
                await Guild.findOne({ id: message.guild.id }).then(data => { data.settings.whitelisted = action; data.save(); });
                return message.channel.send(`la Whitelist est bien passé a ${action} sur ce serveur`);

        }

        if (target && !action) {
            return message.channel.send(`\`\`\` ${target.charAt(0).toUpperCase() + target.slice(1).toLowerCase()}: ${idTargeted} \`\`\``);
        }

        action = action.toUpperCase();
        if (!action.match(/^(ADD|RM)$/)) return message.channel.send(`\`${action}\` n'est pas un action valide`);

        if (!id) {
            return message.channel.send(`N'oubliez pas de donner un id`);
        } else {
            console.log(id);
            switch (id.charAt(0) + id.charAt(1)+ id.charAt(2)) {
                case "<@!":
                    if (target != "user") return message.reply('tu ne peux pas whitelist un utilisateur aileurs que dans leur category');
                    idToWhitelist = id.replace("<@!", "").replace(">", "");
                    break;
                case "<@&":
                    if (target != "roles") return message.reply('tu ne peux pas whitelist un utilisateur aileurs que dans leur category');
                    idToWhitelist = id.replace("<@&", "").replace(">", "");
                    break;
                default:
                    idToWhitelist = id;
                    break;
            }
        }
        if (/[^0-9]$/i.test(parseInt(idToWhitelist))) return message.channel.send(`l'ID doit etre un nombre.`);
        console.log(idToWhitelist);

        if (action == "ADD") {
            targetToWhitelist.push(idToWhitelist);
        } else {
            const idToRemove = targetToWhitelist.findIndex(ID => ID == idToWhitelist);
            if (idToRemove == -1) return message.reply(`${id} n'est pas dans la whitelist`);
            targetToWhitelist.splice(idToRemove, 1);
        }

        switch (target) {
            case "user":
                await Guild.findOne({ id: message.guild.id }).then(data => { data.settings.whitelist.users = targetToWhitelist; data.save(); });
                break;
            case "roles":
                await Guild.findOne({ id: message.guild.id }).then(data => { data.settings.whitelist.roles = targetToWhitelist; data.save(); });
                break;
        }

        return message.reply(`__**Whitelist**__\n${id} a bien été modifier whitelist!`);
    }
}

module.exports = WhitelistCommand;