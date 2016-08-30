import Toaster from '../shared/component/toaster'
import Constants from '../shared/utils/constants'
import fetch from '../shared/utils/fetch'
import Promise from '../shared/utils/promise'

module.exports = {
  getNearby: function (position) {
    return new Promise(function (resolve, reject) {
      var toaster = new Toaster();
      toaster.toast('Buscando cafeterias próximas...');
      fetch(Constants.apiUrl + `/places?lat=${position.lat}&lng=${position.lng}`, {
        method: 'get'
      })
        .then((response) => response.json())
        .then((json) => resolve(json))
        .catch((ex) => reject(ex));
    });
  }
};
