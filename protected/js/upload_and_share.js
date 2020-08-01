//js by CHiT

const searchParams = new URLSearchParams(window.location.search);



// js by CHiT

function CheckTimeMsg() {
  var SD = document.getElementById('starting-time').value;
  var today = new Date();
  if (Date.parse(SD) >= Date.parse(today)) {
    document.getElementById('check-date-message').style.color = 'red';
    document.getElementById('check-date-message').innerHTML = 'You Are Not Coming From Future, Right?';
    document.getElementById("submit").disabled = true;
  } else {
    document.getElementById('check-date-message').innerHTML = '';
    document.getElementById("submit").disabled = false;
  }
}


// js by CHiT

// Google Map

// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see the error "The Geolocation service
// failed.", it means you probably did not give permission for the browser to
// locate you.
var map, infoWindow;

var HONG_KONG_BOUNDS = {
  north: 22.570314,
  south: 22.135727,
  west: 113.819096,
  east: 114.513178,
};

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: 22.3193, lng: 114.1694 },
    restriction: {
      latLngBounds: HONG_KONG_BOUNDS,
      strictBounds: false,
    },
    zoom: 12,
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{ color: '#746855' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#1f2835' }]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#f3d19c' }]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{ color: '#2f3948' }]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }]
      },
      {
        featureType: 'poi.medical',
        stylers: [{
          visibility: 'off'
        }]
      },
      {
        featureType: 'poi.business',
        stylers: [{
          visibility: 'off'
        }]
      },
      {
        featureType: 'poi.place_of_worship',
        stylers: [{
          visibility: 'off'
        }]
      },
      {
        featureType: 'poi.school',
        stylers: [{
          visibility: 'off'
        }]
      }
    ]
  });

  infoWindow = new google.maps.InfoWindow;




// create & add geoJson to the data-layer
map.data.loadGeoJson('hksar_18_district_boundary.json');


//process the points via the linked function  
// processPoints(data.getFeatureById('idOfTheFeature').getGeometry(), 
// bounds.extend,
// bounds);

//set the bounds of the map
// map.fitBounds(bounds);



map.data.setStyle(function (feature) {
  // if(feature.getProperty("District")=="Central \u0026 Western"){
  //   return {
  //     fillColor: 'green',
  //     fillOpacity: 0.1,
  //     strokeWeight: 1,
  //     strokeColor: '#b57f1b65',
  //     strokeOpacity: 0.8
  //   }
  // } else {
  return {
    strokeWeight: 1,
    strokeColor: '#b57f1b65',
    strokeOpacity: 0.8
  }
  // }
});


map.data.addListener('click', function (event) {
  map.data.overrideStyle(event.feature, { strokeWeight: 2, strokeColor: '#FFFFFF', strokeOpacity: 1, fillColor: 'white', fillOpacity: 0.1 });

  // var myHTML = event.feature.getProperty("District");
  // if (event.feature.getProperty("District") == "Central \u0026 Western") {
  //   var myHTML = "<div class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>CENTRAL AND WESTERN</div><div>中西區</div></div>"
  //   infoWindow.setContent("<div style='width:150px;'>" + myHTML + "</div>");
  //   infoWindow.close(map)
  //   infoWindow.setPosition({
  //     lat: 22.296836,
  //     lng: 114.139491
  //   });
  //   infoWindow.open(map);
  // } else if (event.feature.getProperty("District") == "Eastern") {
  //   var myHTML = "<div class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>EASTERN</div><div>東區</div></div>"
  //   infoWindow.setContent("<div style='width:150px;'>" + myHTML + "</div>");
  //   infoWindow.close(map)
  //   infoWindow.setPosition({
  //     lat: 22.299231,
  //     lng: 114.210801
  //   });
  //   infoWindow.open(map);
  // } else if (event.feature.getProperty("District") == "Wan Chai") {
  //   var myHTML = "<div class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>WAN CHAI</div><div>灣仔區</div></div>"
  //   infoWindow.setContent("<div style='width:150px;'>" + myHTML + "</div>");
  //   infoWindow.close(map)
  //   infoWindow.setPosition({
  //     lat: 22.289847,
  //     lng: 114.179488
  //   });
  //   infoWindow.open(map);
  // } else if (event.feature.getProperty("District") == "Southern") {
  //   var myHTML = "<div class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>SOUTHERN</div><div>南區</div></div>"
  //   infoWindow.setContent("<div style='width:150px;'>" + myHTML + "</div>");
  //   infoWindow.close(map)
  //   infoWindow.setPosition({
  //     lat: 22.259003,
  //     lng: 114.204226
  //   });
  //   infoWindow.open(map);
  // } else if (event.feature.getProperty("District") == "Yau Tsim Mong") {
  //   var myHTML = "<div class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>YAU TSIM MONG</div><div>油尖旺區</div></div>"
  //   infoWindow.setContent("<div style='width:150px;'>" + myHTML + "</div>");
  //   infoWindow.close(map)
  //   infoWindow.setPosition({
  //     lat: 22.326429,
  //     lng: 114.167941
  //   });
  //   infoWindow.open(map);
  // } else if (event.feature.getProperty("District") == "Sham Shui Po") {
  //   var myHTML = "<div class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>SHAM SHUI PO</div><div>深水埗區</div></div>"
  //   infoWindow.setContent("<div style='width:150px;'>" + myHTML + "</div>");
  //   infoWindow.close(map)
  //   infoWindow.setPosition({
  //     lat: 22.348220,
  //     lng: 114.163508
  //   });
  //   infoWindow.open(map);
  // } else if (event.feature.getProperty("District") == "Kowloon City") {
  //   var myHTML = "<div class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>KOWLOON CITY</div><div>九龍城區</div></div>"
  //   infoWindow.setContent("<div style='width:150px;'>" + myHTML + "</div>");
  //   infoWindow.close(map)
  //   infoWindow.setPosition({
  //     lat: 22.348883,
  //     lng: 114.175617
  //   });
  //   infoWindow.open(map);
  // } else if (event.feature.getProperty("District") == "Wong Tai Sin") {
  //   var myHTML = "<div class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>WONG TAI SIN</div><div>黃大仙區</div></div>"
  //   infoWindow.setContent("<div style='width:150px;'>" + myHTML + "</div>");
  //   infoWindow.close(map)
  //   infoWindow.setPosition({
  //     lat: 22.352555,
  //     lng: 114.197700
  //   });
  //   infoWindow.open(map);
  // } else if (event.feature.getProperty("District") == "Kwun Tong") {
  //   var myHTML = "<div class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>KWUN TONG</div><div>觀塘區</div></div>"
  //   infoWindow.setContent("<div style='width:150px;'>" + myHTML + "</div>");
  //   infoWindow.close(map)
  //   infoWindow.setPosition({
  //     lat: 22.333579,
  //     lng: 114.218457
  //   });
  //   infoWindow.open(map);
  // } else if (event.feature.getProperty("District") == "Kwai Tsing") {
  //   var myHTML = "<div class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>KWAI TSING</div><div>葵青區</div></div>"
  //   infoWindow.setContent("<div style='width:150px;'>" + myHTML + "</div>");
  //   infoWindow.close(map)
  //   infoWindow.setPosition({
  //     lat: 22.363468,
  //     lng: 114.094680
  //   });
  //   infoWindow.open(map);
  // } else if (event.feature.getProperty("District") == "Tsuen Wan") {
  //   var myHTML = "<div class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>TSUEN WAN</div><div>荃灣區</div></div>"
  //   infoWindow.setContent("<div style='width:150px;'>" + myHTML + "</div>");
  //   infoWindow.close(map)
  //   infoWindow.setPosition({
  //     lat: 22.401715,
  //     lng: 114.086555
  //   });
  //   infoWindow.open(map);
  // } else if (event.feature.getProperty("District") == "Tuen Mun") {
  //   var myHTML = "<div class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>TUEN MUN</div><div>屯門區</div></div>"
  //   infoWindow.setContent("<div style='width:150px;'>" + myHTML + "</div>");
  //   infoWindow.close(map)
  //   infoWindow.setPosition({
  //     lat: 22.429385,
  //     lng: 113.970457
  //   });
  //   infoWindow.open(map);
  // } else if (event.feature.getProperty("District") == "Yuen Long") {
  //   var myHTML = "<div class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>YUEN LONG</div><div>元朗區</div></div>"
  //   infoWindow.setContent("<div style='width:150px;'>" + myHTML + "</div>");
  //   infoWindow.close(map)
  //   infoWindow.setPosition({
  //     lat: 22.493629,
  //     lng: 114.003097
  //   });
  //   infoWindow.open(map);
  // } else if (event.feature.getProperty("District") == "North") {
  //   var myHTML = "<div class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>NORTH</div><div>北區</div></div>"
  //   infoWindow.setContent("<div style='width:150px;'>" + myHTML + "</div>");
  //   infoWindow.close(map)
  //   infoWindow.setPosition({
  //     lat: 22.555848,
  //     lng: 114.197395
  //   });
  //   infoWindow.open(map);
  // } else if (event.feature.getProperty("District") == "Tai Po") {
  //   var myHTML = "<div class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>TAI PO</div><div>大埔區</div></div>"
  //   infoWindow.setContent("<div style='width:150px;'>" + myHTML + "</div>");
  //   infoWindow.close(map)
  //   infoWindow.setPosition({
  //     lat: 22.504356,
  //     lng: 114.241886
  //   });
  //   infoWindow.open(map);
  // } else if (event.feature.getProperty("District") == "Sha Tin") {
  //   var myHTML = "<div class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>SHA TIN</div><div>沙田區</div></div>"
  //   infoWindow.setContent("<div style='width:150px;'>" + myHTML + "</div>");
  //   infoWindow.close(map)
  //   infoWindow.setPosition({
  //     lat: 22.438199,
  //     lng: 114.226997
  //   });
  //   infoWindow.open(map);
  // } else if (event.feature.getProperty("District") == "Sai Kung") {
  //   var myHTML = "<div class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>SAI KUNG</div><div>西貢區</div></div>"
  //   infoWindow.setContent("<div style='width:150px;'>" + myHTML + "</div>");
  //   infoWindow.close(map)
  //   infoWindow.setPosition({
  //     lat: 22.427135,
  //     lng: 114.309143
  //   });
  //   infoWindow.open(map);
  // } else if (event.feature.getProperty("District") == "Islands") {
  //   var myHTML = "<div class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>ISLANDS</div><div>離島區</div></div>"
  //   infoWindow.setContent("<div style='width:150px;'>" + myHTML + "</div>");
  //   infoWindow.close(map)
  //   infoWindow.setPosition({
  //     lat: 22.248780,
  //     lng: 114.123512
  //   });
  //   infoWindow.open(map);
  // }

  // position the infowindow on the marker
  // infoWindow.setPosition(event.feature.getGeometry().get());
  // anchor the infowindow on the marker
  // infoWindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
  // infoWindow.open(map);
});

map.data.addListener('mouseover', function (event) {
  map.data.revertStyle();
  map.data.overrideStyle(event.feature, { strokeWeight: 2, strokeColor: '#FFFFFF', strokeOpacity: 1, fillColor: 'white', fillOpacity: 0.1 });
});

map.data.addListener('mouseout', function (event) {
  map.data.revertStyle();
  infoWindow.close(map)
});

var markers1 = [];


// Info Window
// var info_config = [
//   '<div style="font-size:150%"><b>Sunset Peak</b></div>' +
//   '<img class="photosFromUser" src="/uploads/sunset_peak_sunrise.jpg" width="100%"><br/>' +
//   '<i>(Photo taken by <b>CHiT</b>)</i>',
//   '<div style="font-size:150%"><b>Tsing Yi Nature Trail</b></div>' +
//   '<img class="photosFromUser" src="/uploads/tsing_yi_nature_trail_sunset.jpg" width="100%"><br/>' +
//   '<i>(Photo taken by <b>CHiT</b>)</i>',
// ]


// All Markers
// var marker1_config = [{
//   position: { lat: 22.257286989852123, lng: 113.9528466761112 },
//   map: map,
//   title: 'Sunset Peak',
//   icon: './icons/sunrise_logo_map.png'
// }, {
//   position: { lat: 22.348403793933958, lng: 114.09189105033875 },
//   map: map,
//   title: 'Tsing Yi Nature Trail',
//   icon: './icons/sunrise_logo_map.png'
// }];


// Setting up content of Info Windows
// info_config.forEach(function (e, i) {
//   infoWindow[i] = new google.maps.InfoWindow({
//     content: e,
//     maxWidth: 200
//   });
// });


// Showing the markers on map
// marker1_config.forEach(function (e, i) {
//   markers1[i] = new google.maps.Marker(e);
//   markers1[i].setMap(map);
//   markers1[i].addListener('click', function () {
//     infoWindow[i].open(map, markers1[i]);
//   });
// });





// Try HTML5 geolocation.
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {

      var pos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };

      if (markerCurrent) {
        markerCurrent.setMap(null);
        markerCurrent = new google.maps.Marker({
          // position: pos,
          map: map,
          title: "Current Location",
          icon: "/icons/user-location.png",
        });
      } else {
        var markerCurrent = new google.maps.Marker({
          // position: pos,
          map: map,
          title: "Current Location",
          icon: "/icons/user-location.png",
        });
      }

      markerCurrent.setPosition(pos)

      // infoWindow.setPosition(pos);
      // infoWindow.setContent('Current Location');
      // infoWindow.open(map);
      map.setCenter(pos);
    },
    function () {
      handleLocationError(true, infoWindow, map.getCenter());
    }
  );
} else {
  // Browser doesn't support Geolocation
  handleLocationError(false, infoWindow, map.getCenter());
}


var marker;

// google.maps.event.addListener(map, 'click', function (event) {
//   placeMarker(event.latLng);
// });


function placeMarker(location) {
  if (marker) {
    marker.setPosition(location);
  } else {
    marker = new google.maps.Marker({
      position: location,
      map: map,
      draggable: true,
      title: "Drag me!"
    });
  }
  $("#lat").val(location.lat()); $("#lng").val(location.lng());
}


map.data.addListener('click', function (event) {
  placeMarker(event.latLng, event.feature.getProperty("District"));
  $("#district").val(event.feature.getProperty("District"));
});


  // document.getElementById('lat').value = event.latLng.lat();
  // document.getElementById('lng').value = event.latLng.lng();
}

//   function toggleBounce() {
//   if (marker.getAnimation() !== null) {
//     marker.setAnimation(null);
//   } else {
//     marker.setAnimation(google.maps.Animation.BOUNCE);
//   }
// }

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}





// AJAX by CHiT

document.querySelector('#add-photo-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault();   // No need to reload the page
    const form = event.target
    const formData = new FormData();
    console.log(form)

    formData.append('image', form.image.files[0]);
    formData.append('title', form.title.value);
    formData.append('description', form.description.value);
    formData.append('created_at', form.created_at.value);
    formData.append('district', form.district.value);
    formData.append('location', form.location.value);
    formData.append('latitude', form.latitude.value);
    formData.append('longitude', form.longitude.value);
    formData.append('environment', form.environment.value)


    // const formObject = {
    //   userEmail: form.user_email.value,
    //   userPassword: form.user_password.value,
    //   userName: form.username.value,
    //   userGender: form.user_gender.value,
    //   userBirthday: form.user_birthday.value,
    //   userHeight: form.user_height.value,
    //   userWeight: form.user_weight.value,
    //   userFavourites: await findUserFav(),
    // }



    // missing headers Content-Type: 'application/json'
    const res = await fetch('/photos/addPhoto', {
      // headers: {
      //   "Content-Type": "application/json"
      // },
      method: "POST",
      body: formData
      // body: JSON.stringify(formObject)        /*JSON.stringify */
    });        //your_hostname/createUser

    const result = await res.json();

    window.location = ('/?accSuccess=Photo+Uploaded');

  }
  )