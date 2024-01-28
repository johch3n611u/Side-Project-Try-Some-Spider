var fs = require("fs");

(async () => {
  const driver = createClient();
  await driver.get("https://paldb.cc/tw/");
  await driver.sleep((Math.floor(Math.random() * 4) + 3) * 10);
  await driver.getPageSource().then((result) => {
    const match = result
      .split("<table")[1]
      .split("</table>")[0]
      .match(/<tr.*?>(.*?)<\/tr>/g);

    let pals = [];
    match.forEach((element) => {
      let pal = {
        image: "",
        number: "",
        name: "",
        elements: [],
        workskills: [],
        drops: [],
        latlngs: [],
      };

      // https://blog.csdn.net/wenxingchen/article/details/125868986
      // (?<=A).*?(?=B)
      const match1 = element.match(/(?<=data-filter=").*?(?=")/g);
      if (match1) {
        pal.workskills = match1;

        const match2 = element.match(/(?<=<div class="mt-2">).*?(?=<\/div>)/g);
        if (match2) {
          // 匹配中文字符 /[\u4e00-\u9fff]/g
          // 抓取相连的中文字符（即中文词组）
          const match3 = match2[0].match(/[\p{Script=Hani}]+/gu);
          pal.drops = match3;
        }

        // https://blog.csdn.net/mm_hello11/article/details/88204152
        const match4 = element.match(/<div>(.*?)<\/div>/);
        if (match4) {
          const match5 = match4[1].match(/[\p{Script=Hani}]+/gu);
          pal.name = match5[0];

          const match6 = match4[1].match(/\d+/);
          pal.number = match6[0];

          const match7 = match4[1].match(/(?<=src="\/image\/).*?(?=")/g);
          pal.elements = match7;
        }

        const match8 = element.match(/<td>(.*?)<\/td>/);
        if (match8) {
            const match9 = match8[1].match(/(?<=src="\/image\/Pal\/Texture\/PalIcon\/Normal\/).*?(?=")/g);
            pal.image = match9[0];
        }

        pals.push(pal);
      }
    });

    fs.writeFile("palword.json", JSON.stringify(pals), (error) => {
      if (error) {
        console.log(error);
      } else {
        console.log("write operation complete.");
      }
    });
  });
  driver.quit();
})();

function createClient() {
  const { Builder, By, Key, until, Button } = require("selenium-webdriver");
  // const { Options } = require('selenium-webdriver/chrome.js');
  const { Options } = require("selenium-webdriver/firefox.js");
  const options = new Options();
  //因為FB會有notifications干擾到爬蟲，所以要先把它關閉
  // options.setUserPreferences({ 'profile.default_content_setting_values.notifications': 1 });
  //不加載圖片提高效率
  options.addArguments("blink-settings=imagesEnabled=false");
  //瀏覽器不提供頁面觀看，linux下如果系統是純文字介面不加這條會啓動失敗
  options.addArguments("--headless");
  //這個option可以讓你跟headless時網頁端的console.log說掰掰
  options.addArguments("--log-level=3");
  //使用共享內存RAM，提升爬蟲穩定性
  options.addArguments("--disable-dev-shm-usage");
  //規避部分chrome gpu bug，提升爬蟲穩定性
  options.addArguments("--disable-gpu");
  return new Builder().forBrowser("firefox").withCapabilities(options).build();
}
