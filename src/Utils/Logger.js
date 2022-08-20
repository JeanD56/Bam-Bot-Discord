const chalk = require('chalk');
const dayjs = require('dayjs')

const Format = `{s1} {tstamp} {tag} {s2} {txt}\n{separateur}`;
const s1Err = "***"; s2Err = "*************";

function write(content, { tagColor = 'white', bgTagColor = 'bgBlack', tag = "log", error = false }) {
    const timestamp = `[${dayjs().format('DD/MM - HH:mm:ss')}]`;
    const logTag = `[${tag}]`;
    let separateur = [];
    const stream = error ? process.stderr : process.stdout;

    if (error) {
        for (let i = 0; i < s1Err.length + timestamp.length + logTag.length + s2Err.length + 3; i++) separateur = separateur + "*";
        separateur = separateur + "\n";
        const item = Format
            .replace('{s1}', chalk.white(s1Err))
            .replace('{tstamp}', chalk.gray(timestamp))
            .replace('{tag}', chalk[bgTagColor][tagColor](logTag))
            .replace('{s2} {txt}', chalk.white("{s2}\n{txt}"))
            .replace('{s2}', chalk.white(s2Err))
            .replace('{txt}', chalk.white(content))
            .replace('{separateur}', chalk.white(separateur));
        stream.write(item)
    }
    else {
        const item = Format
            .replace('{s1}', chalk.white(""))
            .replace('{tstamp}', chalk.gray(timestamp))
            .replace('{tag}', chalk[bgTagColor][tagColor](logTag))
            .replace('{s2}', chalk.white("=>"))
            .replace('{txt}', chalk.white(content))
            .replace('{separateur}', chalk.white(""));
        stream.write(item)
    }
}

function error(content) {
    write(content, {
        tagColor: 'black',
        bgTagColor: 'bgRed',
        tag: 'ERROR',
        error: true
    })
}
function warn(content) {
    write(content, {
        tagColor: 'black',
        bgTagColor: 'bgYellow',
        tag: 'WARN',
    })
}
function typo(content) {
    write(content, {
        tagColor: 'black',
        bgTagColor: 'bgCyan',
        tag: 'TYPO',
    })
}
function command(content) {
    write(content, {
        tagColor: 'black',
        bgTagColor: 'bgGreen',
        tag: 'CMD',
    })
}
function event(content) {
    write(content, {
        tagColor: 'black',
        bgTagColor: 'bgMagenta',
        tag: 'EVT',
    })
}
function clientl(content) {
    write(content, {
        tagColor: 'black',
        bgTagColor: 'bgBlue',
        tag: 'CLIENT',
    })
}

module.exports = async client => {
    client.log.set(`${error.name}`, error);
    client.log.set(`${warn.name}`, warn);
    client.log.set(`${typo.name}`, typo);
    client.log.set(`${command.name}`, command);
    client.log.set(`${event.name}`, event);
    client.log.set(`client`, clientl);
}