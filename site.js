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
  document.addEventListener('DOMContentLoaded', () => {
    apply();
    document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
      mode = modes[(modes.indexOf(mode) + 1) % modes.length];
      try { localStorage.setItem('tm-theme', mode); } catch { /* Optional preference. */ }
      apply();
    });
  });
})();
