module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        client.log.get('client')(`${client.user.username} est actuellement pret 👍`);




        if (!await client.f.db.moderation.get()) await client.f.db.moderation.create();

        client.guilds.cache.map(async g => {
            if (!await client.f.db.guild.get(g)) await client.f.db.guild.create(g);
        });

        client.users.cache.map(async u => {
            if (!await client.f.db.user.get(u)) await client.f.db.user.create(u);
        });



        if (client.config.dev.inDev && client.config.dev.guildDevID) {
            client.config.dev.guildDevID.map(async gIdDev => {
                const devGuild = await client.guilds.cache.get(gIdDev);
                if (devGuild) {
                    devGuild.commands.set(client.slashInDev.map(cmd => { return cmd }));
                }
            })
        }

        client.application.commands.set(client.commandsInteract.map(cmd => { return cmd }))
    }
}
