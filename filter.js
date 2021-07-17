//// filter-ai main module /////////////////

const appname = 'filter-ai'
const startData = `
 * AceiusIO - www.acei.us
 * Emantella - Initial Data
`

const config = require('./configparser');
const print = require('spray-print');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

const tier1 = process.argv[2]
const tier2 = process.argv[3]
const tier3 = process.argv[4]

let tier1list;
let tier2list;
let tier3list;
let mode;

function processList(list, tier) {
    print.println('WordList',chalk.green(list)+' (list for tier '+tier+') words defined as:\n');
    try {
        const data = fs.readFileSync(list, 'utf8')
        console.log(chalk.yellow(data));
        if (tier == 1) {
            tier1list = data
        } else if (tier == 2) {
            tier2list = data
        } else if (tier == 3) {
            tier3list = data
        }
    } catch (err) {
        print.error(err);
    }
}

function createEulaFile() {
    try {
        const eula = "By accepting the eula and using the software, you aggree that you will use it only for the right reasons, and that you will respect the GNU GPL v3 when forking or otherwise remixing the software. \neula=false"
        const data = fs.writeFileSync('./eula.txt', eula)
    } catch (err) {
        print.error(err)
    }
    print.warn('You have not agreed to the eula. Please do so in eula.txt if you wish to continue');
}

function isEulaAccepted() {
    try {
        const data = fs.readFileSync('./eula.txt', 'utf8')
        if (data.includes('true')) {
            main();
        } else {
            print.warn('You have not agreed to the eula. Please do so in eula.txt if you wish to continue');
        }
    } catch (err) {
        print.error(err);
    }
}

function analyseAndCensor() {
    try {
        const data = fs.readFileSync('./content.txt', 'utf8')
        if (data.includes(tier1list) && mode == 1) {
            print.warn('content.txt contains a violation of tier 1');
        } else if (data.includes(tier2list)&& mode == 2) {
            print.warn('content.txt contains a violation of tier 2');
        } else if (data.includes(tier3list)) {
            print.error('content.txt contains a violation of tier 3!');
        } else {
            print.sucess('content.txt is free of bad content! :D');
        }
    } catch (err) {
        print.error(err);
    }
}

function init() {
    if (tier1 == null) {
        print.error('Incorrect useage.');
        console.log(chalk.red('node filter.js <option|tier1wordlist> <tier2wordlist> <tier3wordlist>')+'\nUse node filter.js --help or -h');
        return;
    } else if (tier1 == '--help' || tier1 == '-h') {
        print.println('Docs are avalible at https://aceius.gitbook.io/wiki');
        console.log(`Usage: node filter.js <option|tier1wordlist> <tier2wordlist> <tier3wordlist>\nExamples:\n  node filter.js --help/-h ::: Shows this menu\n  node filter.js tier1list.txt tier2list.txt tier3list.txt ::: Runs the algorithm with list inputs and scanning ./content.txt\nEdit filter.properties to change settings.`);
        return;
    }
    config.load();
    console.log(chalk.bold.red('filter-ai'));
    console.log(chalk.italic('Learns to censor'));
    console.log(startData)
    processList(tier1, 1);
    processList(tier2, 2);
    processList(tier3, 3);
    console.log(chalk.bold('['+chalk.blue('WordList')+'] ')+'Final wordlist is now:');
    console.log(chalk.yellow(tier1list+'\n'+tier2list+'\n'+tier3list))
    if (fs.existsSync('./eula.txt')) {
        isEulaAccepted();
    } else {
        createEulaFile();
    }
}

function main() {
    print.println('Preparing to recive data...');
    print.println('Ready to censor.');
    if (fs.existsSync('./content.txt')) {
        analyseAndCensor();
    } else {
        const createInpurFile = fs.writeFileSync('./content.txt', 'Content goes here')
        print.error("content.txt does not exist. I'll create it now, but you'll have to run me again with the new input.");

    }
}

init();