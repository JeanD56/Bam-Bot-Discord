module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        client.log.get('client')(`${client.user.username} est actuellement pret 👍`);
  
        /*let DBmod = await client.f.db.moderation.get();
        if (!DBmod) {
            await client.f.db.moderation.create();
        }*/

        if (client.config.dev.inDev && client.config.dev.guildDevID) {
            let devGuildID = client.config.dev.guildDevID;
            const devGuild = await client.guilds.cache.get(devGuildID);
            if (devGuild) {
                devGuild.commands.set(client.slashInDev.map(cmd => { return cmd }));
            }
        }


        client.application.commands.set(client.commandsInteract.map(cmd => { return cmd }))
    }
}
