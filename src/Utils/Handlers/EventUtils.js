const { promisify } = require('util');
const { glob } = require('glob');

const pGlob = promisify(glob);

module.exports = async client => {
    (await pGlob(`${process.cwd()}/src/Events/*/*.js`)).map(async eventFile => {
        const event = require(eventFile);

        if (!event.name) return client.log.get('error')(`***********\nEvenement non-chargée: pas de nom\nFichier -> ${eventFile}\n***********`);

        if (event.once) {
            client.once(event.name, (...args) => event.execute(client, ...args));
        } else {
            client.on(event.name, (...args) => event.execute(client, ...args));
        }

        client.log.get('event')(`loaded => ${event.name}`);
    })
}