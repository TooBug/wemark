const fs = require('fs-extra');

fs.copySync('./wemark', './demo/wemark');
fs.copySync('./wemark', './mpvue/static');
console.log('Copy wemark to demo finished.');
