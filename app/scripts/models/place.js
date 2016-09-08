'use strict';

class Place {
  constructor(data) {
    if(data){
      this.name = data.name;
      this.location = data.location;
      this.attributes = data.attributes || {};
    }else{
      this.attributes = {};
    }
  }

  fromForm(formSerializedObject){
    this.name = formSerializedObject.name;
    this.attributes.has_power_outlet = Boolean(formSerializedObject.energy);
    this.attributes.has_wifi = Boolean(formSerializedObject.internet);
    this.location = formSerializedObject.location;
  }

  isValid(){
    let isValid = true;
    if(!this.name){
      isValid = false;
    }

    return isValid;
  }
}

export default Place;
