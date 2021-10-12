const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");



var jp = function () {
    request({
        url: "https://www.seek.com.au/d3-jobs",
        method: "GET"
    }, function (error, response, body) {
        if (error || !body) {
            return;
        } else {

            // 爬完網頁後要做的事情
            var $ = cheerio.load(body);
            var target = $("#SearchSummary > span > h1 > strong");
            console.log(target.text());
        }
    });
};

jp();