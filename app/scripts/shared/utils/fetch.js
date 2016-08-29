var wfetch = require('whatwg-fetch');

if (typeof fetch === 'undefined') {
  module.exports = wfetch;
} else {
  module.exports = fetch;
}
