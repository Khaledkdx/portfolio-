# Repository Guidelines

## Project Structure & Module Organization

This is a Vinext/Next-style React portfolio deployed to Cloudflare Workers. Main app routes live in `app/`; public bilingual pages are handled by `app/[locale]`, admin screens by `app/admin`, and API routes by `app/api`. The 12 selectable portfolio designs are in `app/_designs/<design>/`, each with its own landing component, `Project.tsx`, and CSS module. Shared UI lives in `app/_components` and shadcn-style primitives live in `components/ui`. Content models, defaults, and validation are in `lib/site-content.ts`; Cloudflare/D1 helpers are in `lib/data.ts`. Static assets are stored in `public/`; tests are in `tests/`.

## Build, Test, and Development Commands

Use Node.js 22+.

```bash
npm install          # install dependencies
npm run dev          # start local Vinext dev server
npm run lint         # run ESLint, excluding build output
npm test             # build, then run node:test suites
npm run build        # production build
npm run deploy       # build and deploy with Wrangler
npm run cf:types     # regenerate Cloudflare worker types
```

For local secrets, copy `.dev.vars.example` to `.dev.vars`. Never commit `.dev.vars`.

## Coding Style & Naming Conventions

Use TypeScript, React function components, and CSS Modules for design-specific styling. Keep route-level server components server-rendered; add `"use client"` only to small interactive components that need Framer Motion, browser APIs, or hooks. Design folders use kebab-case (`arabic-geometry`), components use PascalCase (`ArabicGeometry.tsx`), and shared helpers use descriptive camelCase. Prefer clear semantic markup, accessible links/buttons, visible focus states, and RTL-aware logical CSS properties (`margin-inline`, `inset-inline`).

## Testing Guidelines

Tests use Node’s built-in test runner in `tests/*.test.mjs`. Add or update tests when changing design registry counts, route behavior, content validation, admin protection, image migration, or Cloudflare bindings. Run `npm test` before pushing; it performs a production build first, so failures often catch both TypeScript and routing issues.

## Commit & Pull Request Guidelines

Recent commits use concise imperative messages, for example `Keep twelve distinct portfolio designs` or `Improve portfolio readability and proof component`. Keep commits focused and include generated/deleted design files together with registry/test updates. Pull requests should include a short summary, testing results (`npm run lint`, `npm test`), screenshots for UI changes, and notes for Cloudflare/D1/R2 behavior when relevant.

## Security & Configuration Tips

Production admin access depends on `ADMIN_EMAIL` in `wrangler.jsonc` and `ADMIN_PASSWORD` as a Wrangler secret. Do not commit passwords, API keys, Cloudflare tokens, or local environment files. Admin mutations must remain server-protected and limited to the configured owner account.
