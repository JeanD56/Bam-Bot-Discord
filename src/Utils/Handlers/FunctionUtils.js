const { promisify } = require('util');
const { glob } = require('glob');
const { Collection } = require('discord.js');

const pGlob = promisify(glob);

module.exports = async client => {
    (await pGlob(`${process.cwd()}/src/Functions/*/*/*.js`)).map(async fFolder => {
        (await pGlob(`${process.cwd()}/src/Functions/*`)).map(async folderFFolder => {
            let lFolder1 = folderFFolder.split('/').lenght;
            let nFolder1 = folderFFolder.split('/')[lFolder1];
            //if (!client[nFolder1]) client[nFolder1] = new Collection();

            if (nFolder1 === fFolder.split('/')[lFolder1]) {
                (await pGlob(`${process.cwd()}/src/Functions/${nFolder1}/*`)).map(async folder2FFolder => {
                    let lFolder2 = folder2FFolder.split('/').lenght;
                    let nFolder2 = folder2FFolder.split('/')[lFolder2];

                    if (nFolder2 === fFolder.split('/')[lFolder2]) {
                        (await pGlob(`${process.cwd()}/src/Functions/${nFolder1}/${nFolder2}/*.js`)).map(async f2Folder => {
                            let lf = f2Folder.split('/').lenght;
                            let nf = f2Folder.split('/')[lf];

                            if (lf === fFolder.split('/')[lf]) {
                                console.log(f2Folder);
                            }
                            //const f = require(fFolder);
                        });
                    }
                    //const f = require(fFolder);
                });
            }
            //const f = require(fFolder);

        });
        //const f = require(fFolder);

    });

    (await pGlob(`${process.cwd()}/src/Functions/*.js`)).map(async fFile => {
        const f = require(fFile);

        client.f.set(f.name, f);
    });
}