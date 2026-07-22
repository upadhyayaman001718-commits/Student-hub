# Student Hub

## What

Student Hub is an academic resource platform where students browse, search, upload, and download study materials — Notes, PYQs (Previous Year Questions), Lab Manuals, Assignments, and related resources.

This repository contains the **frontend foundation** for that platform: a Next.js App Router application with TypeScript, Tailwind CSS, ESLint, Prettier, and a scalable folder architecture. At this stage, the homepage has initial layouts, mock data hooks, and search filters wired up, with several key components and interactive states ready for hands-on learning.

## Why

Students often lack a single, organized place to find course-specific material. A dedicated hub reduces fragmentation across chat groups, drives, and ad-hoc folders. Starting with a clean, documented boilerplate lets development focus on learning React concepts incrementally rather than fighting setup debt.

## Alternatives

| Approach | Description |
|----------|-------------|
| **Monolithic CRA/Vite SPA** | Single client bundle; simpler initially but weaker SEO and no built-in routing conventions for a content-heavy browse experience. |
| **Pages Router (Next.js)** | Mature, but App Router is the current default and better aligns with React Server Components for future data fetching. |
| **No formal architecture** | Faster first commit, but features collide as upload, search, and browse grow. |
| **Full-stack from day one** | PostgreSQL, Prisma, S3, and Express wired immediately — higher cognitive load before UI fundamentals are solid. |

## Trade-offs

- **App Router + TypeScript + Tailwind**: Industry-standard stack with strong typing and utility-first styling. Cost: learning curve for App Router boundaries (server vs client components) later.
- **Feature-Sliced Design–inspired layout** (`features/`, `entities/`, `widgets/`, `shared/`): Clear ownership boundaries. Cost: more folders upfront than a flat `components/` tree.
- **Deferred backend (DB, S3, auth)**: Keeps the learning scope on React and layout. Cost: no real data until those phases are integrated.
- **Ongoing homepage construction**: Basic cards, state, and mock filters are configured, but complete routing, custom widgets, and full page integrations are designed for you to practice React fundamentals.

## What happens if we skip it

Without this foundation:

- No consistent path aliases (`@/*`) or lint/format pipeline → import chaos and style drift.
- No documented architecture → duplicate components and unclear where search vs upload logic lives.
- No section scaffold → harder to practice `map()`, props, and `useState` in realistic page context.
- Premature database/S3 setup → distraction from core React skills and longer feedback loops.

## Tech stack (current phase)

| Layer | Technology | Status |
|-------|------------|--------|
| Framework | Next.js 16 (App Router) | Configured |
| UI | React 19, TypeScript | Configured |
| Styling | Tailwind CSS 4 | Configured |
| Quality | ESLint, Prettier | Configured |
| Path aliases | `@/*` → `./src/*` | Configured |
| Database | PostgreSQL + Prisma | **Not yet** |
| Storage | AWS S3 | **Not yet** |
| API | Express.js | **Not yet** |
| Validation | Zod | **Not yet** |
| Auth | — | **Not yet** |

## Project structure

```
src/
├── app/                 # Next.js routes, layout, global styles
├── features/            # User-facing capabilities (browse, search, upload)
├── entities/            # Domain models (Course, Resource, User)
├── widgets/             # Composed UI blocks (Navbar, Footer, Hero)
├── shared/              # Reusable utilities, types, hooks, config
├── infra/               # External integrations (DB, S3 — later)
└── processes/           # Cross-cutting flows (auth session — later)
```

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script | Purpose |
|--------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run lint` | Run ESLint |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting without writing |

## Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) — Layer responsibilities and design decisions
- [PROJECT_HISTORY.md](./PROJECT_HISTORY.md) — Chronological setup and change log
- [JARVIS_PROTOCOL.md](./JARVIS_PROTOCOL.md) — AI assistant collaboration rules for this repo

## Learning ownership

The following are **reserved for you to implement and expand**:

- Advanced reusable controls (`FormInput`, `FormSelect`, custom widgets like Navbar/Footer)
- State synchronization, local storage tracking (e.g. Recently Opened)
- Complex routing, dynamic details routes, API backend routing
- Backend integration (Database, S3 upload, auth logic)

See TODO comments in `src/app/page.tsx` for section-by-section guidance.
