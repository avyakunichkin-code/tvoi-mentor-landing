(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  let scheduled = false;
  const update = () => {
    const progress = preference.matches ? 0 : Math.min(scrollY / 700, 1);
    document.querySelectorAll('.draw-path').forEach(shape => { shape.style.strokeDashoffset = String(-progress * 100); });
    scheduled = false;
  };
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {entry.target.classList.add('visible');observer.unobserve(entry.target);}
    }), {threshold:.08});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    document.documentElement.classList.add('motion-ready');
  }
  addEventListener('scroll', () => {if (!scheduled) {scheduled=true;requestAnimationFrame(update);}}, {passive:true});
  preference.addEventListener('change', update);
})();
