'use strict';
import Contants from './shared/utils/constants'
import Toaster from './shared/component/toaster'
import Geolocation from './shared/utils/geolocation'
import fetch from './shared/utils/fetch'

var toaster = new Toaster();

function mapFitBounds(map, markers) {
  var bounds = new google.maps.LatLngBounds();
  for (var i = 0; i < markers.length; i++) {
    bounds.extend(markers[i].getPosition());
  }
  map.fitBounds(bounds);
}

function setNearbyLocations() {
  Geolocation.getPosition().then(function (geoLocation) {
    toaster.toast('Posição adquirida com sucesso!');
    let lat = geoLocation.coords.latitude;
    let lng = geoLocation.coords.longitude;

    let currentPos = {lat: lat, lng: lng};

    let map = new google.maps.Map(document.getElementById('map'), {
      center: currentPos,
      zoom: 10
    });

    var markers = [new google.maps.Marker({
      position: currentPos,
      map: map,
      title: 'Hello World!'
    })];
    mapFitBounds(map, markers);

    getNearbyLocations(lat, lng).then(places=> {
      places.forEach(place=> {
        markers.push(new google.maps.Marker({
          position: place.location,
          map: map,
          title: place.name
        }));
      });
      mapFitBounds(map, markers);
    });

  }, function (error) {
    toaster.toast('Ocorreu um erro ao receber sua localização!');
    console.log(error);
  });
}

function getNearbyLocations(lat, lng) {
  return new Promise(function (resolve, reject) {
    toaster.toast('Buscando cafeterias próximas...');
    fetch(Contants.apiUrl + `/places?lat=${lat}&lng=${lng}`, {
      method: 'get'
    })
      .then((response) => response.json())
      .then((json) => resolve(json))
      .catch((ex) => reject(ex));
  });
}

setNearbyLocations();
