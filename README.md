> 2023 / 07 / 31

1. 第一次遇到瀏覽器版本不兼容問題 [Chrome Browser 與 Driver 惱人的版本管理](https://vocus.cc/article/620e7e14fd897800015b1643)
2. 版本問題兼容性、安全性混和問題太複雜了，直接使用 firefox 快速處理

> 2023 / 07 / 02

1. 嘗試增加樂居網抓一些平常想關注的房屋物件
2. 嘗試爬學習網站 viedo blob 檔案 
   * [WebAPIs - Blob](https://ithelp.ithome.com.tw/articles/10246325)
   * [什麼是 blob URL 以及為什麼使用它？](https://stackoverflow.com/questions/30864573/what-is-a-blob-url-and-why-it-is-used)
   * [如何下載 URL 中帶有 Blob 的視頻](https://www.alphr.com/download-video-blob-url/)
   * [github repo hahow-video-downloader](https://github.com/techmovie/hahow-video-downloader)

> 2023 / 05 / 26

![image](https://github.com/johch3n611u/Side-Project-Try-Some-Spider/assets/46659635/21c783d2-c486-4ce2-b78b-21a33b8a3558)

1. 新增 line bot 爬各大股票指數定期通知
2. asus bios 定時開機
3. window+R => `shell:startup` 自動啟動 bat
4. window+R => `compmgmt.msc` WS 排程 bat 啟動爬蟲
5. [Google App Script 串 line Notify](https://github.com/dang113108/591_rent)
6. [GAS 鬧鐘設定觸發機制](https://hackmd.io/@ugm/rJiUa4WsH)，程式碼請參考 GAS-Stock.js
7. Google Sheet 操作方式 [https://developers.google.com/apps-script/reference/spreadsheet/sheet?hl=zh-tw#getrowgrouprowindex,-groupdepth](https://developers.google.com/apps-script/reference/spreadsheet/sheet?hl=zh-tw#getrowgrouprowindex,-groupdepth)
5. [Google App Script 串 discord Notify](https://stackoverflow.com/questions/47639463/send-message-to-discord-via-google-apps-script)
6. [useServiceAccountAuth 開啟 Google Sheet 權限](https://ithelp.ithome.com.tw/articles/10234325)
7. 新增 auto punch time card
7. [臺北市政府行政機關辦公日曆表](https://data.gov.tw/dataset/145708)
8. 移除 shell:startup => clear.bat => :: 使顯示器停下，並顯示"請按任意鍵繼續..." pause

> 2023 / 05 / 03

![image](https://github.com/johch3n611u/Side-Project-Try-Some-Spider/assets/46659635/aefe8a5b-55b5-4bcf-ad7f-d38d0b04d413)

1. chrome://settings/help
2. http://chromedriver.storage.googleapis.com/index.html
3. https://chromedriver.chromium.org/downloads
4. node index.js 使用 node 執行檔案
5. dotenv：快速構建環境參數的套件
6. [selenium-webdriver: Error: chrome.setDefaultService is not a function](https://stackoverflow.com/questions/72993126/selenium-webdriver-error-chrome-setdefaultservice-is-not-a-function)
7. [ERROR:page_load_metrics_update_dispatcher.cc](https://stackoverflow.com/questions/75830184/errorpage-load-metrics-update-dispatcher-cc194-invalid-first-paint-error-usi)
8. https://blog.csdn.net/weixin_45292658/article/details/108150531
9. https://ithelp.ithome.com.tw/m/articles/10244446
10. https://snyk.io/advisor/python/selenium/functions/selenium.webdriver.ChromeOptions
11. https://github.com/dean9703111/ithelp_30days/tree/master/day29
12. [Add options to selenium chrome browser using nodejs](https://stackoverflow.com/questions/72839494/add-options-to-selenium-chrome-browser-using-nodejs)
13. [google-spreadsheet](https://ithelp.ithome.com.tw/m/articles/10234325)：npm Google Sheet 在包一層，但已經很久沒更新了
14. [googleapis](https://github.com/dean9703111/ithelp_30days/blob/master/day29/tools/google_sheets/index.js)：比較麻煩要做一些基礎工作，較長更新且有谷哥參與
15. https://github.com/theoephraim/node-google-spreadsheet

> 2023 / 04 / 30

先前因為忙碌且沒急迫性，所以這個需求就一直以手動方式執行，最近看到大男孩更新了一篇 [第一次考爬蟲接案 | Web Scraping | 好賺嗎？](https://www.youtube.com/watch?v=PWAjaEeaaMM&ab_channel=BigBoyCanCode)，又讓我想到了這個專案，這次將以 Google Sheet 搭配 Google App Script。

`花了兩天才發現 GAS 碰到 Google 政策問題與無法運行 browser automation 函式庫無法解析 SPA ，只能做一些簡單的爬蟲，發現此 solution 無法接續`

[( stackoverflow ) browser-automation-at-google-apps-scripts](https://stackoverflow.com/questions/75664595/browser-automation-at-google-apps-scripts)

[cheerio](https://www.wfublog.com/2019/11/google-apps-script-parse-html-xml-cheerio.html)：一種類似 JQ 的套件，用於爬回資料時做後續處理

接續其他 solution 以 selenium-webdriver Node 執行此專案，因為本身在做全端工程師，除了 c# 以外比較常接觸到 node 就用此架構開發比較不用搞環境跟學其他語言

參考 [selenium-webdriver：爬蟲起手式，帶你認識所見即所得的爬蟲工具](https://ithelp.ithome.com.tw/m/articles/10241791)

---

> 2021 / 10 / 07

很難想像身為一個資訊人接觸到爬蟲已經是我從業 1.5 年後了，

從[電腦網路](https://zh.wikipedia.org/wiki/%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BD%91%E7%BB%9C) => [區域網路] => [網際網路](https://zh.wikipedia.org/wiki/%E4%BA%92%E8%81%94%E7%BD%91) => [全球資訊網](https://zh.wikipedia.org/wiki/%E4%B8%87%E7%BB%B4%E7%BD%91) => [瀏覽器](https://zh.wikipedia.org/wiki/%E7%BD%91%E9%A1%B5%E6%B5%8F%E8%A7%88%E5%99%A8) => [網路搜尋引擎](https://zh.wikipedia.org/wiki/%E7%BD%91%E7%BB%9C%E6%90%9C%E7%B4%A2%E5%BC%95%E6%93%8E) => [網路爬蟲](https://zh.wikipedia.org/wiki/%E7%B6%B2%E8%B7%AF%E7%88%AC%E8%9F%B2)

從 3G / 藍芽 / Wifi / NFC / RFID / 4G / 5G

這一系列硬體生態的蓬勃發展才造就了，軟體面 [應用程式](https://zh.wikipedia.org/wiki/%E5%BA%94%E7%94%A8%E7%A8%8B%E5%BA%8F) => 雲端化 ( Web )、移動化 ( Mobile ) 的溫床

新技術的不斷產生 [AI](https://zh.wikipedia.org/wiki/%E4%BA%BA%E5%B7%A5%E6%99%BA%E8%83%BD)、[AAI](https://www.google.com/search?q=%E5%B7%A5%E4%BA%BA%E6%99%BA%E6%85%A7&rlz=1C1CHBF_zh-TWTW905TW905&oq=%E5%B7%A5%E4%BA%BA%E6%99%BA%E6%85%A7&aqs=chrome..69i57j69i65.6277j0j4&sourceid=chrome&ie=UTF-8)、[IoT](https://zh.wikipedia.org/wiki/%E7%89%A9%E8%81%94%E7%BD%91)、[大數據](https://www.oracle.com/tw/big-data/what-is-big-data/)、[區塊鏈](https://zh.wikipedia.org/wiki/%E5%8C%BA%E5%9D%97%E9%93%BE) 最終還是要回歸到應用層面，利用這些技術達到需求目的。

---

不好意思岔題了，所以回歸正題

## 需求

1. 希望做一個簡易的 Script 幫忙爬每天或每月的前端框架在各大論壇與人力銀行的熱度，方便讓我知道要寫哪個方向的 Side project 讓三年後的澳洲行機率提高些。
2. 幫忙確認國發會景氣指標與目前 0050 0056 或 美股 VIX QQQ 之類的漲幅，這方面比較還好不急可以後續有機會再做。

## [技術選型](https://www.zhihu.com/question/23643061) PHP，Python、Node.js

以上知乎討論串蠻詳細的如果之後有更細項的需求再從裡面找資料，所以選擇普通的 node.js 即可，剛好電腦裡面不用裝新的開發環境就能直接跑。

## 開發軌跡

https://www.npmjs.com/package/google-spreadsheet

---

## 手動查詢範例

|-|-|-|
|-|-|-|
|技能|Seek|104|
|java|7,518|5701|
|python|6,555|6277|
|c#|5,153|5494|
|php|3,787|6209|
|react|3,579|1453|
|angular|3,186|965|
|angularjs|906|448|
|vue|583|1486|
|ruby|290|340|
|Golang|228|459|
|ruby on rails|99|2996|
|front end developer|4,128|||
|前端工程師||3416|
|back end developer|565||
|後端工程師||3437|
|full stack developer|2,177|||
|全端工程師||17916||
