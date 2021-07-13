const mode = 2

if (fs.existsSync('./filter.properites')) {
    try {
        const writeout = `filter-ai configuration:
        mode=2
        `
        const data = fs.writeFileSync('./eula.txt', writeout)
    } catch (err) {
        console.error(err)
    }
}

exports.mode = 2;