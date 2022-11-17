/**
 * Generates a blank markdown table featuring each component present in the JPG-ICO folder
 */
const fs = require('fs');

fs.readdirSync('./JPG-ICO')
  .map(file => {
    let category = 'Miscellaneous';
    
    const firstDash = file.indexOf('-');
    if(firstDash > 1) {
      category = file.substring(0, firstDash).trim();
    }

    return [ file, category ];
  })
  .sort((a, b) => (a[1].localeCompare(b[1]) || a[0].localeCompare(b[0])))
  .forEach(([ file, category ]) => console.log(`|  | ${category} | ${file} | <img src='/JPG-ICO/${file}?raw=true' /> |`));