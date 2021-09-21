/**
 * *  index.js
 */

// * IMPORTS * //

const scrape = require('website-scraper');
const PuppeteerPlugin = require('website-scraper-puppeteer');
// const PhantomPlugin = require('website-scraper-phantom');

// * CONSTANTS * //

const websiteUrl = 'https://github.com/patevs/website-downloader';

// * FUNCTIONS * //

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
}).then((data) => {
    console.log("Entire website successfully downloaded!");
}).catch((err) => {
    console.log("An error ocurred: ", err);
});

/* EOF */
