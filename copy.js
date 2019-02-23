const fs = require('fs-extra');

fs.copySync('./wemark', './demo/wemark');
fs.copySync('./wemark', './mpvue/static');
fs.copySync('./wemark', './taro/src/wemark');
console.log('Copy wemark to demo finished.');
