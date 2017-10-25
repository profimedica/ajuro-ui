// same as main.js, except also includes the styles, so webpack includes the css in the bundle
var ajuroUI = require('./main');
Object.keys(ajuroUI).forEach(function(key) {
    exports[key] = ajuroUI[key];
});

require('./dist/styles/ajuro.css');
require('./dist/styles/theme-blue.css');
require('./dist/styles/theme-dark.css');
require('./dist/styles/theme-fresh.css');
require('./dist/styles/theme-material.css');
require('./dist/styles/theme-bootstrap.css');
