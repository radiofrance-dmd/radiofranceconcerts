// Mini moteur qui remplace l'environnement du dashboard Claude : charge les CSV et expose window.dash.
(function () {
  const SOURCES = {
    editions: 'data/jeudi_oui_editions.csv', crm: 'data/jeudi_oui_crm.csv', concerts: 'data/jeudi_oui_concerts.csv',
    profils: 'data/jeudi_oui_profils.csv', categories: 'data/jeudi_oui_categories.csv',
  };
  const store = {}, calcs = {}, listeners = [];
  let params = {edition: null, indicateur: 'acheteurs'};
  const run = () => listeners.forEach((fn) => { try { fn(); } catch (e) { console.error(e); } });
  const computeCalcs = () => {
    Object.entries(calcs).forEach(([id, c]) => {
      const ins = c.inputs.map((k) => store[k]);
      if (ins.every((x) => x && x.status === 'ok')) {
        try { store[id] = {status: 'ok', data: c.fn(...ins.map((x) => x.data))}; } catch (e) { store[id] = {status: 'error', data: [], message: String(e)}; }
      }
    });
  };
  window.dash = {
    data: (id) => store[id] || {status: 'loading', data: []},
    onData: (fn) => { listeners.push(fn); try { fn(); } catch (e) { console.error(e); } },
    calc: (id, def) => { calcs[id] = def; },
    params: () => ({...params}),
    setParams: (p) => { params = {...params, ...p}; run(); },
    resetParams: () => { params = {edition: null, indicateur: 'acheteurs'}; run(); },
    setLink: () => {}, refresh: () => {},
    colors: ['#ec0d78', '#bb12e1', '#f805cd', '#eb3757', '#6f2fc5', '#ff7ab8', '#8a8a8a', '#1a1a1a'],
  };
  Promise.all(Object.entries(SOURCES).map(([id, url]) => d3.csv(url).then((rows) => { store[id] = {status: 'ok', data: rows, columns: rows.columns}; })
    .catch((e) => { store[id] = {status: 'error', data: [], message: String(e)}; })))
    .then(() => { computeCalcs(); run(); });
  let t; window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(run, 150); });
})();
