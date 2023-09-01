const { Builder, By, Key, until, Button, Actions } = require('selenium-webdriver');

const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');
dayjs.extend(duration);

function createClient() {
    // const { Options } = require('selenium-webdriver/chrome.js');
    const { Options } = require('selenium-webdriver/firefox.js');
    const options = new Options();
    // 因為FB會有notifications干擾到爬蟲，所以要先把它關閉
    // options.setUserPreferences({ 'profile.default_content_setting_values.notifications': 1 });
    // 不加載圖片提高效率
    options.addArguments('blink-settings=imagesEnabled=false');
    //瀏覽器不提供頁面觀看，linux下如果系統是純文字介面不加這條會啓動失敗
    options.addArguments('--headless');
    //這個option可以讓你跟headless時網頁端的console.log說掰掰
    options.addArguments('--log-level=3');
    //使用共享內存RAM，提升爬蟲穩定性
    options.addArguments('--disable-dev-shm-usage');
    //規避部分chrome gpu bug，提升爬蟲穩定性
    options.addArguments('--disable-gpu');
    return new Builder()
        // .forBrowser('chrome')
        .forBrowser('firefox')
        .withCapabilities(options)
        .build()
}

(async function example() {
    // 開啟瀏覽器
    const driver = createClient();

    try {
        // 如果是假日不執行
        const isHoliday = IsHoliday();
        console.log(`isHoliday：${isHoliday}`);
        if (isHoliday) {
            return;
        }
        // 前往登入頁面
        await driver.get('https://cloud.nueip.com/');
        // 輸入帳號和密碼
        const config = require('./nueipConfig.json');
        await driver.findElement(By.name('inputCompany')).sendKeys(config.inputCompany);
        await driver.findElement(By.name('inputID')).sendKeys(config.inputID);
        await driver.findElement(By.name('inputPassword')).sendKeys(config.inputPassword, Key.RETURN);
        // 在登入成功的頁面執行其他操作
        const randomTime = (Math.floor(Math.random() * 4) + 3) * 50000;

        // 將毫秒轉換為分鐘
        console.log(`延遲 ${dayjs.duration(randomTime).minutes()} 分鐘`);
        // await driver.sleep(randomTime);
        await driver.sleep(10000);
        // 找到按鈕
        let buttonId = GetbuttonId();
        console.log('按鈕 class', buttonId);

        // 點擊
        // https://sqa.stackexchange.com/questions/32697/webdriver-firefox-element-could-not-be-scrolled-into-view
        // https://stackoverflow.com/questions/61795308/selenium-driver-actions-movetoelement-is-not-a-function
        // await driver.findElement(By.id(buttonId)).click();
        // https://stackoverflow.com/questions/56085152/selenium-python-error-element-could-not-be-scrolled-into-view

        const elements = await driver.findElements(
            By.xpath("//div[contains(@class, 'clock_btn') and contains(@class, 'margin-right-5') and contains(@class, 'padding-all-20') and contains(@class, 'Link') and contains(@class, 'ctrl-clockin') and @value='2']")
        );

        console.log(elements)

        for (let element of elements) {
            const isDisplayed = await element.isDisplayed();
            console.log(isDisplayed);
            if (isDisplayed) {
                console.log(element);

                await element.click();

                // await driver.actions().move({ origin: element }).click().perform();
                // await driver.executeScript("arguments[0].click();", element);
                // await element.sendKeys(Key.ENTER).perform();
            }
        }

        // 等待操作完成
        await driver.sleep(3000);

    } finally {
        // 關閉瀏覽器
        await driver.quit();
        console.log("end")
    }
})();

function GetbuttonId() {
    // 取得現在時間
    const now = dayjs();
    // 取得上午 9 點的時間
    const nineAM = now.set('hour', 9).set('minute', 0).set('second', 0);
    // 取得上午 10 點的時間
    const tenAM = now.set('hour', 10).set('minute', 0).set('second', 0);
    // 取得下午 6 點的時間
    const sixPM = now.set('hour', 18).set('minute', 0).set('second', 0);
    // 取得下午 7 點的時間
    const sevenPM = now.set('hour', 19).set('minute', 0).set('second', 0);
    // 判斷現在時間是否在上午 9 點與上午 10 點之間
    let buttonId = '';

    if (now.isAfter(nineAM) && now.isBefore(tenAM)) {
        buttonId = 'clockin';
    }

    if (now.isAfter(sixPM) && now.isBefore(sevenPM)) {
        buttonId = 'clockout'
    }

    return buttonId;
}

function IsHoliday() {
    const holidays = require('./c668969cc230c529ab9ec5700d9eab9e_export.json');
    const holiday = holidays.find(h => {
        const holidayDate = dayjs(h.Date, 'YYYYMMDD', true);
        const now = dayjs().format('YYYYMMDD');
        return holidayDate.isSame(now, 'day');
    });
    // console.log(holiday);
    return holiday ? true : false;
}