const { promisify } = require('util');
const { glob } = require('glob');
const { Collection } = require('discord.js');

const pGlob = promisify(glob);

module.exports = async client => {
    
    (await pGlob(`${process.cwd()}/src/Functions/DB/Guild/*.js`)).map(async fFile => {
        const f = require(fFile);

        client.f.db.guild.set(f.name, f);
    });
    (await pGlob(`${process.cwd()}/src/Functions/DB/Moderation/*.js`)).map(async fFile => {
        const f = require(fFile);

        client.f.db.moderation.set(f.name, f);
    });
    (await pGlob(`${process.cwd()}/src/Functions/DB/User/*.js`)).map(async fFile => {
        const f = require(fFile);

        client.f.db.user.set(f.name, f);
    });
}