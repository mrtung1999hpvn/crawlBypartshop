const puppeteer = require('puppeteer');

const PUPPETEER_OPTIONS = {
    headless: false,
    args: [
    ],
};

class Bypartshop {

    /**
     * Puppeteer browser.
     * @type {puppeteer.Browser}
     */
    browser;

    /**
     * Create new browser if not opened.
     */
    async openBrowser() {
        if (!this.browser) {
            this.browser = await puppeteer.launch(PUPPETEER_OPTIONS);
        }
    }

    /**
     * Close browser.
     */
    async closeBrowser() {
        await this.browser.close();
    }

    async crawl() {
        await this.crawlProductDetail();
    }

    /**
     * 会社のファンダメンタル情報を取得して、このオブジェクトの変数に保管する。
     */
    // https://www.bypartshop.com/
    // 51 3459
    async crawlProductDetail() {
        const page = await this.browser.newPage();

        const url = `https://www.bypartshop.com/product/1935/%E0%B8%81%E0%B8%B1%E0%B8%99%E0%B8%8A%E0%B8%99%E0%B8%AB%E0%B8%99%E0%B9%89%E0%B8%B2-isuzu-d-max%E0%B8%94%E0%B8%B5%E0%B9%81%E0%B8%A1%E0%B9%87%E0%B8%81-1-9-blue-power-4wd-%E0%B8%A3%E0%B8%B8%E0%B9%88%E0%B8%99%E0%B8%A2%E0%B8%81%E0%B8%AA%E0%B8%B9%E0%B8%87-%E0%B8%9B%E0%B8%B52016-2018-2`;
        await page.goto(url);

        await page.waitForTimeout(5000);
        await page.waitForSelector('#productPageHTML');

        const imgs = await page.$$eval('.VueCarousel-inner img[src]', imgs => imgs.map(img => 
            img.getAttribute('src')));
        const image = imgs.toString()
        const crawled = await page.evaluate(() => {
            const data ={
                title : document.querySelector('.headerText').innerText,
                newPrice : document.querySelector('.mainPrice span').innerText,
                newPrice : document.querySelector('.product_code').innerText,
                oldPrice : document.querySelector('.oldPrice').innerText,
                product_code : document.querySelector('.product_code').innerText,
                categoryTR : document.querySelector('.categoryTR').innerText,
                stateTR : document.querySelector('.stateTR').innerText,
                stateOptionTR : document.querySelector('.stateOptionTR').innerText,
                typeTR : document.querySelector('.typeTR').innerText,
                ratingTR : document.querySelector('.ratingTR').innerText,
                // image : image
            }
            return data;
        });
        console.log(crawled);

        // Table
        // .productDetail
      

        await page.close();
    }

}

module.exports = Bypartshop;