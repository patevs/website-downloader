/**
 * *  index.js
 */

// IMPORTS //

import chalk from 'chalk'

import scrape from 'website-scraper';
import PuppeteerPlugin from 'website-scraper-puppeteer';
// const PhantomPlugin = require('website-scraper-phantom');

// CONSTANTS //

const websiteUrl = 'https://github.com/patevs/website-downloader';

const { log } = console;

// Text Styles
const info = chalk.green;
const err = chalk.bgRed.black;

// FUNCTIONS //

log(info('\n Downloading website: ') + websiteUrl);

scrape({
    urls: [websiteUrl],
    urlFilter: function (url) {
        return url.indexOf(websiteUrl) === 0;
    },
    recursive: false,
    maxDepth: 50,
    prettifyUrls: true,
    filenameGenerator: 'bySiteStructure',
    directory: './website',
    plugins: [
        // new PhantomPlugin(),
        new PuppeteerPlugin({
            launchOptions: { headless: false }, // optional
            scrollToBottom: { timeout: 10000, viewportN: 10 }, // optional
            blockNavigation: false, // optional
        })
    ]
}).then((_) => {
    log(info(' Entire website successfully downloaded!\n'));
}).catch((error) => {
    log('\n ' + err(' ERROR ') + ' ' + error + '\n');
    // process.exit(error.status);
});

/* EOF */
