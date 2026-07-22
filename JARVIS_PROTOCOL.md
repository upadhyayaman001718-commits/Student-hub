# JARVIS Protocol

## What

JARVIS Protocol is the **collaboration contract** between you (Aman) and AI coding assistants (e.g. Cursor Agent) working on Student Hub. It defines what assistants may automate, what must remain your learning exercises, and how changes should be recorded.

## Why

You are learning React **by building** this project. Without explicit boundaries, assistants tend to implement components, hooks, and API logic — which removes the exact practice you need. This protocol keeps boilerplate and documentation automated while preserving hands-on learning.

## Alternatives

| Approach | Description |
|----------|-------------|
| **Full AI implementation** | Fastest path to a working app; minimal learning |
| **No AI assistance** | Maximum learning; slow setup and repetitive config |
| **Ad-hoc prompts each session** | Flexible but inconsistent; assistants repeat mistakes |
| **JARVIS Protocol (this doc)** | Structured split: AI does scaffolding, you do React logic |

## Trade-offs

- **Strict learning boundaries**: Slower feature delivery, deeper understanding of React.
- **Documented change log**: Slightly more overhead per session, but recoverable history after project loss.
- **Assistant reads protocol first**: Extra context token cost; fewer wrong implementations.

## Assistant permissions

### Allowed without asking

- Project scaffolding and dependency installation (within approved stack)
- Configuration files: ESLint, Prettier, Tailwind, TypeScript paths, `.gitignore`
- Documentation: README, ARCHITECTURE, PROJECT_HISTORY, JARVIS_PROTOCOL
- Empty folder structure and `.gitkeep` placeholders
- Page **layout shells** with section headings and TODO comments
- Updating metadata (`layout.tsx` title/description)
- Recording all changes in PROJECT_HISTORY.md

### Requires explicit user request

- Implementing reusable React components
- `useState`, `useEffect`, custom hooks
- `Array.map()` and dynamic list rendering
- Next.js dynamic routes and API route handlers
- Search, upload, or browse **business logic**
- Database, Prisma, AWS S3, Express, authentication
- Replacing TODO blocks with real UI

### Never do (unless user explicitly overrides)

- Build `ProgramCard`, `ProgramGrid`, `SearchBar`, `CourseCard`, or similar learning components
- Implement API calls or data fetching for homepage sections
- Add animations, gradients, or decorative styling beyond minimal professional layout
- Commit secrets (`.env` credentials) or force-push to main

## User learning ownership

These topics are **reserved for Aman**:

| Topic | Typical location |
|-------|------------------|
| Components & props | `widgets/`, `features/*/components/` |
| `useState` | Search input, recently opened |
| `Array.map()` | Popular Courses, resource lists |
| Routing & dynamic routes | `src/app/` route segments |
| API calls | `features/*/data/`, later `infra/` |
| Search logic | `features/search/` |
| Upload logic | `features/upload/` |

Assistants should leave **TODO comments** naming the component, file, and concept — not implement them.

## Session workflow

1. **Inspect** — Read existing files; do not overwrite working config.
2. **Preserve** — Keep correct architecture and user-written code.
3. **Minimal diff** — Only add or fix what is missing or broken.
4. **Document** — Append an entry to PROJECT_HISTORY.md for installs and structural changes.
5. **Verify** — Run `npm run lint` and `npm run build` when dependencies change.

## Comment standards in code

Every major homepage section should include:

```tsx
/*
  Why: <business purpose>
  Later: <component names and location>
  Learn: <React concepts for Aman>
*/
```

TODO blocks should name **who builds what**:

```tsx
/*
  TODO:
  Aman will build SearchBar component.
  Aman will wire useState for search query.
*/
```

## Communication style

- Explain **what** was changed and **why**
- List dependencies installed with purpose
- Do not claim features work when only placeholders exist
- Prefer engineering documentation tone over tutorial fluff

## What happens if we skip this protocol

- Assistants re-implement components you planned to learn → wasted practice
- Inconsistent sessions → some files full of logic, others empty shells
- After project loss, no record of what was configured → repeat setup mistakes
- Scope creep (DB, S3, auth early) → overwhelming before React fundamentals stick

## Related documents

- [README.md](./README.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [PROJECT_HISTORY.md](./PROJECT_HISTORY.md)
