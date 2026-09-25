(() => {
  const config = window.SITE_CONFIG || {};
  const root = document.body.dataset.root || './';
  const page = document.body.dataset.page;
  const name = config.name || 'WHTSKY';
  const safeUrl = (value) => {
    try {
      const url = new URL(value);
      return url.protocol === 'https:' ? url.href : null;
    } catch { return null; }
  };
  const routes = [['home', '', 'Главная'], ['rules', 'rules/', 'Правила'], ['contacts', 'contacts/', 'Контакты'], ['wiki', 'wiki/', 'Вики']];
  const header = document.querySelector('[data-header]');
  header.innerHTML = `<div class="container header-inner"><a class="brand" href="${root}" aria-label="На главную"><span class="brand-mark" aria-hidden="true"><img src="${root}assets/images/logo-black.png" alt="" width="62" height="62"></span><span data-name></span><span class="brand-caption">VANILLA PROJECT</span></a><nav aria-label="Основная навигация">${routes.map(([id, path, label]) => `<a href="${root}${path}" ${page === id ? 'aria-current="page"' : ''}>${label}${id === 'wiki' ? '<span class="nav-tag">скоро</span>' : ''}</a>`).join('')}</nav><button class="theme-toggle" type="button" data-theme-toggle aria-label="Светлая тема">☀</button></div>`;
  document.querySelector('[data-footer]').innerHTML = `<div class="container footer-inner"><span>© ${new Date().getFullYear()} <span data-name></span> Vanilla Project</span><a href="https://www.complementary.dev/shaders/" target="_blank" rel="noopener noreferrer">Фоны: Complementary Shaders ↗</a><span>Не связан с Mojang или Microsoft.</span></div>`;
  const themeButton = document.querySelector('[data-theme-toggle]');
  const updateThemeButton = () => {
    const light = document.documentElement.dataset.theme === 'light';
    themeButton.textContent = light ? '☾' : '☀';
    themeButton.setAttribute('aria-label', light ? 'Включить тёмную тему' : 'Включить светлую тему');
    themeButton.title = themeButton.getAttribute('aria-label');
    document.querySelector('meta[name="theme-color"]').content = light ? '#edf1ea' : '#111815';
  };
  updateThemeButton();
  themeButton.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('whtsky-theme', theme); } catch {}
    updateThemeButton();
  });
  document.querySelectorAll('[data-name]').forEach((el) => { el.textContent = config.brand || name; });
  document.title = `${document.body.dataset.title} — ${name}`;
  document.querySelectorAll('[data-version]').forEach((el) => { el.textContent = config.version || 'Версия пока не указана'; });
  document.querySelectorAll('[data-address]').forEach((el) => { el.textContent = config.serverAddress || 'Скоро'; });
  document.querySelectorAll('[data-discord]').forEach((el) => {
    const url = safeUrl(config.discordUrl);
    if (url) {
      const link = document.createElement('a');
      link.className = el.className.replace('unavailable', '').trim();
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.textContent = 'Открыть Discord ↗';
      el.replaceWith(link);
    }
  });
  const copy = document.querySelector('[data-copy]');
  if (copy && config.serverAddress) {
    copy.disabled = false;
    copy.textContent = 'Скопировать адрес';
    copy.addEventListener('click', async () => {
      const status = document.querySelector('[data-copy-status]');
      try {
        await navigator.clipboard.writeText(config.serverAddress);
        status.textContent = 'Адрес скопирован.';
      } catch {
        status.textContent = `Скопируйте адрес вручную: ${config.serverAddress}`;
      }
    });
  }
  const staff = document.querySelector('[data-staff]');
  if (staff && Array.isArray(config.staff) && config.staff.length) {
    staff.replaceChildren();
    config.staff.forEach((person) => {
      const card = document.createElement('article');
      card.className = 'staff-card';
      const avatar = document.createElement('span');
      avatar.className = 'staff-avatar';
      avatar.setAttribute('aria-hidden', 'true');
      avatar.textContent = (person.nickname || '?').slice(0, 2).toUpperCase();
      const title = document.createElement('h3');
      title.textContent = person.nickname || 'Участник команды';
      const role = document.createElement('p');
      role.textContent = person.role || 'Команда проекта';
      card.append(avatar, title, role);
      const url = safeUrl(person.discordUrl);
      if (url) {
        const link = document.createElement('a');
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.className = 'text-link';
        link.textContent = 'Профиль в Discord ↗';
        card.append(link);
      }
      staff.append(card);
    });
  }
})();
