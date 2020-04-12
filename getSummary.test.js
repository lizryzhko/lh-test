const { getAverage, getMetrics } = require('./getSummary.js');

const audits = {
    categories: {
        performance: {
            score: 0.46,
        },
    },
    audits: {
        'first-contentful-paint': {
            id: 'first-contentful-paint',
            title: 'First Contentful Paint',
            score: 1,
            scoreDisplayMode: 'numeric',
            numericValue: 1152.933,
            displayValue: '1.2 s',
        },
        'estimated-input-latency': {
            id: 'estimated-input-latency',
            title: 'Estimated Input Latency',
            score: 0.15,
            scoreDisplayMode: 'numeric',
            numericValue: 155.4000000000002,
            displayValue: '160 ms',
        },
        'errors-in-console': {
            id: 'errors-in-console',
            title: 'No browser errors logged to the console',
            score: 1,
            scoreDisplayMode: 'binary',
            numericValue: 0,
            details: {
                type: 'table',
                headings: [],
                items: [],
            },
        },
        interactive: {
            id: 'interactive',
            title: 'Time to Interactive',
            description: 'Time to interactive is the amount of time it takes for the page to become fully interactive. [Learn more](https://web.dev/interactive).',
            score: 0.17,
            scoreDisplayMode: 'numeric',
            numericValue: 11804.030999999999,
            displayValue: '11.8 s',
        },
        'network-rtt': {
            id: 'network-rtt',
            title: 'Network Round Trip Times',
            description: "Network round trip times (RTT) have a large impact on performance. If the RTT to an origin is high, it's an indication that servers closer to the user could improve performance. [Learn more](https://hpbn.co/primer-on-latency-and-bandwidth/).",
            score: null,
            scoreDisplayMode: 'informative',
            numericValue: 56.222,
            displayValue: '60 ms',
        },
        'network-server-latency': {
            id: 'network-server-latency',
            title: 'Server Backend Latencies',
            description: "Server latencies can impact web performance. If the server latency of an origin is high, it's an indication the server is overloaded or has poor backend performance. [Learn more](https://hpbn.co/primer-on-web-performance/#analyzing-the-resource-waterfall).",
            score: null,
            scoreDisplayMode: 'informative',
            numericValue: 95.84800000000001,
            displayValue: '100 ms',
        },
        metrics: {
            id: 'metrics',
            title: 'Metrics',
            description: 'Collects all available metrics.',
            score: null,
            scoreDisplayMode: 'informative',
            numericValue: 11804.030999999999,
            details: {
                type: 'debugdata',
                items: [
                    {
                        firstContentfulPaint: 1153,
                        firstMeaningfulPaint: 1153,
                        firstCPUIdle: 10854,
                        interactive: 11804,
                        speedIndex: 6173,
                        estimatedInputLatency: 155,
                        totalBlockingTime: 1477,
                        observedNavigationStart: 0,
                        observedNavigationStartTs: 204418415523,
                        observedFirstPaint: 1611,
                        observedFirstPaintTs: 204420026744,
                        observedFirstContentfulPaint: 1611,
                        observedFirstContentfulPaintTs: 204420026744,
                        observedFirstMeaningfulPaint: 1611,
                        observedFirstMeaningfulPaintTs: 204420026744,
                        observedLargestContentfulPaint: 2132,
                        observedLargestContentfulPaintTs: 204420547452,
                        observedTraceEnd: 4174,
                        observedTraceEndTs: 204422589297,
                        observedLoad: 2777,
                        observedLoadTs: 204421192596,
                        observedDomContentLoaded: 1812,
                        observedDomContentLoadedTs: 204420227555,
                        observedFirstVisualChange: 1607,
                        observedFirstVisualChangeTs: 204420022523,
                        observedLastVisualChange: 2190,
                        observedLastVisualChangeTs: 204420605523,
                        observedSpeedIndex: 1981,
                        observedSpeedIndexTs: 204420396690,
                    },
                    {
                        lcpInvalidated: false,
                    },
                ],
            },
        },
    },
};

describe('getSummary', () => {
    it('getMetrics', () => {
        expect(getMetrics(audits)).toStrictEqual({
            estimatedInputLatency: 155,
            firstCPUIdle: 10854,
            firstContentfulPaint: 1153,
            firstMeaningfulPaint: 1153,
            interactive: 11804,
            'network-rtt': 56.222,
            'network-server-latency': 95.84800000000001,
            observedDomContentLoaded: 1812,
            observedDomContentLoadedTs: 204420227555,
            observedFirstContentfulPaint: 1611,
            observedFirstContentfulPaintTs: 204420026744,
            observedFirstMeaningfulPaint: 1611,
            observedFirstMeaningfulPaintTs: 204420026744,
            observedFirstPaint: 1611,
            observedFirstPaintTs: 204420026744,
            observedFirstVisualChange: 1607,
            observedFirstVisualChangeTs: 204420022523,
            observedLargestContentfulPaint: 2132,
            observedLargestContentfulPaintTs: 204420547452,
            observedLastVisualChange: 2190,
            observedLastVisualChangeTs: 204420605523,
            observedLoad: 2777,
            observedLoadTs: 204421192596,
            observedNavigationStart: 0,
            observedNavigationStartTs: 204418415523,
            observedSpeedIndex: 1981,
            observedSpeedIndexTs: 204420396690,
            observedTraceEnd: 4174,
            observedTraceEndTs: 204422589297,
            score: 46,
            speedIndex: 6173,
            totalBlockingTime: 1477,
        });
    });

    it('getAverage', () => {
        expect(getAverage([])).toStrictEqual({});
        expect(getAverage([
            {
                firstCPUIdle: 2,
            },
            {
                firstCPUIdle: 4,
            },
            {
                firstCPUIdle: 5,
            },
            {
                firstCPUIdle: 5,
            },
        ])).toStrictEqual({ firstCPUIdle: 4 });
    });
});
