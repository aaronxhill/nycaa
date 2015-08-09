// PARSE

var fs = require("fs");
var cheerio = require('cheerio');

function getMeetingHourStart (meetTime) {
    var theHour; 
    if (meetTime.substr(-2) == "PM") {
      theHour = meetTime.substr(0, meetTime.indexOf(':')) * 1 + 12;
    }
    else if (meetTime.substr(-2) == "AM" && meetTime.substr(0, meetTime.indexOf(':')) * 1 === 12) {theHour = 0}
    else {theHour = meetTime.substr(0, meetTime.indexOf(':')) * 1}
return theHour;
}

function parseIt (zone) {

var parseFile = '/home/ubuntu/workspace/data/m' + zone + '.txt';

var toParse;
toParse = fs.readFileSync(parseFile).toString();

var $ = cheerio.load(toParse);

var meetingsArray = [];

$('table').attr('cellpadding', '5').find('tbody').find('tr').each(function(i, elem) {
    meetingsArray[i] = new Object;
    meetingsArray[i].indx = i;
    meetingsArray[i].borough = "Manhattan";
    meetingsArray[i].zone = 2;
    meetingsArray[i].meetingName = $(this).find('td').eq(0).find('b').text();
    meetingsArray[i].meetingHouse = $(this).find('td').eq(0).find('h4').text();
    meetingsArray[i].meetingAddress1 = $(this).find('td').eq(0).html().split('<br>')[2].trim();
    meetingsArray[i].meetingAddress2 = $(this).find('td').eq(0).html().split('<br>')[3].trim();
    meetingsArray[i].meetingAddress3 = $(this).find('td').eq(0).html().split('<br>')[4].trim();
    meetingsArray[i].meetingDetails = $(this).find('td').eq(0).find('div').eq(0).attr('class', 'detailsBox').text().trim();
    meetingsArray[i].meetingWheelchair = $(this).find('td').eq(0).find('span').text().trim();
    meetingsArray[i].meetingRawMeetings = $(this).find('td').eq(1).html().split('<br>\r\n                    \t<br>');
});

var parseMeetings = function(x) {

    x.splice(x.length - 1, 1)
    var newX = [];

    for (var i = 0; i < x.length; i++) {
        newX[i] = new Object;
        x[i] = x[i].trim();
        newX[i].day = x[i].substring(x[i].indexOf('<b>') + 3, x[i].indexOf(' From'));
        newX[i].startTime = x[i].substring(x[i].indexOf('From</b>  ') + 10, x[i].indexOf(' <b>to</b> '));
        newX[i].startTimeHour = getMeetingHourStart(newX[i].startTime)
        newX[i].endTime = x[i].substring(x[i].indexOf(' <b>to</b> ') + 11, x[i].indexOf(' <br><b>'));
        if (x[i].indexOf('Meeting Type</b> ') != -1) {
        newX[i].meetingType = x[i].substring(x[i].indexOf('Meeting Type</b> ') + 17, x[i].indexOf(' ='));}
        else {newX[i].meetingType = ""}
        if (x[i].indexOf('Special Interest</b> ') != -1) {
            newX[i].specialInterest = x[i].substring(x[i].indexOf('Special Interest</b> ') + 21);
        }
        else {newX[i].specialInterest = ""}
    }
    return newX;
};

var px = function(inpArr) {
    for (var i = 0; i < inpArr.length; i++) {
        inpArr[i].meetingList = parseMeetings(inpArr[i].meetingRawMeetings);
    }
    //   console.log(meetingsArray);
};

setTimeout(px(meetingsArray), 500);

var printIt = function () {
    console.log(JSON.stringify(meetingsArray, null, '\t'));
    console.log(meetingsArray.length);
}

// setTimeout(printIt, 1000);

var saveIt = function () {
    var saveFileName = '/home/ubuntu/workspace/data/normalized' + zone + '.txt';
    fs.writeFileSync(saveFileName, JSON.stringify(meetingsArray, null, '\t'));
}

setTimeout(saveIt, 1000);

}

parseIt('01')
parseIt('02')
parseIt('03')
parseIt('04')
parseIt('05')
parseIt('06')
parseIt('07')
parseIt('08')
parseIt('09')
parseIt('10')