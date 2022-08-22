
module.exports = {
    name: "menuRole",

    runInteraction: async (client, interaction) => {
        let rolesDel = {
            name: [],
            r: [],
            id: []
        }
        let rolesAdd = {
            name: [],
            r: [],
            id: interaction.values
        }
        if (interaction.values) {
            interaction.component.options.map(r => {
                if (interaction.values.includes(r.value)){
                    if (!interaction.member.roles.cache.has(r.value)) {
                        rolesAdd.name.push(r.label);
                        rolesAdd.r.push(interaction.guild.roles.cache.get(r.value));
                    }
                }
                else if (!interaction.values.includes(r.value)) {
                    if (interaction.member.roles.cache.has(r.value)) {
                        rolesDel.id.push(r.value);
                        rolesDel.r.push(interaction.guild.roles.cache.get(r.value));
                        rolesDel.name.push(r.label);
                    }
                }
            })
        }
        await interaction.member.roles.remove(rolesDel.id);
        await interaction.member.roles.add(rolesAdd.id)
        return await interaction.reply({
            content: `les roles ont bien ete mis a jour:${rolesAdd.r ? `\nAjouter:\t${rolesAdd.r.join(', ')}` : ""}${rolesDel.r ? `\nEnlever:\t${rolesDel.r.join(', ')}` : ""}`,
            ephemeral: true
        })
    }
}