const views = {
  estimate: { level: "3", text: "Предварительная оценка. Её ещё нужно подтвердить практикой." },
  confirmed: { level: "2", text: "Подтверждённый уровень в этом примере. Он опирается на свидетельства, а не на самооценку." },
  target: { level: "4", text: "Целевой уровень в примере. Это ориентир развития, а не уже достигнутый результат." },
};

for (const button of document.querySelectorAll("[data-view]")) {
  button.addEventListener("click", () => {
    const view = views[button.dataset.view];
    if (!view) return;
    for (const item of document.querySelectorAll("[data-view]")) {
      item.setAttribute("aria-pressed", String(item === button));
    }
    document.getElementById("level").textContent = view.level;
    document.getElementById("explanation").textContent = view.text;
    document.getElementById("level-bars").className = `level-bars ${button.dataset.view}`;
  });
}
