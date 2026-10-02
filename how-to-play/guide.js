document.addEventListener('DOMContentLoaded', () => {
  const value = window.SITE_CONFIG?.modpackUrl;
  if (!value) return;
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:') return;
    const link = document.querySelector('[data-pack-download]');
    link.href = url.href;
    link.textContent = 'Скачать сборку · ZIP ↓';
    document.querySelector('[data-pack-note]').textContent = 'Скачайте архив целиком. Распаковывать его перед импортом не нужно.';
  } catch {}
});
