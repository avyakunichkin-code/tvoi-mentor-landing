# Шрифты приложения

Self-hosted woff2 для `theme.css` ([ADR 0012](../../../docs/decisions/0012-design-system-palette-and-fonts.md)). Исходники — те же файлы из официальных репозиториев, что и в [прототипе](../../../docs/design/prototype/fonts/README.md); лицензии SIL OFL 1.1 — в [licenses/](licenses/).

| Файл | Исходник | Размер |
|---|---|---|
| `unbounded-var.woff2` | [googlefonts/unbounded](https://github.com/googlefonts/unbounded), `fonts/variable/Unbounded[wght].ttf` | 94 КБ |
| `onest-var.woff2` | [simpals/onest](https://github.com/simpals/onest), релиз 2.001, `Onest[wght].woff2` | 48 КБ |
| `jetbrains-mono-var.woff2` | [JetBrains/JetBrainsMono](https://github.com/JetBrains/JetBrainsMono), `JetBrainsMono[wght].woff2` | 54 КБ |

Все три — вариативные (ось `wght` сохранена) и урезаны до кириллицы и латиницы с типографскими знаками. Собрано 28.10.2026 так (fontTools 4.68, brotli 1.2):

```bash
pyftsubset <исходник> --flavor=woff2 --layout-features='*' --output-file=<файл> \
  --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0400-045F,U+0490-0491,U+04B0-04B1,U+2000-206F,U+2074,U+20AC,U+2116,U+2122,U+2190-2193,U+2212,U+2215,U+2248,U+2264-2265,U+FEFF,U+FFFD"
```

Если в контенте появятся символы вне этого набора (например, казахские или украинские буквы сверх `ґ`), их нужно добавить в `--unicodes` и пересобрать файлы.
