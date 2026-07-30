# Architecture Specification - Student Hub

This document defines the high-level **system architecture**, **frontend folder structure**, and **integration contracts** for Student Hub.

Student Hub uses a **decoupled application architecture** separating the **Frontend User Interface** (Next.js) from the **Core Backend Service** (Express.js REST API).

---

## 1. Overall System Architecture

Student Hub is structured as two independent, decoupled services that communicate via a structured **RESTful HTTP API**:

```mermaid
graph TD
    Client["Client Browsers / Mobile Clients"]
    
    subgraph FrontendApp ["Frontend Application (Next.js)"]
        Pages["App Router (src/app/)"]
        Widgets["Widgets & Features"]
        Entities["Domain Entities"]
        SharedUI["Shared UI & Utilities"]
    end

    subgraph BackendApp ["Backend API Service (Express.js)"]
        Routes["API Router (/api/v1)"]
        Middleware["Auth & Validation Middleware"]
        Controllers["Controllers"]
        Services["Business Services"]
        ORM["Prisma ORM"]
    end

    subgraph Infrastructure ["Cloud & Data Infrastructure"]
        DB[(PostgreSQL Database)]
        S3[AWS S3 Storage]
    end

    Client -->|HTTPS / UI Rendering| Pages
    Pages --> Widgets
    Widgets --> Entities
    Entities --> SharedUI
    
    Client -->|JSON REST API Requests| Routes
    Pages -->|Server-Side / Client API Calls| Routes

    Routes --> Middleware
    Middleware --> Controllers
    Controllers --> Services
    Services --> ORM
    Services -->|Upload / Download Presigned URLs| S3
    ORM -->|SQL Queries| DB
```

### Architectural Principles

1. **Strict Decoupling**: The frontend application (`Next.js`) serves UI and handles user interaction. The backend service (`Express.js`) enforces business logic, data validation, authentication, and database/storage access.
2. **Stateless Backend API**: The backend holds no session state. All requests are authenticated via **JWT (JSON Web Tokens)** sent in the `Authorization: Bearer <token>` header.
3. **Layered Isolation**: Code within both applications follows strict unidirectional dependency flows to prevent circular imports and maintain clear boundaries.

---

## 2. Frontend Architecture (Feature-Sliced Design)

The frontend application remains located in `src/` and adheres to **Feature-Sliced Design (FSD)** principles adapted for Next.js App Router.

### Import Direction Rules

```
src/app → widgets, features, entities, shared
widgets → features, entities, shared
features → entities, shared
entities → shared
shared → (no upward imports)
```

### Layer Reference

#### `src/app/`
- **What**: Next.js App Router — `layout.tsx`, `page.tsx`, route segments, global CSS.
- **Why**: Framework-mandated routing, SSR entry points, and document shell.
- **Rule**: Pages should compose widgets and features, not implement business rules inline.

#### `src/features/`
- **What**: User-facing action-oriented capabilities.
- **Modules**: `browse/` (catalog navigation), `search/` (query UI & filtering), `upload/` (resource submission workflow), `auth/` (login/register forms).
- **Why**: Keeps user flows modular and independently testable.

#### `src/entities/`
- **What**: Domain models and entity-specific UI blocks (e.g., `Course`, `Resource`, `Program`, `User`).
- **Why**: Centralizes shared domain nouns and components like `ResourceCard` or `UserAvatar`.

#### `src/widgets/`
- **What**: Composed structural UI regions — `Navbar`, `Footer`, `HeroSection`, `Sidebar`.
- **Why**: Orchestrates features and entities into coherent layout blocks.

#### `src/shared/`
- **What**: Reusable, feature-agnostic primitives and utilities.
- **Subfolders**: `components/` (Button, Input, Card), `constants/`, `config/`, `lib/` (API client, fetch wrappers), `hooks/`, `types/`.

---

## 3. Backend Architecture Reference

The backend operates as an independent **Express.js + TypeScript** application.

> [!NOTE]
> For comprehensive details on the backend architecture, request lifecycles, database schemas, ADRs, and folder structure, refer to the dedicated single source of truth document:
> **[docs/backend-architecture.md](./docs/backend-architecture.md)**

### Backend Layer Responsibilities Summary

```
HTTP Request ➔ Route ➔ Middleware ➔ Controller ➔ Service ➔ Prisma ORM ➔ PostgreSQL
```

- **Routes (`src/routes/`)**: Map REST endpoints to controller actions.
- **Middleware (`src/middleware/`)**: Validate Zod schemas, verify JWT tokens, handle CORS, log HTTP requests.
- **Controllers (`src/controllers/`)**: Parse HTTP parameters, invoke domain services, format JSON HTTP responses.
- **Services (`src/services/`)**: Enforce business rules, process data, orchestrate AWS S3 uploads, coordinate database transactions.
- **Prisma Layer (`src/prisma/` / `src/lib/prisma.ts`)**: Type-safe query engine for PostgreSQL.

---

## 4. Overall Project Folder Structure

```
student-hub/
├── ARCHITECTURE.md                  # High-level system architecture (This document)
├── README.md                        # Project setup & quickstart guide
├── PROJECT_HISTORY.md               # Historical installation & environment records
├── JARVIS_PROTOCOL.md               # AI execution & engineering rules
├── docs/
│   └── backend-architecture.md      # Comprehensive single source of truth for Express Backend
├── public/                          # Static public web assets
├── src/                             # Next.js Frontend Application (FSD)
│   ├── app/                         # App Router pages and layouts
│   ├── widgets/                     # Composed layout sections (Navbar, Hero, Footer)
│   ├── features/                    # Action features (browse, search, upload, auth)
│   ├── entities/                    # Domain entities (Resource, Course, Program, User)
│   └── shared/                      # Reusable UI components, hooks, API client wrappers
└── backend/                         # Express Backend Application Workspace (or standalone repo)
    ├── prisma/                      # Database schema & migration files
    ├── src/
    │   ├── config/                  # Environment variables & AWS/DB configurations
    │   ├── controllers/             # HTTP Request/Response handlers
    │   ├── lib/                     # Singleton SDK instances (Prisma, S3 client)
    │   ├── middleware/              # JWT auth, error handling, rate limiting
    │   ├── routes/                  # Express API route declarations
    │   ├── services/                # Core domain business logic
    │   ├── types/                   # Backend TypeScript interfaces & DTOs
    │   ├── utils/                   # Helper functions & custom AppError classes
    │   ├── validators/              # Zod validation schemas
    │   └── server.ts                # Express application entry point
    ├── tsconfig.json                # Backend TypeScript configuration
    └── package.json                 # Backend dependencies (Express, Prisma, AWS SDK, etc.)
```

---

## 5. System Request & Data Flow

### Comprehensive End-to-End Request Flow

```mermaid
sequenceDiagram
    autonumber
    actor Client as User / Browser
    participant FE as Next.js Frontend
    participant API as Express API Server
    participant MW as Middleware (Zod / Auth)
    participant Ctrl as Controller
    participant Svc as Service
    participant ORM as Prisma ORM
    participant DB as PostgreSQL DB
    participant S3 as AWS S3 Storage

    Client->>FE: 1. Interacts with UI (e.g. Upload Resource)
    FE->>API: 2. POST /api/v1/resources (JWT + Multipart Data)
    API->>MW: 3. Passes request to Route Middleware
    MW->>MW: 4. Verifies JWT & Validates Body via Zod
    alt Invalid Token or Body
        MW-->>Client: 4a. Return 401 Unauthorized / 400 Bad Request
    end
    MW->>Ctrl: 5. Hands over validated payload
    Ctrl->>Svc: 6. Calls domain service executeUpload()
    Svc->>S3: 7. Streams file payload / generates S3 Object Key
    S3-->>Svc: 8. Confirms upload & returns Object Key / URL
    Svc->>ORM: 9. Calls prisma.resource.create(...)
    ORM->>DB: 10. Executes SQL INSERT transaction
    DB-->>ORM: 11. Returns created database record
    ORM-->>Svc: 12. Returns typed entity model
    Svc-->>Ctrl: 13. Returns service result DTO
    Ctrl-->>Client: 14. Responds HTTP 201 Created `{ success: true, data: resource }`
```

---

## 6. Authentication & Authorization Flow

Student Hub uses a **Stateless JWT (JSON Web Token)** architecture with **bcrypt** password hashing:

```mermaid
sequenceDiagram
    autonumber
    actor User as User Browser
    participant AuthForm as Frontend Auth Component
    participant ExpressAPI as Express Auth Router
    participant AuthSvc as Auth Service
    participant DB as PostgreSQL DB

    User->>AuthForm: Enters Email & Password
    AuthForm->>ExpressAPI: POST /api/v1/auth/login
    ExpressAPI->>AuthSvc: loginUser(email, password)
    AuthSvc->>DB: Find user by email
    DB-->>AuthSvc: Return User Record (with hashed password)
    AuthSvc->>AuthSvc: Verify password using bcrypt.compare()
    alt Invalid Credentials
        AuthSvc-->>ExpressAPI: Throw AuthenticationError
        ExpressAPI-->>User: HTTP 401 Unauthorized
    else Valid Credentials
        AuthSvc->>AuthSvc: Generate JWT Token (payload: userId, role)
        AuthSvc-->>ExpressAPI: Return JWT Token & User Profile
        ExpressAPI-->>User: HTTP 200 OK `{ success: true, token: "...", user: {...} }`
    end

    Note over User, ExpressAPI: Subsequent Authenticated Requests
    User->>ExpressAPI: GET /api/v1/resources/protected (Header: Authorization: Bearer <token>)
    ExpressAPI->>ExpressAPI: authenticateJWT Middleware verifies signature
    ExpressAPI-->>User: HTTP 200 OK with requested payload
```

---

## 7. Deployment Architecture

```mermaid
graph LR
    subgraph Edge Layer
        DNS[Route 53 / Cloudflare DNS]
        CDN[Vercel Edge Network / CloudFront]
    end

    subgraph Web Layer
        FE[Next.js App Router - Vercel / Docker Container]
    end

    subgraph API Layer
        API1[Express API Instance 1 - AWS EC2 / Render]
        API2[Express API Instance 2 - AWS EC2 / Render]
        LB[Application Load Balancer]
    end

    subgraph Data & Storage Layer
        RDS[(Managed PostgreSQL - AWS RDS / Neon)]
        S3[AWS S3 Bucket - Resource Files]
    end

    DNS --> CDN
    CDN --> FE
    FE --> LB
    DNS --> LB
    LB --> API1
    LB --> API2
    API1 --> RDS
    API2 --> RDS
    API1 --> S3
    API2 --> S3
```

- **Frontend Deployment**: Hosted on Vercel or containerized via Docker for optimized SSR/SSG page delivery and global CDN distribution.
- **Backend API Deployment**: Hosted on Node.js application platforms (AWS EC2, AWS ECS, or Render) behind a load balancer to support horizontal autoscaling.
- **Database Infrastructure**: Managed PostgreSQL database (AWS RDS or Neon) with connection pooling enabled.
- **Object Storage**: AWS S3 Bucket configured with CORS and strict IAM access controls for raw resource uploads and presigned download links.

---

## 8. Data Flow Matrix

| Flow Type | Initiator | Transport | Target Layer | Storage Layer |
|-----------|-----------|-----------|--------------|---------------|
| **Catalog Browse** | Client / Server Component | HTTP GET | Express `ResourceController` | PostgreSQL via Prisma |
| **Full-Text Search** | Search Bar UI | HTTP GET | Express `SearchController` | PostgreSQL Index / Search Service |
| **Document Upload** | Upload Form | Multipart HTTP POST | Express `UploadController` + `StorageService` | AWS S3 Bucket + Metadata in Postgres |
| **Auth Session** | Login / Register UI | HTTP POST | Express `AuthController` | JWT Client-side Store / Memory |

---

## 9. Future Architecture Notes

1. **Backend Documentation**: Refer to **[docs/backend-architecture.md](./docs/backend-architecture.md)** for exhaustive details on backend design decisions, ORM schemas, ADRs, and layer-by-layer specs.
2. **Caching & Performance**: Future integration of **Redis** for token blacklisting, rate limiting, and HTTP response caching.
3. **Asynchronous Jobs**: Integration of **BullMQ** for background PDF indexing, thumbnail generation, and automated virus scanning.
4. **Mobile Client Integration**: Because the backend is fully decoupled and RESTful, mobile clients (iOS / Android / React Native) can directly consume the Express REST API without modifying core backend code.

---

## Related Documents

- **[docs/backend-architecture.md](./docs/backend-architecture.md)** — Express Backend Single Source of Truth
- **[README.md](./README.md)** — Project overview and setup instructions
- **[PROJECT_HISTORY.md](./PROJECT_HISTORY.md)** — Environment setup and library installation history
- **[JARVIS_PROTOCOL.md](./JARVIS_PROTOCOL.md)** — Operational and safety protocols
