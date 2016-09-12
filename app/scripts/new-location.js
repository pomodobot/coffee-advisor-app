'use strict';

import "babel-polyfill"
import Serialize from "form-serialize"
import Place from "./models/place"
import PlaceResource from "./resources/places"
import GeoLocation from './shared/utils/geolocation'
import GoogleMap from './shared/component/googleMap'

class LocationForm{
  constructor(){
    this.saveButton = document.getElementById('saveLocation');
    this.saveButton.addEventListener('click', evt => this.saveLocationClick(evt));

    this.addmodal = document.getElementById('newLocationModal');
    $(this.addmodal).on('show.bs.modal', evt => this.setMapWithActualLocation(evt));
  }

  async setMapWithActualLocation(){
    let geoLocation = await GeoLocation.getPosition();
    let location = {
      lat: geoLocation.coords.latitude,
      lng: geoLocation.coords.longitude
    };

    if(!this.map){
      this.map = new GoogleMap(document.getElementById('newLocationMap'), location);
    }

    this.map.fitBounds();
  }

  async saveLocationClick(){
    let geoLocation = await GeoLocation.getPosition();
    let formObject = document.getElementById('newLocationForm');
    let serializedObject = Serialize(formObject, { hash: true } );

    serializedObject.location = {
      lat: geoLocation.coords.latitude,
      lng: geoLocation.coords.longitude
    };

    let place = new Place();
    place.fromForm(serializedObject);

    if(place.isValid()){
      PlaceResource.save(place).then(response => {
        console.log(response);
      });
    }else{
      console.log('Modelo inválido!');
    }
  }
}

export default LocationForm;
