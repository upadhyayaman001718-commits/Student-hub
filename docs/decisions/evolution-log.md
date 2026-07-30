# Architecture Evolution Log - Student Hub

> **Status**: Permanent Architectural History Register  
> **Governance Rule**: Entries in this log are IMMUTABLE. Never delete previous architecture entries; mark deprecated designs explicitly and append new evolution records.  
> **Last Updated**: 2026-07-30  

---

## Evolution Records Index

```
[Record 001] (2026-07-29) Next.js Route Handlers ➔ Standalone Express.js REST API
[Record 002] (2026-07-29) Local Disk File Storage ➔ AWS S3 Object Storage
[Record 003] (2026-07-29) Header Mock Credentials ➔ Stateless JWT & bcrypt Authentication
[Record 004] (2026-07-30) Flat Layered Architecture ➔ Hybrid Feature-Based Architecture
```

---

## Evolution Record 001: Separation of Backend into Standalone Express.js Service
- **Date**: 2026-07-29
- **Architecture Version**: `v2.0.0`
- **Category**: System Architecture

---

## Evolution Record 002: Transition to AWS S3 Object Storage
- **Date**: 2026-07-29
- **Category**: Storage Infrastructure

---

## Evolution Record 003: Stateless JWT & bcrypt Authentication Migration
- **Date**: 2026-07-29
- **Category**: Security Architecture

---

## Evolution Record 004: Refactoring to Hybrid Feature-Based Architecture

- **Date**: 2026-07-30
- **Architecture Version**: `v2.1.0`
- **Category**: Backend Software Architecture

### Architectural Shift

```
[OLD ARCHITECTURE - Flat Layer-Based]
backend/src/
├── routes/
├── controllers/
├── services/
├── middleware/
└── utils/

[NEW ARCHITECTURE - Hybrid Feature-Based]
backend/src/
├── config/           # App configuration
├── middleware/       # Global Express middleware
├── shared/           # Cross-cutting utilities, types, responses
├── lib/              # Singleton SDK clients (Prisma, S3)
├── features/         # Self-contained Feature Slices
│   ├── auth/         # (routes, controller, service, repository, validation, types, index)
│   ├── users/
│   ├── resources/
│   ├── bookmarks/
│   ├── search/
│   └── uploads/
└── routes/           # Central router aggregator (/api/v1)
```

### Rationale & Justification
- Reorganized backend files into feature slices to co-locate related routes, controllers, services, repositories, validators, and types.
- Established explicit Controller (HTTP) ➔ Service (Business Logic) ➔ Repository (Prisma DB) layer separation.
- Reduced developer cognitive overhead and context-switching debt across directories.

### Benefits Gained
- High feature co-location and modular code organization.
- Easier feature scaling, testing, and multi-developer collaboration.
- Transport-agnostic domain services decoupled from Express HTTP objects.

### Affected Files & Directories
- `backend/src/features/` [NEW FEATURE SLICES]
- `backend/src/shared/` [NEW SHARED LAYER]
- `backend/src/config/` [EXPANDED CONFIGURATION LAYER]
- `docs/architecture/backend-architecture.md` [UPDATED]
- `docs/decisions/architecture-decisions.md` [ADDED ADR-009]

---

## Document Cross-References

- **[architecture-decisions.md](./architecture-decisions.md)** — Architectural Decision Records (ADR-009)
- **[engineering-journal.md](./engineering-journal.md)** — Principal Architect Engineering Journal (Entry 003)
