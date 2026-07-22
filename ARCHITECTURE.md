# Architecture

## What

This document defines the **layered folder architecture** for Student Hub: where code lives, what each layer owns, and how features will grow without turning into a flat, unmaintainable tree.

The layout is inspired by **Feature-Sliced Design (FSD)** — adapted for a Next.js App Router project where `src/app/` remains the routing entry point mandated by the framework.

## Why

Academic platforms combine several distinct capabilities — browsing catalogs, full-text search, file upload, user history — that share types and UI primitives but should not be tangled in one directory. Explicit layers make it obvious where new code belongs and reduce merge conflicts as the codebase scales.

## Alternatives

| Alternative | When it fits | Limitation for Student Hub |
|-------------|--------------|----------------------------|
| **Flat `components/` + `lib/`** | Tiny apps, ≤10 components | Search, upload, and browse logic interleave quickly |
| **Domain-Driven Design modules** | Large teams, bounded contexts | Heavier ceremony than needed at learning stage |
| **Colocation by route only** | Route-centric CRUD apps | Shared entities (Resource, Course) get duplicated per route |
| **Micro-frontends** | Independent deployable teams | Overkill for a single Next.js app |

## Trade-offs

| Decision | Benefit | Cost |
|----------|---------|------|
| FSD-inspired layers | Predictable imports, clear feature boundaries | More directories; requires discipline on import direction |
| `app/` for routing only (ideal) | Framework convention, SEO-friendly pages | Temptation to put business logic in page files — avoid this |
| `shared/` for cross-cutting code | One place for types, hooks, constants | Can become a junk drawer if everything is dumped there |
| Empty `infra/` and `processes/` now | Room for DB/S3/auth without restructuring | Dead folders until later phases |

### Import direction (target rule)

```
app → widgets, features, entities, shared
widgets → features, entities, shared
features → entities, shared
entities → shared
shared → (no upward imports)
infra → shared (and external SDKs)
processes → features, entities, shared
```

Pages in `app/` should **compose** widgets and features, not implement business rules inline.

## Layer reference

### `src/app/`

**What:** Next.js App Router — `layout.tsx`, `page.tsx`, route segments, global CSS.

**Why:** Framework-mandated routing and document shell. Keeps URL structure co-located with page entry points.

**If skipped:** No application shell; Next.js cannot serve pages.

---

### `src/features/`

**What:** User-facing capabilities grouped by action.

| Feature | Purpose |
|---------|---------|
| `browse/` | Program and resource catalog browsing |
| `search/` | Query UI and search result presentation |
| `upload/` | Resource submission flow |

**Why:** Each feature can evolve independently (components, data loaders, hooks) without polluting unrelated areas.

**If skipped:** Homepage and future routes become god-files mixing search, upload, and browse concerns.

---

### `src/entities/`

**What:** Domain models and entity-specific UI — e.g. `Course`, `Resource`, `Program`.

**Why:** Shared nouns used across features. A `ResourceCard` belongs near the `Resource` entity, not inside `features/search/`.

**If skipped:** Duplicate type definitions and inconsistent resource shapes across features.

---

### `src/widgets/`

**What:** Composed UI blocks used across pages — Navbar, Footer, Hero, page-level sections.

**Why:** Widgets orchestrate entities and features into coherent page regions without owning business rules.

**If skipped:** Every page reimplements header/footer/hero markup.

---

### `src/shared/`

**What:** Cross-cutting, feature-agnostic code.

| Subfolder | Contents (future) |
|-----------|-------------------|
| `components/` | Generic UI (Button, Input) |
| `constants/` | App-wide constants |
| `config/` | Environment-backed config |
| `lib/` | Pure utilities |
| `hooks/` | Generic React hooks |
| `types/` | Shared TypeScript types |

**Why:** Prevents circular imports between features; single source for primitives.

**If skipped:** Utilities copied into every feature; types diverge.

---

### `src/infra/`

**What:** External system adapters — Prisma client, S3 client, email, etc. *(not configured yet)*

**Why:** Isolates third-party SDKs from UI and domain logic. Swapping S3 for another provider touches one folder.

**If skipped:** AWS and database calls leak into React components — untestable and hard to mock.

---

### `src/processes/`

**What:** Cross-cutting user flows spanning multiple features — authentication session, onboarding. *(not configured yet)*

**Why:** Auth affects browse, upload, and search; a process layer avoids duplicating session handling.

**If skipped:** Auth logic duplicated in every feature route guard.

## Homepage composition (current phase)

`src/app/page.tsx` defines **layout sections only**:

1. Navbar placeholder
2. Hero
3. Search (UI shell)
4. Popular Courses
5. Recently Uploaded
6. Recently Opened
7. Footer placeholder

Each section documents:

- **Why** the section exists
- **Which components** will be added (`widgets/` or `features/`)
- **Which React concepts** you will practice

No reusable components or state exist yet — by design.

## Future integration points (not built)

| Phase | Layer | Technology |
|-------|-------|------------|
| Data persistence | `infra/` | PostgreSQL, Prisma |
| File storage | `infra/` | AWS S3 |
| REST/GraphQL API | `infra/` or separate service | Express.js |
| Validation | `shared/lib/` | Zod schemas |
| Auth | `processes/` | TBD |

## What happens if we skip this architecture

- Features import from each other arbitrarily → circular dependencies and broken builds.
- Business logic lives in `page.tsx` → untestable pages and painful refactors when adding API routes.
- Infrastructure code in components → cannot run UI tests without real AWS/DB credentials.
- New contributors (or future you) cannot tell where upload vs search code belongs → slower development and bug regressions.

## Related documents

- [README.md](./README.md) — Project overview and setup
- [PROJECT_HISTORY.md](./PROJECT_HISTORY.md) — What was installed and when
- [JARVIS_PROTOCOL.md](./JARVIS_PROTOCOL.md) — AI collaboration boundaries
