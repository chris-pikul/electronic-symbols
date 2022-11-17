/**
 * Sorts the manifest entries and overwrites the file
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

fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
