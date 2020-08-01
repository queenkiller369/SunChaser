

// js by CHiT

async function main() {
  loadGoogleMapMarkersInfo();
  loadGoogleMapMarkers();
  initMap();
} 

main();

// AJAX for Google Map Markers by CHiT

// Info Window
var info_config = [];

  // Loading MapMarkers' Data from Database
  async function loadGoogleMapMarkersInfo(){
    const res = await fetch('/googleMapMarkers');
    const databaseMapMarkers = await res.json();

    for (let databaseMapMarker of databaseMapMarkers){
      info_config.push(`<div style="font-size:130%; font-weight:700; font-family: 'Noto Sans HK', sans-serif;"><b>${databaseMapMarker.title}</b></div><br/> 
      <img class="mapMarkerPhotoFromUser" src="/uploads/${databaseMapMarker.image}"><br/>
      <div style="font-size:110%; font-weight:500;">(Photo taken by <b>${databaseMapMarker.username}</b>)</div><b/>
      <i style="font-size:80%; font-weight:400; font-family: 'Noto Sans HK', sans-serif;">${new Date(databaseMapMarker.created_at)}</i>`);
    }
    return info_config.join(", ")
  }


// All Markers
var marker1_config = [];

  async function loadGoogleMapMarkers(){
    const res = await fetch('/googleMapMarkers');
    const databaseMapMarkers = await res.json();

    let marker_configArr = [];
      

     for (let databaseMapMarker of databaseMapMarkers) {
        // marker_configArr.push(`{position: { lat: ${databaseMapMarker.latitude}, lng: ${databaseMapMarker.longitude}, map: map, icon: './icons/sunrise_logo_map.png', }`);

        marker_configArr.push({
          position: {
            lat: databaseMapMarker.latitude,
            lng: databaseMapMarker.longitude,
          },
          icon: "/icons/sunrise_logo_map.png",
        })
      }

      // console.log(marker_configArr.map(a => JSON.parse(a)));

      // marker_config = eval("["+ (JSON.stringify(marker_configArr)).replace(/"/g, "").split()[0] + "]");
      
      marker1_config = marker_configArr

      return marker1_config;

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
    center: {
      lat: 22.276192305888276,
      lng: 114.15289560778835
    },
    restriction: {
      latLngBounds: HONG_KONG_BOUNDS,
      strictBounds: false,
    },
    zoom: 13.5,
    styles: [
      {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
      {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{color: '#263c3f'}]
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{color: '#6b9a76'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{color: '#38414e'}]
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{color: '#212a37'}]
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{color: '#9ca5b3'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry',
        stylers: [{color: '#746855'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [{color: '#1f2835'}]
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [{color: '#f3d19c'}]
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [{color: '#2f3948'}]
      },
      {
        featureType: 'transit.station',
        elementType: 'labels.text.fill',
        stylers: [{color: '#d59563'}]
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{color: '#17263c'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{color: '#515c6d'}]
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{color: '#17263c'}]
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

  var infoWindow = new google.maps.InfoWindow();

  // google.maps.event.addListener(map, 'click', function(event) {
  //   placeMarker(event.latLng);
  // });

  map.data.loadGeoJson('/hksar_18_district_boundary.json');


// \u0026
  map.data.setStyle(function(feature){
    if(feature.getProperty("District")=="Central And Western"){
      return {
        fillColor: 'green',
        fillOpacity: 0.1,
        strokeWeight: 1,
        strokeColor: '#b57f1b65',
        strokeOpacity: 0.8
      }
    } else {
      return {
        strokeWeight: 1,
        strokeColor: '#b57f1b65',
        strokeOpacity: 0.8
      }
    }
  });


  map.data.addListener('click', function(event) {
    map.data.overrideStyle(event.feature, {strokeWeight: 2, strokeColor: '#FFFFFF', strokeOpacity: 1, fillColor: 'white', fillOpacity: 0.1});
    
    // var myHTML = event.feature.getProperty("District");
    if(event.feature.getProperty("District")=="Central And Western"){
      var myHTML = "<a href='/districts/01_central_and_western.html?district=Central+And+Western' class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>CENTRAL AND WESTERN</div><div>中西區</div><div><img src='/icons/google-map-info-enter.png'></div></a>"
      infoWindow.setContent("<div style='width:150px;'>"+myHTML+"</div>");
      infoWindow.close(map)
      infoWindow.setPosition({
        lat: 22.291192305888276,
        lng: 114.15289560778835
      });
      infoWindow.open(map);
    } else if (event.feature.getProperty("District")=="Eastern"){
      var myHTML = "<a href='/districts/02_eastern.html?district=Eastern' class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>EASTERN</div><div>東區</div><div><img src='/icons/google-map-info-enter.png'></div></a>"
      infoWindow.setContent("<div style='width:150px;'>"+myHTML+"</div>");
      infoWindow.close(map)
      infoWindow.setPosition({
        lat: 22.290036985306594,
        lng: 114.22400248848619
      });
      infoWindow.open(map);
    } else if (event.feature.getProperty("District")=="Wan Chai"){
      var myHTML = "<a href='/districts/03_wan_chai.html?district=Wan+Chai' class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>WAN CHAI</div><div>灣仔區</div><div><img src='/icons/google-map-info-enter.png'></div></a>"
      infoWindow.setContent("<div style='width:150px;'>"+myHTML+"</div>");
      infoWindow.close(map)
      infoWindow.setPosition({
        lat: 22.285216746387947,
        lng: 114.18233458226979
      });
      infoWindow.open(map);
    } else if (event.feature.getProperty("District")=="Southern"){
      var myHTML = "<a href='/districts/04_southern.html?district=Southern' class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>SOUTHERN</div><div>南區</div><div><img src='/icons/google-map-info-enter.png'></div></a>"
      infoWindow.setContent("<div style='width:150px;'>"+myHTML+"</div>");
      infoWindow.close(map)
      infoWindow.setPosition({
        lat: 22.252080,
        lng: 114.186246
      });
      infoWindow.open(map);
    } else if (event.feature.getProperty("District")=="Yau Tsim Mong"){
      var myHTML = "<a href='/districts/05_yau_tsim_mong.html?district=Yau+Tsim+Mong' class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>YAU TSIM MONG</div><div>油尖旺區</div><div><img src='/icons/google-map-info-enter.png'></div></a>"
      infoWindow.setContent("<div style='width:150px;'>"+myHTML+"</div>");
      infoWindow.close(map)
      infoWindow.setPosition({
        lat: 22.323292,
        lng: 114.167660
      });
      infoWindow.open(map);
    } else if (event.feature.getProperty("District")=="Sham Shui Po"){
      var myHTML = "<a href='/districts/06_sham_shui_po.html?district=Sham+Shui+Po' class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>SHAM SHUI PO</div><div>深水埗區</div><div><img src='/icons/google-map-info-enter.png'></div></a>"
      infoWindow.setContent("<div style='width:150px;'>"+myHTML+"</div>");
      infoWindow.close(map)
      infoWindow.setPosition({
        lat: 22.341805,
        lng: 114.151334
      });
      infoWindow.open(map);
    } else if (event.feature.getProperty("District")=="Kowloon City"){
      var myHTML = "<a href='/districts/07_kowloon_city.html?district=Kowloon+City' class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>KOWLOON CITY</div><div>九龍城區</div><div><img src='/icons/google-map-info-enter.png'></div></a>"
      infoWindow.setContent("<div style='width:150px;'>"+myHTML+"</div>");
      infoWindow.close(map)
      infoWindow.setPosition({
        lat: 22.335435,
        lng: 114.181303
      });
      infoWindow.open(map);
    } else if (event.feature.getProperty("District")=="Wong Tai Sin"){
      var myHTML = "<a href='/districts/08_wong_tai_sin.html?district=Wong+Tai+Sin' class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>WONG TAI SIN</div><div>黃大仙區</div><div><img src='/icons/google-map-info-enter.png'></div></a>"
      infoWindow.setContent("<div style='width:150px;'>"+myHTML+"</div>");
      infoWindow.close(map)
      infoWindow.setPosition({
        lat: 22.352555,
        lng: 114.197700
      });
      infoWindow.open(map);
    } else if (event.feature.getProperty("District")=="Kwun Tong"){
      var myHTML = "<a href='/districts/09_kwun_tong.html?district=Kwun+Tong' class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>KWUN TONG</div><div>觀塘區</div><div><img src='/icons/google-map-info-enter.png'></div></a>"
      infoWindow.setContent("<div style='width:150px;'>"+myHTML+"</div>");
      infoWindow.close(map)
      infoWindow.setPosition({
        lat: 22.329554,
        lng: 114.226045
      });
      infoWindow.open(map);
    } else if (event.feature.getProperty("District")=="Kwai Tsing"){
      var myHTML = "<a href='/districts/10_kwai_tsing.html?district=Kwai+Tsing' class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>KWAI TSING</div><div>葵青區</div><div><img src='/icons/google-map-info-enter.png'></div></a>"
      infoWindow.setContent("<div style='width:150px;'>"+myHTML+"</div>");
      infoWindow.close(map)
      infoWindow.setPosition({
        lat: 22.356017,
        lng: 114.117056
      });
      infoWindow.open(map);
    } else if (event.feature.getProperty("District")=="Tsuen Wan"){
      var myHTML = "<a href='/districts/11_tsuen_wan.html?district=Tsuen+Wan' class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>TSUEN WAN</div><div>荃灣區</div><div><img src='/icons/google-map-info-enter.png'></div></a>"
      infoWindow.setContent("<div style='width:150px;'>"+myHTML+"</div>");
      infoWindow.close(map)
      infoWindow.setPosition({
        lat: 22.391761,
        lng: 114.086905
      });
      infoWindow.open(map);
    } else if (event.feature.getProperty("District")=="Tuen Mun"){
      var myHTML = "<a href='/districts/12_tuen_mun.html?district=Tuen+Mun' class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>TUEN MUN</div><div>屯門區</div><div><img src='/icons/google-map-info-enter.png'></div></a>"
      infoWindow.setContent("<div style='width:150px;'>"+myHTML+"</div>");
      infoWindow.close(map)
      infoWindow.setPosition({
        lat: 22.410173,
        lng: 114.006484
      });
      infoWindow.open(map);
    } else if (event.feature.getProperty("District")=="Yuen Long"){
      var myHTML = "<a href='/districts/13_yuen_long.html?district=Yuen+Long' class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>YUEN LONG</div><div>元朗區</div><div><img src='/icons/google-map-info-enter.png'></div></a>"
      infoWindow.setContent("<div style='width:150px;'>"+myHTML+"</div>");
      infoWindow.close(map)
      infoWindow.setPosition({
        lat: 22.488589,
        lng: 114.018297
      });
      infoWindow.open(map);
    } else if (event.feature.getProperty("District")=="North"){
      var myHTML = "<a href='/districts/14_north.html?district=North' class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>NORTH</div><div>北區</div><div><img src='/icons/google-map-info-enter.png'></div></a>"
      infoWindow.setContent("<div style='width:150px;'>"+myHTML+"</div>");
      infoWindow.close(map)
      infoWindow.setPosition({
        lat: 22.541773,
        lng: 114.186236
      });
      infoWindow.open(map);
    } else if (event.feature.getProperty("District")=="Tai Po"){
      var myHTML = "<a href='/districts/15_tai_po.html?district=Tai+Po' class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>TAI PO</div><div>大埔區</div><div><img src='/icons/google-map-info-enter.png'></div></a>"
      infoWindow.setContent("<div style='width:150px;'>"+myHTML+"</div>");
      infoWindow.close(map)
      infoWindow.setPosition({
        lat: 22.484212,
        lng: 114.233892
      });
      infoWindow.open(map);
    } else if (event.feature.getProperty("District")=="Sha Tin"){
      var myHTML = "<a href='/districts/16_sha_tin.html?district=Sha+Tin' class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>SHA TIN</div><div>沙田區</div><div><img src='/icons/google-map-info-enter.png'></div></a>"
      infoWindow.setContent("<div style='width:150px;'>"+myHTML+"</div>");
      infoWindow.close(map)
      infoWindow.setPosition({
        lat: 22.403252,
        lng: 114.207501
      });
      infoWindow.open(map);
    } else if (event.feature.getProperty("District")=="Sai Kung"){
      var myHTML = "<a href='/districts/17_sai_kung.html?district=Sai+Kung' class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>SAI KUNG</div><div>西貢區</div><div><img src='/icons/google-map-info-enter.png'></div></a>"
      infoWindow.setContent("<div style='width:150px;'>"+myHTML+"</div>");
      infoWindow.close(map)
      infoWindow.setPosition({
        lat: 22.393060,
        lng: 114.316702
      });
      infoWindow.open(map);
    } else if (event.feature.getProperty("District")=="Islands"){
      var myHTML = "<a href='/districts/18_islands.html?district=Islands' class='weather-condition'><div><img src='/icons/google-map-info-sunriseset.png'></div><div>ISLANDS</div><div>離島區</div><div><img src='/icons/google-map-info-enter.png'></div></a>"
      infoWindow.setContent("<div style='width:150px;'>"+myHTML+"</div>");
      infoWindow.close(map)
      infoWindow.setPosition({
        lat: 22.294494,
        lng: 114.086868
      });
      infoWindow.open(map);
    }
    
    // position the infowindow on the marker
    // infoWindow.setPosition(event.feature.getGeometry().get());
    // anchor the infowindow on the marker
    // infoWindow.setOptions({pixelOffset: new google.maps.Size(0,-30)});
    // infoWindow.open(map);
  });

  map.data.addListener('mouseover', function(event) {
    map.data.revertStyle();
    map.data.overrideStyle(event.feature, {strokeWeight: 2, strokeColor: '#FFFFFF', strokeOpacity: 1, fillColor: 'white', fillOpacity: 0.1});
  });
  
  map.data.addListener('mouseout', function(event) {
    map.data.revertStyle();
    infoWindow.close(map)
  });



  var markers1 = [];


  // Info Window
  // var info_config = [
  //   '<div style="font-size:150%"><b>Sunset Peak</b></div>'+
  //   '<img class="photosFromUser" src="/uploads/sunset_peak_sunrise.jpg" width="100%"><br/>'+
  //   '<i>(Photo taken by <b>CHiT</b>)</i>',
  //   '<div style="font-size:150%"><b>Tsing Yi Nature Trail</b></div>'+
  //   '<img class="photosFromUser" src="/uploads/tsing_yi_nature_trail_sunset.jpg" width="100%"><br/>'+
  //   '<i>(Photo taken by <b>CHiT</b>)</i>',
  // ]


  // All Markers
  // var marker1_config = [{
  //   position: {lat: 22.257286989852123, lng:113.9528466761112},
  //   map: map,
  //   title: 'Sunset Peak',
  //   icon: '/icons/sunrise_logo_map.png'
  // },{
  //   position: {lat: 22.348403793933958, lng:114.09189105033875},
  //   map: map,
  //   title: 'Tsing Yi Nature Trail',
  //   icon: '/icons/sunrise_logo_map.png'
  // }];


  // Setting up content of Info Windows
  info_config.forEach(function(e,i){
    infoWindow[i] = new google.maps.InfoWindow({
      content: e,
      maxWidth: 200,
      maxHeight: 200,
    });
  });


  // Showing the markers on map
  marker1_config.forEach(function (e, i) {
    markers1[i] = new google.maps.Marker(e);
    markers1[i].setMap(map);

      markers1[i].addListener("click", function () {
        infoWindow[i].open(map, markers1[i]);
        markers1[i].addListener('click', function () {
          infoWindow[i].close(map, markers1[i]);
          markers1[i].addListener("click", function () {
            infoWindow[i].open(map, markers1[i]);
            markers1[i].addListener('click', function () {
              infoWindow[i].close(map, markers1[i]);
              markers1[i].addListener('click', function () {
                infoWindow[i].open(map, markers1[i]);
                markers1[i].addListener('click', function () {
                  infoWindow[i].close(map, markers1[i]);
                  markers1[i].addListener('click', function () {
                    infoWindow[i].open(map, markers1[i]);
                    markers1[i].addListener('click', function () {
                      infoWindow[i].close(map, markers1[i]);
                      markers1[i].addListener('click', function () {
                        infoWindow[i].open(map, markers1[i]);
                        markers1[i].addListener('click', function () {
                          infoWindow[i].close(map, markers1[i]);
                          markers1[i].addListener('click', function () {
                            infoWindow[i].open(map, markers1[i]);
                            markers1[i].addListener('click', function () {
                              infoWindow[i].close(map, markers1[i]);
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });

  


  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
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
        // map.setCenter(pos);
      },
      function () {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
  
}


function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
    'Error: The Geolocation service failed.' :
    'Error: Your browser doesn\'t support geolocation.');
  infoWindow.open(map);
}


