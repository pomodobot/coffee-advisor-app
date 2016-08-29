'use strict';
import Contants from './shared/utils/constants'
import Toaster from './shared/component/toaster'
import Geolocation from './shared/utils/geolocation'
import fetch from './shared/utils/fetch'
import placesOrchestrator from './client/placesOrchestrator'

var toaster = new Toaster();

function setNearbyLocations(){
  var latitude, longitude;

  Geolocation.getPosition().then(function (geoLocation) {
    toaster.toast('Posição adquirida com sucesso!');
    latitude = geoLocation.coords.latitude;
    longitude = geoLocation.coords.longitude;

    getNearbyLocations(latitude, longitude);

  }, function (error) {
    toaster.toast('Ocorreu um erro ao receber sua localização!');
    console.log(error);
  });
}

function getNearbyLocations(latitude, longitude){
  toaster.toast('Buscando cafeterias próximas...');
  fetch(Contants.apiUrl + `/places?latitude=${latitude}&longitude=${longitude}`, {
    method: 'get'
  })
  .then((response) => response.json())
  .then((json) => placesOrchestrator.printConsole(json))
  .catch((ex) => console.log(ex));
}

setNearbyLocations();
