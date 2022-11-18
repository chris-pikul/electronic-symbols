/**
 * Downloads the manifest from GitHub's master branch.
 * 
 * I know this is silly, but whatever, it's the single source of truth now.
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const manifestURL = 'https://raw.githubusercontent.com/chris-pikul/electronic-symbols/main/manifest.json';
const manifestPath = path.resolve(__dirname, '..', 'manifest.json');

const file = fs.createWriteStream(manifestPath);
https.get(manifestURL, (response) => {
  response.pipe(file);

  file.on('finish', () => file.close(err => {
      if(err) console.err(`Error closing file: `, err);
      else console.log(`Finished writing manifest`);
    }) // END close
  );
}).on('error', (err) => {
  fs.unlink(manifestPath);
  console.error(`Error downloading new manifest: `, err);
});
