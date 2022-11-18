/**
 * Generates the table of component cells based on the manifest.
 */
const fs = require('fs');
const path = require('path');

const manifestPath = path.resolve(__dirname, '..', 'manifest.json');
const manifest = require(manifestPath);

manifest.forEach(({ id, name, category, subCategory, standard, filename }) => console.log(
  `<div class="symbol" data-id="${id}"><header class="symbol-category cat-${category.toLowerCase()}">${category}${subCategory ? ` / ${subCategory}` : ''}</header><img src="https://raw.githubusercontent.com/chris-pikul/electronic-symbols/main/SVG/${filename}.svg" alt="${name}" /><div class='symbol-standard std-${standard.toLowerCase()}'>${standard}</div><h3>${name}</h3><div class="symbol-links"><a href="https://raw.githubusercontent.com/chris-pikul/electronic-symbols/main/SVG/${filename}.svg">SVG</a><a href="https://raw.githubusercontent.com/chris-pikul/electronic-symbols/main/PNG/${filename}.png">PNG</a><a href="https://raw.githubusercontent.com/chris-pikul/electronic-symbols/main/JPG/${filename}.jpg">JPG</a></div></div>`
));
