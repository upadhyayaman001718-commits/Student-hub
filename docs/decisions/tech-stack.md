# Comprehensive Technology Stack & Alternatives Matrix - Student Hub

> **Document Status**: Active / Authoritative  
> **Backend Architecture Pattern**: Hybrid Feature-Based Architecture  
> **Last Updated**: 2026-07-30  

---

## 1. Primary Technology Matrix

| Technology | Purpose | Why Chosen | Disadvantages | Industry Usage | Scalability | Future Replacement |
|------------|---------|------------|---------------|----------------|-------------|--------------------|
| **Node.js** | Async Server Runtime | Event-driven, non-blocking I/O model for fast asynchronous network and file operations. Single language (TypeScript) across stack. | Single-threaded CPU limitations for heavy compute tasks. | Netflix, LinkedIn, Uber, PayPal | High (Horizontal scale out) | Low likelihood |
| **Express.js** | Web Framework | Lightweight, battle-tested, unopinionated framework with vast ecosystem and zero lock-in. Organised via **Hybrid Feature-Based Architecture**. | Requires disciplined folder organization to avoid spaghetti code. | Stripe, GitHub, Twitter | High (Stateless API nodes) | Moderate (Fastify if throughput doubles) |
| **TypeScript** | Static Typing | Catches syntax and type mismatch bugs at compile-time; enforces explicit interfaces across feature layers. | Build step compilation overhead; type complexity for generics. | Microsoft, Stripe, Google, Airbnb | Exceptional (Large team DX) | Extremely low likelihood |
| **PostgreSQL** | Relational Database | Enterprise-grade SQL engine with strict ACID compliance, JSONB support, and native full-text search. | Requires memory allocation and connection pool management. | Apple, Instagram, Reddit, Spotify | Exceptional (Read replicas & PgBouncer) | Extremely low likelihood |
| **Prisma** | ORM / Data Mapper | Single declarative `schema.prisma`, auto-generated TypeScript types, and automated migration management inside feature repositories. | Rust binary startup memory overhead; query optimization abstraction. | Vercel, Adidas, Webflow | High (With connection poolers) | Low (Drizzle if raw SQL required) |
| **JWT** (`jsonwebtoken`) | Auth Transport | Stateless token authentication standard enabling secure client token storage and fast signature verification. | Token revocation requires maintaining a Redis token blacklist. | Auth0, Okta, Amazon | High (Stateless scale out) | Low likelihood |
| **bcrypt** | Password Hashing | Adaptive hashing algorithm with salt rounds to prevent rainbow table attacks. | CPU intensive by design (deliberate security trade-off). | Enterprise Standard | High | Low (Argon2 optional future) |
| **Zod** | Input Validation | Schema-first TypeScript validation with static type inference directly from feature schemas (`*.validation.ts`). | Minor runtime parsing overhead on extremely large payloads. | Vercel, Supabase, TRPC | High | Extremely low likelihood |
| **Multer** | Form Parser | Native Express middleware for handling `multipart/form-data` streams efficiently. | Requires buffer size limit configuration to prevent memory exhaustion. | Universal Node Standard | High | Low likelihood |
| **AWS S3** | Cloud Storage | 99.999999999% durability, presigned URL access control, infinite scale, and low cost. | Requires AWS IAM setup and bucket CORS configuration. | Netflix, Airbnb, NASA | Infinite | Extremely low likelihood |
| **Morgan** | HTTP Logger | Zero-config middleware for logging HTTP request latency, status codes, and traffic. | Basic formatting (supplemented with Sentry in production). | Standard Node Stack | High | Low |
| **dotenv** | Env Configuration | 12-factor application standard for loading `.env` variables into `process.env`. | Must ensure `.env` is never committed to Git. | Universal Standard | High | Extremely low likelihood |

---

## 2. Technology Alternatives Evaluation

### 2.1 Backend Architecture Pattern Comparison

- **Hybrid Feature-Based Architecture (Selected)**: High feature co-location, strict layer separation (Controller ➔ Service ➔ Repository), excellent maintainability and feature isolation.
- **Traditional Flat Layered Architecture**: Low feature co-location; causes developer context switching across distant directories. Superseded by ADR-009.

---

## Document Cross-References

- **[architecture-decisions.md](./architecture-decisions.md)** — Architectural Decision Records (ADR-009)
- **[evolution-log.md](./evolution-log.md)** — Architecture evolution history (Record 004)
