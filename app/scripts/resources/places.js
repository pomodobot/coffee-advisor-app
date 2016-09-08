import Constants from '../shared/utils/constants'
import fetch from '../shared/utils/fetch'
import Promise from '../shared/utils/promise'

module.exports = {
  getNearby: function (position) {
    return new Promise(function (resolve, reject) {
      fetch(Constants.apiUrl + `/places?lat=${position.lat}&lng=${position.lng}`, {
        method: 'get'
      })
        .then((response) => response.json())
        .then((json) => resolve(json))
        .catch((ex) => reject(ex));
    });
  },
  save: function (placeObject) {
    return new Promise(function(resolve, reject){
      fetch(Constants.apiUrl + '/places', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(placeObject)
      })
      .then((response => response.json))
      .then((json) => resolve(json))
      .catch((ex) => reject(ex));
    });
  }
};
