# Khalid — Business Growth & Automation

Independent bilingual portfolio and CMS for Khalid Mohamad. It includes thirty-two
complete visual directions, English and Arabic layouts, persistent content in
Cloudflare D1, image uploads in R2, and a password-protected admin workspace.

The repository has no ChatGPT authentication or hosting dependency. It can be
stored on GitHub and deployed directly to Cloudflare Workers.

## What is included

- Public routes: `/en`, `/ar`, and design previews `/1` through `/32`.
- Thirty-two independent landing pages and matching project-detail layouts.
- Bilingual alt text and optional captions for every project image.
- Desktop and mobile portrait focal-point controls in the admin workspace.
- Published case studies: `/:locale/projects/:slug`, with matching numbered-design previews.
- Admin workspace: `/admin`.
- Content, projects, galleries, links, metrics, and active design stored in D1.
- Media files stored in R2.
- Independent email/password admin authentication using an encrypted,
  HttpOnly session cookie.
- Automatic deployment from GitHub Actions.

## Local development

Requirements: Node.js 22+ and npm.

```bash
npm install
cp .dev.vars.example .dev.vars
npm run dev
```

Localhost opens the admin workspace without requiring a password. Production
always requires `ADMIN_PASSWORD` and refuses access if it is missing or shorter
than 12 characters.

Useful checks:

```bash
npm run lint
npm test
npm run cf:types
```

## First Cloudflare deployment

1. Create a Cloudflare account and authenticate Wrangler:

   ```bash
   npx wrangler login
   ```

2. The bindings in `wrangler.jsonc` use Cloudflare automatic resource
   provisioning for the D1 database and R2 bucket. Build and deploy once:

   ```bash
   npx wrangler secret put ADMIN_PASSWORD
   npm run deploy
   ```

3. Open the generated `workers.dev` URL. Visit `/admin` and sign in with:

   - Email: `saim.goodm@gmail.com`
   - Password: the value saved in `ADMIN_PASSWORD`

The CMS creates its required D1 tables on first use. A custom domain can be
connected later from the Cloudflare dashboard.

## GitHub and manual deployment

The project can be stored on GitHub without connecting the repository to
Cloudflare. Every push runs the build and tests through
`.github/workflows/deploy.yml`, but publishing remains a deliberate local step:

```bash
npx wrangler login
npm run deploy
```

Set `ADMIN_PASSWORD` with `npx wrangler secret put ADMIN_PASSWORD` whenever the
admin password needs to be created or changed. Never commit `.dev.vars`,
passwords, API tokens, or account credentials.

## Changing the admin email

Edit `ADMIN_EMAIL` in `wrangler.jsonc`, then deploy again. Changing
`ADMIN_PASSWORD` invalidates existing admin sessions automatically.
