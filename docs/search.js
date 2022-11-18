/**
 * Provides a basic search functionality, if we can spare it
 */
const components = [];

let lastQuery = '';
let filterCom = true, filterIEEE = true, filterIEC = true;

function getComponents() {
  document.querySelectorAll('.symbol')
    .forEach(el => {
      const id = el.dataset.id;
      if(!id) return;

      const nameEl = el.querySelector('h3');
      if(!nameEl) return console.warn(`No name element found for ${id}`);
      const name = nameEl.innerText;

      const [ category, std ] = id.split('-');
      components.push({
        el,
        category: category.toLowerCase(),
        std: std.toLowerCase(),
        name: name.toLowerCase(),
      });
    });
}

function matches(component, query) {
  switch(component.std) {
    case 'com':
      if(!filterCom) return false;
      break;
    case 'ieee':
      if(!filterIEEE) return false;
      break;
    case 'iec':
      if(!filterIEC) return false;
      break;
  }

  let matches = false;
  query.split(' ')
    .forEach(term => {
      matches ||= component.category.includes(term);
      matches ||= component.name.includes(term);
      matches ||= component.std.includes(term);
    });

  return matches;
}

function performSearch(query) {
  if(typeof query === 'undefined')
    query = lastQuery;
  query = query.toLowerCase().trim();

  components.forEach(component => {
    component.el.style.display = matches(component, query) ? 'flex' : 'none';
  });

  lastQuery = query;
}

function onSearchInput(evt) {
  const value = evt.target.value;
  performSearch(value);
}

function onSearchSubmit() {
  const inputEl = document.getElementById('search-input');
  if(inputEl)
    performSearch(inputEl.value);
}

(function ready() {
  console.info('Hooking up search');

  getComponents();

  document.getElementById('search')?.addEventListener('submit', evt => {
    evt.preventDefault();
    performSearch();
  });
  document.getElementById('search-input')?.addEventListener('input', onSearchInput);
  document.getElementById('search-submit')?.addEventListener('click', onSearchSubmit);

  document.getElementById('filter-common')?.addEventListener('change', evt => {
    filterCom = evt.target.checked;
    performSearch();
  });
  document.getElementById('filter-ieee')?.addEventListener('change', evt => {
    filterIEEE = evt.target.checked;
    performSearch();
  });
  document.getElementById('filter-iec')?.addEventListener('change', evt => {
    filterIEC = evt.target.checked;
    performSearch();
  });
})();