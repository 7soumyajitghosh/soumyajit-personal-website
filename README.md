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
    About.tsx           # bio + profile facts
    Projects.tsx        # working category filters
    ProjectCard.tsx     # name, tags, status, GitHub + demo links
    Journey.tsx         # journey timeline
    Skills.tsx          # tech grid
    Contact.tsx         # mailto + copy-email with feedback
    Footer.tsx          # dynamic year + back-to-top
  data/
    site.ts             # name, email, GitHub, profile image path
    projects.ts         # 4 projects, filters: All / AI / Web Development / Experiments
    journey.ts          # journey milestones
    skills.ts           # tools + profile facts
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
4. Update `src/data/projects.ts` — only add `githubUrl` / `demoUrl` values you have verified. Links render only when a URL is set, never fake links.
5. Update `src/data/journey.ts` and `src/data/skills.ts` with real milestones and tools as you grow.
6. Optional: add `public/images/og-cover.jpg` (1200×630) for link previews. `index.html` already references it.

## Vercel deployment

Hosting target: **Vercel**, free-first, static Vite output in `dist/`.
No `vercel.json` is used — Vercel auto-detects Vite; Git integration builds and
serves `dist/` directly. No SPA rewrite is included — this is a single page
using hash anchors (no client-side router), so it is not needed. The custom 404
stays as `public/404.html`.

Target custom domain: `7soumyajitghosh.is-a.dev` (free `is-a.dev` subdomain).

1. Push this repo to GitHub (production branch `main`).
2. Vercel dashboard → Add New → Project → Import this repository.
3. Build settings:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Root directory: `/` (repo root)
4. Node version: this repo requires Node 18+ (verified here on Node v24).
5. Environment variables: none required. Do not put secrets in frontend
   code — public Vite vars (`VITE_*`) are visible to anyone.
6. Deploy, then test the assigned `*.vercel.app` URL on mobile + desktop.
7. `vite.config.ts` explicitly sets `base: "/"` and `build.outDir: "dist"` so asset
   URLs are correct when served from the site root on the custom domain.
8. `pnpm-lock.yaml` is committed for local reproducible installs, but Vercel
   uses `npm run build` and runs `npm install`, which ignores pnpm files. If
   you want locked npm installs on Vercel, run
   `npm install --package-lock-only`, commit the generated
   `package-lock.json`, and redeploy. `pnpm-workspace.yaml` exists only to
   allow the `esbuild` postinstall under a local pnpm wrapper; it is ignored
   by Vercel/npm builds.

### Custom domain: `7soumyajitghosh.is-a.dev`

Two separate steps, both manual (nothing in this repo does them for you).
Status note (Oct 2026): the `is-a-dev/register` repo banner says
**pull requests are disabled until further notice**, so a new registration PR
cannot be merged right now. Prepare everything, deploy first, then submit when
they reopen.

A. **Add the domain in Vercel first.** Project → Settings → Domains → Add
   `7soumyajitghosh.is-a.dev`. Disable any "redirect to www" option. Use
   "Continue manually" and copy the TXT verification value Vercel shows you —
   you need it for the registration files. Use only the DNS values your own
   Vercel dashboard displays; do not copy record values from anywhere else.

B. **Claim the subdomain with the is-a.dev project** (when PRs reopen).
   Fork `is-a-dev/register` and add two files under `/domains`, following the
   official Vercel guide (`docs.is-a.dev/guides/vercel/`):
   - `domains/7soumyajitghosh.json` — owner block plus the A record(s) exactly
     as your Vercel dashboard shows them.
   - `domains/_vercel.7soumyajitghosh.json` — owner block plus the TXT
     verification string from step A.
   Then open the PR from your fork and watch it for requested changes. This
   repo contains no registration file and makes no claim that the name is
   registered or reserved.

### Remaining manual steps for you (not done by this change)

- [ ] Import the repo in Vercel and confirm the first deploy succeeds.
- [ ] In Vercel → Domains, add `7soumyajitghosh.is-a.dev`; copy the TXT value.
- [ ] When is-a.dev PRs reopen, submit `7soumyajitghosh` + `_vercel.7soumyajitghosh`
      files per their Vercel guide; wait for merge.
- [ ] Confirm `https://7soumyajitghosh.is-a.dev` loads with HTTPS.
- [ ] Add `public/images/profile.jpg` and `public/images/og-cover.jpg` (see
      "Personalize before publishing") — both 404 until you add them.

## Interactions (all wired, no dead buttons)

- Section nav with smooth scroll + mobile hamburger + Escape-to-close
- Dark/light theme toggle (persisted to `localStorage`, respects `color-scheme`)
- Project filters: All / AI / Web Development / Experiments (actually filters the grid)
- Pointer-reactive universe canvas (pauses off-screen, honors reduced-motion)
- Copy-email button with copied/failed feedback
- External links use `target="_blank" rel="noreferrer"`
- Back-to-top button with reduced-motion-aware smooth scroll
- Skip link, visible focus, semantic landmarks, live regions for filters/clipboard

## Accessibility & performance notes

- `prefers-reduced-motion` disables canvas loops, Motion reveals, and smooth scroll.
- Canvas uses capped DPR (≤1.5), ~40–130 stars, pauses when hidden or off-screen.
- Below-the-fold images should use `loading="lazy"`; hero portrait uses eager loading.
- No secrets in the client bundle. No contact form is included — adding one requires a backend or form service.
