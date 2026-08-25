# ShowVerse

A portfolio site with a built-in admin CMS. Public pages are rendered from a PostgreSQL database, and every section (home, about, portfolio, skills/services, navigation, metadata) is editable from `/admin` without a code deploy.

**Stack:** Next.js (App Router) · React 19 · Tailwind CSS v4 · GSAP · Prisma + PostgreSQL (Neon) · NextAuth (Auth.js) · shadcn/ui + React Hook Form + Zod · Netlify Blobs (image uploads)

## Getting started

This repo uses **pnpm** (there is a `pnpm-lock.yaml`; `npm install` is not supported).

```bash
pnpm install
```

### 1. Environment

Copy the example env file and fill it in ([.env.example](.env.example) documents each variable):

```bash
cp .env.example .env
```

- `DATABASE_URL` — Postgres connection string (Neon)
- `AUTH_SECRET` — generate with `npx auth secret`
- `AUTH_TRUST_HOST` — `"true"` (required in production mode and on Netlify)
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — only read by the one-off admin-creation script below

### 2. Database

```bash
pnpm exec prisma generate        # generate the Prisma client
pnpm exec prisma migrate deploy  # apply migrations
pnpm exec tsx prisma/seed.ts     # optional: seed content from src/constants/**
pnpm admin:create                # create the admin user from ADMIN_EMAIL/ADMIN_PASSWORD
```

### 3. Run

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) for the site, or [http://localhost:3000/admin](http://localhost:3000/admin) for the CMS (redirects to `/admin/login`).

> **Image uploads** (project thumbnails, skill icons, photos) go through Netlify Blobs, which plain `next dev` doesn't have access to. To test uploads locally, run `netlify link` once and then use `npx netlify dev` instead of `pnpm dev`. Everything else works fine without it.

## Scripts

| Command | What it does |
|---|---|
| `pnpm dev` | Dev server (Turbopack) |
| `pnpm build` | `prisma generate` + production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | ESLint |
| `pnpm admin:create` | Create/update the admin user from `.env` credentials |

## Project layout

- `src/app/(site)/` — public pages and the public shell (sidebar nav, header/footer)
- `src/app/admin/` — the CMS: login page plus `(protected)/` CRUD sections, each with its `page.tsx`, form component, and `actions.ts` (Server Actions)
- `src/components/ui/` — shadcn/ui primitives restyled to the site's design tokens
- `src/lib/schemas/` — Zod schemas shared by client-side form validation and Server Actions
- `prisma/` — schema, migrations, seed and admin-creation scripts

Conventions and deeper guidance live in [SKILL.md](SKILL.md).
