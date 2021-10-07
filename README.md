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
