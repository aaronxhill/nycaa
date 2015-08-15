var fs = require("fs");

var fileToParse = '/home/ubuntu/workspace/data/normalized01.txt';

var toParse;
toParse = fs.readFileSync(fileToParse).toString();

var meets = JSON.parse(toParse);

function fixNameX (name) {
    var namee = name;
    var lowerCaseIndex;
    var broken = false; 
    var i = 0; 
    // get rid of redundant lowercase repeats
    while (broken == false) {
        lowerCaseIndex = name.length;
        if (name.substr(i, 1) != name.substr(i, 1).toUpperCase() && name.substr(i, 1) === name.substr(i, 1).toLowerCase()) {
            if (name.substr(i, 1) === name.substr(i, 1).toLowerCase()) {
                lowerCaseIndex = i;
                broken = true;
                namee = namee.substr(0, lowerCaseIndex - 3);
            }
        }
        else {
            i = i + 1;
            if (i == name.length - 1) {
                broken = true;
            }
        }
    }
        
    //get rid of unnecessary hyphens
    if (namee.substr(-3) === ' - ') {
        namee = namee.substr(0, namee.length-3);
    }
    
    return namee; 
}

function fixName (name) {
    var nameeC = name.toUpperCase();
    var namee = name; 

    if (nameeC.lastIndexOf(namee.substr(0, 5)) > 0) {
        namee = namee.substr(0, nameeC.lastIndexOf(nameeC.substr(0, 5)))
    }
    
    //get rid of unnecessary hyphens
    if (namee.substr(-3) === ' - ') {
        namee = namee.substr(0, namee.length-3);
    }
    
    //get rid of (:I%)
    if (namee.indexOf('(:I') != -1) {
        namee = namee.substr(0, namee.indexOf('(:I'));
    }

    //get rid of (I)
    if (namee.indexOf('(I)') != -1) {
        namee = namee.substr(0, namee.indexOf('(I)'));
    }

    //get rid of (II)
    if (namee.indexOf('(II)') != -1) {
        namee = namee.substr(0, namee.indexOf('(II)'));
    }
    
    //get rid of ( :II)
    if (namee.indexOf('( :II)') != -1) {
        namee = namee.substr(0, namee.indexOf('( :II)'));
    }

    //get rid of ( :1)
    if (namee.indexOf('( :1)') != -1) {
        namee = namee.substr(0, namee.indexOf('( :1)'));
    }
    
    return namee.trim(); 
}


// for (var i=0; i < meets.length; i++) {
//     console.log(meets[i].meetingName);
//     console.log(fixName(meets[i].meetingName));
//     console.log(" ")
// }

function fixAddress (addy) {
        var geoAddy; 
        var substringChar = ','
        var commaI = addy.indexOf(',');
        var parenI = addy.indexOf('(');
        var hyphnI = addy.indexOf('-');
        if (parenI >= 0) {
            if (parenI < commaI) {
                substringChar = '('
            }
        }
        if (hyphnI >=0) {
            if (addy.indexOf('Street') < addy.indexOf('-'))
            substringChar = '-'
        }
        geoAddy = addy.substring(0, addy.indexOf(substringChar)) + ", New York, NY";
        geoAddy = geoAddy.split(' ').join('+');
        geoAddy = geoAddy.replace("&apos;", "");
        geoAddy = geoAddy.replace("Strert", "Street");
        return geoAddy;
}

for (var i=0; i < meets.length; i++) {
    console.log(meets[i].meetingAddress1);
    console.log(fixAddress(meets[i].meetingAddress1));
    console.log(" ")
}

// 12 West 12th Street, 6th Floor-Roof Level,
// 12+West+12th+Street,+6th+Floor,+New+York,+NY

// COUNT ALL MEETINGS
var meetCount = 0; 
for (var i=0; i < meets.length; i++) {
    for (var j=0; j < meets[i].meetingList.length; j++) {
        meetCount = meetCount + 1; 
    }
}

function wait () {
console.log(meetCount)}

// setTimeout(wait, 100)