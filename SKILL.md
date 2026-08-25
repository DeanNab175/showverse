---
name: showverse-skills
description: Best practices for building and extending the Showverse portfolio app using Next.js (App Router), React, Tailwind CSS, GSAP, and — for its data layer — Prisma + PostgreSQL, plus its built-in admin CMS (shadcn/ui + React Hook Form + Zod + Server Actions). Use this skill whenever working on the Showverse codebase, or on any similar Next.js + React + Tailwind + GSAP animated portfolio/site — including adding new pages or sections, building or refactoring components, writing or fixing animations, styling with Tailwind, restructuring folders, reviewing code for cleanliness and maintainability, or working on the app's backend/database (Prisma schema design, data-access patterns, seed data) or its admin CRUD forms. Trigger this whenever the user mentions Showverse, asks to add a new animated section, build a component, wire up scroll animations, clean up file structure, improve component architecture, add or change an admin form, or touch the database/Prisma layer in this project — even if they don't say "showverse-skills" explicitly.
---

# Showverse Skills

Guidelines for building and extending the Showverse portfolio app: a Next.js (App Router) + React + Tailwind CSS + GSAP animated site, backed by Prisma + PostgreSQL for its data layer, with a built-in admin CMS at `/admin` (NextAuth-gated, shadcn/ui + React Hook Form + Zod forms submitting to Server Actions). Apply these whenever adding features, components, styles, animations, database/data-access code, or admin CRUD sections to keep the codebase clean, consistent, and maintainable.

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
- Use `layout.tsx` for shared chrome (nav, footer, providers) and `loading.tsx`/`error.tsx` for route-level states where relevant — but at the **route-group** level, not the root: in this repo the public shell lives in `(site)/layout.tsx` and the admin shell in `admin/(protected)/layout.tsx`, while the root layout stays bare (see File structure).
- Prefer `next/image` for images and `next/font` for fonts over manual `<img>`/`<link>` tags.

## File structure

```
src/
  app/
    layout.tsx               # bare root shell: fonts, dark-mode script, Providers — NO nav/grid
    (site)/                  # public route group
      layout.tsx             # public shell: background, grid, NavbarComponent, header/footer
      page.tsx, about/, portfolio/, skills/, contact/
    admin/
      login/page.tsx         # pre-auth screen, deliberately outside the admin shell
      (protected)/
        layout.tsx           # auth gate + admin shell (AdminSidebarNav, sign-out)
        <section>/           # one folder per domain: page.tsx + *-form.tsx + actions.ts
    api/                     # route handlers (auth, admin upload, media)
  components/
    ui/                      # shadcn/ui primitives (button, input, textarea, select, checkbox, form, label)
    admin/                   # admin-only shared widgets (admin-sidebar-nav, image-upload-field, delete-button, animations-json-fields)
    sections/, contents/, navbar-component/, page-layout/, typography/, ...
  lib/
    prisma.ts                # PrismaClient singleton
    schemas/                 # Zod schemas shared by client forms and Server Actions
    auth.ts / auth.config.ts # NextAuth, split so middleware stays Prisma/bcrypt-free (edge-safe)
    gsap.ts, utils.ts, mappers/
  constants/                 # legacy static content — now only feeds prisma/seed.ts
prisma/
  schema.prisma, migrations/, seed.ts, create-admin.ts
```

Match this structure when adding new areas. Two ownership rules matter most:

- **The root layout stays bare.** The public sidebar/grid shell belongs to `(site)/layout.tsx`; the admin shell belongs to `admin/(protected)/layout.tsx`. Putting shared chrome back into the root layout leaks it into every route group.
- **Admin domains are self-contained.** Each `admin/(protected)/<section>/` folder owns its list/edit pages, its form component(s), and its `actions.ts` — don't centralize actions or forms across domains.

## Component architecture

- **One component, one responsibility.** A `Hero` component renders hero content; it doesn't also own scroll-triggered animation for the whole page below it.
- **Props for variation, not duplication.** E.g. a single `Button` with `variant="primary" | "ghost"` rather than `PrimaryButton` and `GhostButton`.
- **Composition over configuration.** Prefer children/slots (`<Card><Card.Title/></Card>`) for flexible layouts over components with dozens of boolean props.
- **Colocate small pieces**, split when a file exceeds ~150–200 lines or mixes unrelated concerns.
- Name files and components consistently: `PascalCase` for component files (`ProjectCard.tsx`), `camelCase` for hooks/utils (`useScrollReveal.js`).

## Tailwind CSS best practices

- Prefer Tailwind utility classes directly in JSX; avoid custom CSS unless Tailwind genuinely can't express it (complex keyframes, GSAP-driven inline styles are fine to leave un-styled by Tailwind).
- Extract repeated utility clusters into small components, not `@apply` soup — e.g. a `Button` component rather than repeating the same 8 classes everywhere.
- Use the design tokens defined in `src/app/globals.css` (Tailwind v4 — there is no `tailwind.config.js`; tokens live in the `@theme inline` block: `bg-surface-bg`, `bg-page-bg`, `text-body-txt`, `text-primary`, custom text sizes like `text-xs-plus`/`text-sm-plus`, the radius scale) instead of arbitrary values (`text-[17px]`) except for one-off cases.
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

**Status:** Implemented. Site content (home, about, portfolio, skills/services, navbar links, social links, settings, page metadata) lives in PostgreSQL (Neon), accessed via Prisma and editable through the admin CMS. The old static exports under `src/constants/**` remain only as input for `prisma/seed.ts` — new content changes go through the database, not those files.

- **One Prisma Client singleton** at `src/lib/prisma.ts`, cached on `globalThis` in development to survive hot-reload without exhausting connections. Never `new PrismaClient()` inside a component or route handler.
- **Fetch in Server Components.** Pages and layouts call `prisma.*` directly (e.g. `(site)/layout.tsx` loads navbar links; each admin page loads its own rows). Don't add REST/GraphQL endpoints for data only this app consumes — the only Route Handlers are for auth, media, and the admin upload endpoint.
- **Zod schemas in `src/lib/schemas/`** are the single source of truth for each domain's input shape. The same schema powers client-side validation (via `zodResolver`) and server-side `safeParse` inside the Server Action — never trust client input, always re-parse on the server.
- **Mutations are Server Actions** colocated in each admin section's `actions.ts` (see the Admin CMS section below for the exact form/action contract). After a successful write, call `revalidatePath()` for both the affected public page and the admin page, then `redirect()`.
- **Migrations over manual schema edits.** `prisma migrate dev` locally, `prisma migrate deploy` in CI/production. The build script runs `prisma generate` first so CI always has a generated client.
- **Auth split.** `src/lib/auth.config.ts` holds the edge-safe NextAuth config used by the middleware; `src/lib/auth.ts` adds the Prisma/bcrypt credential logic. Keep Prisma imports out of anything the middleware bundles.
- **Env vars** are documented in `.env.example` (`DATABASE_URL`, `AUTH_SECRET`, `AUTH_TRUST_HOST`, `ADMIN_EMAIL`/`ADMIN_PASSWORD` for the one-off `pnpm admin:create` script). Image uploads use Netlify Blobs, which is only available under `netlify dev` locally.
- **See `prisma-database-setup` skill** (`.agents/skills/prisma-database-setup/SKILL.md`) for PostgreSQL-specific connection string format, client generation, and troubleshooting — this file only covers how Prisma is wired into Showverse's structure, not Prisma mechanics generally.

## Admin CMS & forms

The admin CMS lives at `/admin` (NextAuth-gated via `admin/(protected)/layout.tsx`). Forms are built from the shadcn/ui primitives in `src/components/ui/` with React Hook Form + `zodResolver`, submitting typed objects to Server Actions.

**The form ↔ action contract (follow this exactly for every new form):**

- Server Actions take `(prevState: unknown, data: TypedInput)` where `TypedInput` comes from the domain's Zod schema (`z.infer`), plus any bound id params first (e.g. `updateProject(id, prevState, data)` bound with `.bind(null, id)` in the page).
- Forms wire the action through `useActionState`, and dispatch **inside a transition**:

  ```tsx
  const [state, formAction, isActionPending] = useActionState(action, undefined);
  const [isDispatching, startTransition] = useTransition();
  const isPending = isActionPending || isDispatching;

  const onSubmit = form.handleSubmit((data) => {
    startTransition(() => {
      formAction(data);
    });
  });
  ```

  Server-returned errors render from `state?.error`; field-level Zod errors render via `<FormMessage />`.
- **Never replace this with a bare `useTransition` that manually `await`s the action.** That pattern's `isPending` window ends before Next.js finishes the post-`redirect()` revalidation, so a second save made within ~1–2s silently persists the *previous* submission's data (a real bug that was found and fixed this way). `useActionState` keeps `isPending` true through the whole action + redirect + refresh cycle; calling `formAction` outside `startTransition` breaks that tracking and triggers a React warning.
- JSON-blob fields (animations, paragraph arrays, view-page links) stay as raw strings in the form (extend the domain schema locally with `z.string()` fields like `entryAnimationsJson`) and are parsed server-side by the existing `parseAnimationsJson`/`parse*Json` helpers.
- For schemas using `z.coerce` (numeric heading levels etc.), type the form with both generics: `useForm<z.input<typeof formSchema>, unknown, z.output<typeof formSchema>>`.

**Component conventions:**

- **shadcn primitives are retokenized, not stock.** When generating a new component with `pnpm dlx shadcn@latest add <name>`, swap its stock tokens for the site's semantic ones (`bg-surface-bg`, `bg-page-bg`, `text-body-txt`, `ring-primary`, `text-body-txt/60`) the way `button.tsx`, `input.tsx`, and `select.tsx` already do. Never overwrite the existing customized `button.tsx`.
- Inputs/textareas/select triggers support `surface="nested"` (`bg-page-bg`) for fields inside an already-`bg-surface-bg` group panel; default is `bg-surface-bg`.
- `ImageUploadField` is a controlled `value`/`onChange` component — wrap it in an RHF `<Controller>`; it handles the upload POST internally and hands back the URL.
- `AnimationsJsonFields` reads the form via `useFormContext()` — it must be rendered inside `<Form {...form}>`.
- Enum-like fields (e.g. a CTA's Button variant) use a real `<Select>` populated from the actual source of truth (the `ButtonVariant` type), never a free-text input with a placeholder hint.
- **Layouts never define their own Server Actions.** A layout-level action can collide with a nested page's action and misfire — keep actions in page-level `actions.ts` files only.
- Admin pages use the shared `Heading` component with the site's type scale (`text-2xl font-extrabold text-primary` for page titles, `text-xl font-medium` for sub-headings) and the shared `Button` (`asChild` + `Link` for "Add X" links) — no hand-rolled button class strings.

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
- [ ] If touching data: is the query in a Server Component using the `src/lib/prisma.ts` singleton, and does the mutation re-validate with the domain's Zod schema server-side?
- [ ] If touching an admin form: does it follow the `useActionState` + `startTransition(() => formAction(data))` contract (not a manually-awaited action), and does the action end with `revalidatePath` + `redirect`?
- [ ] If adding a UI primitive: is it a shadcn component retokenized to the site's semantic tokens, placed in `src/components/ui/`?
- [ ] Are Server Actions kept in page-level `actions.ts` files, never in layouts?

## Workflow for adding a new section/feature

1. Identify whether it's a new route, a new section within an existing page, or a reusable primitive — place it accordingly per the folder structure.
2. Sketch the component boundary: what's static/server-rendered vs what needs to be a Client Component for animation.
3. Build the static markup first with Tailwind, matching existing design tokens.
4. Layer in GSAP animation via `useGSAP` + `ScrollTrigger` (or the shared `useScrollReveal` hook if one exists), scoped to a ref.
5. Verify cleanup (no duplicate ScrollTriggers on fast refresh/route change) and check `prefers-reduced-motion` behavior.
6. Confirm the component is reusable/extensible, not a one-off copy of similar existing code.
