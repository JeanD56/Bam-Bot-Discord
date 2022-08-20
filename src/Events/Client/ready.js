module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        client.log.get('client')(`${client.user.username} est actuellement pret 👍`);

  
        /*let DBmod = await client.f.db.moderation.get();
        if (!DBmod) {
            await client.f.db.moderation.create();
        }*/

        if (client.config.dev.inDev) {
            let devGuildID = client.config.dev.guildDevID;
            const devGuild = await client.guilds.cache.get(devGuildID);
            devGuild.commands.set(client.commands.map(cmd => {
                if (cmd.indev || cmd.ownerOnly) return cmd;
            }));
        }

        client.application.commands.set(client.commands.map(cmd => { return cmd })) 
            /*console.log(cmd)
             (!cmd.indev && !cmd.ownerOnly) return cmd;
        }))*/
    }
}
