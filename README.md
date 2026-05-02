# Dlatego Wierzę — 15 Konstelacji

Polish Catholic apologetics website. 15 independent lines of argumentation visualised as a galaxy of constellations with a knowledge tree backdrop. Astro 6 + React Islands + R3F + Sanity Studio at `/admin`. Hosted on Vercel.

UI copy in Polish; identifiers, comments, commit messages in English.

## Run

```bash
pnpm dev      # dev server at http://localhost:4321 (+ Studio at /admin)
pnpm build    # production build (must pass before commit)
pnpm check    # TS + Astro type-check
pnpm preview  # serve the production build locally
```

## Stack

Astro 6 · @astrojs/vercel 10 · @astrojs/react 5 · @astrojs/mdx 5 · React 19 · three.js 0.184 · @react-three/fiber 9 · @react-three/drei 10 · @react-three/postprocessing 3 · GSAP 3.15 + @gsap/react · Lenis 1.3 · Sanity 5 · Tailwind v4 + tw-animate-css · shadcn/ui · react-simple-maps · Cytoscape + fcose · Pagefind · Zod 4 · TypeScript 6.

## Structure

```
src/
├── components/{ui,layout,three,interactive,content,providers}/
├── content/arguments/      # 15 longform MDX files
├── lib/                    # constants, sanity client, queries, typography
├── pages/                  # routes (home, /argumenty, /swiadectwa, /swieci,
│                           # /slawne-osoby, /cuda-eucharystyczne, /mapa-wiedzy,
│                           # /o-projekcie, /admin, /api/revalidate)
├── schemas/                # Sanity Studio schemas (13 docs + 5 objects)
└── styles/                 # globals.css (Tailwind v4 @theme), tufte.css
```

## Env

See `.env.example`. Never commit `.env.local`. For Vercel production env, follow `CO_DALEJ.md` step 3.

## Conventions

See `CLAUDE.md`.

## Going to production

See **`CO_DALEJ.md`** — step-by-step deploy + Sanity webhook setup, written in Polish for non-developers.

## License

Code released under MIT. Treść (artykuły, świadectwa, zdjęcia) podlega prawu autorskiemu autorów.
