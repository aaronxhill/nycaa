// DENORM AND INSERT

var fs = require("fs");
var request = require("request");
var async = require("async");

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

function denormAndInsert (zone) {
    var fileToParse = '/home/ubuntu/workspace/data/normalized' + zone + '.txt';

var toParse;
toParse = fs.readFileSync(fileToParse).toString();

var meets = JSON.parse(toParse);

var newObj = [];
// var j = 0; 

var denorm = function(obj) {
    for (var i = 0; i < obj.length; i++) {
        handleInner(obj[i].meetingList, obj[i])
    }
}

var handleInner = function(arr, obj) {
    for (var i = 0; i < arr.length; i++) {
        newObj.push(new Object);
        newObj[newObj.length - 1].borough = obj.borough;
        newObj[newObj.length - 1].zone = obj.zone;
        newObj[newObj.length - 1].meetingName = fixName(obj.meetingName);
        newObj[newObj.length - 1].meetingHouse = obj.meetingHouse;
        newObj[newObj.length - 1].meetingAddress1 = obj.meetingAddress1;
        newObj[newObj.length - 1].meetingAddress2 = obj.meetingAddress2;
        newObj[newObj.length - 1].meetingAddress3 = obj.meetingAddress3;
        newObj[newObj.length - 1].meetingDetails = obj.meetingDetails;
        newObj[newObj.length - 1].meetingWheelchair = obj.meetingWheelchair;

        newObj[newObj.length - 1].meetingDay = arr[i].day;
        newObj[newObj.length - 1].meetingStartTime = arr[i].startTime;
        newObj[newObj.length - 1].meetingStartTimeHour = arr[i].startTimeHour;
        newObj[newObj.length - 1].meetingEndTime = arr[i].endTime;
        newObj[newObj.length - 1].meetingType = arr[i].meetingType;
        newObj[newObj.length - 1].specialInterest = arr[i].specialInterest;
    }
}

denorm(meets)

var geoCodeIt = function(arr) {
    for (var i = 0; i < arr.length; i++) {
        arr[i].addToGeoCode = fixAddress(arr[i].meetingAddress1);
    }
}

setTimeout(geoCodeIt(newObj), 500)

var googleGeoCode = function(arr) {

    async.eachSeries(arr, function(value, callb) {
        var toLookUp = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.addToGeoCode + '&key=' +
            'AIzaSyBrLKVurPvDQH95rCiJk4Vou56RGP1WNk0';
            // console.log(value.addToGeoCode)
        request(toLookUp, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                if (JSON.parse(body).status === 'OVER_QUERY_LIMIT') {throw new Error("OVER_QUERY_LIMIT")};
                value.latLong = [];
                value.latLong[0] = JSON.parse(body).results[0].geometry.location.lat;
                value.latLong[1] = JSON.parse(body).results[0].geometry.location.lng;
            }
            // else if (error) {console.log(error)}
            else {console.log("something else went wrong")}
        })
        setTimeout(callb, 500)
    }, function(err) {
        if (err) throw err;
        mongoIt(arr, 'testdb', 'meetsFinal');
    })
}

setTimeout(googleGeoCode(newObj), 3000)

var fn = function() {
    console.log(newObj);
}

// setTimeout(fn, 2000)

var mongoIt = function(arr, dbName, collName) {

    var url = 'mongodb://' + process.env.IP + ':27017/' + dbName;
    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(url, function(err, db) {
        if (err) {
            return console.dir(err);
        }

        var collection = db.collection(collName);

        for (var i = 0; i < arr.length; i++) {
            // WRITE meetingsArray[i] TO MONGO
            collection.insert(arr[i]);

        }

        db.close();

    }); //MongoClient.connect

    console.log("done with zone " + z[iterator])
    if (iterator < z.length - 1) {
        iterator = iterator + 1;
        denormAndInsert(z[iterator])
    }

};
} //function denormAndInsert

var z = ['10']
// var z = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10']
var iterator = 0; 
denormAndInsert('10')

