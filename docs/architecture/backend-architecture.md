# Express Backend Architecture Specification - Student Hub

> **Document Status**: Active / Authoritative  
> **Target Framework**: Express.js + TypeScript (Node.js)  
> **Architecture Pattern**: Hybrid Feature-Based Architecture (Sub-Directory Encapsulation)  
> **Database Engine**: PostgreSQL + Prisma ORM  
> **Cloud Storage**: AWS S3  
> **Last Updated**: 2026-07-30  

---

## 1. Backend Architecture Overview & Rationale

The Student Hub backend is designed as a standalone, production-grade **Hybrid Feature-Based Architecture**. 

Instead of traditional flat horizontal layer directories (`/controllers`, `/services`, `/repositories`), the codebase is organized vertically into **self-contained feature slices** under `backend/src/features/` (`auth`, `users`, `resources`, `bookmarks`, `search`, `uploads`). Inside each feature slice, subdirectories cleanly separate transport (`controllers/`, `routes/`), business domain (`services/`), data mapping (`repositories/`), inputs (`validators/`), and type definitions (`types/`).

```mermaid
graph TD
    subgraph Express Application ("src/app.ts")
        Config["src/config/ (env, database, cors, logger)"]
        Middleware["src/middleware/ (error, auth, notFound)"]
        Router["src/routes/index.ts (Central Router)"]
    end

    subgraph Feature Module Slice ("src/features/auth/")
        AuthRoutes["routes/auth.routes.ts"]
        AuthController["controllers/auth.controller.ts"]
        AuthService["services/auth.service.ts"]
        AuthRepository["repositories/auth.repository.ts"]
        AuthValidation["validators/auth.validator.ts"]
        AuthTypes["types/auth.types.ts"]
    end

    subgraph Shared & Infrastructure Layer
        Shared["src/shared/ (utils, constants, types, interfaces, responses, validators)"]
        Lib["src/lib/ (prisma.ts, s3.ts)"]
        DB[(PostgreSQL)]
        S3[AWS S3 Storage]
    end

    Router --> AuthRoutes
    AuthRoutes --> AuthController
    AuthController --> AuthService
    AuthService --> AuthRepository
    AuthRepository --> Lib
    Lib --> DB
    Lib --> S3
```

---

## 2. Complete Folder Hierarchy & Layer Rules

```
backend/
├── prisma/
├── src/
│   ├── app.ts                  # Express application setup, middleware & route mounting
│   ├── server.ts               # Server entry point & process exception handling
│   │
│   ├── config/                 # Application environment configurations
│   │   ├── env.config.ts       # Dotenv environment variables
│   │   ├── database.config.ts  # Database connection configuration
│   │   ├── cors.config.ts      # CORS policy configuration
│   │   └── logger.config.ts    # Application logger configuration
│   │
│   ├── middleware/             # Global Express middleware
│   │   ├── error.middleware.ts # Centralized error interceptor
│   │   ├── auth.middleware.ts  # JWT bearer token verifier
│   │   └── notFound.middleware.ts # 404 handler for unmatched routes
│   │
│   ├── shared/                 # Reusable utilities used across multiple features
│   │   ├── utils/              # AppError custom error classes
│   │   ├── constants/          # HTTP status codes & role enums
│   │   ├── types/              # Global TypeScript types
│   │   ├── interfaces/         # Shared interfaces
│   │   ├── responses/          # Standardized JSON response helpers (successResponse, errorResponse)
│   │   └── validators/         # Shared Zod validation helpers
│   │
│   ├── features/               # Feature Slices (Modular Business Domains)
│   │   └── auth/               # Feature Module Encapsulation
│   │       ├── controllers/
│   │       │   └── auth.controller.ts
│   │       ├── services/
│   │       │   └── auth.service.ts
│   │       ├── repositories/
│   │       │   └── auth.repository.ts
│   │       ├── routes/
│   │       │   └── auth.routes.ts
│   │       ├── validators/
│   │       │   └── auth.validator.ts
│   │       ├── types/
│   │       │   └── auth.types.ts
│   │       └── index.ts
│   │
│   ├── routes/                 # Central Router Registry
│   │   └── index.ts            # Aggregates feature routers under /api/v1
│   │
│   └── lib/                    # Singleton SDK Client Instances
│       ├── prisma.ts           # Singleton Prisma Client
│       └── s3.ts               # Singleton AWS S3 Client
```

---

## 3. Layer Responsibilities Inside Feature Modules

1. **`controllers/`**: Receives Express requests, extracts parameters, delegates to `services/`, and formats standard HTTP responses via `successResponse`. Contains ZERO business logic.
2. **`services/`**: Contains pure domain business logic and calls `repositories/`. Does NOT reference Express `req` or `res` objects.
3. **`repositories/`**: Interacts directly with database models via Prisma ORM. Contains ZERO business rules.
4. **`validators/`**: Defines input validation schemas.
5. **`types/`**: Encapsulates feature-specific DTOs and TypeScript interfaces.
6. **`routes/`**: Configures Express Router mapping paths to controller methods.
7. **`index.ts`**: Re-exports feature routes and public symbols for consumption by `src/routes/index.ts`.

---

## Document Cross-References

- **[../decisions/architecture-decisions.md](../decisions/architecture-decisions.md)** — Architectural Decision Records
- **[../decisions/engineering-journal.md](../decisions/engineering-journal.md)** — Principal Architect Engineering Journal
