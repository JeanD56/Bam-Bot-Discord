const { ListenerHandler, Listener } = require('discord-akairo');
const moment = require('moment')

class ReadyListner extends Listener {
    constructor() {
        super('ready', {
            emitter: 'client',
            event: 'ready'
        });
    }

    async exec() {

        await CreateGuildDB(this.client);
        await CreateUserDB(this.client);
        await CreateModerationDB(this.client);

        require('../../structures/dashboard')(this.client);

        console.log(`${this.client.user.username} est desormais en ligne !`);

        let i = 0; let status = [""]; let cooldown = 1000 * 60;
        setInterval(async _ => {
            const moderation = await this.client.moderation.get();
            status = moderation.status;

            if (moderation.ownerID != this.client.ownerID) if (moderation.ownersID.length > 0) this.client.ownerID = moderation.ownersID;     //mise a jour de la list des ownerID dispo dans la DB

            if (status.length == 0) {
                this.client.user.setActivity("");
            } else {
                if (i >= status.length) i = 0;

                let nameActivties = status[i].messages;

                let typeActivties = "PLAYING";
                if (status[i].type.match(/^(PLAYING|STREAMING|LISTENING|WATCHING|CUSTOM|COMPETING)$/)) typeActivties = status[i].type;

                let urlActivties = status[i].url;
                if (!urlActivties) urlActivties = "https://github.com/JeanD56/Bam-Bot-Discord";

                let statusActivities = "idle";
                if (status[i].status.match(/^(online|idle|dnd|invisible)$/)) statusActivities = status[i].status;

                this.client.user.setPresence({
                    activities: [{
                        name: nameActivties,
                        type: typeActivties,
                        url: urlActivties
                    }],
                    status: statusActivities
                });
                i++;
            }
        }, cooldown);

        setInterval(async _ => {
            moment.locale("fr")
            if (moment().format('LTS') == '00:00:00') {
                let guilds = this.client.guilds.cache;
                guilds.forEach(async g => {
                    let guildDB = await this.client.guildSettings.get(g);
                    if (guildDB.anniversaires) {
                        guildDB.anniversaires.forEach(anniv => {
                            const jour = moment().format('ll').split(" ")[0];
                            const lendemain = moment().add(1, 'days').format('ll').split(" ")[0].toLowerCase();
                            const mois = moment().format('ll').split(" ")[1].replace(".", "").toLowerCase();
                            if (anniv.date == jour + " " + mois) {
                                let name = this.client.guilds.cache.get(g.id)
                                    .members.cache.get(anniv.id).displayName;

                                this.client.guilds.cache.get(g.id)
                                    .members.cache.get(anniv.id).edit({ nick: name + " 🎂" });

                                console.log(guildDB.anniversaires);
                                anniv.channels.forEach(c => {
                                    this.client.channels.cache.get(c).send(`c'est actuellement l'anniversaire de <@${anniv.id}>\n faites lui de gros poutoux`);
                                });
                            } else if (anniv.date == lendemain + " " + mois) {
                                let name = this.client.guilds.cache.get(g.id)
                                    .members.cache.get(anniv.id).displayName;

                                name = name.split('🎂');
                                this.client.guilds.cache.get(g.id)
                                    .members.cache.get(anniv.id).edit({ nick: name[0] });
                            }
                        });
                    }
                });
            }
        }, 1000);

    }
}

module.exports = ReadyListner;



function CreateGuildDB(client) {
    const guild = [];                                               //creation automatique de la collection des Serveur
    client.guilds.cache.map(g => guild.push(g));

    guild.forEach(async g => {
        const data = await client.guildSettings.get(g);
        if (!data) client.guildSettings.create(g);
    })
}

function CreateUserDB(client) {
    const user = [];                                                //creation automatique de la collection des Utilisateur
    client.users.cache.map(u => user.push(u));
    user.forEach(async u => {
        const data = await client.userSettings.get(u);
        if (!data) client.userSettings.create(u);
    })
}

async function CreateModerationDB(client) {
    let moderationData;                                             //creation automatique de la collection de Moderation
    moderationData = await client.moderation.get();
    if (!moderationData) client.moderation.create()
}
