const fs = require('fs');
const path = require('path');
const R = require('ramda');

const ignoreAudits = [
    'metrics',
    'errors-in-console',
    'redirects',
    'uses-rel-preload',
    'uses-rel-preconnect',
    'network-requests',
    'main-thread-tasks',
    'render-blocking-resources',
    'unminified-css',
    'unused-css-rules',
];

const toCamelCase = (key = '') => key.replace(/-(\w)/g, (_, matchedGroup) => matchedGroup.toUpperCase());
const getMetrics = (json) => {
    const metrics = { ...json.audits.metrics.details.items[0] };

    metrics.score = json.categories.performance.score * 100;

    return Object.keys(json.audits).reduce((memo, key) => {
        if (!ignoreAudits.find(audit => audit === key) && json.audits[key].numericValue && !(toCamelCase(key) in memo)) {
            memo[key] = json.audits[key].numericValue;
        }

        return memo;
    }, metrics);
};

const getAverage = (values = []) => {
    const sums = values.reduce((memo, curr) => R.mergeWith((a, b) => (a + b), curr, memo), {});

    return Object.keys(sums).reduce((memo, key) => {
        memo[key] = sums[key] / values.length;

        return memo;
    }, {});
};

module.exports.getSummary = function getSummary(directoryPath, cb) {
    const runResults = [];
    let avg;

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.log(`Unable to scan directory: ${err}`);
        }
        const jsonFiles = files.filter((fileName) => fileName.includes('.json'));

        jsonFiles.forEach((file) => {
            const filePath = path.join(__dirname, directoryPath, file);
            const rawData = fs.readFileSync(filePath);
            const json = JSON.parse(rawData);
            const metrics = getMetrics(json);

            runResults.push(metrics);
        });
        avg = getAverage(runResults);

        cb(avg);
    });
};

module.exports.getMetrics = getMetrics;
module.exports.getAverage = getAverage;
