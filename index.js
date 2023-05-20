const { GoogleSpreadsheet } = require('google-spreadsheet');
const dayjs = require('dayjs');

(async () => {

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
    const driver = new Builder().forBrowser('chrome').withCapabilities(options).build();

    const regex = /<span data-automation="totalJobsCount">([^<]+)<\/span>/;
    let urlRoot = 'https://www.seek.com.au/';
    let url = '';
    let techCount = [];
    const techList = ['React', 'angular', 'vue', 'c%23', 'javascript', 'java', 'back end', 'front end', 'Python', 'Golang', 'Rails', 'ruby on rails', 'ruby', 'php','laravel', '.net', '.net core', 'Software Engineer', 'Full Stack'];
    
    console.log('techList',techList);

    for (let tech of techList) {
        try{
            url = `${urlRoot}jobs?keywords=${tech}`;
            await driver.get(url);
            await driver.sleep((Math.floor(Math.random() * 4) + 3) * 10);
            await driver.getPageSource().then(result=>{
                const match = result.match(regex);
                if(match){
                    techCount.push(match[1].replace(',',''));
                }
            });
        }catch(ex){
            console.log(ex);
        }finally{
            console.log('tech',tech);
        }
    }

    console.log('techCount',techCount);

    driver.quit();

    // https://docs.google.com/spreadsheets/d/<docID>/edit#gid=<sheetID>
    const sheet = await getSheetData('1Pw1hj-LDVy4Yyqa5UbexPfRUmOr3mp84bL_UAdG8XU4', '0');

    try{
        await sheet.addRow(
            { 
                'date': dayjs().format('YYYY/MMDD'),
                'React': techCount[0],
                'angular': techCount[1],
                'vue': techCount[2],
                'c#': techCount[3],
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
            }
        );
    }catch(ex){
        console.log(ex);
    }finally{
        console.log('end');
    }

})();

async function getSheetData(docID, sheetID, credentialsPath = './techtrendscrawler-7319fb62fc19.json') {
    const doc = new GoogleSpreadsheet(docID);
    const creds = require(credentialsPath);
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo(); // 加載文檔屬性和工作表
    return await doc.sheetsById[sheetID]; // 加載工作表
};