# Soumyajit Ghosh — Personal Website

Interactive digital-universe portfolio for **Soumyajit Ghosh, Developer & AI Builder**.
React + TypeScript + Vite + Tailwind CSS v4 + Motion + Lucide icons.

## Stack

- React 19 + TypeScript (strict)
- Vite 6
- Tailwind CSS v4 (Vite plugin)
- Motion for React (`motion/react`)
- Lucide React icons

## Requirements

- Node.js LTS (18+) and npm
- Git

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open the URL Vite prints (usually `http://localhost:5173`).

## Production build + preview

```bash
npm run build
npm run preview
```

Build output goes to `dist/`. TypeScript strict checking runs as part of `npm run build` (`tsc -b && vite build`).

## Project structure

```text
src/
  components/
    Navbar.tsx          # SG wordmark, section links, theme toggle, mobile menu
    Hero.tsx            # headline, CTAs, profile photo with fallback
    UniverseCanvas.tsx  # canvas stars, orbits, pointer parallax, reduced-motion
    About.tsx           # bio + editable profile facts
    Projects.tsx        # working category filters
    ProjectCard.tsx     # name, tags, status, GitHub + demo links
    Journey.tsx         # editable timeline
    Experiments.tsx     # 4 working interactive demos
    Skills.tsx          # editable tech grid
    Contact.tsx         # mailto + copy-email with feedback
    Footer.tsx          # dynamic year + back-to-top
  data/
    site.ts             # name, email, GitHub, profile image path
    projects.ts         # 4 projects, filters: All / AI / Web Development / Experiments
    journey.ts          # editable milestones
    skills.ts           # editable tools + profile facts
  hooks/
    useReducedMotion.ts # reactive prefers-reduced-motion hook
  App.tsx               # theme state + section composition
  main.tsx
  index.css             # midnight-navy universe design system
public/
  favicon.svg           # SG identity
  404.html              # Cloudflare Pages custom 404
  images/
    profile.jpg         # <-- add your portrait here (not committed yet)
```

## Personalize before publishing

1. Add your portrait at `public/images/profile.jpg` (square, ≥800px, ≤~300KB). The hero shows a polished SG placeholder until that file exists. Path is configured in `src/data/site.ts` as `profileImage`.
2. Set your real email in `src/data/site.ts` (`email`).
3. Set your real GitHub URL in `src/data/site.ts` (`github`).
4. Update `src/data/projects.ts` — only add `githubUrl` / `demoUrl` values you have verified. Empty strings render as clearly-labeled placeholders, never fake links.
5. Update `src/data/journey.ts` and `src/data/skills.ts` — entries marked `editable` are placeholders. Replace them with real milestones.
6. Optional: add `public/images/og-cover.jpg` (1200×630) for link previews. `index.html` already references it.

## Cloudflare Pages deployment

Hosting target: **Cloudflare Pages**, free-first, static output in `dist/`.
No `wrangler.toml` is used — Pages Git integration builds and serves `dist/` directly.
No `_redirects` SPA rewrite is included — this is a single page using hash anchors
(no client-side router), so it is not needed. The custom 404 stays as `public/404.html`.

Target custom domain: `soumyajit.is-a.dev` (free `is-a.dev` subdomain).

1. Push this repo to GitHub (production branch `main`).
2. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. Select the repository, production branch `main`.
4. Build settings:
   - Framework preset: **Vite** (or None)
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/` (repo root)
5. Node version: set the `NODE_VERSION` environment variable in the Pages project
   settings to the LTS you verified locally (this repo requires Node 18+;
   verified here on Node v24). This avoids surprises when Pages defaults change.
6. Environment variables: none else required. Do not put secrets in frontend
   code — public Vite vars (`VITE_*`) are visible to anyone.
7. Deploy, then test the assigned `*.pages.dev` URL on mobile + desktop.
8. Custom 404 is served from `public/404.html` (copied to `dist/404.html` on build).
9. `vite.config.ts` explicitly sets `base: "/"` and `build.outDir: "dist"` so asset
   URLs are correct when served from the site root on the custom domain.
10. `pnpm-lock.yaml` is committed for local reproducible installs, but Pages
    uses `npm run build` and runs `npm install`, which ignores pnpm files. If
    you want locked npm installs on Pages, run
    `npm install --package-lock-only`, commit the generated
    `package-lock.json`, and redeploy. `pnpm-workspace.yaml` exists only to
    allow the `esbuild` postinstall under a local pnpm wrapper; it is ignored
    by Pages/npm builds.

### Custom domain: `soumyajit.is-a.dev`

Two separate steps, both manual (nothing in this repo does them for you):

A. **Claim the subdomain with the is-a.dev project.** `is-a.dev` subdomains are
   granted through that project's own documented registration process (see the
   official is-a.dev docs/repo for the current steps and required record
   format). Follow their process to request `soumyajit`. This repo contains no
   registration file and makes no claim that the name is registered or reserved.

B. **Connect it in Cloudflare Pages.** Pages project → Custom domains → Set up a
   custom domain → enter `soumyajit.is-a.dev`, then follow exactly the DNS /
   verification instructions the Pages dashboard shows you. Do not copy DNS
   values from anywhere else — use only what the dashboard displays for your
   project. HTTPS is provisioned by Cloudflare once verification passes.

### Remaining manual steps for you (not done by this change)

- [ ] Push to GitHub and connect the repo to Cloudflare Pages (steps 1–7 above).
- [ ] Set `NODE_VERSION` in Pages settings; confirm the first deploy succeeds.
- [ ] Request `soumyajit` via the is-a.dev project's documented process.
- [ ] Add `soumyajit.is-a.dev` as a Pages custom domain; complete the DNS /
      verification steps the dashboard shows; confirm HTTPS loads.
- [ ] Add `public/images/profile.jpg` and `public/images/og-cover.jpg` (see
      "Personalize before publishing") — both 404 until you add them.

## Interactions (all wired, no dead buttons)

- Section nav with smooth scroll + mobile hamburger + Escape-to-close
- Dark/light theme toggle (persisted to `localStorage`, respects `color-scheme`)
- Project filters: All / AI / Web Development / Experiments (actually filters the grid)
- Pointer-reactive universe canvas (pauses off-screen, honors reduced-motion)
- Experiments Lab: particle sliders, keyboard+pointer glow, orbit speed/trails, gradient mixer with copy-CSS
- Copy-email button with copied/failed feedback
- External links use `target="_blank" rel="noreferrer"`
- Back-to-top button with reduced-motion-aware smooth scroll
- Skip link, visible focus, semantic landmarks, live regions for filters/clipboard

## Accessibility & performance notes

- `prefers-reduced-motion` disables canvas loops, Motion reveals, and smooth scroll.
- Canvas uses capped DPR (≤1.5), ~40–130 stars, pauses when hidden or off-screen.
- Below-the-fold images should use `loading="lazy"`; hero portrait uses eager loading.
- No secrets in the client bundle. No contact form is included — adding one requires a backend or form service.
