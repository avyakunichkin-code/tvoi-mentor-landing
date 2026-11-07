(() => {
  const modes = ['system', 'light', 'dark'];
  const labels = { system: 'системная', light: 'светлая', dark: 'тёмная' };
  let mode = 'system';
  try {
    const stored = localStorage.getItem('tm-theme');
    if (modes.includes(stored)) mode = stored;
  } catch { /* The site works without storage. */ }
  const apply = () => {
    if (mode === 'system') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.dataset.theme = mode;
    const toggle = document.querySelector('[data-theme-toggle]');
    if (toggle) {
      toggle.hidden = false;
      toggle.textContent = `Тема: ${labels[mode]}`;
      toggle.setAttribute('aria-label', `Тема: ${labels[mode]}. Переключить тему`);
    }
  };
  apply();
  const syncNavigation = () => {
    const links = [...document.querySelectorAll('.site-nav a')];
    const pagePath = location.pathname.replace(/index\.html$/, '');
    const matchingPage = links.filter((link) => new URL(link.href).pathname.replace(/index\.html$/, '') === pagePath);
    const selected = matchingPage.find((link) => new URL(link.href).hash === location.hash)
      ?? matchingPage.find((link) => !new URL(link.href).hash)
      ?? links.find((link) => new URL(link.href).pathname.includes('/knowledge/') && pagePath.includes('/knowledge/'));
    for (const link of links) {
      if (link === selected) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    }
  };
  window.addEventListener('hashchange', syncNavigation);
  window.addEventListener('pageshow', syncNavigation);
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    syncNavigation();
    document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
      mode = modes[(modes.indexOf(mode) + 1) % modes.length];
      try { localStorage.setItem('tm-theme', mode); } catch { /* Optional preference. */ }
      apply();
    });
  });
})();

