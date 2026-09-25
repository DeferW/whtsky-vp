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
  header.innerHTML = `<div class="container header-inner"><a class="brand" href="${root}" aria-label="На главную"><span class="brand-mark" aria-hidden="true">W</span><span data-name></span><span class="brand-caption">VANILLA PROJECT</span></a><nav aria-label="Основная навигация">${routes.map(([id, path, label]) => `<a href="${root}${path}" ${page === id ? 'aria-current="page"' : ''}>${label}${id === 'wiki' ? '<span class="nav-tag">скоро</span>' : ''}</a>`).join('')}</nav><a class="header-join" href="${root}#join">Начать играть <span aria-hidden="true">↗</span></a></div>`;
  document.querySelector('[data-footer]').innerHTML = `<div class="container footer-inner"><div><a class="footer-brand" href="${root}" data-name></a><p>Один мир. Своя история.</p></div><div class="footer-links"><a href="${root}rules/">Правила</a><a href="${root}contacts/">Связаться с нами</a></div><p class="legal">Неофициальный проект Minecraft.<br>Не связан с Mojang или Microsoft.</p></div><div class="container footer-bottom"><span>© ${new Date().getFullYear()} <span data-name></span></span><span>Сделано для своих. Открыто новым историям.</span></div>`;
  document.querySelectorAll('[data-name]').forEach((el) => { el.textContent = config.brand || name; });
  document.title = `${document.body.dataset.title} — ${name}`;
  document.querySelectorAll('[data-version]').forEach((el) => { el.textContent = config.version || 'Версию уточним перед входом'; });
  document.querySelectorAll('[data-address]').forEach((el) => { el.textContent = config.serverAddress || 'Адрес скоро появится'; });
  document.querySelectorAll('[data-discord]').forEach((el) => {
    const url = safeUrl(config.discordUrl);
    if (url) {
      const link = document.createElement('a');
      link.className = el.className;
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
        status.textContent = 'Адрес скопирован. До встречи в игре!';
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
