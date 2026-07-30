# Architecture Decision Records (ADR Repository) - Student Hub

> **Status**: Authoritative Architectural Register  
> **Governance Standard**: Nygard ADR Format  
> **Last Updated**: 2026-07-30  

---

## Index of Architecture Decision Records

| ADR ID | Decision Title | Status | Date |
|--------|----------------|--------|------|
| [ADR-001](#adr-001-decoupling-backend-into-standalone-expressjs-service) | Decoupling Backend into Standalone Express.js Service | Accepted | 2026-07-29 |
| [ADR-002](#adr-002-postgresql-as-core-relational-storage-engine) | PostgreSQL as Core Relational Storage Engine | Accepted | 2026-07-29 |
| [ADR-003](#adr-003-prisma-orm-for-type-safe-data-access) | Prisma ORM for Type-Safe Data Access | Accepted | 2026-07-29 |
| [ADR-004](#adr-004-stateless-jwt--bcrypt-authentication-architecture) | Stateless JWT & bcrypt Authentication Architecture | Accepted | 2026-07-29 |
| [ADR-005](#adr-005-aws-s3-object-storage-for-document-binaries) | AWS S3 Object Storage for Document Binaries | Accepted | 2026-07-29 |
| [ADR-006](#adr-006-zod-schema-first-runtime-input-validation) | Zod Schema-First Runtime Input Validation | Accepted | 2026-07-29 |
| [ADR-007](#adr-007-standardized-layered-backend-architecture) | Standardized Layered Backend Architecture | Superseded | 2026-07-30 |
| [ADR-008](#adr-008-feature-sliced-design-fsd-for-frontend) | Feature-Sliced Design (FSD) for Frontend | Accepted | 2026-07-29 |
| [ADR-009](#adr-009-hybrid-feature-based-architecture-for-backend-service) | Hybrid Feature-Based Architecture for Backend Service | Accepted | 2026-07-30 |

---

## ADR-001: Decoupling Backend into Standalone Express.js Service
- **Status**: Accepted
- **Context**: Student Hub backend was previously monolithic inside Next.js Route Handlers.
- **Chosen Solution**: Standalone Express.js REST API service.

---

## ADR-007: Standardized Layered Backend Architecture
- **Status**: Superseded by [ADR-009](#adr-009-hybrid-feature-based-architecture-for-backend-service)
- **Context**: Original flat layer-based architecture (`/routes`, `/controllers`, `/services`).
- **Superseded Rationale**: As feature complexity expanded, flat layer directories caused code scattering across distant folders. Superseded by Hybrid Feature-Based Architecture.

---

## ADR-009: Hybrid Feature-Based Architecture for Backend Service

### Status
Accepted (Supersedes ADR-007)

### Context
As Student Hub grew, a flat layer-based architecture (`/routes`, `/controllers`, `/services`) caused developer friction. Modifying a single business domain required opening 6 different folders across the project tree.

### Problem
Flat layer structures suffer from low feature cohesion, high cross-directory context switching, and elevated risk of merge conflicts in multi-developer environments.

### Options Considered
1. *Option 1*: Retain traditional flat layer-based architecture (`/routes`, `/controllers`, `/services`).
2. *Option 2*: Pure Domain-Driven Design (DDD) with heavy bounded context modules.
3. *Option 3*: **Hybrid Feature-Based Architecture** organizing domain features under `src/features/` (`auth`, `users`, `resources`, `bookmarks`, `search`, `uploads`) while keeping global infrastructure under `src/config/`, `src/middleware/`, `src/shared/`, `src/lib/`, and `src/routes/`.

### Chosen Solution
**Option 3: Hybrid Feature-Based Architecture**.

### Why Chosen
- **High Co-Location**: All domain files (`routes`, `controller`, `service`, `repository`, `validation`, `types`, `index.ts`) reside inside a single feature folder.
- **Strict Layer Separation**: Enforces pure responsibilities: Controller (HTTP) ➔ Service (Business Logic) ➔ Repository (Prisma DB).
- **Scalability & Maintainability**: Enables independent feature expansion and easy deletion or isolation of modules.

### Trade-Offs
- Requires establishing shared response helpers (`src/shared/responses/`) and global middleware to prevent code duplication across features.

### Expected Benefits & Future Impact
Significantly improves onboarding speed, feature isolation, and code readability as the engineering team scales.

---

## Document Cross-References

- **[evolution-log.md](./evolution-log.md)** — Architectural evolution timeline
- **[engineering-journal.md](./engineering-journal.md)** — Principal Architect Engineering Journal
