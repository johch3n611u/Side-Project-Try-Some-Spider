const { GoogleSpreadsheet } = require('google-spreadsheet');
const dayjs = require('dayjs');
var fs = require('fs');

const urls = {
    tw: {
        index: {
            tw_stock: {
                url: 'https://s.yimg.com/nb/tw_stock_frontend/scripts/TseChart/TseChart.eb1b267900.html?sid=TSE',
                regx: /<g style="" font-size="14px" zIndex="3" transform="translate\(462,0\)"><text x="3" zIndex="1" style="color:#DF3F3F;fill:#DF3F3F;" y="15"><tspan style="font-weight:bold">([^<]+)<\/tspan><\/text><\/g>/,
                regx2: /<g style="" font-size="14px" zIndex="3" transform="translate\(462,0\)"><text x="3" zIndex="1" style="color:#338B48;fill:#338B48;" y="15"><tspan style="font-weight:bold">([^<]+)<\/tspan><\/text><\/g>/,
                regx3: /<g style="" font-size="14px" zIndex="3" transform="translate\(462,0\)"><text x="3" zIndex="1" style="color:#338B48;fill:#338B48;" y="15"><tspan style="font-weight:bold">([^<]+)<\/tspan><\/text><\/g>/,
                regx4: /<g style="" font-size="14px" zIndex="3" transform="translate\(464,0\)"><text x="3" zIndex="1" style="color:#338B48;fill:#338B48;" y="15"><tspan style="font-weight:bold">([^<]+)<\/tspan><\/text><\/g>/,
                regx5: /<g style="" font-size="14px" zIndex="3" transform="translate\(464,0\)"><text x="3" zIndex="1" style="color:#DF3F3F;fill:#DF3F3F;" y="15"><tspan style="font-weight:bold">([^<]+)<\/tspan><\/text><\/g>/,
            },
            tw_0050: {
                url: 'https://tw.stock.yahoo.com/quote/0050',
                regx: /<span class="Fz\(32px\) Fw\(b\) Lh\(1\) Mend\(16px\) D\(f\) Ai\(c\) C\(\$c-trend-up\)">([^<]+)<\/span>/,
                regx2: /<span class="Fz\(32px\) Fw\(b\) Lh\(1\) Mend\(16px\) D\(f\) Ai\(c\)">([^<]+)<\/span>/,
                regx3: /<span class="Fz\(32px\) Fw\(b\) Lh\(1\) Mend\(16px\) D\(f\) Ai\(c\) C\(\$c-trend-down\)">([^<]+)<\/span>/,
            },
            BID: {
                url: 'https://index.ndc.gov.tw/n/zh_tw/lightscore#/',
                regx: /<span ng-bind-template="[^>]*" class="ng-binding">(.*?)<\/span>/,
                definition: [
                    { name: '低迷', range: '16-9' },
                    { name: '轉低', range: '22-17' },
                    { name: '穩定', range: '31-23' },
                    { name: '轉高', range: '37-32' },
                    { name: '熱絡', range: '45-38' },
                ]
            },
            TSMC: {
                url: 'https://tw.stock.yahoo.com/quote/2330.TW',
                regx: /<span class="Fz\(32px\) Fw\(b\) Lh\(1\) Mend\(16px\) D\(f\) Ai\(c\) C\(\$c-trend-up\)">([^<]+)<\/span>/,
                regx2: /<span class="Fz\(32px\) Fw\(b\) Lh\(1\) Mend\(16px\) D\(f\) Ai\(c\)">([^<]+)<\/span>/,
                regx3: /<span class="Fz\(32px\) Fw\(b\) Lh\(1\) Mend\(16px\) D\(f\) Ai\(c\) C\(\$c-trend-down\)">([^<]+)<\/span>/,
            },
            us00679b: {
                url: 'https://tw.stock.yahoo.com/quote/00679B',
                regx: /<span class="Fz\(32px\) Fw\(b\) Lh\(1\) Mend\(16px\) D\(f\) Ai\(c\) C\(\$c-trend-up\)">([^<]+)<\/span>/,
                regx2: /<span class="Fz\(32px\) Fw\(b\) Lh\(1\) Mend\(16px\) D\(f\) Ai\(c\)">([^<]+)<\/span>/,
                regx3: /<span class="Fz\(32px\) Fw\(b\) Lh\(1\) Mend\(16px\) D\(f\) Ai\(c\) C\(\$c-trend-down\)">([^<]+)<\/span>/,
            },
            house: {
                url: 'https://www.rakuya.com.tw/sell/result?city=3&price=~2500&typecode=R4%2CR5%2CR9&sort=21',
                regx: /<span class="setSearchTotal setSearchItemTotal">([^<]+)<\/span>/
            }
        },
        category: {
            url: 'https://tw.stock.yahoo.com/s/stock_cate.php?cat_id=%',
            ids: [
                { name: '水泥', id: 23011 }, { name: '食品', id: 23007 }, { name: '塑膠', id: 23012 }, { name: '紡織', id: 23008 }, { name: '電機', id: 23013 },
                { name: '電器', id: 23014 }, { name: '化生', id: 23015 }, { name: '化學', id: 23068 }, { name: '生技', id: 23069 }, { name: '玻璃', id: 23016 },
                { name: '造紙', id: 23009 }, { name: '鋼鐵', id: 23017 }, { name: '橡膠', id: 23018 }, { name: '汽車', id: 23019 }, { name: '電子', id: 23020 },
                { name: '半導', id: 23071 }, { name: '電腦', id: 23072 }, { name: '光電', id: 23073 }, { name: '通信', id: 23074 }, { name: '電零', id: 23075 },
                { name: '通路', id: 23076 }, { name: '資服', id: 23077 }, { name: '他電', id: 23078 }, { name: '營建', id: 23006 }, { name: '航運', id: 23021 },
                { name: '觀光', id: 23022 }, { name: '金融', id: 23010 }, { name: '貿易', id: 23023 }, { name: '油電', id: 23070 }, { name: '其他', id: 23024 },
            ]
        }
    },
    us: {
        SP500: {
            url: 'https://tw.stock.yahoo.com/quote/%5EGSPC',
            regx: /<span class="Fz\(32px\) Fw\(b\) Lh\(1\) Mend\(4px\) D\(f\) Ai\(c\) C\(\$c-trend-up\)">([^<]+)<\/span>/,
            regx2: /<span class="Fz\(32px\) Fw\(b\) Lh\(1\) Mend\(4px\) D\(f\) Ai\(c\) C\(\$c-trend-down\)">([^<]+)<\/span>/,
        },
        VOO: {
            url: 'https://tw.stock.yahoo.com/quote/VOO',
            regx: /<span class="Fz\(32px\) Fw\(b\) Lh\(1\) Mend\(4px\) D\(f\) Ai\(c\) C\(\$c-trend-up\)">([^<]+)<\/span>/,
            regx2: /<span class="Fz\(32px\) Fw\(b\) Lh\(1\) Mend\(4px\) D\(f\) Ai\(c\) C\(\$c-trend-down\)">([^<]+)<\/span>/,
        },
        QQQ: {
            url: 'https://tw.stock.yahoo.com/quote/QQQ',
            regx: /<span class="Fz\(32px\) Fw\(b\) Lh\(1\) Mend\(4px\) D\(f\) Ai\(c\) C\(\$c-trend-up\)">([^<]+)<\/span>/,
            regx2: /<span class="Fz\(32px\) Fw\(b\) Lh\(1\) Mend\(4px\) D\(f\) Ai\(c\) C\(\$c-trend-down\)">([^<]+)<\/span>/,
        }
    },
    building: {
        url: 'https://www.leju.com.tw/community?city=F&area=F249&building_type=3',
        regx: ''
    }
};

(async () => {
    const driver = createClient();
    let row = {
        'date': dayjs().format('YYYY/MMDD'),
        'tw_stock': await getPageTarget(driver, urls.tw.index.tw_stock),
        'tw_0050': await getPageTarget(driver, urls.tw.index.tw_0050),
        'SP500': await getPageTarget(driver, urls.us.SP500),
        'VOO': await getPageTarget(driver, urls.us.VOO),
        'QQQ': await getPageTarget(driver, urls.us.QQQ),
        'BID': await getPageTarget(driver, urls.tw.index.BID, 300),
        'TSMC': await getPageTarget(driver, urls.tw.index.TSMC),
        'us00679b': await getPageTarget(driver, urls.tw.index.us00679b),
        'house': await getPageTarget(driver, urls.tw.index.house),
        // 'building': await getPageTarget(driver, urls.building),
    };
    console.log(row);
    await setDataValue(row);
    driver.quit();
})();

function createClient() {
    const { Builder, By, Key, until, Button } = require('selenium-webdriver');
    // const { Options } = require('selenium-webdriver/chrome.js');
    const { Options } = require('selenium-webdriver/firefox.js');
    const options = new Options();
    //因為FB會有notifications干擾到爬蟲，所以要先把它關閉
    // options.setUserPreferences({ 'profile.default_content_setting_values.notifications': 1 });
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
    return new Builder().forBrowser('firefox').withCapabilities(options).build()
}

async function setDataValue(row) {
    const doc = new GoogleSpreadsheet('1WJM0l_GL-tVPPPJkoUf4AA7swb3PsZ16KHtfthLf_Z4');
    const creds = require('./techtrendscrawler-7319fb62fc19.json');
    await doc.useServiceAccountAuth(creds);
    await doc.loadInfo(); // 加載文檔屬性和工作表
    const sheet = await doc.sheetsById['0']; // 加載工作表
    await sheet.addRow(row);
}

function testResult(result) {
    fs.writeFile('test.html', result, (error) => {
        if (error) {
            console.log(error);
        }
        else {
            console.log('write operation complete.');
        }
    });
}

async function getPageTarget(driver, page, speed = 10) {
    try {
        let res;
        console.log(page.url)
        await driver.get(page.url);
        await driver.sleep((Math.floor(Math.random() * 4) + 3) * speed);
        await driver.getPageSource().then(result => {
            const match = result.match(page.regx);
            if (match) {
                res = match[1].replace(',', '');
            } else {
                console.log('not match1', page.regx);
                const match2 = result.match(page.regx2);
                if (match2) {
                    console.log('match2[1]', match2[1])
                    res = match2[1].replace(',', '');
                } else {
                    console.log('not match2', page.regx2);
                    const match3 = result.match(page.regx3);
                    if (match3) {
                        res = match3[1].replace(',', '');
                    } else {
                        console.log('not match3', page.regx3);
                        const match4 = result.match(page.regx4);
                        if (match4) {
                            res = match4[1].replace(',', '');
                        } else {
                            console.log('not match4', page.regx4);
                            const match5 = result.match(page.regx5);
                            if (match5) {
                                res = match5[1].replace(',', '');
                            } else {
                                console.log('not match5', page.regx5);
                            }
                        }
                    }
                }
            }
        });
        return res;
    } catch (ex) {
        console.log(ex);
    } finally {
    }
}