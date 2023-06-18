const { GoogleSpreadsheet } = require('google-spreadsheet');
const dayjs = require('dayjs');


const webConfig = {
    "104Site": "https://www.104.com.tw/jobs/search/?ro=0&keyword=",
    "Seek": "https://www.seek.com.au/jobs?keywords=",
};

(async () => {

    let regex = /<span data-automation="totalJobsCount">([^<]+)<\/span>/;
    let techCount, site104TechCount = [];
    let techList = ['React', 'angular', 'vue', 'c%23', 'javascript', 'java', 'back end', 'front end', 'Python', 'Golang', 'Rails', 'ruby on rails', 'ruby', 'php', 'laravel', '.net', '.net core', 'Software Engineer', 'Full Stack', 'azure', 'aws', 'gcp'];
    techCount = await getTechTitleCount(webConfig.Seek, techList, regex);
    const seekData = {
        'date': dayjs().format('YYYY/MMDD'),
        'React': techCount[0],
        'angular': techCount[1],
        'vue': techCount[2],
        'c%23': techCount[3],
        'javascript': techCount[4],
        'java': techCount[5],
        'back end': techCount[6],
        'front end': techCount[7],
        'Python': techCount[8],
        'Golang': techCount[9],
        'Rails': techCount[10],
        'ruby on rails': techCount[11],
        'ruby': techCount[12],
        'php': techCount[13],
        'laravel': techCount[14],
        '.net': techCount[15],
        '.net core': techCount[16],
        'Software Engineer': techCount[17],
        'Full Stack': techCount[18],
        'azure': techCount[19],
        'aws': techCount[20],
        'gcp': techCount[21],
    }



    await setDataValue(['date',...techList],seekData,'0');
    regex = /<li data-value="0" class="b-nav-tabs__active">全部<span class="js-txt">\((\d+)\)<\/span><\/li>/;
    techList = [...techList, "前端", "後端", "全端"]
   
    site104TechCount = await getTechTitleCount(webConfig['104Site'], techList, regex);
    const site104Data = {
        'date': dayjs().format('YYYY/MMDD'),
        '104 React': site104TechCount[0],
        '104 angular': site104TechCount[1],
        '104 vue': site104TechCount[2],
        '104 c%23': site104TechCount[3],
        '104 javascript': site104TechCount[4],
        '104 java': site104TechCount[5],
        '104 back end': site104TechCount[6],
        '104 front end': site104TechCount[7],
        '104 Python': site104TechCount[8],
        '104 Golang': site104TechCount[9],
        '104 Rails': site104TechCount[10],
        '104 ruby on rails': site104TechCount[11],
        '104 ruby': site104TechCount[12],
        '104 php': site104TechCount[13],
        '104 laravel': site104TechCount[14],
        '104 .net': site104TechCount[15],
        '104 .net core': site104TechCount[16],
        '104 Software Engineer': site104TechCount[17],
        '104 Full Stack': site104TechCount[18],
        '104 azure': site104TechCount[19],
        '104 aws': site104TechCount[20],
        '104 gcp': site104TechCount[21],
        '104 前端': site104TechCount[22],
        '104 後端': site104TechCount[23],
        '104 全端': site104TechCount[24],
    }
    await setDataValue(['date',...techList.map(value => "104 " + value)],site104Data,'1382771767');

})();

async function getSheetData(docID, sheetID, credentialsPath = './techtrendscrawler-7319fb62fc19.json') {
    const doc = new GoogleSpreadsheet(docID);
    const creds = require(credentialsPath);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo(); // 加載文檔屬性和工作表
    return await doc.sheetsById[sheetID]; // 加載工作表
};

async function setDataValue(headerValues, rowObject,sheetID){
    console.log(headerValues);
    console.log(rowObject);
        // https://docs.google.com/spreadsheets/d/<docID>/edit#gid=<sheetID>
    const sheet = await getSheetData('1Pw1hj-LDVy4Yyqa5UbexPfRUmOr3mp84bL_UAdG8XU4', sheetID);
    await sheet.setHeaderRow(headerValues);
    await sheet.addRow(rowObject);
}


function createClient() {
    const { Builder, By, Key, until, Button } = require('selenium-webdriver');
    const { Options } = require('selenium-webdriver/chrome.js');
    const options = new Options();

    //因為FB會有notifications干擾到爬蟲，所以要先把它關閉
    options.setUserPreferences({ 'profile.default_content_setting_values.notifications': 1 });
    //不加載圖片提高效率
    options.addArguments('blink-settings=imagesEnabled=false');
    //瀏覽器不提供頁面觀看，linux下如果系統是純文字介面不加這條會啓動失敗
    options.addArguments('--headless');
    //這個option可以讓你跟headless時網頁端的console.log說掰掰
    options.addArguments('--log-level=3');
    //使用共享內存RAM，提升爬蟲穩定性
    options.addArguments('--disable-dev-shm-usage');
    //規避部分chrome gpu bug，提升爬蟲穩定性
    options.addArguments('--disable-gpu');

    return new Builder().forBrowser('chrome').withCapabilities(options).build()
}
async function getTechTitleCount(urlRoot, techTitleList, regexString) {
    const driver = createClient();
    console.log("driver", driver);
    let techTitleCount = [];

    for (let tech of techTitleList) {
        try {
            url = `${urlRoot}${tech}`;
            await driver.get(url);
            await driver.sleep((Math.floor(Math.random() * 4) + 3) * 10);
            await driver.getPageSource().then(result => {
                const match = result.match(regexString);
                if (match) {
                    techTitleCount.push(match[1].replace(',', ''));
                }
            });
        } catch (ex) {
            console.log(ex);
        } finally {
            console.log('tech', tech);
        }
    }
    driver.quit();
    return techTitleCount;
}