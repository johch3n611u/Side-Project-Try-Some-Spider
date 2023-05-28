function myFunction() {
    let sheet = initSheet();
    // sendToLine(encodeURIComponent(getFormData(sheet)));
    // sendToDiscord(getFormData(sheet));
    maxAndMin30d(sheet);
}

function initSheet() {
    let SpreadSheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1Pw1hj-LDVy4Yyqa5UbexPfRUmOr3mp84bL_UAdG8XU4/edit#gid=1381773314');
    return SpreadSheet.getSheetByName('stock');
}

function getFormData(sheet) {

    let secondLastRow = sheet.getRange(sheet.getLastRow() - 1, 1, 1, sheet.getLastColumn()).getValues()[0];
    let lastRow = sheet.getRange(sheet.getLastRow(), 1, 1, sheet.getLastColumn()).getValues()[0];

    // date,tw_stock,tw_0050,SP500,VOO,QQQ,BID
    // [2023/0526, 16505.05, 125.95, 4151.28, 380.92, 339.72, 7.0]

    let msg = '';

    // msg += `${lastRow[0]}\n台股大盤現值為${lastRow[1]}相較上一次紀錄${secondLastRow[1]}，漲幅為${percentageIncrease(lastRow, secondLastRow, 1)}`;
    // msg += `\n0050現值為${lastRow[2]}相較上一次紀錄${secondLastRow[2]}，漲幅為${percentageIncrease(lastRow, secondLastRow, 2)}`;
    // msg += `\n台灣景氣指標為${lastRow[6]}，目前${businessIndicatorsDataBase(lastRow, 6)}`;
    // msg += `\nS&P500為${lastRow[3]}相較上一次紀錄${secondLastRow[3]}，漲幅為${percentageIncrease(lastRow, secondLastRow, 3)}`;
    // msg += `\nVOO現值為${lastRow[4]}相較上一次紀錄${secondLastRow[4]}，漲幅為${percentageIncrease(lastRow, secondLastRow, 4)}`;
    // msg += `\nQQQ現值為${lastRow[5]}相較上一次紀錄${secondLastRow[5]}，漲幅為${percentageIncrease(lastRow, secondLastRow, 5)}`;

    msg += `\n台指, Today：${lastRow[1]}，漲幅${percentageIncrease(lastRow, secondLastRow, 1)}, 30d Max：1xxxx, Min：1xxxxx.`;
    msg += `\n0050, Today：${lastRow[2]}，漲幅${percentageIncrease(lastRow, secondLastRow, 2)}, 30d Max：1xxxx, Min：1xxxxx.`;
    msg += `\nS&P500, Today${lastRow[3]}，漲幅${percentageIncrease(lastRow, secondLastRow, 3)}, 30d Max：1xxxx, Min：1xxxxx.`;
    msg += `\nQQQ, Today${lastRow[5]}，漲幅${percentageIncrease(lastRow, secondLastRow, 5)}, 30d Max：1xxxx, Min：1xxxxx.`;

    return msg;
}

function sendToLine(msg) {
    var token = "D9ejWYuxoFn2VVx51ERYvftzWN8y547UbhmHzVJnQa6";
    var options =
    {
        method: "post",
        payload: "message=" + msg,
        headers: { "Authorization": "Bearer " + token },
        muteHttpExceptions: true
    };
    try {
        let res = UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
        console.log(res.getContentText());
    } catch (ex) {
        console.log(ex)
    }
}

function sendToDiscord(msg) {
    let options = {
        "method": "post",
        "headers": {
            "Content-Type": "application/json",
        },
        "payload": JSON.stringify({
            "content": msg
        })
    };
    Logger.log(options, null, 2);
    UrlFetchApp.fetch("https://discord.com/api/webhooks/1111580358668980255/jqeC5S-rl-vzDFeiM89p3S9MNbdJiWeoZjcHKLR8C3kt-bLmB8gNBk3Cz--NzhCBzY5h", options);
}

function percentageIncrease(lastRow, secondLastRow, cal) {
    let drop = lastRow[cal] - secondLastRow[cal];
    let isNegative = '+';
    if (drop < 0) {
        drop = drop * -1;
        isNegative = '-';
    }
    return `${isNegative}${Math.round((drop / lastRow[cal]) * 100)}%(${isNegative}${Math.round(drop)})`
}

function businessIndicatorsDataBase(lastRow, cal) {
    let msg = '';

    if (9 <= lastRow[cal] && lastRow[cal] <= 16) {
        msg = '景氣低迷';
    } else if (17 <= lastRow[cal] && lastRow[cal] <= 22) {
        msg = '景氣轉低';
    } else if (23 <= lastRow[cal] && lastRow[cal] <= 31) {
        msg = '景氣穩定';
    } else if (32 <= lastRow[cal] && lastRow[cal] <= 37) {
        msg = '景氣轉高';
    } else {
        msg = '景氣熱絡';
    }

    return `${msg}`
}

function maxAndMin30d(sheet)
{
    var range = sheet.getDataRange();
    var values = range.getValues();
    var header = values[0];
    
    console.log(values);
}