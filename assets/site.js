(() => {
  const config = window.SITE_CONFIG || {};
  const root = document.body.dataset.root || './';
  const page = document.body.dataset.page;
  const routes = [['home', '', 'Главная'], ['play', 'how-to-play/', 'Как играть'], ['rules', 'rules/', 'Правила'], ['contacts', 'contacts/', 'Контакты']];
  const nav = routes.map(([id, path, label]) => `<a href="${root}${path}" ${page === id ? 'aria-current="page"' : ''}>${label}</a>`).join('');
  document.querySelector('[data-header]').innerHTML = `<div class="container header-inner"><a class="brand" href="${root}" aria-label="WHTSKY Servers — главная"><span class="brand-mark"><img src="${root}assets/images/logo-white.png" width="62" height="62" alt=""></span><span>WHTSKY <small>SERVERS</small></span></a><nav aria-label="Основная навигация">${nav}</nav><button class="theme-toggle" data-theme-toggle type="button" aria-label="Включить светлую тему">☀</button></div>`;
  document.querySelector('[data-footer]').innerHTML = `<div class="container footer-inner"><span>© ${new Date().getFullYear()} WHTSKY Servers</span><span data-address></span><a href="https://discord.gg/YwaqcRJRg9" data-discord target="_blank" rel="noopener noreferrer">Discord ↗</a><span>Не связан с Mojang или Microsoft.</span></div>`;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const updateTheme = () => {
    const light = document.documentElement.dataset.theme === 'light';
    themeButton.textContent = light ? '☾' : '☀';
    themeButton.setAttribute('aria-label', light ? 'Включить тёмную тему' : 'Включить светлую тему');
    themeButton.title = themeButton.getAttribute('aria-label');
    document.querySelector('meta[name="theme-color"]').content = light ? '#f2f2ee' : '#121315';
  };
  updateTheme();
  themeButton.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('whtsky-theme', theme); } catch {}
    updateTheme();
  });
  document.title = `${document.body.dataset.title} — ${config.name || 'WHTSKY Servers'}`;
  for (const [key, selector] of [['serverAddress', 'address'], ['version', 'version'], ['loader', 'loader']]) {
    document.querySelectorAll(`[data-${selector}]`).forEach(el => { el.textContent = config[key] || 'Скоро'; });
  }
  try {
    const discord = new URL(config.discordUrl);
    if (discord.protocol === 'https:') document.querySelectorAll('[data-discord]').forEach(el => { el.href = discord.href; });
  } catch {}
  document.querySelectorAll('[data-copy]').forEach(copy => {
    if (!config.serverAddress) return;
    copy.disabled = false;
    copy.addEventListener('click', async () => {
      const status = document.querySelector('[data-copy-status]');
      try {
        await navigator.clipboard.writeText(config.serverAddress);
        status.textContent = 'Адрес скопирован.';
      } catch {
        status.textContent = `Скопируйте вручную: ${config.serverAddress}`;
      }
    });
  });
})();
