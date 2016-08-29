import Promise from '../utils/promise'

class Geolocation {

  static getPosition () {
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

export default Geolocation;
