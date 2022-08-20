const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);

module.exports = async client => {
    (await pGlob(`${process.cwd()}/src/InterractionEllement/Buttons/*/*.js`)).map(async btnFile => {
        const btn = require(btnFile);

        if (!btn.name) return client.log.get('warn')(`Boutton non-chargee: pas de nom\nFichier -> ${btnFile}`);
        
        client.interactionElement.buttons.set(btn.name, btn);
    });
}