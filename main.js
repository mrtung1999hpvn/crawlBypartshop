/**
 * This program receive a stock code, crawl and return data about the company.
 * To run this program, *puppeteer* and *minimist* are needed to be installed.
 * ```shell
 * npm i puppeteer
 * npm i minimist
 * ```
 *
 * Syntax:
 *   node main.js
 */
const Bypartshop = require('./libs/Bypartshop');
/**
 * Main function.
 */
const run = async () => {
    try {
        var bypartshop = new Bypartshop();
        await bypartshop.openBrowser();

        await bypartshop.crawl();

        await bypartshop.closeBrowser();
    } catch (error) {
        console.log(error);
    }
};

run();