const fs = require('fs');

const mode = 2

const load = () => {
    if (fs.existsSync('./filter.properites')) {
        try {
            const writeout = `filter-ai configuration:
            mode=2
            `
            const data = fs.writeFileSync('./filter.properties', writeout);
            console.log('No filter.properties was found, creating one with default values');
        } catch (err) {
            console.error(err)
        }
    }
};

exports.mode = 2;
exports.load = load;