// TODO
// 1. functions and modularize
// 2. mongo query
// 3. 

var request = require('request');
var fs = require("fs");
var cheerio = require('cheerio');

// request('http://www.nyintergroup.org/meetinglist/meetinglist.cfm?zone=02&borough=M', function(error, response, body) {
//     if (!error && response.statusCode == 200) {
//         fs.writeFileSync('/home/ubuntu/workspace/data/m02.txt', body);
//     }
// });

var toParse;
toParse = fs.readFileSync('/home/ubuntu/workspace/data/m02.txt').toString();

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
        newX[i].endTime = x[i].substring(x[i].indexOf(' <b>to</b> ') + 11, x[i].indexOf(' <br><b>'));
        newX[i].meetingType = x[i].substring(x[i].indexOf('Meeting Type</b> ') + 17, x[i].indexOf(' ='));
        if (x[i].indexOf('Special Interest</b> ') != -1) {
            newX[i].specialInterest = x[i].substring(x[i].indexOf('Special Interest</b> ') + 21);
        }
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

setTimeout(printIt, 1000);

var mongoIt = function() {

    var url = 'mongodb://' + process.env.IP + ':27017/testdb';
    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(url, function(err, db) {
        if (err) {
            return console.dir(err);
        }

        var collection = db.collection('draftMeets1');

        for (var i = 0; i < meetingsArray.length; i++) {
            // WRITE meetingsArray[i] TO MONGO
            collection.insert(meetingsArray[i]);

        }

        db.close();

    }); //MongoClient.connect

};

// setTimeout(mongoIt, 1000);