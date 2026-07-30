# Student Hub - Express.js REST API Backend

Welcome to the backend service for **Student Hub**, an independent **Express.js + TypeScript** REST API that owns all business logic execution, data persistence, user authentication, and cloud asset management.

The service is organized using a **Hybrid Feature-Based Architecture (Sub-Directory Encapsulation)**.

---

## 🏛 Directory Hierarchy & Feature Modules

```
backend/
├── prisma/                 # Database schema & migration files
├── src/
│   ├── app.ts              # Express app setup, middleware & route mounting
│   ├── server.ts           # Server entry point & process exception handling
│   │
│   ├── config/             # Application environment configurations
│   │   ├── env.config.ts   # Dotenv environment variables
│   │   ├── database.config.ts # Database connection configuration
│   │   ├── cors.config.ts  # CORS policy configuration
│   │   └── logger.config.ts# Application logger configuration
│   │
│   ├── middleware/         # Global Express middleware
│   │   ├── error.middleware.ts # Centralized error interceptor
│   │   ├── auth.middleware.ts  # JWT bearer token verifier
│   │   └── notFound.middleware.ts # 404 handler for unmatched routes
│   │
│   ├── shared/             # Reusable utilities used across multiple features
│   │   ├── utils/          # AppError custom error classes
│   │   ├── constants/      # HTTP status codes & role enums
│   │   ├── types/          # Global TypeScript types
│   │   ├── interfaces/     # Shared interfaces
│   │   ├── responses/      # Standardized JSON response helpers (successResponse, errorResponse)
│   │   └── validators/     # Shared Zod validation helpers
│   │
│   ├── features/           # Feature Slices (Modular Business Domains)
│   │   ├── auth/           # (controllers, services, repositories, routes, validators, types, index.ts)
│   │   ├── users/          # (controllers, services, repositories, routes, validators, types, index.ts)
│   │   ├── resources/      # (controllers, services, repositories, routes, validators, types, index.ts)
│   │   ├── bookmarks/      # (controllers, services, repositories, routes, validators, types, index.ts)
│   │   ├── search/         # (controllers, services, repositories, routes, validators, types, index.ts)
│   │   └── uploads/        # (controllers, services, repositories, routes, validators, types, index.ts)
│   │
│   ├── routes/             # Central Router Registry
│   │   └── index.ts        # Aggregates feature routers under /api/v1
│   │
│   └── lib/                # Singleton SDK Client Instances
│       ├── prisma.ts       # Singleton Prisma Client
│       └── s3.ts           # Singleton AWS S3 Client
```

---

## 🚀 Quickstart Development Setup

1. **Navigate to Backend Directory**:
   ```bash
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

4. **Launch Development Server**:
   ```bash
   npm run dev
   ```
   The API server will run at [http://localhost:5000/api/v1](http://localhost:5000/api/v1).

---

## 🔗 Documentation Links

- **[Backend Architecture Specification](../docs/architecture/backend-architecture.md)**
- **[ADR-009: Hybrid Feature-Based Architecture](../docs/decisions/architecture-decisions.md#adr-009-hybrid-feature-based-architecture-for-backend-service)**
- **[Engineering Journal Entry 003](../docs/decisions/engineering-journal.md#journal-entry-003-refactoring-backend-to-hybrid-feature-based-architecture)**
