<!DOCTYPE html>
  <html>
  <head>
    <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
    <meta charset="utf-8">
    <title>AA Meetings in Manhattan</title>
    <style>
      html, body, #map-canvas {
        height: 100%;
        margin: 0;
        padding: 0;
      }

      #firstHeading {
        font-size: 100%; 
      }

    </style>
    <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&signed_in=true"></script>
    <script>

hourNow = new Date().getHours();

function getMeetingHourStart (meetTime) {
    var theHour; 
    if (meetTime.substr(-2) == "PM") {
      theHour = meetTime.substr(0, meetTime.indexOf(':')) * 1 + 12;
    }
    else {theHour = meetTime.substr(0, meetTime.indexOf(':')) * 1}
return theHour;
}

function initialize() {
  var mapOptions = {
    zoom: 15,
    center: new google.maps.LatLng(40.7355145, -74.0031001)
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'),
                                mapOptions);
                                
  setMarkers(map, meetings);
}

var meetings = [{"_id":{"meetingName":"NEW GROUP - New Group","meetingHouse":"St. John's Lutheran Church","meetingAddress1":"83 Christopher Street (Red Door, Left of Church),","meetingAddress2":"(West of 7th Avenue, Enter Left, Red Door, Ring Buzzer) NY 10014","latLong":[40.7336246,-74.00377379999999],"zone":2,"borough":"Manhattan","meetingWheelchair":""},"days":["Sundays"],"startTimes":["12:30 PM"]},{"_id":{"meetingName":"MIDNITE - ","meetingHouse":"","meetingAddress1":"220 West Houston Street, 2nd Floor,","meetingAddress2":"(Betw 6th Avenue &amp; Varick Street) 10014","latLong":[40.72871,-74.004576],"zone":2,"borough":"Manhattan","meetingWheelchair":""},"days":["Sundays","Sundays","Sundays","Sundays","Sundays","Sundays","Sundays"],"startTimes":["12:00 AM","2:00 AM","12:30 PM","5:15 PM","6:30 PM","8:00 PM","10:00 PM"]},{"_id":{"meetingName":"GRUPO CENTRAL - Grupo Central","meetingHouse":"St. Augustine's Church","meetingAddress1":"292 Henry Street, Basement,","meetingAddress2":"(A la isquierda de la iglesia) NY 10002","latLong":[40.71371430000001,-73.983033],"zone":2,"borough":"Manhattan","meetingWheelchair":"Wheelchair access"},"days":["Sundays"],"startTimes":["3:00 PM"]},{"_id":{"meetingName":"ARTISTS IN RECOVERY (A.R.T.) - ","meetingHouse":"Seventh Day Adventist Church","meetingAddress1":"232 W. 11th Street,","meetingAddress2":"(between Waverly and West 4th Streets) 10014","latLong":[40.736056,-74.002725],"zone":2,"borough":"Manhattan","meetingWheelchair":""},"days":["Sundays"],"startTimes":["6:30 PM"]},{"_id":{"meetingName":"SPIRITUAL WORKSHOP - Spiritual Workshop","meetingHouse":"The Bronfman Cernter @ NYU","meetingAddress1":"7 East 10th Strert,","meetingAddress2":"(@ Houston Street) NY 10003","latLong":[40.7332774,-73.99463109999999],"zone":2,"borough":"Manhattan","meetingWheelchair":""},"days":["Sundays"],"startTimes":["11:00 AM"]},{"_id":{"meetingName":"ROOM FOR IMPROVEMENT     (:II) - ","meetingHouse":"Chinatown YMCA","meetingAddress1":"273 Bowery Street, \r\n\t\t\t\t\t\t10012","meetingAddress2":"","latLong":[40.7237496,-73.992395],"zone":2,"borough":"Manhattan","meetingWheelchair":"Wheelchair access"},"days":["Sundays"],"startTimes":["7:30 AM"]},{"_id":{"meetingName":"BAGELS AND BIG BOOK - ","meetingHouse":"","meetingAddress1":"220 West Houston Street, 2nd Floor,","meetingAddress2":"(Betw. 6th Avenue &amp; Varick Street) 10014","latLong":[40.72871,-74.004576],"zone":2,"borough":"Manhattan","meetingWheelchair":""},"days":["Sundays"],"startTimes":["10:30 AM"]},{"_id":{"meetingName":"RED DOOR - Red Door","meetingHouse":"St. John's Episcopal Church","meetingAddress1":"224 Waverly Place, 1st floor event room.,","meetingAddress2":"(@ 11th Street &amp; 7th Avenue South) NY 10014","latLong":[40.7360418,-74.0021409],"zone":2,"borough":"Manhattan","meetingWheelchair":""},"days":["Sundays","Sundays"],"startTimes":["7:00 PM","8:30 PM"]},{"_id":{"meetingName":"PERRY STREET WORKSHOP - Perry Street Workshop     (:I)","meetingHouse":"","meetingAddress1":"50 Perry Street, Ground Floor,","meetingAddress2":"(Betw. 7th Avenue South &amp; West 4th Street) NY 10014","latLong":[40.7355145,-74.0031001],"zone":2,"borough":"Manhattan","meetingWheelchair":""},"days":["Sundays","Sundays","Sundays","Sundays","Sundays","Sundays","Sundays","Sundays"],"startTimes":["10:30 PM","7:30 AM","9:00 AM","11:00 AM","1:00 PM","3:00 PM","6:00 PM","8:30 PM"]}];




function makeContent (cont) {

  // var m = cont;
  var contentHolder = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">';
  var mName = cont._id.meetingName.substr(0, cont._id.meetingName.indexOf("-") - 1); 

  contentHolder = contentHolder + mName + '</h1>';
  contentHolder = contentHolder + '<p>' + cont._id.meetingHouse + '<br>';
  contentHolder = contentHolder + cont._id.meetingAddress1.substr(0, cont._id.meetingAddress1.indexOf(',')) + '<br>';
  contentHolder = contentHolder + cont._id.meetingAddress2 + '</p>';
  // contentHolder = contentHolder +
  // contentHolder = contentHolder +

  contentHolder = contentHolder + '<p><b>upcoming meetings today: </b>';
  for (var i=0; i < cont.startTimes.length; i++) {

  //   if (getMeetingHourStart(cont.startTimes[i]) > hourNow - 1) {
    contentHolder = contentHolder + cont.startTimes[i];
      contentHolder = contentHolder + ', ';
  // }
}
  contentHolder = contentHolder.substr(0, contentHolder.length - 2)
  contentHolder = contentHolder + '</p>';
  return contentHolder;

}

function setMarkers(map, locations) {
  // Add markers to the map

      var infowindow = new google.maps.InfoWindow({
      maxWidth: 200
  });
    


  for (var i = 0; i < locations.length; i++) {
    var meeting = locations[i];
    var myLatLng = new google.maps.LatLng(meeting._id.latLong[0], meeting._id.latLong[1]);
    
    var contentWindow = makeContent(meetings[i]);
    
    
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        // title: meeting._id.meetingName,
        title: meeting._id.meetingName.substr(0, meeting._id.meetingName.indexOf("-") - 1),
        content: contentWindow,
    });
  
    google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(this.content);
    infowindow.open(map, this);
  });
  }
}

google.maps.event.addDomListener(window, 'load', initialize);

    </script>
  </head>
  <body>
    <div id="map-canvas"></div>
  </body>
</html>