var express = require('express');

var app = express();
var meetings; 

var handlebars = require('express-handlebars')
    .create({
        defaultLayout: 'main'
    });

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {

    // QUERY AND SERVE

    process.env.TZ = 'America/New_York';
    var hourNow = new Date().getHours() - 2;
    var dayNow = new Date().getDay();
    var dayQuery;

    if (dayNow === 0) {
        dayQuery = "Sundays"
    }
    else if (dayNow === 1) {
        dayQuery = "Mondays"
    }
    else if (dayNow === 2) {
        dayQuery = "Tuesdays"
    }
    else if (dayNow === 3) {
        dayQuery = "Wednesdays"
    }
    else if (dayNow === 4) {
        dayQuery = "Thursdays"
    }
    else if (dayNow === 5) {
        dayQuery = "Fridays"
    }
    else if (dayNow === 6) {
        dayQuery = "Saturdays"
    }

    // Connection URL
    var url = 'mongodb://' + process.env.IP + ':27017/testdb';

    // Retrieve
    var MongoClient = require('mongodb').MongoClient;

    MongoClient.connect(url, function(err, db) {
        if (err) {
            return console.dir(err);
        }

        var collection = db.collection('meetsFinal');

        collection.aggregate(

            // [{$match: { meetingDay : "Sundays"}}, {$group : { _id : {meetingName : "$meetingName", meetingHouse: "$meetingHouse", latLong : "$latLong"}, days : {$push : "$meetingDay"}, startTimes : {$push : "$meetingStartTime"} }}]

            [{
                    $match: {
                        $and: [{
                                meetingDay: dayQuery
                            }, {
                                meetingStartTimeHour: {
                                    $gt: hourNow
                                }
                            } //replace 0 with hourNow
                        ]
                    }
                }, {
                    $group: {
                        _id: {
                            meetingName: "$meetingName",
                            meetingHouse: "$meetingHouse",
                            meetingAddress1: "$meetingAddress1",
                            meetingAddress2: "$meetingAddress2",
                            latLong: "$latLong",
                            zone: "$zone",
                            borough: "$borough",
                            meetingWheelchair: "$meetingWheelchair",
                            meetingDetails: "$meetingDetails"
                        },
                        days: {
                            $push: "$meetingDay"
                        },
                        startTimes: {
                            $push: "$meetingStartTime"
                        },
                        meetingType: {
                            $push: "$meetingType"
                        },
                        specialInterest: {
                            $push: "$specialInterest"
                        }
                    }
                }

                , {
                    $group: {
                        _id: {
                            loca: "$_id.latLong"
                        },
                        meets: {
                            $addToSet: {
                                meetingName: "$_id.meetingName",
                                meetingHouse: "$_id.meetingHouse",
                                meetingAddress1: "$_id.meetingAddress1",
                                meetingAddress2: "$_id.meetingAddress2",
                                borough: "$_id.borough",
                                meetingDetails: "$_id.meetingDetails",
                                meetingWheelchair: "$_id.meetingWheelchair"
                            }
                        },
                        deets: {
                            $addToSet: {
                                days: "$days",
                                startTimes: "$startTimes",
                                meetingType: "$meetingType",
                                specialInterest: "$specialInterest"
                            }
                        }
                    }

                }


            ]

        ).toArray(function(err, docs) {
            if (err) {
                console.log(err)

            }
            else {
                console.log(JSON.stringify(docs))
                var toSend = "var meetings = " + JSON.stringify(docs) + ";";
                var meetings = docs; 
                // res.send(toSend);
                res.render('dataa', { dataHere : toSend });
            }
            db.close();
        });

    }); //MongoClient.connect
    // res.render('dataa');
});

//custom 404 page
app.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});

//custom 500 page
app.use(function(err, req, res, next) {
    console.log(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), function() {
    console.log('Express started on: ' + app.get('port') + '; press Ctrl-C to terminate.');
});