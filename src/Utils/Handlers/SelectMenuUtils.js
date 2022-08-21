const { promisify } = require('util');
const { glob } = require('glob');
const pGlob = promisify(glob);

module.exports = async client => {
    (await pGlob(`${process.cwd()}/src/InterractionEllement/SelectMenu/*/*.js`)).map(async slctMenuFile => {
        const slctMenu = require(slctMenuFile);

        if (!slctMenu.name) return client.log.get('warn')(`Menu non-chargee: pas de nom\nFichier -> ${slctMenuFile}`);

        client.interactionElement.selectMenus.set(slctMenu.name, slctMenu);
    });
}