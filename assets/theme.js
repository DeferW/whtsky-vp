// Apply the saved theme before the first paint; storage may be unavailable.
(() => {
  let theme = 'dark';
  try {
    const saved = localStorage.getItem('whtsky-theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch {}
  document.documentElement.dataset.theme = theme;
})();
