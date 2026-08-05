Design System — RailGo (detailed)
=================================

Overview
--------
This document describes the visual system introduced to make the UI look handcrafted and consistent. It includes tokens, recommended classes, examples, and small code snippets so you can apply the styles uniformly.

Color & Brand Tokens
--------------------
- `--color-brand-500`: #059669 — primary
- `--color-brand-600`: #047857 — deeper accent
- `--color-brand-400`: #10b981 — lighter accent
- `--color-surface`: #ffffff — surfaces/cards
- `--color-muted`: #94a3b8 — subtle text

Radii & Shadows
---------------
- `--radius-md`: 14px — inputs, small controls
- `--radius-lg`: 24px — cards, modals
- `--shadow-sm`: small elevated shadow for features
- `--shadow-lg`: primary card shadow

Core utility classes (in `globals.css`)
-------------------------------------
- `.card` — rounded, elevated surface for panels and containers.
- `.btn-primary` — primary CTA with gradient and shadow.
- `.soft-input` — rounded input/select styling for forms.
- `.feature-pill` — small tiled feature blocks used in hero and dashboards.

Usage examples
--------------
- Hero search container:
	- Use `className="card"` on the form wrapper for consistent elevation.

- Primary CTA:
	- Use `className="btn-primary"` for booking actions.

- Inputs and selects:
	- Add `className="soft-input"` to `input`/`select` elements.

Spacing & Typography
--------------------
- Base font: Inter (imported in `globals.css`).
- Headings: heavier weights (700/800). Body text: 400/600 for legibility.
- Vertical rhythm:
	- Card padding: 1.25rem — 2rem.
	- Element gap: 0.5rem — 1rem.

Component examples
------------------
- Modal container:
	- `<div className="max-w-lg card"> ... </div>`

- Feature grid:
	- Use `feature-pill` for each tile to keep consistent padding and shadows.

Extending the system
---------------------
Define variants (sm/md/lg) by adding small utility classes in `globals.css`. Use CSS variables for color theming to enable easy brand updates later.

Files changed
-------------
- `apps/web/app/globals.css` — tokens and utility classes.
- `apps/web/STYLE_GUIDE.md` — this doc.
