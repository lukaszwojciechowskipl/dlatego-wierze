# CLAUDE.md — Project conventions

## What this project is
Polish Catholic apologetics site. Single repo: Astro 6 + React Islands + R3F + Sanity Studio embedded at `/admin`. Hosted on Vercel Hobby. UI copy in Polish; identifiers, comments, commit messages in English.

## Run
- `pnpm dev` — Astro dev (http://localhost:4321) + Sanity Studio (http://localhost:4321/admin)
- `pnpm build` — production build (must pass before commit)
- `pnpm check` — TS + Astro type-check
- `pnpm preview` — preview production build

## Stack (actual installed versions — Astro shipped 6.x by ship time)
- Astro 6.x (spec listed 5.17 — 6 is current latest, content layer + integrations API compatible)
- @astrojs/vercel 10.x, @astrojs/react 5.x, @astrojs/mdx 5.x
- React 19.2, three 0.184, @react-three/fiber 9.x, @react-three/drei 10.x
- GSAP 3.15 + @gsap/react 2.x, lenis 1.3
- Sanity 5.x (spec listed 3.x — 5.x has same Studio config API for our usage)
- Zod 4.x (spec listed 3.x — minor syntax diffs in `.url()`, `.email()` etc.)
- Tailwind v4.2 + tw-animate-css (NO `tailwind.config.ts`; uses `@theme` block in `src/styles/globals.css`)
- TypeScript 6.x (spec listed 5.6)

## Conventions
- TypeScript strict, path alias `@/*` → `./src/*`
- UI strings in Polish, code in English
- One small commit per logical unit. Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `refactor:`).
- For GSAP in React: always `useGSAP()` with a scope ref. Register plugins once.
- Lenis mounted in `LenisProvider.tsx`, synced with `gsap.ticker`.
- All R3F canvases get `client:only="react"` and a `<Suspense>` fallback.
- Don't create `tailwind.config.ts` — Tailwind v4 lives in `src/styles/globals.css` `@theme`.
- Mobile-first; WebGL fallback to static AVIF for `prefers-reduced-motion: reduce` or `navigator.hardwareConcurrency < 4`.

## Env
See `.env.example`. Never commit `.env.local`.

Required env vars (set both locally in `.env.local` and in Vercel project settings):
- `PUBLIC_SANITY_PROJECT_ID` — from sanity.io/manage
- `PUBLIC_SANITY_DATASET=production`
- `PUBLIC_SANITY_API_VERSION=2025-01-28`
- `SANITY_API_READ_TOKEN` — Sanity API → Tokens → "read" token
- `SANITY_REVALIDATE_SECRET` — generate with `openssl rand -hex 32`
- `VERCEL_DEPLOY_HOOK` — Vercel project → Settings → Git → Deploy Hooks

## Known traps
- `@astrojs/vercel@8+` (and v10) has a single import path, NOT `@astrojs/vercel/serverless`.
- `lenis` package, NOT `@studio-freight/lenis` (deprecated).
- R3F v9 requires React 19.
- Sanity Free plan = 1 dataset, 10k docs, 100GB bandwidth/mo. Use `useCdn: true` for static builds.
- `pnpm` is installed at `~/Library/pnpm/pnpm` via standalone installer (not via npm global).
- `gh` CLI is installed at `~/.local/bin/gh`. PATH config lives in `~/.zshenv`.

## MCP servers (manual setup — claude CLI not in PATH on this machine)
The user uses Claude Code desktop app. To enable Sanity + Vercel MCP servers for future sessions, add via the app's MCP settings UI:
- Sanity: HTTP transport, URL `https://mcp.sanity.io`
- Vercel: HTTP transport, URL `https://mcp.vercel.com`
After adding, run `/mcp` in Claude Code and complete browser OAuth for each.
