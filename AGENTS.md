# AGENTS.md

This is the operating guide for coding agents working in this repository. Read it before changing code and update it when architecture, authoring, commands, deployment, or publication policy changes.

## Purpose and publication policy

This repository is Quentin Rospars's multidisciplinary portfolio. Its visual premise is editorial calm with generative curiosity: warm paper, ink, restrained coral, expressive serif display type, and measured motion. Work across product, research, data, code, and visual art is presented as one practice.

Do not invent or rewrite public claims, dates, clients, employment details, metrics, outcomes, or biographies. Preserve confidentiality language. Dear Future is ordinary employment context only; never import its/Pandora's visual system or co-brand this portfolio.

## Portfolio content standard

Before drafting, editing, reviewing, or structuring any public portfolio content, read and follow [`docs/portfolio-content-guide.md`](docs/portfolio-content-guide.md). It is the mandatory editorial standard for humans and AI agents. It applies even when a request only concerns a small title, one-liner, caption, metadata field, or CTA.

- Do not draft around missing facts. Gather the required inputs in the guide from Quentin, then write from verified information only.
- Preserve existing public copy unless Quentin explicitly authorises a rewrite. When a rewrite is authorised, use the guide's first-person, plain-language, reflective voice and its project-story structure.
- No em dashes, hype, AI/press-release phrasing, question titles, imperative or fragment one-liners, or unapproved commercial client names.
- Every proposed visual requires meaningful alt text and a concise caption. Video requires a still fallback; public media must respect the guide's performance and confidentiality rules.
- Before handing back content, complete the guide's self-check and flag missing media or factual inputs rather than inventing them.

The production target is GitHub Pages at `https://qrospars.github.io/portfolio/`. Every internal URL and public asset must remain safe under the `/portfolio/` base path.

## Technology

- Astro 6, static output, strict TypeScript, MDX, Astro content collections, Astro Fonts, and Astro ClientRouter.
- Custom CSS with primitive and semantic tokens. No Tailwind, CSS-in-JS, Bootstrap, or inline styling.
- Astro image processing for repository-owned images. Only media that cannot enter the image pipeline belongs in `public/`.
- Framework-independent Canvas 2D for the rivers hero.
- Vitest for unit tests; Playwright and axe for browser/accessibility tests; Lighthouse CI configuration for release budgets.
- GSAP/ScrollTrigger is isolated to the published Path component and loaded only near the desktop timeline when motion is permitted.

Use npm; `package-lock.json` is authoritative. Node 22.12 or newer is required.

## Repository map

```text
src/
  assets/                    Active local images processed by Astro
  components/
    navigation/              Header and footer
    signature/               Rivers hero and interactive Path timeline
    work/                    Work index, previews, case-study and series layouts
  config/
    disciplines.ts           Stable discipline IDs, labels, and order
    features.ts              Publication feature flags
  content/
    case-studies/*.mdx       Long-form project narratives
    series/*.mdx             Lightweight grouped visual-work introductions
    pieces/*.json            Individual visual pieces belonging to a series
    milestones/*.json        Verified dated Path entries
  content.config.ts          Validation schemas and collection references
  layouts/BaseLayout.astro   Metadata, fonts, navigation, transitions, reveal setup
  lib/                       Work normalization, URLs, rivers, timeline geometry
  pages/                     Static routes, including unlisted `/styleguide/`
  styles/                    Global foundations and design tokens
public/
  media/                     Video that must be served unchanged
archive/legacy-media/        Preserved originals; never deployed or imported
tests/e2e/                   Browser, accessibility, fallback, and visual tests
```

## Content model

`src/content.config.ts` is the contract. `astro sync`, `astro check`, and builds fail when authored content violates it.

- `caseStudies`: title, summary, optional year/client/context/role/tools/link, disciplines, local cover and alt text, display order, featured/draft state, and MDX body.
- `series`: title, optional summary/year, disciplines, local cover and alt text, display order, featured/draft state, and optional MDX introduction.
- `pieces`: title, existing description, optional year/client/video, medium, disciplines, local image and alt text, display order, featured/draft state, and a required series reference.
- `milestones`: ordered linked-work events (`workId`) or standalone events (`title` and `summary`), plus date, primary discipline, and publication state. The Path represents every dated published work; add only owner-verified events.

`src/lib/work.ts` normalizes case studies, series, and featured pieces into `WorkPreview`. Homepage and Work UI should consume this normalized model rather than branching on collection internals.

Discipline IDs are stable content keys. Add or rename them centrally in `src/config/disciplines.ts`, then update every affected entry and test. Never scatter display labels, lane order, or colors through components.

## Authoring workflows

### Add a case study

1. Put optimized, meaningfully named images in `src/assets/work/<slug>/`.
2. Add `src/content/case-studies/<slug>.mdx` with valid frontmatter and preserved factual copy.
3. Import body images into the MDX and render them with `ProjectImage`.
4. Choose a unique `order`; set `featured` only when it belongs on the homepage cross-section.
5. Run content validation, unit tests, build, and the case-study browser test.

### Add a visual piece

1. Use an existing series or create `src/content/series/<slug>.mdx`.
2. Put the image in `src/assets/work/<series>/`; use `public/media/` only for unchanged video delivery.
3. Add one validated JSON record in `src/content/pieces/` with a required series reference and meaningful alt text.
4. Preserve the owner's description exactly. `featured: true` may expose the piece on the homepage and deep-link to its series anchor.
5. Verify the series route at mobile and desktop widths.

### Add a Path event

1. Prefer a linked milestone record with `workId` in `collection:id` form so public copy, imagery, URLs, and secondary disciplines resolve from existing work.
2. Choose a primary discipline already attached to the referenced work; other disciplines become visual echoes.
3. Use `order` to sequence events sharing a year without inventing a month.
4. Use standalone title/summary records only for owner-verified events that do not belong to published work.
5. Add a linked milestone whenever a dated work is published so the Path remains complete. Validate desktop scrubbing, keyboard focus, the vertical touch/reduced-motion layout, and the no-JavaScript fallback.

## Design-system rules

- Tokens in `src/styles/tokens.css` are the source of truth for color, type, spacing, containers, borders, radii, motion, focus, and layering.
- Foundations belong in `src/styles/global.css`; component-specific rules stay scoped in the component.
- Light is the page default. Dark is a scoped section treatment, not a second global theme.
- The no-index `/styleguide/` must reflect any new reusable primitive, state, or pattern. It is excluded from navigation and the sitemap.
- Prefer semantic HTML and native CSS/Astro transitions. Do not hijack global scrolling or add a second general animation library.
- Motion must be earned, interruptible, and safe under `prefers-reduced-motion`.
- Hover can enhance but must never be required. All controls and work previews need keyboard and touch equivalents.
- No inline styles. Data-driven visualization geometry belongs in typed modules and SVG/canvas enhancement code.

## Runtime invariants

- Construct internal links with `withBase()` from `src/lib/urls.ts`. Never author root-absolute `/work/...` links directly in templates.
- Keep canonical URLs based on `Astro.site` and the current base-aware route.
- Canvas initialization must occur after critical text, cap DPR, clean up every listener/observer/frame, and pause when hidden or offscreen.
- Core navigation and content must remain usable with JavaScript disabled and canvas unavailable.
- The homepage must not render unverified counts, “Not one box,” or new career narrative. Path records must resolve from verified work or verified standalone milestone copy.
- Work index previews are enhancement: desktop hover/focus swaps the sticky preview; mobile includes media inline.
- `/work/` is the project-first archive; the homepage Path is the chronological interdisciplinary lens. Do not make both sections compete with the same nearby CTA.
- Primary navigation uses Home, Work, About, and Contact. Contact is the base-safe `/contact/` route and uses direct email plus existing social links; do not add a form without an owner-approved service and policy.
- `ProjectImage` automatically constrains portrait body media. Do not override it per project; import the image normally so every current and future case study receives the same readable treatment.
- Series piece IDs are public deep-link anchors. Treat IDs and route slugs as stable URLs.
- `archive/legacy-media/` is reference-only. Moving an asset back into runtime requires validation, optimization, and a real content reference.

## Commands

```bash
npm ci
npm run dev
npm run clean
npm run dev:reset
npm run check
npm test
npm run build
npm run test:e2e
npm run test:e2e:update
npm run test:lighthouse
```

- `npm run check`: strict Astro and TypeScript diagnostics plus content validation.
- `npm run clean`: removes generated reports and build output while preserving Astro's live content cache.
- `npm run dev:reset`: after stopping the dev server, clears the Astro cache and restarts the fixed-port server.
- `npm test`: deterministic unit tests for taxonomy, base paths, feature flags, and timeline geometry.
- `npm run build`: repeats the check and emits the static `/portfolio/` site.
- `npm run test:e2e`: starts Astro and covers Chromium, WebKit, Firefox, and a representative mobile device.
- `npm run test:e2e:update`: intentionally regenerates committed visual baselines after approved visual changes.
- `npm run test:lighthouse`: enforces 90+ category scores, LCP ≤2.5 s, and CLS ≤0.1 against a production build.

Do not deploy, push, or update visual snapshots without clear authorization. The GitHub Actions workflow deploys only from `master` after validation and browser-test jobs pass.

Do not remove `.astro/` while `npm run dev` is running. The homepage’s two selected works are a release invariant, validated in `src/lib/work.ts`; a missing or extra featured record must fail loudly rather than render an empty section.

## Positioning hierarchy

Portfolio framing follows a fixed hierarchy: people first, commercial outcomes second, then AI, data, product, research, and visual craft as the means to deliver both. Reuse `src/config/profile.ts` for global profile copy. Do not present Quentin as only a Data & AI specialist or let technology lead a public narrative unless the work itself requires it.

## Handoff checklist

- Run `npm run check`, `npm test`, and `npm run build` sequentially; Astro content sync writes shared state.
- Run relevant Playwright projects and inspect desktop/mobile output for visual changes.
- Check keyboard order, focus visibility, semantic headings, alternatives, touch, reduced motion, disabled JavaScript, and canvas failure.
- Confirm all generated internal assets/links include `/portfolio/` and no legacy root-absolute URLs exist.
- Confirm every published Path reference resolves, its primary discipline belongs to the work, and only one desktop event card is visible at a time.
- Ensure `/styleguide/` is no-index and absent from the sitemap.
- Review `git diff --check`, `git diff`, and `git status`; preserve unrelated work and never commit generated `dist/`, `.astro/`, reports, or `node_modules/`.
