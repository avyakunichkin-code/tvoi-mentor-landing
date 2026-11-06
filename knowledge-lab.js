// Local explanatory interaction only: no requests, storage or assessment.
for (const lab of document.querySelectorAll('[data-kb-lab]')) {
  const form = lab.querySelector('form');
  const input = form.elements.namedItem('value');
  const result = lab.querySelector('.kv-result');
  function show(label, title, explanation) {
    result.querySelector('.kv-tag').textContent = label;
    result.querySelector('strong').textContent = title;
    result.querySelector('p').textContent = explanation;
  }
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const raw = input.value;
    if (!/^[0-9]+$/.test(raw)) {
      show('Вне числовой области', raw === '' ? 'Пустой ввод → ошибка' : 'Неверный формат → ошибка', 'Нужна непустая строка только из цифр 0–9. Диапазон этим вводом не исследуем; перехода нет.');
      return;
    }
    const value = Number(raw);
    if (value === 0) show('Нижний недопустимый класс', '0 → ошибка, перехода нет', 'Формат разрешён, но значение меньше минимума 1. Ведущие нули значения не меняют.');
    else if (value <= 100) show('Допустимый числовой класс', `${value} → следующий шаг`, 'Формат разрешён; значение между 1 и 100 включительно.');
    else show('Верхний недопустимый класс', 'Больше 100 → ошибка, перехода нет', 'Формат разрешён, но превышен максимум. Это другое основание отказа, чем неверный формат.');
  });
  lab.hidden = false;
  lab.closest('figure').querySelector('[data-kb-fallback]').hidden = true;
}
