# Principal Architect Engineering Journal - Student Hub

> **Role**: Principal Software Architect & Lead System Historian  
> **Purpose**: Captures architectural thinking, rationale, trade-offs, and lessons learned across major platform engineering milestones.  
> **Last Updated**: 2026-07-30  

---

## Journal Entry 001: Architectural Decoupling of Next.js & Express.js
- **Date**: 2026-07-29
- **Topic**: Decoupling Web UI from Backend API Infrastructure
- **Status**: Completed / Active Architecture

---

## Journal Entry 002: Establishing Feature-Sliced Design (FSD) for Next.js
- **Date**: 2026-07-29
- **Topic**: Enforcing Frontend Folder Structure Discipline
- **Status**: Completed / Active Architecture

---

## Journal Entry 003: Refactoring Backend to Hybrid Feature-Based Architecture

- **Entry Number**: `003`
- **Date**: 2026-07-30
- **Topic**: Refactoring Express Backend from Flat Layer-Based Layout to Hybrid Feature Slices
- **Status**: Completed / Active Architecture

### 1. Background & Rationale
After establishing the standalone Express backend, we initially organized files horizontally into traditional layer folders (`/routes`, `/controllers`, `/services`, `/utils`). While familiar, this layout quickly created developer cognitive overhead. Implementing or modifying a single feature (like `resources` or `auth`) required opening files across 5 or 6 separate folders scattered throughout the directory tree.

### 2. Engineering Evaluation of Architectural Options

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                      BACKEND STRUCTURE COMPARISON                           │
├──────────────────┬─────────────────────────┬────────────────────────────────┤
│ Structure Pattern│ Advantages              │ Disadvantages                  │
├──────────────────┼─────────────────────────┼────────────────────────────────┤
│ 1. Flat Layered  │ Simple initial layout;  │ Low feature co-location;       │
│    (/controllers)│ easy for small apps     │ high context switching debt    │
├──────────────────┼─────────────────────────┼────────────────────────────────┤
│ 2. Pure DDD      │ Extreme domain isolation│ Excessive boilerplate overhead;│
│    Bounded Context│ for large microservices│ steep learning curve           │
├──────────────────┼─────────────────────────┼────────────────────────────────┤
│ 3. Hybrid Feature│ High co-location; strict│ Requires shared infrastructure │
│    Slices        │ separation of concerns; │ & global middleware setup      │
│    [CHOSEN]      │ modular feature isolation│                                │
└──────────────────┴─────────────────────────┴────────────────────────────────┘
```

### 3. Decisions & Implementation Strategy
We refactored `backend/src/` into a **Hybrid Feature-Based Architecture**:
- Each feature slice under `src/features/` (`auth`, `users`, `resources`, `bookmarks`, `search`, `uploads`) owns its `routes`, `controller`, `service`, `repository`, `validation`, `types`, and `index.ts`.
- **Strict Layer Isolation**:
  - `Controller`: Receives requests, calls services, formats responses (`successResponse`). Zero business logic.
  - `Service`: Enforces business logic and calls repositories. Zero Express `req`/`res` references.
  - `Repository`: Owns Prisma database queries. Zero business rules.
- Global infrastructure (`config/`, `middleware/`, `shared/`, `lib/`, `routes/`) remains centralized.

### 4. Trade-Offs & Lessons Learned
- **Trade-Off**: Feature co-location requires discipline to keep generic utilities in `src/shared/` rather than duplicating helper functions inside feature folders.
- **Lesson Learned**: Feature-based modularity dramatically simplifies code reviews and reduces Git merge conflicts during concurrent feature development.

---

## Journal Entry 004: Transitioning Backend Philosophy to Incremental Hands-On Learning

- **Entry Number**: `004`
- **Date**: 2026-08-02
- **Topic**: Purging Pre-Generated Implementation Code while Preserving Production Architecture for Hands-On Incremental Mastery
- **Status**: Active Policy

### 1. Background & Rationale
While our Hybrid Feature-Based Architecture (Journal Entry 003) provided an excellent structural blueprint, pre-populating files across every layer (`controllers`, `services`, `repositories`, `validators`, `types`, `middleware`, `lib`) created a "black box" side effect. Pre-generated boilerplate obscured the core mechanics of Express, Prisma, JWT, Zod, and layer interactions.

We have fundamentally shifted our development philosophy: **We DO NOT want pre-generated implementation code. We build every backend feature ourselves while mastering each concept.**

### 2. Architectural Preservation vs Code Removal
- **Preserved**: The full production folder hierarchy (`src/config/`, `src/middleware/`, `src/routes/`, `src/shared/`, `src/lib/`, `src/features/*`, `prisma/`) remains 100% intact, including empty directories.
- **Removed**: All generated stub files, controllers, services, repositories, validators, DTOs, auth/JWT logic, Prisma helpers, S3 helpers, utility implementations, error handlers, and placeholder routes.
- **Retained Core Foundation**: Only hand-built foundation files remain:
  - `app.ts` (Core Express setup & `/health` endpoint)
  - `server.ts` (Server listener entry)
  - `config/env.config.ts` (Environment variable configuration)
  - `package.json` & `tsconfig.json`

### 3. Benefits Analysis

| Evaluation Metric | Advantage of Incremental Hands-On Approach |
| :--- | :--- |
| **Learning & Comprehension** | Engineers understand every line of code, why each file exists, and what problem it solves. |
| **Maintainability** | Zero dead code, unused abstractions, or unmaintained placeholder logic cluttering the repository. |
| **Debugging Efficiency** | Tracing runtime bugs is immediate because there are no hidden layers or stubbed dependencies. |
| **Scalability** | Features scale naturally as requirements emerge, preventing over-engineering and premature abstraction. |

### 4. Mandatory Precondition Rule for Future Backend Files
Going forward, every single file created in the backend MUST satisfy the following rule:

> [!IMPORTANT]
> **Precondition Rule for File Creation**:
> Before creating any new backend file, the developer must explicitly understand the underlying concept and define:
> 1. The exact reason why the file exists.
> 2. The specific problem it solves in the project architecture.

#### Incremental Triggers:
- **Learn Express Router** ➔ Create route files.
- **Learn Controllers** ➔ Create controller files.
- **Learn Services** ➔ Create service files.
- **Learn Prisma** ➔ Create Prisma client & repositories.
- **Learn JWT** ➔ Create authentication middleware.
- **Learn Input Validation** ➔ Create Zod schema validators.
- **Learn Error Handling** ➔ Create centralized error handling middleware.

---

## Document Cross-References

- **[architecture-decisions.md](./architecture-decisions.md)** — Architectural Decision Records (ADR-010)
- **[evolution-log.md](./evolution-log.md)** — Architecture evolution log (Record 005)
