function myFunction() {
    let url = 'https://www.seek.com.au/React-jobs';
    let str = UrlFetchApp.fetch(url).getContentText();
  
  
  var $ = Cheerio.load(str,{ decodeEntities: false }); 
  
  // Logger.log($.html());
    const regex = /<span\s+data-automation="totalJobsCount">([2][0-9]{3})<\/span>/g;
    const match = $.html().match(regex);
    Logger.log('aaaaaa',Library.getLibrary('ggsrunif'));
  
  
    //   const browser = ggsrun.browser();
  
    // // 載入動態網頁
    // const page = browser.newPage();
    // page.goto('https://www.example.com/dynamic-page');
  
    // // 等待網頁加載完畢
    // page.waitForSelector('#dynamic-content');
  
    // // 取回動態內容
    // const dynamicContent = page.$eval('#dynamic-content', el => el.innerHTML);
  
    // Logger.log(dynamicContent);
  }
  