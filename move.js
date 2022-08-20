const { ApplicationCommandOptionType, ChannelType } = require("discord.js");

module.exports = {
    name: "move",
    description: "move tout les membre d'un channel vers un autre",
    permissions: ["ADMINISTRATOR"],

    run: (client, message, args) => {
        return
    },

    options: [
        {
            name: "channel",
            description: "choisir un channel ou deplacer",
            type: ApplicationCommandOptionType.Channel,
            channelTypes: [ChannelType.GuildVoice, ChannelType.GuildStageVoice],
            required: true,
        }, {
            name: 'role',
            description: 'permet de move tout les gens aillant un role vers le channele en question',
            type: ApplicationCommandOptionType.Role,
            required: false,
        }, {
            name: 'raison',
            description: "<description>",
            type: ApplicationCommandOptionType.String,
            required: false,
        }
    ],
    runInteraction: async (client, interaction) => {
        
        let channel_destination = interaction.options.getChannel("channel");
        let nbMembre = 0;

        if (!interaction.options.getRole('role')) {
            let channel_depart = interaction.guild.members.cache.get(interaction.member.id).voice.channel;

            channel_depart.members.each(async m => {
                m.voice.setChannel(channel_destination.id, `${!interaction.options.getString("raison") ? `pas de raison en particulier` : interaction.options.getString("raison")}`);
                nbMembre++;
            });
            return await interaction.reply(` ${nbMembre} Membre${nbMembre <= 1 ? " à été.e" : "s ont étés.es"} deplacer:\n <#${channel_depart.id}> => <#${channel_destination.id}>`);
        }

        if (interaction.options.getRole('role')) {
            let role = interaction.options.getRole('role');
            let deplacements = [];
            interaction.guild.members.cache.each(async m => {
                if (m.voice.channel) {
                    m.roles.cache.each( r => {
                        if (r.id == role.id) {
                            m.voice.setChannel(channel_destination.id, `${!interaction.options.getString("raison") ? `pas de raison en particulier` : interaction.options.getString("raison")}`);
                            nbMembre++;
                            if (deplacements.find(obj => obj.chanA == m.voice.channel.id)) {
                                deplacements[deplacements.indexOf({ chanA: m.voice.channel.id })].nb += 1;
                            } else {
                                deplacements.push({
                                    chanA: m.voice.channel.id,
                                    chanB: channel_destination.id,
                                    nb: 1
                                });
                            }
                        }
                    })
                }
            })
            return await interaction.reply(`${nbMembre} Membre${nbMembre <= 1 ? " à été.e" : "s ont étés.es"} deplacer:\n${deplacements.map(d => `- <#${d.chanB}>\t=> <#${d.chanA}>`).join('\n')}`);
        }
    }
}