const { stripIndent } = require('common-tags');
const { Command } = require('discord-akairo');
const { MessageActionRow, MessageButton } = require('discord.js');

class HelpCommand extends Command {
    constructor() {
        super('help', {
            aliases: ['help', 'h'],
            description: {
                content: "permet de voir les information des commandes du bot",
                usage: "<command>",
                exemples: ["", "<command Name>", "<command Alias>"]
            },
            args: [{ id: 'command', type: 'commandAlias' }]
        });
    }

    async exec(message, args) {
        try {
            const moderationDB = this.client.moderation.get();
            let GitHubLink = "https://www.github.com/"
            if(moderationDB.GitHubLink) GitHubLink = moderationDB.GitHubLink;
            let row = new MessageActionRow().addComponents(
                new MessageButton()
                    .setLabel('GitHub')
                    .setURL(GitHubLink)
                    .setStyle('LINK')
                    .setDisabled(false)
            );

            let prefix = await this.handler.prefix(message);

            let embed = this.client.functions.embed(message)
                .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL())
                .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
                .setTimestamp()

            if (!args.command) {
                embed
                    .setDescription(`Commands disponible pour ${message.author.username} \nsur le serveur \`\`${message.guild.name}\`\`\n**=================**`)
                    .setTitle('')

                for (const category of this.handler.categories.values()) {
                    let cmdName;

                    if (!this.client.ownerID.includes(message.author.id)) {
                        cmdName = `${category
                            .filter(cmd => cmd.id.length > 0)
                            .filter(cmd => !cmd.ownerOnly)
                            .filter(cmd => {
                                if (cmd.userPermissions) {
                                    if (this.client.guilds.cache.get(message.guild.id).members.cache.get(message.author.id).permissions.has(cmd.userPermissions)) {
                                        return cmd
                                    } else {
                                        return
                                    }
                                } else {
                                    return cmd
                                }
                            })     //on prend les commands si l'utilisateur a les permission requise
                            .map(cmd => `\`${cmd.id}\``)
                            .join(', ')}`;
                    } else {
                        cmdName = `${category
                            .filter(cmd => cmd.aliases.length > 0)
                            .map(cmd => `\`${cmd.id}\``)
                            .join(', ')}`;
                    }

                    if (cmdName !== "") {
                        embed.addField(`__` + category.id + `__`, cmdName);
                    }
                }

                embed.addField(
                    `=================`,
                    `**\`${prefix}help <command>\` pour plus d'info**`
                )

            } else {
                //if(args.command.userPermissions == message.user.userPermission);
                if (args.command.ownerOnly && message.author.id == this.client.ownerID || !args.command.ownerOnly) {
                    let description = "description non defini";
                    let usage = "usage non defini";
                    let exemples = "pas d'exemple";

                    if (args.command.description) {
                        if (args.command.description.content) {
                            description = args.command.description.content;
                        }
                        if (args.command.description.usage) {
                            usage = prefix + args.command.id + " " + args.command.description.usage;
                        }
                        if (args.command.description.exemples) {
                            exemples = "\n\t"+prefix + args.command.id + " " + args.command.description.exemples.join(`\n\t${prefix}${args.command.id} `)
                        }
                    }

                    let msg = `> usage: ${usage}`;
                    msg = msg + `\n > ex: ${exemples}`;
                    msg = msg + `\n > alias: [${args.command.aliases.join(', ')}]`;


                    embed.setTitle(`Help Command => **${args.command.id}**`)
                        .setDescription(description)
                        .addField("\u200B", stripIndent`\`\`\`makefile\n ${msg} \`\`\``, false);

                    if (message.author.id == this.client.ownerID) {
                        let msgOwner = `> category:  ${args.command.category}`;
                        msgOwner = msgOwner + `\n > channel:   ${args.command.channel}`;
                        msgOwner = msgOwner + `\n > editable:  ${args.command.editable}`;
                        msgOwner = msgOwner + `\n > flags:     ${args.command.flags}`;
                        msgOwner = msgOwner + `\n > cooldown:  ${args.command.cooldown}`;
                        msgOwner = msgOwner + `\n > condition: ${args.command.condition}`;
                        msgOwner = msgOwner + `\n > NSFW?:     ${args.command.onwlyNsfw}`;
                        msgOwner = msgOwner + `\n > prefix:    ${args.command.prefix}`;
                        msgOwner = msgOwner + `\n > UserPerms: ${args.command.userPermission}`;
                        msgOwner = msgOwner + `\n > regex:     ${args.command.regex}`;
                        msgOwner = msgOwner + `\n > Slash:     ${args.command.slash}`;
                        msgOwner = msgOwner + `\n > args:      ${args.command.args}`;

                        embed.addField("Owner: ", stripIndent`\`\`\`makefile\n ${msgOwner} \`\`\``, false)
                            .setAuthor(`${args.command.ownerOnly ? '/!\\ Owner Only /!\\' : message.author.tag}`, message.author.displayAvatarURL())
                    }
                }
            }
            return message.channel.send({
                embeds: [embed],
                components: [row]
            });

        } catch (e) {
            console.log(e);
        }
    }
}

module.exports = HelpCommand;
