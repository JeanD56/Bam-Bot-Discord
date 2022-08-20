const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);

module.exports = async client => {
    (await pGlob(`${process.cwd()}/src/Commands/*/*.js`)).map(async cmdFile => {
        const cmd = require(cmdFile);

        if (!cmd.name) return client.log.get('warn')(`Commande non-chargee: pas de nom\nFichier -> ${cmdFile}`);
        if (!cmd.description && !cmd.type) {
            client.log.get('warn')(`"${cmd.name}" - pas de description\nFichier -> ${cmdFile}`);
            cmd.description = client.config.commandHandler.defaultDescription;
        };
        if (!cmd.permissions) {
            cmd.permissions = []
        }

        cmd.permissions.forEach(perm => {
            if (!permissionList.includes(perm)) {
                return client.log.get('typo')(`la permission "${perm}" de la commande "${cmd.name}" n'est pas valide`)
            }
        })

        if (client.config.commandHandler.automateCategories) {
            if (!cmd.category) {
                let cmdFileArray = cmdFile.split('/');
                cmd.category = cmdFileArray[cmdFileArray.length - 2];
            }
        }


        client.commands.set(cmd.name, cmd);
        //client.commandsSlash.set(cmd.name, cmd)
        
        client.log.get('command')(`loaded => ${cmd.name}`);
    });
}

const permissionList = ['CREATE_INSTANT_INVITE', 'KICK_MEMBERS', 'BAN_MEMBERS', 'ADMINISTRATOR', 'MANAGE_CHANNELS', 'MANAGE_GUILD', 'ADD_REACTIONS', 'VIEW_AUDIT_LOG', 'PRIORITY_SPEAKER', 'STREAM', 'VIEW_CHANNEL', 'SEND_MESSAGES', 'SEND_TTS_MESSAGES', 'MANAGE_MESSAGES', 'EMBED_LINKS', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'MENTION_EVERYONE', 'USE_EXTERNAL_EMOJIS', 'VIEW_GUILD_INSIGHTS', 'CONNECT', 'SPEAK', 'MUTE_MEMBERS', 'DEAFEN_MEMBERS', 'MOVE_MEMBERS', 'USE_VAD', 'CHANGE_NICKNAME', 'MANAGE_NICKNAMES', 'MANAGE_ROLES', 'MANAGE_WEBHOOKS', 'MANAGE_EMOJIS_AND_STICKERS', 'USE_APPLICATION_COMMANDS', 'REQUEST_TO_SPEAK', 'MANAGE_EVENTS', 'MANAGE_THREADS', 'USE_PUBLIC_THREADS', 'CREATE_PUBLIC_THREADS', 'USE_PRIVATE_THREADS', 'CREATE_PRIVATE_THREADS', 'USE_EXTERNAL_STICKERS', 'SEND_MESSAGES_IN_THREADS', 'START_EMBEDDED_ACTIVITIES', 'MODERATE_MEMBERS', -1];