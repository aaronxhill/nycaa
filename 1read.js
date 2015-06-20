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

// console.log(toParse);

var $ = cheerio.load(toParse);

// $('table').filter(function(){
//     return $(this).attr('cellspacing') === '2';
// });

var meetingsArray = []; 

// console.log($('table').attr('cellpadding', '5').find('tbody').find('tr').html()); 

$('table').attr('cellpadding', '5').find('tbody').find('tr').each(function(i, elem){
    meetingsArray[i] = new Object;
    meetingsArray[i].indx = i;
    meetingsArray[i].borough = "Manhattan";
    meetingsArray[i].zone = 2;
    // console.log(i);
    meetingsArray[i].meetingName = $(this).find('td').eq(0).find('b').text();
    meetingsArray[i].meetingHouse = $(this).find('td').eq(0).find('h4').text();
    meetingsArray[i].meetingAddress1 = $(this).find('td').eq(0).html().split('<br>')[2].trim();
    meetingsArray[i].meetingAddress2 = $(this).find('td').eq(0).html().split('<br>')[3].trim();
    meetingsArray[i].meetingAddress3 = $(this).find('td').eq(0).html().split('<br>')[4].trim();
    meetingsArray[i].meetingDetails = $(this).find('td').eq(0).find('div').eq(0).attr('class', 'detailsBox').text().trim();
    meetingsArray[i].meetingWheelchair = $(this).find('td').eq(0).find('span').text().trim();
    meetingsArray[i].meetingRawMeetings = $(this).find('td').eq(1).html().split('<br>\r\n                    \t<br>');
    
    
    
    // // console.log(elem);
    // console.log($(this).find('td').eq(0).find('b').text());
    // console.log($(this).find('td').eq(0).find('h4').text());
    // // console.log($(this).find('td').eq(0).html());
    // // console.log($(this).find('td').eq(0).html().split('<br>'));
    // console.log($(this).find('td').eq(0).html().split('<br>')[2].trim());
    // console.log($(this).find('td').eq(0).html().split('<br>')[3].trim());
    // console.log($(this).find('td').eq(0).html().split('<br>')[4].trim());
    // console.log($(this).find('td').eq(0).find('div').eq(0).attr('class', 'detailsBox').text().trim());
    // console.log($(this).find('td').eq(0).find('span').text().trim());

    // // console.log($(this).find('td').eq(1).html().split('<br><br>'));
    // console.log($(this).find('td').eq(1).html().split('<br>\r\n                    \t<br>'));

    // console.log('  ');
    // console.log(' * * * * *');
    // console.log('  ');
}); 

var x = [ '\r\n                   \t \t\r\n\t\t\t\t  \t    <b>Sundays From</b>  7:30 AM <b>to</b> 8:30 AM <br><b>Meeting Type</b> OD = Open Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Saturdays From</b>  7:30 AM <b>to</b> 8:30 AM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Fridays From</b>  7:30 AM <b>to</b> 8:30 AM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Thursdays From</b>  7:30 AM <b>to</b> 8:30 AM <br><b>Meeting Type</b> S = Step meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Wednesdays From</b>  7:30 AM <b>to</b> 8:30 AM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Tuesdays From</b>  7:30 AM <b>to</b> 8:30 AM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Mondays From</b>  7:30 AM <b>to</b> 8:30 AM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Mondays From</b>  9:00 AM <b>to</b> 10:00 AM <br><b>Meeting Type</b> OD = Open Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Sundays From</b>  9:00 AM <b>to</b> 10:00 AM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Fridays From</b>  9:00 AM <b>to</b> 10:00 AM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Thursdays From</b>  9:00 AM <b>to</b> 10:00 AM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Wednesdays From</b>  9:00 AM <b>to</b> 10:00 AM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Tuesdays From</b>  9:00 AM <b>to</b> 10:00 AM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Saturdays From</b>  9:30 AM <b>to</b> 10:00 AM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Fridays From</b>  10:30 AM <b>to</b> 11:30 AM <br><b>Meeting Type</b> C = Closed Discussion meeting <br><b>Special Interest</b> Women\r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Sundays From</b>  11:00 AM <b>to</b> 12:00 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Saturdays From</b>  12:00 PM <b>to</b> 1:00 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Mondays From</b>  12:15 PM <b>to</b> 1:15 PM <br><b>Meeting Type</b> B = Beginners meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Fridays From</b>  12:15 PM <b>to</b> 1:15 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Thursdays From</b>  12:15 PM <b>to</b> 1:15 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Wednesdays From</b>  12:15 PM <b>to</b> 1:15 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Tuesdays From</b>  12:15 PM <b>to</b> 1:15 PM <br><b>Meeting Type</b> S = Step meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Sundays From</b>  1:00 PM <b>to</b> 2:00 PM <br><b>Meeting Type</b> C = Closed Discussion meeting <br><b>Special Interest</b> Children Welcome\r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Tuesdays From</b>  2:30 PM <b>to</b> 3:30 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Mondays From</b>  2:30 PM <b>to</b> 3:30 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Saturdays From</b>  2:30 PM <b>to</b> 3:30 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Fridays From</b>  2:30 PM <b>to</b> 3:30 PM <br><b>Meeting Type</b> OD = Open Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Thursdays From</b>  2:30 PM <b>to</b> 3:30 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Wednesdays From</b>  2:30 PM <b>to</b> 3:30 PM <br><b>Meeting Type</b> B = Beginners meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Sundays From</b>  3:00 PM <b>to</b> 4:30 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Tuesdays From</b>  4:00 PM <b>to</b> 5:00 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Mondays From</b>  4:00 PM <b>to</b> 5:00 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Saturdays From</b>  4:00 PM <b>to</b> 5:00 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Thursdays From</b>  4:00 PM <b>to</b> 5:00 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Wednesdays From</b>  4:00 PM <b>to</b> 5:00 PM <br><b>Meeting Type</b> OD = Open Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Fridays From</b>  4:00 PM <b>to</b> 6:00 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Thursdays From</b>  5:30 PM <b>to</b> 6:30 PM <br><b>Meeting Type</b> BB = Big Book meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Wednesdays From</b>  6:00 PM <b>to</b> 7:00 PM <br><b>Meeting Type</b> S = Step meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Tuesdays From</b>  6:00 PM <b>to</b> 7:00 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Mondays From</b>  6:00 PM <b>to</b> 7:00 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Saturdays From</b>  6:00 PM <b>to</b> 7:00 PM <br><b>Meeting Type</b> OD = Open Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Sundays From</b>  6:00 PM <b>to</b> 7:00 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Fridays From</b>  6:00 PM <b>to</b> 7:00 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Thursdays From</b>  7:00 PM <b>to</b> 8:00 PM <br><b>Meeting Type</b> B = Beginners meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Tuesdays From</b>  8:30 PM <b>to</b> 9:30 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Mondays From</b>  8:30 PM <b>to</b> 9:30 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Saturdays From</b>  8:30 PM <b>to</b> 9:30 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Sundays From</b>  8:30 PM <b>to</b> 9:30 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Thursdays From</b>  8:30 PM <b>to</b> 9:30 PM <br><b>Meeting Type</b> OD = Open Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Fridays From</b>  8:30 PM <b>to</b> 10:30 PM <br><b>Meeting Type</b> S = Step meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Wednesdays From</b>  8:30 PM <b>to</b> 9:30 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Thursdays From</b>  10:15 PM <b>to</b> 11:15 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Wednesdays From</b>  10:15 PM <b>to</b> 11:15 PM <br><b>Meeting Type</b> BB = Big Book meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Tuesdays From</b>  10:15 PM <b>to</b> 11:15 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Mondays From</b>  10:15 PM <b>to</b> 11:15 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Sundays From</b>  10:30 PM <b>to</b> 11:30 PM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Saturdays From</b>  11:00 PM <b>to</b> 12:00 AM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\r\n\t\t\t\t  \t    <b>Fridays From</b>  11:00 PM <b>to</b> 12:00 AM <br><b>Meeting Type</b> C = Closed Discussion meeting \r\n\t\t\t \t\t\t',
  '\r\n                    \t\t\r\n\t\t\t\t\t' ];
  
  var parseMeetings = function (x) {
  
      x.splice(x.length-1, 1)
      
      for (var i=0; i < x.length; i++) {
          x[i] = x[i].trim();
          console.log(x[i]);
          console.log(x[i].substring(x[i].indexOf('<b>')+3, x[i].indexOf(' From')));
          console.log(x[i].substring(x[i].indexOf('From</b>  ')+10, x[i].indexOf(' <b>to</b> ')));
          console.log(x[i].substring(x[i].indexOf(' <b>to</b> ')+11, x[i].indexOf(' <br><b>')));
          console.log(x[i].substring(x[i].indexOf('Meeting Type</b> ')+17, x[i].indexOf(' =')));
          if (x[i].indexOf('Special Interest</b> ') !=-1) {console.log(x[i].substring(x[i].indexOf('Special Interest</b> ')+21));}
      }
    };
    
  var parseMeetings2 = function (x) {
  
      x.splice(x.length-1, 1)
      var newX = [];
      
      for (var i=0; i < x.length; i++) {
          newX[i] = new Object;
          x[i] = x[i].trim();
        //   console.log(x[i]);
          newX[i].day = x[i].substring(x[i].indexOf('<b>')+3, x[i].indexOf(' From'));
          newX[i].startTime = x[i].substring(x[i].indexOf('From</b>  ')+10, x[i].indexOf(' <b>to</b> '));
          newX[i].endTime = x[i].substring(x[i].indexOf(' <b>to</b> ')+11, x[i].indexOf(' <br><b>'));
          newX[i].meetingType = x[i].substring(x[i].indexOf('Meeting Type</b> ')+17, x[i].indexOf(' ='));
          if (x[i].indexOf('Special Interest</b> ') !=-1) {newX[i].specialInterest = x[i].substring(x[i].indexOf('Special Interest</b> ')+21);}
      }
      return newX; 
    };

    
// console.log(parseMeetings2(x)); 
  
  var px = function (inpArr) {
      for (var i=0; i < inpArr.length; i++) {
          inpArr[i].meetingList = parseMeetings2(inpArr[i].meetingRawMeetings);
      }
    //   console.log(meetingsArray);
  };
  
  setTimeout(px(meetingsArray), 500)

var printIt = function () {
    console.log(JSON.stringify(meetingsArray, null, '\t'));
    console.log(meetingsArray.length)
}

setTimeout(printIt, 1000);