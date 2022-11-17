/**
 * Generates a markdown table and prints it to STD out reflecting the entire manifest.
 */
const fs = require('fs');
const path = require('path');

const manifestPath = path.resolve(__dirname, '..', 'manifest.json');
const manifest = require(manifestPath);

manifest.sort((a, b) => {
  return a.category.localeCompare(b.category) ||
    (a.subCategory && b.subCategory ? 
      a.subCategory.localeCompare(b.subCategory) : 
      (a.subCategory ? 1 : -1)
    ) ||
    a.standard.localeCompare(b.standard) ||
    a.name.localeCompare(b.name);
});

const toTitleCase = (text) => text.substring(0, 1).toUpperCase() + text.substring(1).toLowerCase();

console.log('| Category | Name | Standard | Preview | Links |');
console.log('|:---------|:-----|:--------:|:-------:|:------|');

manifest.forEach(({ category, name, standard, filename }) => console.log(
  `| ${toTitleCase(category)} | ${name} | ${standard !== 'COMMON' ? standard : 'COM'} | <img src='/JPG-ICO/${filename}.jpg?raw=true' /> | [SVG](./SVG/${filename}.svg) [PNG](./PNG/${filename}.png) [JPG](./JPG/${filename}.jpg) |`
));