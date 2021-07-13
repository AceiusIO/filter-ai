//// filter-ai main module /////////////////

const appname = 'filter-ai'
const startData = `
 * AceiusIO - www.acei.us
 * Emantella - Initial Data
`

const chalk = require('chalk');
const fs = require('fs');

const tier1 = process.argv[2]
const tier2 = process.argv[3]
const tier3 = process.argv[4]

let tier1list;
let tier2list;
let tier3list;

function printLog(msg) {
    console.log(chalk.bold('['+chalk.blue('!')+']')+' '+msg)
}

function printWarning(msg) {
    console.log(chalk.bold('['+chalk.yellow('!')+']')+' '+msg)
}

function printAlert(msg) {
    console.log(chalk.bold('['+chalk.red('!')+']')+' '+msg)
}

function processList(list, tier) {
    console.log(chalk.bold('['+chalk.blue('WordList')+'] ')+chalk.green(list)+' words defined as:\n');
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
        console.error(err);
    }
}

function createEulaFile() {
    try {
        const eula = "By accepting the eula and using the software, you aggree that you will use it only for the right reasons, and that you will respect the GNU GPL v3 when forking or otherwise remixing the software. \neula=false"
        const data = fs.writeFileSync('./eula.txt', eula)
    } catch (err) {
        printAlert(err)
    }
    printWarning('You have not agreed to the eula. Please do so in eula.txt if you wish to continue');
}

function isEulaAccepted() {
    try {
        const data = fs.readFileSync('./eula.txt', 'utf8')
        if (data.includes('true')) {
            main();
        } else {
            printWarning('You have not agreed to the eula. Please do so in eula.txt if you wish to continue');
        }
    } catch (err) {
        printAlert(err);
    }
}

function init() {
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
    printLog('Preparing to recive data...');
    printAlert('Ready to censor.')
}

init();