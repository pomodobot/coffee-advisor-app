import Promise from '../utils/promise'

class Geolocation {

  getPosition () {
    return new Promise(function(resolve, reject){
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve(position);
        },
        (error) => {
          reject(error);
          console.log(error);
        }
      );
    });
  }

}

module.exports = Geolocation;
