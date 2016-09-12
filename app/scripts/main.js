'use strict';

import "babel-polyfill"
import Toaster from './shared/component/toaster'
import GeoLocation from './shared/utils/geolocation'
import GoogleMap from './shared/component/googleMap'
import PlaceResource from "./resources/places"
import LocationForm from "./new-location"

let toaster = new Toaster();
let location = new LocationForm();

class Main {
  constructor(){
    this.initComponents();
    this.init();
  }

  async init() {
    let actualPosition = await GeoLocation.getPosition();
    toaster.toast('Posição adquirida com sucesso!');

    let currentPos = {
      lat: actualPosition.coords.latitude,
      lng: actualPosition.coords.longitude
    };

    this.map.addMarker({
      type: 'person',
      position: currentPos,
      title: 'Your position'
    });

    this.map.fitBounds();

    let places = await PlaceResource.getNearby(currentPos);
    places.forEach(place=> {
      this.map.addMarker({
        position: place.location,
        title: place.name,
        content: place.name
      });
    });

    this.map.fitBounds();
  }

  initComponents(){
    $('.switch').bootstrapSwitch();
    this.map = new GoogleMap(document.getElementById('map'));
  }
}


new Main();
