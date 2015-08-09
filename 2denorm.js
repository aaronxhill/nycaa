var fs = require("fs");
var request = require("request");
var async = require("async");

var toParse;
toParse = fs.readFileSync('/home/ubuntu/workspace/data/normalized.txt').toString();

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
        newObj[newObj.length - 1].meetingName = obj.meetingName;
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
        // if (newObj[newObj.length - 1].specialInterest) {
            newObj[newObj.length - 1].specialInterest = arr[i].specialInterest;
        // }
    }
}

denorm(meets)

var geoCodeIt = function(arr) {
    for (var i = 0; i < arr.length; i++) {
        var substringChar = ','
        var commaI = arr[i].meetingAddress1.indexOf(',');
        var parenI = arr[i].meetingAddress1.indexOf('(');
        if (parenI >= 0) {
            if (parenI < commaI) {
                substringChar = '('
            }
        }
        arr[i].addToGeoCode = arr[i].meetingAddress1.substring(0, arr[i].meetingAddress1.indexOf(substringChar)) + ", New York, NY";
        arr[i].addToGeoCode = arr[i].addToGeoCode.split(' ').join('+');
    }
}

setTimeout(geoCodeIt(newObj), 500)

var googleGeoCodeI = 0;

var googleGeoCode = function(arr) {

    async.eachSeries(arr, function(value, callb) {
        var toLookUp = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + value.addToGeoCode + '&key=' +
            'AIzaSyBrLKVurPvDQH95rCiJk4Vou56RGP1WNk0';
            console.log(value.addToGeoCode)
        request(toLookUp, function(error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(JSON.parse(body).status);
                value.latLong = [];
                value.latLong[0] = JSON.parse(body).results[0].geometry.location.lat;
                value.latLong[1] = JSON.parse(body).results[0].geometry.location.lng;
                // console.log(value)
            }
        })
        setTimeout(callb, 200)
    }, function(err) {
        if (err) throw err;
        mongoIt(arr, 'testdb', 'draftMeetsDenorm1');
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

};

// db.draftMeetsDenorm1.aggregate([{$group : { _id : "$meetingName", meetings : {$push : "$$ROOT"} }}]).pretty()