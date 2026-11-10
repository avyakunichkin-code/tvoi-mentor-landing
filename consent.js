(() => {
  // Same record format as apps/web/lib/consent.ts; stored per origin, never sent anywhere.
  const KEY = 'tm.consent';
  const base = document.currentScript ? new URL('.', document.currentScript.src).href : '';
  const read = () => {
    try {
      const value = JSON.parse(localStorage.getItem(KEY));
      return value && value.v === 1 && typeof value.analytics === 'boolean' ? value : null;
    } catch { return null; }
  };
  const write = (analytics) => {
    try { localStorage.setItem(KEY, JSON.stringify({ v: 1, analytics, at: new Date().toISOString() })); } catch { /* Choice holds for this page only. */ }
    window.dispatchEvent(new CustomEvent('tm:consent-change', { detail: { analytics } }));
  };
  let box;
  const close = () => { box?.remove(); box = undefined; };
  const choose = (analytics) => { write(analytics); close(); };
  const open = (details) => {
    close();
    const current = read();
    box = document.createElement('div');
    box.className = 'cookie-consent';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-modal', 'false');
    box.setAttribute('aria-labelledby', 'cookie-consent-title');
    box.tabIndex = -1;
    box.innerHTML = `<h2 id="cookie-consent-title">Cookie и локальное хранилище</h2>
<p>Сайт хранит в браузере только тему оформления и ваш выбор здесь, они нужны для работы. Аналитику мы включим только с вашего согласия; сейчас её нет, выбор сохранится на будущее. Отозвать согласие можно в любой момент. <a href="${base}privacy.html">Подробнее</a></p>
<fieldset class="cookie-consent__options" hidden><legend hidden>Категории</legend>
<label><input type="checkbox" checked disabled> Необходимые — тема оформления, выбор в этом баннере.</label>
<label><input type="checkbox" data-analytics${current?.analytics ? ' checked' : ''}> Аналитика — обезличенная статистика посещений.</label></fieldset>
<div class="cookie-consent__actions"><button type="button" class="cookie-primary" data-accept>Принять всё</button><button type="button" data-necessary>Только необходимые</button><button type="button" data-more>Настроить</button></div>`;
    const options = box.querySelector('fieldset');
    const accept = box.querySelector('[data-accept]');
    const more = box.querySelector('[data-more]');
    const showDetails = () => {
      options.hidden = false;
      more.hidden = true;
      accept.textContent = 'Сохранить выбор';
      accept.onclick = () => choose(box.querySelector('[data-analytics]').checked);
    };
    accept.onclick = () => choose(true);
    box.querySelector('[data-necessary]').onclick = () => choose(false);
    more.onclick = showDetails;
    document.body.append(box);
    if (details) showDetails();
    box.focus();
  };
  document.addEventListener('DOMContentLoaded', () => {
    if (!read()) open(false);
    document.addEventListener('click', (event) => {
      if (event.target.closest?.('[data-cookie-settings]')) open(true);
    });
  });
})();
