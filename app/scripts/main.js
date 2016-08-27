"use strict";

function httpGet(url) {
  return new Promise(
    function (resolve, reject) {
      var request = new XMLHttpRequest();
      request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
          resolve(JSON.parse(this.response));
        }
      };
      request.onerror = function () {
        reject();
      };
      request.open('GET', url);
      request.send();
    });
}

httpGet('http://motoristacerto.com.br:5000/api/places').then(function (places) {
  console.log(places);
}, function(error){
  console.log('error' + error);
});
