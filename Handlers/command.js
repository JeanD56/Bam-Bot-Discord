const { readdirSync } = require('fs')
const { prefix } = require('../config.json')

module.exports = (bot) => {
    const load = dirs => {
        const commands = readdirSync(`./Commands/${dirs}/`).filter(d => d.endsWith('.js'));
        console.log(`\n**********|/${dirs}\\|**********`);
        for(let file of commands) {
            let pull = require(`../Commands/${dirs}/${file}`);

            if(file.length < 7){
                if(pull.config.command.length < 4 ){
                    console.log(`${file} \t\t( ${prefix}${pull.config.command} )\tChargé ! ☄️`);
                }else{
                    console.log(`${file} \t\t( ${prefix}${pull.config.command} )\tChargé ! ☄️`);
                }
                
            }else{
                if(pull.config.command.length < 4 ){
                    console.log(`${file} \t( ${prefix}${pull.config.command} )\tChargé ! ☄️`);
                }else{
                    console.log(`${file} \t( ${prefix}${pull.config.command} )\tChargé ! ☄️`);
                }
            }

            bot.commands.set(pull.config.command, pull)
            if(pull.config.alias) pull.config.alias.forEach(a => bot.alias.set(a, pull.config.command));
        };
    };
    ["Divers", "Music", "Moderation", "Dev"].forEach(x => load(x));
}