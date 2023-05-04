// const request = require("request"); // 調用 http，SPA 不適用
const cheerio = require("cheerio"); // 類似 jQ
const fs = require("fs"); // 讀取檔案用
require('dotenv').config(); // 環境檔
const path = require('path'); // 處理路徑
const { Builder, Browser, By, Key, until } = require('selenium-webdriver'); // 模擬瀏覽器，可以爬 SPA
// const chrome = require('selenium-webdriver/chrome'); // chrome 瀏覽器

const main = async function () {
    console.log('main start');
    let checkDriver = false;

    // try {
    //     chrome.getDefaultService(); // 確認是否有預設模擬瀏覽器
    // } catch {
    //     let filePath = 'chromedriver.exe'; // 模擬器驅動
    //     filePath = path.join(__dirname, filePath)
    //     console.error('filePath：', filePath);
    //     if (fs.existsSync(filePath)) { // 確認檔案是否存在
    //         const service = new chrome.ServiceBuilder(filePath).build();
    //         chrome.setDefaultService(service);
    //         checkDriver = true;
    //     } else {
    //         console.error('檔案不存在：', filePath);
    //     }
    // }

    // if (checkDriver) {
        // request({
        //     url: "https://www.seek.com.au/d3-jobs",
        //     method: "GET"
        // }, function (error, response, body) {
        //     // console.log('response：', response);
        //     if (error || !body) {
        //         return;
        //     } else {
        //         var $ = cheerio.load(body);
        //         var target = $("#SearchSummary > span > h1 > strong");
        //         console.log(target.text());
        //     }
        // });

        let driver = chrome;
        console.log('driver',driver);
        try {
            // await driver.get('https://www.seek.com.au/d3-jobs');
            // await driver.getPageSource();
            // await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
            // await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
        } finally {
            // await driver.quit();
        }

        // driver.quit();
    // }
};

main();