---
name: showverse-skills
description: Best practices for building and extending the Showverse portfolio app using Next.js (App Router), React, Tailwind CSS, GSAP, and — for its data layer — Prisma + PostgreSQL. Use this skill whenever working on the Showverse codebase, or on any similar Next.js + React + Tailwind + GSAP animated portfolio/site — including adding new pages or sections, building or refactoring components, writing or fixing animations, styling with Tailwind, restructuring folders, reviewing code for cleanliness and maintainability, or working on the app's backend/database (migrating `src/constants/data` into Postgres via Prisma, schema design, data-access patterns). Trigger this whenever the user mentions Showverse, asks to add a new animated section, build a component, wire up scroll animations, clean up file structure, improve component architecture, or touch the database/Prisma layer in this project — even if they don't say "showverse-skills" explicitly.
---

# Showverse Skills

Guidelines for building and extending the Showverse portfolio app: a Next.js (App Router) + React + Tailwind CSS + GSAP animated site, backed by Prisma + PostgreSQL for its data layer. Apply these whenever adding features, components, styles, animations, or database/data-access code to keep the codebase clean, consistent, and maintainable.

## Related project skills

This project has additional skills installed under `.agents/skills/`. Defer to them for API-level/authoritative detail; use this file for how those tools should be applied *within Showverse's* conventions.

| Skill | Path | Consult for |
|---|---|---|
| `gsap-core` | `.agents/skills/gsap-core/SKILL.md` | Core tween API — `gsap.to/from/fromTo`, easing, stagger, `matchMedia()` |
| `gsap-react` | `.agents/skills/gsap-react/SKILL.md` | `useGSAP()` hook, refs, `gsap.context()`, cleanup on unmount |
| `gsap-scrolltrigger` | `.agents/skills/gsap-scrolltrigger/SKILL.md` | Scroll-linked animation, pinning, scrub, trigger config |
| `gsap-timeline` | `.agents/skills/gsap-timeline/SKILL.md` | `gsap.timeline()`, position parameter, sequencing/choreography |
| `gsap-performance` | `.agents/skills/gsap-performance/SKILL.md` | Avoiding layout thrash, transform-only animation, jank/FPS issues |
| `nextjs-app-router-patterns` | `.agents/skills/nextjs-app-router-patterns/SKILL.md` | Server Components, streaming, data fetching, App Router architecture |
| `tailwind-css-patterns` | `.agents/skills/tailwind-css-patterns/SKILL.md` | Utility-first layout, responsive/state variants, design-system patterns |
| `prisma-database-setup` | `.agents/skills/prisma-database-setup/SKILL.md` | Prisma provider config (PostgreSQL), client setup, connection/env handling |

If a rule below conflicts with one of these, prefer the more specific installed skill for the mechanics and use this file for where/how it fits in Showverse's structure.

## Core principles

1. **Component-first architecture.** Every distinct UI concern is its own component. Avoid god-components that mix layout, data, and animation logic.
2. **Reusability over duplication.** Before writing a new component, check if an existing one can be extended with props/variants instead.
3. **Separation of concerns.** Keep animation logic, layout markup, and data/content separate — don't tangle GSAP calls into deeply nested JSX.
4. **Predictability.** Follow the same patterns everywhere (naming, folder placement, prop shapes) so any file is easy to find and extend.

## Next.js (App Router) conventions

- Use the `/app` directory with route segments as folders (`app/about/page.tsx`, `app/projects/[slug]/page.tsx`).
- Default to **Server Components**. Only add `"use client"` to components that need browser APIs, hooks (`useState`, `useEffect`, `useRef`), or GSAP — since GSAP requires the DOM, any component that drives animation is a Client Component.
- Keep Server/Client boundaries tight: a page can be a Server Component that renders a small Client Component wrapper for the animated part, rather than making the whole page client-side.
- Co-locate route-specific components in the route folder (`app/projects/_components/`) and keep truly shared components in a top-level `components/` directory.
- Use `layout.tsx` for shared chrome (nav, footer, providers) and `loading.tsx`/`error.tsx` for route-level states where relevant.
- Prefer `next/image` for images and `next/font` for fonts over manual `<img>`/`<link>` tags.

## Suggested file structure

```
app/
  layout.tsx
  page.tsx
  <route>/
    page.tsx
    _components/          # route-specific components
components/
  ui/                      # small reusable primitives (Button, Badge, Card)
  sections/                 # page sections (Hero, ProjectGrid, Footer)
  animations/                # animation wrapper components (e.g. RevealOnScroll)
hooks/
  useGsapContext.js         # shared GSAP setup hooks
lib/
  gsap.js                   # gsap.registerPlugin(...) config, run once
  db/                        # Prisma client singleton + data-access functions (see below)
  utils.js
constants/
  data/                      # static content today; migrating into the DB (see Backend & Database)
prisma/
  schema.prisma              # Prisma schema (models mirroring constants/data shapes)
  migrations/
styles/
  globals.css
public/
```

Adapt to what already exists in the repo — match existing structure rather than imposing this wholesale, but nudge toward it when adding new areas.

## Component architecture

- **One component, one responsibility.** A `Hero` component renders hero content; it doesn't also own scroll-triggered animation for the whole page below it.
- **Props for variation, not duplication.** E.g. a single `Button` with `variant="primary" | "ghost"` rather than `PrimaryButton` and `GhostButton`.
- **Composition over configuration.** Prefer children/slots (`<Card><Card.Title/></Card>`) for flexible layouts over components with dozens of boolean props.
- **Colocate small pieces**, split when a file exceeds ~150–200 lines or mixes unrelated concerns.
- Name files and components consistently: `PascalCase` for component files (`ProjectCard.tsx`), `camelCase` for hooks/utils (`useScrollReveal.js`).

## Tailwind CSS best practices

- Prefer Tailwind utility classes directly in JSX; avoid custom CSS unless Tailwind genuinely can't express it (complex keyframes, GSAP-driven inline styles are fine to leave un-styled by Tailwind).
- Extract repeated utility clusters into small components, not `@apply` soup — e.g. a `Button` component rather than repeating the same 8 classes everywhere.
- Use the `tailwind.config.js` theme (colors, spacing, fontFamily) for design tokens instead of arbitrary values (`text-[17px]`) except for one-off cases.
- Use responsive (`md:`, `lg:`) and state (`hover:`, `group-hover:`) variants over manual media queries or JS-based conditionals.
- Keep class lists readable: group by layout → spacing → typography → color → effects. For long lists, consider `clsx`/`cn()` helpers to keep conditional classes clean.

## GSAP best practices

- Centralize plugin registration once (e.g. `lib/gsap.js`): register `ScrollTrigger` and any other plugins (`SplitText`, `Draggable`, etc.) a single time, guarded so it doesn't re-run on every render.
- Always animate inside `useGSAP()` (from `@gsap/react`) or a `useEffect` combined with `gsap.context()`, scoped to a `ref` on the container — this ensures animations are cleaned up on unmount and scoped by selector text so they don't leak across components.
- **Always clean up.** Revert the GSAP context (`ctx.revert()`) or let `useGSAP()` handle it — critical in Next.js due to fast refresh and route transitions creating duplicate ScrollTriggers otherwise.
- Prefer `gsap.timeline()` for sequenced animations over multiple chained `.to()` calls, for readability and easier control (pause/reverse/replay).
- For scroll-based reveals, use `ScrollTrigger` with sensible defaults (`start: "top 80%"`, `toggleActions` tuned to intent) rather than reinventing scroll-position math manually.
- Keep animation definitions near the component they animate (co-located in the client component or a small `animations/` helper), not scattered in a monolithic global animation file — unless truly shared (e.g. a reusable `RevealOnScroll` wrapper).
- Respect `prefers-reduced-motion`: guard animations or use GSAP's `matchMedia()` to provide a reduced/no-motion variant.
- Avoid animating layout-triggering CSS properties (`width`, `top`, `left`) when `transform`/`opacity` will do — better performance, smoother frame rate.
- Kill/pause ScrollTriggers correctly on route change in the App Router (Next.js doesn't full-reload between routes, so stale triggers are a common bug) — refresh or revert them in a cleanup effect tied to the route.

## Reusable animation patterns

- Build small, composable animation wrapper components (e.g. `<RevealOnScroll>`, `<StaggerChildren>`) that accept children and animation config as props, rather than duplicating the same GSAP setup in every section.
- Prefer a shared hook (`useScrollReveal(ref, options)`) that wraps the common `useGSAP` + `ScrollTrigger` pattern, so individual components stay declarative.

## Backend & Database (Prisma + PostgreSQL)

**Status:** Not yet implemented. All content today lives as static TypeScript exports in `src/constants/data/` (`about.ts`, `home.ts`, `metadata.ts`, `portfolio.ts`, `skills.ts`). The plan is to migrate this content into a PostgreSQL database accessed via Prisma, so content can change without a code deploy. This section defines the target conventions for *when that work happens* — don't start the migration unprompted.

- **Schema mirrors existing types.** Model `prisma/schema.prisma` fields after the corresponding `src/types/*-types.ts` shapes (`about-data-types.ts`, `portfolio-data-types.ts`, `skills-data-types.ts`, `experience-types.ts`, `hobby-types.ts`) so the migration is a faithful 1:1 move, not a redesign. Reconcile any drift between a `constants/data` file and its type explicitly, don't silently change shape.
- **One Prisma Client singleton.** Instantiate `PrismaClient` once in `lib/db/client.ts`, cached on `globalThis` in development to survive Next.js hot-reload without exhausting connections. Never `new PrismaClient()` inside a component or route handler.
- **Data-access layer, not raw Prisma in components.** Wrap queries in small functions under `lib/db/` (e.g. `getPortfolioProjects()`, `getAboutData()`) mirroring today's `constants/data` exports one-for-one, so call sites (`components/contents/*-content.tsx`, `app/(site)/**/page.tsx`) barely change during the migration — swap the import, not the call shape.
- **Fetch in Server Components.** Next.js Server Components can call the data-access layer directly (no API route needed) — keep this pattern rather than introducing REST/GraphQL endpoints for data only this app consumes. Only add a Route Handler if the data needs to be reached from a Client Component or an external caller.
- **Env vars.** `DATABASE_URL` (and `DIRECT_URL` if using connection pooling) belong in `.env`/`.env.local`, never committed; document required vars in `README.md` when the migration lands.
- **Migrations over manual schema edits.** Use `prisma migrate dev` for schema changes locally and `prisma migrate deploy` in CI/production — don't hand-edit the database or rely on `db push` outside prototyping.
- **See `prisma-database-setup` skill** (`.agents/skills/prisma-database-setup/SKILL.md`) for PostgreSQL-specific connection string format, client generation, and troubleshooting — this file only covers how Prisma should be wired into Showverse's structure, not Prisma mechanics generally.
- **Migrate incrementally.** Move one `constants/data` file at a time (its type, its Prisma model, its data-access function, its call sites) rather than a single big-bang cutover — keeps each step reviewable and revertible.

## When writing or reviewing code, check for

- [ ] Is this a Client Component only because it truly needs to be (hooks, GSAP, browser APIs)?
- [ ] Is GSAP scoped and cleaned up (`useGSAP`/`gsap.context` + revert)?
- [ ] Are plugins registered once, not per-component?
- [ ] Could this new component reuse/extend an existing one instead of duplicating?
- [ ] Is styling done with Tailwind utilities/theme tokens, not ad-hoc inline styles or magic numbers?
- [ ] Does the file live in the right place per the folder structure above?
- [ ] Is the component under ~150–200 lines and single-purpose?
- [ ] Are ScrollTriggers safe across Next.js route transitions?
- [ ] Is `prefers-reduced-motion` respected for non-trivial animations?
- [ ] If touching data: does it go through the `lib/db/` data-access layer (once the Prisma migration lands) rather than raw `PrismaClient` calls in components, and does the Prisma model still match its `src/types/*-types.ts` counterpart?

## Workflow for adding a new section/feature

1. Identify whether it's a new route, a new section within an existing page, or a reusable primitive — place it accordingly per the folder structure.
2. Sketch the component boundary: what's static/server-rendered vs what needs to be a Client Component for animation.
3. Build the static markup first with Tailwind, matching existing design tokens.
4. Layer in GSAP animation via `useGSAP` + `ScrollTrigger` (or the shared `useScrollReveal` hook if one exists), scoped to a ref.
5. Verify cleanup (no duplicate ScrollTriggers on fast refresh/route change) and check `prefers-reduced-motion` behavior.
6. Confirm the component is reusable/extensible, not a one-off copy of similar existing code.
