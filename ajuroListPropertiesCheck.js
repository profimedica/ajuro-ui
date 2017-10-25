// satisfy ag-grid HTMLElement dependency
HTMLElement = typeof HTMLElement === 'undefined' ? function () {} : HTMLElement;
HTMLSelectElement = typeof HTMLSelectElement === 'undefined' ? function () {} : HTMLSelectElement;
HTMLInputElement = typeof HTMLInputElement === 'undefined' ? function () {} : HTMLInputElement;
HTMLButtonElement = typeof HTMLButtonElement === 'undefined' ? function () {} : HTMLButtonElement;

var {AjuroUI} = require('./dist/ajuroUI');
var {ComponentUtil} = require("ajuro/main");

var missingProperties = [];
ComponentUtil.ALL_PROPERTIES.forEach((property) => {
    if (!AgGridNg2.propDecorators.hasOwnProperty(property)) {
        missingProperties.push(`Grid property ${property} does not exist on AgGridNg2`)
    }
});

var missingEvents = [];
ComponentUtil.EVENTS.forEach((event) => {
    if (!ajuro.propDecorators.hasOwnProperty(event)) {
        missingEvents.push(`Event ${event} does not exist on AjuroUI`)
    }
});

if(missingProperties.length || missingEvents.length) {
    console.error("*************************** BUILD FAILED ***************************");
    missingProperties.concat(missingEvents).forEach((message) => console.error(message));
    console.error("*************************** BUILD FAILED ***************************");

    throw("Build Properties Check Failed");
} else {
    console.info("*************************** BUILD OK ***************************");
}