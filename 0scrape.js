// SCRAPE

// TODO
// 1. functions and modularize (to loop over all zones in Manhattan and Brooklyn)
// 2. mongo query:
// http://docs.mongodb.org/manual/reference/operator/aggregation/group/
// 3. promises instead of settimeout
// 4. Google Maps API

var request = require('request');
var fs = require("fs");

function scrapeIt (zone) {
    var reqUrl = 'http://www.nyintergroup.org/meetinglist/meetinglist.cfm?zone=' + zone + '&borough=M';
    var filNme = '/home/ubuntu/workspace/data/m' + zone + '.txt';
request(reqUrl, function(error, response, body) {
    if (!error && response.statusCode == 200) {
        fs.writeFileSync(filNme, body);
    }
});
}

scrapeIt('01');
scrapeIt('02');
scrapeIt('03');
scrapeIt('04');
scrapeIt('05');
scrapeIt('06');
scrapeIt('07');
scrapeIt('08');
scrapeIt('09');
scrapeIt('10');