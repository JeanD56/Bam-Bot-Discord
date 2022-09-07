const prefix = process.env.Prefix;

module.exports = {
    name: "messageCreate",

    async execute(client, message) {
        if (message.author.bot) return;
        //if (!message.content.startsWith(prefix)) return;


        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const cmdName = args.shift().toLowerCase();
        if (cmdName.lenght == 0) return;

        let cmd = client.commands.get(cmdName);

        if (cmd && !cmd.permissions.includes([])) {
            if (!message.member.permissions.has([cmd.permissions])) return message.reply({
                content: `Vous n'avez actuellement pas la ou les permissions requise`
            })
        }
        if (cmd) cmd.run(client, message, args);


        let dbGuild = await client.f.db.guild.get(message.guild);
        if (dbGuild.settings.fun.feur){
            let feur = 0
            let content = message.content.toLowerCase().split(' ');
            for (var i = 0; i < content.length; i++) {
                if (content[i] === "quoi" || content[i] === "kwa") feur = 1;
            };
            if (feur == 1) message.reply('Feur !');
        }
    }
}
