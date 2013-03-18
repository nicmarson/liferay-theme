/**
 * map
 */
var imageA = new google.maps.MarkerImage(
  '../images/marker-images/sprite.png',
  new google.maps.Size(24,38),
  new google.maps.Point(0,0),
  new google.maps.Point(12,38)
);

var imageB = new google.maps.MarkerImage(
  '../images/marker-images/sprite.png',
  new google.maps.Size(24,38),
  new google.maps.Point(0,40),
  new google.maps.Point(12,38)
);

var imageC = new google.maps.MarkerImage(
  '../images/marker-images/sprite.png',
  new google.maps.Size(24,38),
  new google.maps.Point(0,80),
  new google.maps.Point(12,38)
);

var imageD = new google.maps.MarkerImage(
  '../images/marker-images/sprite.png',
  new google.maps.Size(24,38),
  new google.maps.Point(0,120),
  new google.maps.Point(12,38)
);

var imageE = new google.maps.MarkerImage(
  '../images/marker-images/sprite.png',
  new google.maps.Size(24,38),
  new google.maps.Point(0,160),
  new google.maps.Point(12,38)
);

var imageF = new google.maps.MarkerImage(
  '../images/marker-images/sprite.png',
  new google.maps.Size(24,38),
  new google.maps.Point(0,200),
  new google.maps.Point(12,38)
);

var imageG = new google.maps.MarkerImage(
  '../images/marker-images/sprite.png',
  new google.maps.Size(24,38),
  new google.maps.Point(0,240),
  new google.maps.Point(12,38)
);

var imageH = new google.maps.MarkerImage(
  '../images/marker-images/sprite.png',
  new google.maps.Size(24,38),
  new google.maps.Point(0,280),
  new google.maps.Point(12,38)
);

var imageI = new google.maps.MarkerImage(
  '../images/marker-images/sprite.png',
  new google.maps.Size(24,38),
  new google.maps.Point(0,320),
  new google.maps.Point(12,38)
);

var imageJ = new google.maps.MarkerImage(
  '../images/marker-images/sprite.png',
  new google.maps.Size(24,38),
  new google.maps.Point(0,360),
  new google.maps.Point(12,38)
);

var shadow = new google.maps.MarkerImage(
  '../images/marker-images/shadow.png',
  new google.maps.Size(46,38),
  new google.maps.Point(0,0),
  new google.maps.Point(12,38)
);

var shape = {
  coord: [23,0,23,1,23,2,23,3,23,4,23,5,23,6,23,7,23,8,23,9,23,10,23,11,23,12,23,13,23,14,23,15,23,16,23,17,23,18,23,19,23,20,23,21,23,22,23,23,23,24,23,25,23,26,23,27,23,28,16,29,15,30,15,31,14,32,14,33,13,34,13,35,12,36,12,37,11,37,11,36,10,35,10,34,9,33,9,32,8,31,8,30,7,29,0,28,0,27,0,26,0,25,0,24,0,23,0,22,0,21,0,20,0,19,0,18,0,17,0,16,0,15,0,14,0,13,0,12,0,11,0,10,0,9,0,8,0,7,0,6,0,5,0,4,0,3,0,2,0,1,0,0,23,0],
  type: 'poly'
};

var infoWindow = new google.maps.InfoWindow();
var markerBounds = new google.maps.LatLngBounds();
var markersArray = [];
var iterator = 0;

var mapOpts = {
  mapTypeId: google.maps.MapTypeId.ROADMAP,
  scaleControl: true,
  scrollwheel: false
};
var map = new google.maps.Map(document.getElementById("map_canvas"), mapOpts);
 
function makeMarker(opts){

  var marker = new google.maps.Marker({
    // Default Options
    map: map,
    shadow: shadow,
    shape: shape
  });
  marker.setOptions(opts); // Allows definition of custom icon: A, B, C...

  var infowindowHTML = '<div class="pp-place-title">' + opts.title + '</div>'+
    '<div dir="ltr" class="pp-headline-item pp-headline-address">' + opts.address + ',<br/>' + opts.suite + opts.city + ', ' + opts.state + ' ' + opts.zip + '</div>'+
    '<div class="pp-headline-item pp-headline-phone">' + opts.phone1 + opts.phone2 + opts.fax + '<span style="display:none" class="pp-headline-phone-label"> ()</span></span>  &lrm; </div>' +
    '<div class="pp-headline-item pp-headline-hours">' + opts.hours + '</div>' +
    '<div><a href="http://maps.google.com/?daddr=' + opts.address + ' ' + opts.city + ', ' + opts.state + ' ' + opts.zip + '" target="_blank">Get Directions</a></div>';

  google.maps.event.addListener(marker, "click", function(){
    infoWindow.setOptions({
      content: infowindowHTML,
      maxWidth: 200
    });
    infoWindow.open(map, marker);
    if(this.sidebarButton){
      this.sidebarButton.button.focus();
    }
  });

  marker.getIcon();
  marker.sidebarButton = new SidebarItem(marker, opts);
  marker.sidebarButton.addIn("sidebar");
  markersArray.push(marker);
  return marker;
}

google.maps.event.addListener(map, "click", function(){
  infoWindow.close();
});


function SidebarItem(marker, opts){

  var tag = "div";
  var row = document.createElement(tag);
  var sidebarHTML = '<div class="highlightMarker">' +
    '<div class="popover top">' +
      '<div class="arrow"></div>' +
      '<div class="popover-content">' + opts.letter + '</div>' +
    '</div>' +
    '<div class="vcard">' +
      '<div class="pp-place-title">' + opts.title + '</div>' +
      '<div class="pp-headline-item pp-headline-address" dir="ltr">' + opts.address + '<br/>' + opts.city + ', ' + opts.state + '</div>' +
    '</div>' +
  '</div>';
  row.innerHTML = sidebarHTML;
  row.className = "sidebar_item";
  row.style.display = "block";

  row.onclick = function(){
    google.maps.event.trigger(marker, 'click');
  };
  row.onmouseover = function(){
    google.maps.event.trigger(marker, 'mouseover');
  };
  row.onmouseout = function(){
    google.maps.event.trigger(marker, 'mouseout');
  };
  this.button = row;
}

SidebarItem.prototype.addIn = function(){
  this.div = document.getElementById("map_sidebar");
  this.div.appendChild(this.button);
};

function placeMarkers(filename) {

  var markerCounter = 0;

  $.get(filename, function(xml){
    $(xml).find("marker").each(function(){

      // Assign XML data to variables
      var lat = $(this).find('lat').text();
      var lng = $(this).find('lng').text();
      var point = new google.maps.LatLng(parseFloat(lat),parseFloat(lng));
      var title = $(this).find('title').text();
      var address = $(this).find('address').text();
      var suite = $(this).find('suite').text();
      if ( suite.length ) {
        var suite = suite + ",<br/>";
      }
      var city = $(this).find('city').text();
      var state = $(this).find('state').text();
      var zip = $(this).find('zip').text();
      var phone1 = $(this).find('phone1').text();
      var phone2 = $(this).find('phone2').text();
      if ( phone2.length ) {
        var phone2 = "<br/>" + phone2;
      }
      var fax = $(this).find('fax').text();
      if ( fax.length ) {
        var fax = "<br/>FAX " + fax;
      }
      var hours = $(this).find('hours').text();

      if (markerCounter == 0) {
        var icon = imageA;
        var letter = "A";
      };
      if (markerCounter == 1) {
        var icon = imageB;
        var letter = "B";
      };
      if (markerCounter == 2) {
        var icon = imageC;
        var letter = "C";
      };
      if (markerCounter == 3) {
        var icon = imageD;
        var letter = "D";
      };
      if (markerCounter == 4) {
        var icon = imageE;
        var letter = "E";
      };
      if (markerCounter == 5) {
        var icon = imageF;
        var letter = "F";
      };
      if (markerCounter == 6) {
        var icon = imageG;
        var letter = "G";
      };
      if (markerCounter == 7) {
        var icon = imageH;
        var letter = "H";
      };
      if (markerCounter == 8) {
        var icon = imageI;
        var letter = "I";
      };
      if (markerCounter == 9) {
        var icon = imageJ;
        var letter = "J";
      };

      // Create the marker
      var markerOptions = {
        animation: google.maps.Animation.DROP,
        icon: icon,
        letter: letter,
        position: point,
        title: title,
        address: address,
        suite: suite,
        city: city,
        state: state,
        zip: zip,
        phone1: phone1,
        phone2: phone2,
        fax: fax,
        hours: hours
      };
      setTimeout(function() {
        makeMarker(markerOptions);
      }, 400);

      markerCounter++;
      
      // extend the bounds to include the new point
      markerBounds.extend(point);
      map.fitBounds(markerBounds);
    });
  });
}


/**
 *   Map Controls
 */

// Deletes all markers in the array by removing references to them
function deleteOverlays(f) {
  if (markersArray) {
    for (i in markersArray) {
      markersArray[i].setMap(null);
    }
    $("#map_sidebar").html("");
    markerBounds = new google.maps.LatLngBounds(null);
    placeMarkers(f);
  } else {
    placeMarkers(f);
  }
}

$(document).ready(function() {
  $(".js-washingtonMarkers").click(function(){
    deleteOverlays('/assets/js/xml/washington.xml');
  });
  $(".js-oregonMarkers").click(function(){
    deleteOverlays('/assets/js/xml/oregon.xml');
  });
  $(".js-idahoMarkers").click(function(){
    deleteOverlays('/assets/js/xml/idaho.xml');
  });
  $(".js-utahMarkers").click(function(){
    deleteOverlays('/assets/js/xml/utah.xml');
  });
});
