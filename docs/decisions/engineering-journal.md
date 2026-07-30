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

## Document Cross-References

- **[architecture-decisions.md](./architecture-decisions.md)** — Architectural Decision Records (ADR-009)
- **[evolution-log.md](./evolution-log.md)** — Architecture evolution log
