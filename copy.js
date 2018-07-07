const fs = require('fs-extra');

fs.copySync('./wemark', './demo/wemark');
console.log('Copy wemark to demo finished.');
