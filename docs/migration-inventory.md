# Modernization inventory

Recorded for the Astro modernization. Public narrative copy was migrated without rewriting; accessibility descriptions and structural labels were added where needed.

Pre-migration viewport references are preserved in [`reference/before-desktop.png`](reference/before-desktop.png) and [`reference/before-mobile.png`](reference/before-mobile.png).

## Previous experience

The Create React App site had no URL-addressable project routes. It used four full-height panels and fixed overlays:

1. Introduction: “Hi, I'm Quentin.”
2. Work carousel with Maritime Traffic Tool, KPI Frameworks for UX Optimisations, Research on Interaction using Features, and SeekStries.
3. My Universe teaser opening an eleven-entry visual gallery.
4. About/contact with portrait, email, LinkedIn, Instagram, and GitHub.

Runtime dependencies included React 17, Bootstrap/React Bootstrap, Font Awesome, p5.js from a CDN, medium image zoom, responsive masonry, parallax, and overlay-specific history/scroll behavior. Universal Analytics was embedded in the HTML shell.

## New route inventory

| Route | Source | Purpose |
| --- | --- | --- |
| `/portfolio/` | `src/pages/index.astro` | Rivers hero, curated cross-section, existing About excerpt |
| `/portfolio/work/` | `src/pages/work/index.astro` | Unified editorial index for case studies and visual series |
| `/portfolio/work/artelia/` | `src/content/case-studies/artelia.mdx` | Maritime Traffic Tool |
| `/portfolio/work/kpi-frameworks/` | `src/content/case-studies/kpi-frameworks.mdx` | KPI Frameworks for UX Optimisations |
| `/portfolio/work/interaction-research/` | `src/content/case-studies/interaction-research.mdx` | Research on Interaction using Features |
| `/portfolio/work/seekstries/` | `src/content/case-studies/seekstries.mdx` | SeekStries |
| `/portfolio/work/my-universe/` | series + piece collection | Unified lightweight gallery with eleven deep-linkable pieces |
| `/portfolio/about/` | `src/pages/about.astro` | Existing About and contact content |
| `/portfolio/styleguide/` | `src/pages/styleguide.astro` | No-index, unlisted living visual-system reference |
| `/portfolio/404.html` | `src/pages/404.astro` | Static not-found page |

## Media disposition

All actively rendered images were copied into normalized kebab-case paths under `src/assets/` for Astro processing. The motion-matching MP4 is under `public/media/`. Legacy originals and currently unused media were moved to `archive/legacy-media/` so they remain available without entering the deployed artifact.

## Published Path and deferred publication

The Path is now published after Selected Work with nine owner-verified linked milestones. On desktop it provides a scrubbable horizontal path; mobile, reduced-motion, and no-JavaScript contexts use the semantic vertical fallback. GSAP and ScrollTrigger load only when the enhanced desktop timeline approaches the viewport.

Honest counts, “Not one box,” prototype career claims, and prototype employer branding remain intentionally absent pending a verified-content pass.
