/**
 * Generates category colors as CSS. No particular rhyme or reason on them.
 */
const path = require('path');

const manifestPath = path.resolve(__dirname, '..', 'manifest.json');
const manifest = require(manifestPath);

const colors = [
  '#FF0000', '#FF8800', '#FFFF00', '#88FF00', '#00FF00', '#00FF88', '#00FFFF', '#0088FF', '#0000FF', '#8800FF', '#FF00FF', '#FF0088',
  '#AA0000', '#AA2200', '#AAAA00', '#22AA00', '#00AA00', '#00AA22', '#00AAAA', '#0022AA', '#0000AA', '#2200AA', '#AA00AA', '#AA0022',
  '#AAAAAA', '#888888', '#222222'
];

const categories = new Set();
manifest.forEach(({ category }) => categories.add(category.toLowerCase()));

([ ...categories ]).sort((a, b) => a.localeCompare(b))
  .forEach((cat, ind) => console.log(`.cat-${cat} { background: ${colors[ind]}; color: black; }`));