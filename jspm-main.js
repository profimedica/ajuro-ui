var ajuroUI = require('./main');
Object.keys(ajuroUI).forEach(function(key) {
    exports[key] = ajuroUI[key];
});
