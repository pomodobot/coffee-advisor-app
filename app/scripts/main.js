'use strict';

import "babel-polyfill"
import Toaster from './shared/component/toaster'
import GeoLocation from './shared/utils/geolocation'
import GoogleMap from './shared/component/googleMap'
import PlaceResource from "./resources/places"
import LocationForm from "./new-location"

class Main {
  constructor(){
    this.initComponents();
    this.init();
  }

  async init() {
    let actualPosition = await GeoLocation.getPosition();
    this.toaster.toast('Posição adquirida com sucesso!');

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

    this.toaster.toast('Requisitando cafeterias próximas...');
    try{
      let places = await PlaceResource.getNearby(currentPos);
      this.toaster.toast(`${places.length} cafeteria(s) encontrada(s)!`);

      places.forEach(place=> {
        this.map.addMarker({
          position: place.location,
          title: place.name,
          content: place.name
        });
      });
      this.map.fitBounds();
    }catch(exception){
      this.toaster.toast('Erro ao tentar adquirir cafeterias!');
    }
  }

  initComponents(){
    $('.switch').bootstrapSwitch();
    this.map = new GoogleMap(document.getElementById('map'));
    this.toaster = new Toaster();
  }
}

new Main();
new LocationForm();
