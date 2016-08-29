'use strict';
let fetch = require('./shared/utils/fetch');

fetch('http://motoristacerto.com.br:5000/api/places', {method: 'get'})
  .then((response) => response.json())
  .then((json) => console.log(json))
  .catch((ex) => console.log(ex));
