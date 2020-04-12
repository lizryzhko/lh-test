const fs = require('fs-extra');
const path = require('path');
const util = require('util');
const exec = util.promisify(require('child_process').exec);
const { argv } = require('yargs');
const { getSummary } = require('./getSummary.js');

async function runLHCI(configPath, url, dir) {
    console.log('runLHCI');
    const { stdout, stderr } = await exec(`cd ${dir} && npx lhci collect --config ${configPath} --url ${url}`);
    console.log(stdout);
    if (stderr) {
        console.log('stderr:', stderr);
    }
}

const schemeRegexp = new RegExp('http[s]?://');
const { url } = argv;
console.log('url: ', url);
const rootDirname = argv.dirName || `test_result_${Number(new Date())}`;
console.log('rootDirname: ', rootDirname);
const configPaths = Array.isArray(argv.configPaths || './lighthouserc.json') ? argv.configPaths : [argv.configPaths];
console.log('configPaths: ', configPaths);
const dir = `./results/${rootDirname}/${url.split(schemeRegexp)[1].replace(/\//g, '-')}`;

Promise.all(configPaths.map(
    (configPath) => Promise.resolve()
        .then(async () => {
            const dirByConfig = `${dir}/${configPath.replace('/', '').replace('.json', '')}`;

            if (fs.existsSync(dirByConfig)) {
                fs.removeSync(dirByConfig);
            }

            fs.mkdirSync(dirByConfig, { recursive: true });
            await runLHCI(path.join(__dirname, configPath), url, dirByConfig);
            getSummary(`${dirByConfig}/.lighthouseci`, (res) => {
                console.log(`result for config ${configPath}: ${JSON.stringify(res, undefined, '\t')}`);
            });
        }),
));


// TODO:
// set user agent
