'use strict';
import Toaster from './shared/component/toaster'
import GeoLocation from './shared/utils/geolocation'
import GoogleMap from './shared/component/googleMap'
import PlaceResource from "./resources/places"
import LocationForm from "./new-location"


function init() {

  $('.switch').bootstrapSwitch();

  let toaster = new Toaster();
  let location = new LocationForm();

  GeoLocation.getPosition().then(function (geoLocation) {
    toaster.toast('Posição adquirida com sucesso!');

    let currentPos = {
      lat: geoLocation.coords.latitude,
      lng: geoLocation.coords.longitude
    };

    let map = new GoogleMap(document.getElementById('map'), currentPos);

    PlaceResource.getNearby(currentPos).then(places=> {
      places.forEach(place=> {
        map.addMarker({
          position: place.location,
          title: place.name,
          content: place.name
        });
      });
      map.fitBounds();
    });
  }, function (error) {
    toaster.toast('Ocorreu um erro ao receber sua localização!');
    console.log(error);
  });
}

init();
