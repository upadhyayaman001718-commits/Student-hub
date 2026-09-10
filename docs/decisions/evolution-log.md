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
[Record 005] (2026-08-02) Pre-Generated Boilerplate ➔ Hands-On Incremental Learning Philosophy
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

## Evolution Record 005: Purge of Pre-Generated Implementation Files for Incremental Hands-On Learning

- **Date**: 2026-08-02
- **Architecture Version**: `v2.2.0`
- **Category**: Engineering Methodology & Backend Philosophy

### Architectural Shift

```
[PREVIOUS STATE - Pre-Generated Implementation Code]
backend/src/
├── config/ (cors, database, logger implementations)
├── middleware/ (auth, error, notFound implementations)
├── lib/ (prisma, s3 client implementations)
├── shared/ (constants, responses, app-error implementations)
└── features/ (pre-generated controllers, services, repos, validators across auth, users, resources, search, uploads, bookmarks)

[CURRENT STATE - Incremental Hands-On Architecture]
backend/src/
├── app.ts            # Hand-built Express application
├── server.ts         # Server entry listener
├── config/
│   └── env.config.ts # Hand-built environment config
├── controllers/      # Preserved directory structure (empty)
├── middleware/       # Preserved directory structure (empty)
├── routes/           # Preserved directory structure (empty)
├── services/         # Preserved directory structure (empty)
├── shared/           # Preserved directory structure (empty)
├── lib/              # Preserved directory structure (empty)
├── types/            # Preserved directory structure (empty)
├── utils/            # Preserved directory structure (empty)
├── validators/       # Preserved directory structure (empty)
└── features/         # Preserved domain feature directories (empty subfolders)
    ├── auth/
    ├── users/
    ├── resources/
    ├── bookmarks/
    ├── search/
    └── uploads/
```

### Rationale & Justification
- Shifted strategy to build all backend implementation code manually while learning every concept step-by-step.
- Preserved production folder architecture so that every future file created aligns directly with Student Hub's targeted modular design.
- Established a strict precondition rule requiring explicit reasoning and problem statement documentation prior to creating any new backend file.

### Affected Files & Directories
- `backend/src/` (Purged all generated implementation files; preserved all folders & subfolders)
- `docs/decisions/architecture-decisions.md` (Registered ADR-010)
- `docs/decisions/engineering-journal.md` (Logged Entry 004)

---

## Document Cross-References

- **[architecture-decisions.md](./architecture-decisions.md)** — Architectural Decision Records (ADR-010)
- **[engineering-journal.md](./engineering-journal.md)** — Principal Architect Engineering Journal (Entry 004)
