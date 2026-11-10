const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
function setTheme(theme) {
  root.dataset.theme = theme;
  themeButton.textContent = theme === 'dark' ? 'Светлая тема' : 'Тёмная тема';
  themeButton.setAttribute('aria-label', theme === 'dark' ? 'Включить светлую тему' : 'Включить тёмную тему');
  document.querySelectorAll('img[src*="logos/wordmark"]').forEach(img => {
    if (!img.closest('.logo-stage')) img.src = `../brand/logos/wordmark${theme === 'dark' ? '-inverse' : ''}.svg`;
  });
}
setTheme(matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
themeButton.addEventListener('click', () => setTheme(root.dataset.theme === 'dark' ? 'light' : 'dark'));
const variants = ['route', 'modules', 'steps'];
function selectVariant(name) {
  if (!variants.includes(name)) name = 'route';
  document.querySelectorAll('[data-concept]').forEach(el => { el.hidden = el.dataset.concept !== name; });
  document.querySelectorAll('[data-variant]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.variant === name)));
  const url = new URL(location.href); url.searchParams.set('variant', name); history.replaceState(null, '', url);
}
if (document.querySelector('[data-concept]')) {
  selectVariant(new URL(location.href).searchParams.get('variant'));
  document.querySelectorAll('[data-variant]').forEach(button => button.addEventListener('click', () => selectVariant(button.dataset.variant)));
}
const motionPreference = matchMedia('(prefers-reduced-motion: reduce)');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
  }), { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  root.classList.add('motion-ready');
}
let scheduled = false;
function updateScroll() {
  const progress = motionPreference.matches ? 0 : Math.min(window.scrollY / 700, 1);
  document.querySelectorAll('.draw-path').forEach(shape => { shape.style.strokeDashoffset = String(-progress * 100); });
  document.querySelectorAll('.step-shape').forEach((shape, i) => {
    shape.style.transform = `translateY(${-progress * (i + 1) * 8}px)`;
  });
  scheduled = false;
}
addEventListener('scroll', () => { if (!scheduled) { scheduled = true; requestAnimationFrame(updateScroll); } }, { passive: true });
motionPreference.addEventListener('change', updateScroll);
const statePreview = document.querySelector('#state-preview');
const states = {
  loading: '<span class="badge">Загрузка</span><h3>Загружаем твой план</h3><p>Подготавливаем шаги и материалы.</p><div class="skeleton" aria-hidden="true"></div><div class="skeleton" aria-hidden="true"></div>',
  empty: '<span class="badge">План пока не построен</span><h3>Начни с отправной точки</h3><p>Чтобы предложить шаги, сначала нужно оценить навыки.</p><a class="text-link" href="#semantics">Как показываем оценку →</a>',
  error: '<div class="notice error"><strong>Не удалось загрузить план</strong><br>Последний сохранённый результат не изменён.</div><h3>Попробуем ещё раз?</h3><button class="button secondary" data-retry>Повторить загрузку</button>',
  success: '<span class="badge">План загружен</span><h3>Граничные значения</h3><p>Следующий шаг: прочитать объяснение и выбрать проверки около границ.</p><a class="text-link" href="../index.html#route-plan">Посмотреть пример →</a>'
};
function selectState(name) {
  if (!statePreview || !Object.hasOwn(states, name)) return;
  statePreview.innerHTML = states[name];
  document.querySelectorAll('[data-state]').forEach(el => el.setAttribute('aria-pressed', String(el.dataset.state === name)));
}
document.querySelectorAll('[data-state]').forEach(button => button.addEventListener('click', () => selectState(button.dataset.state)));
if (statePreview) { selectState('success'); statePreview.addEventListener('click', event => { if (event.target.closest('[data-retry]')) selectState('success'); }); }
const motionButton = document.querySelector('[data-motion]');
motionButton?.addEventListener('click', () => { const demo = document.querySelector('.motion-demo'); demo.classList.remove('playing'); requestAnimationFrame(() => requestAnimationFrame(() => demo.classList.add('playing'))); });
