# Soumyajit Ghosh — Personal Website

A responsive React + TypeScript portfolio with an interactive digital-universe hero, project filtering, theme toggle, scroll reveals, journey timeline, and contact section.

## Stack
- React + TypeScript
- Vite
- Tailwind CSS v4 (Vite plugin)
- Motion for React
- Lucide React icons

## Requirements
Install a current Node.js LTS release and Git.

## Run locally
```bash
npm install
npm run dev
```
Open the local URL Vite prints in the terminal.

## Production check
```bash
npm run build
npm run preview
```
The production site is generated in `dist/`.

## Personalize before publishing
1. Add your portrait at `public/images/profile.jpg`. The initial About section uses a designed placeholder; replace the `profile-placeholder` block in `src/App.tsx` with an `<img>` element using `/images/profile.jpg` and descriptive alt text.
2. Update projects, technologies, statuses, and repository/demo URLs in `src/data.ts`.
3. Replace `YOUR_EMAIL@example.com` in `src/App.tsx` with your real public contact email.
4. Replace the generic GitHub URL in the footer with your profile URL.
5. Review the biography and timeline so they accurately represent you.
6. Add a real social preview image and update metadata in `index.html` if desired.

## Cloudflare Pages
1. Push this project to a GitHub repository.
2. In Cloudflare Pages, create a project from that repository.
3. Set the production branch to `main`.
4. Build command: `npm run build`
5. Build output directory: `dist`
6. Deploy and test the assigned URL.

This is a static frontend; it does not require a backend for the first release. If you add a contact form later, use a form service or secure backend. Never put private API keys in client-side code.

## Interactions
- Responsive mobile navigation
- Dark/light theme toggle (current session only)
- Project category filters
- Motion-powered scroll reveals
- Pointer-reactive particle canvas on the hero
- Skip link, focus-visible styles, and reduced-motion support

## Before launch
Run the production build, test keyboard navigation, inspect the page on a phone, verify all links, and remove or replace all placeholders.
