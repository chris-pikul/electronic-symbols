const fs = require('fs');
const path = require('path');

const manifest = require(path.resolve(__dirname, '..', 'manifest.json'));

function checkExists(filename, ext, dir) {
  const check = path.resolve(__dirname, '..', dir ?? ext.toUpperCase(), filename + '.' + ext);
  if(!fs.existsSync(check))
    console.warn(`Missing file ${check}`);
}

// Confirm all manifest entries are valid
manifest.forEach(({ filename }) => {
  checkExists(filename, 'jpg');
  checkExists(filename, 'jpg', 'JPG-ICO');
  checkExists(filename, 'png');
  checkExists(filename, 'svg');
});

function confirm(fname) {
  fname = fname.substring(0, fname.lastIndexOf('.'));
  if(!manifest.some(({ filename }) => filename === fname))
    console.warn(`File "${fname}" is not in the manifest`);
}

// Check manifest has all files
fs.readdirSync(path.resolve(__dirname, '..', 'JPG'))
  .forEach(confirm);
fs.readdirSync(path.resolve(__dirname, '..', 'JPG-ICO'))
  .forEach(confirm);
fs.readdirSync(path.resolve(__dirname, '..', 'PNG'))
  .forEach(confirm);
fs.readdirSync(path.resolve(__dirname, '..', 'SVG'))
  .forEach(confirm);