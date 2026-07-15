# Quentin Rospars — Portfolio

Static multidisciplinary portfolio built with Astro 6, strict TypeScript, validated MDX/JSON content collections, responsive local media, and a custom Canvas 2D generative hero.

## Local development

Node 22.12+ and npm are required.

```bash
npm ci
npm run dev
```

The development server always uses `http://localhost:4321/portfolio/` and hot-reloads
the page as files change. If port `4321` is already occupied, it exits with an error
instead of silently starting on a different port.

## Validation

```bash
npm run check
npm test
npm run build
npm run test:e2e
```

The site is configured for `https://qrospars.github.io/portfolio/`. GitHub Actions validates and deploys `master`; local work does not publish automatically.

Content lives in `src/content/`, active images in `src/assets/work/`, and the visual-system reference at `/portfolio/styleguide/`. See `AGENTS.md` for architecture, authoring rules, feature flags, and the full handoff checklist.
