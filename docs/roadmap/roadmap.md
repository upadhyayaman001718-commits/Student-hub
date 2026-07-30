# System Roadmap & Architecture Milestones - Student Hub

> **Document Status**: Active / Authoritative  
> **Scope**: Feature Phases, Sprint Progress & System Evolution  
> **Last Updated**: 2026-07-29  

---

## 1. Multi-Phase Roadmap Overview

```
Phase 1: DECOUPLED ARCHITECTURE FOUNDATION [COMPLETED]
├── Next.js App Router (FSD) + Standalone Express REST API
├── PostgreSQL Relational Schema + Prisma ORM
└── AWS S3 Object Storage + Stateless JWT Authentication

Phase 2: ADVANCED COMMUNITY & DISCOVERY FEATURES [IN PROGRESS]
├── Threaded Resource Comments & Questions
├── Peer Ratings (1-5 Stars) & Review Analytics
└── Redis Caching Layer & Token Blacklisting

Phase 3: REAL-TIME & AUTOMATED PROCESSING [UPCOMING]
├── Socket.io WebSockets for Real-time Notifications
├── BullMQ Async Worker Queue for PDF OCR Indexing
└── Automated Virus Scanning for Uploaded Binaries

Phase 4: ENTERPRISE & SCALE (FUTURE ROADMAP)
├── Docker Container Orchestration (AWS ECS / Kubernetes)
├── Microservices Decomposition (Dedicated Search Engine)
└── GraphQL API Gateway Layer
```

---

## 2. Current Sprint Status (Phase 2 Focus)

- **Sprint Goal**: Completing REST API specifications, finishing data dictionary models for ratings and comments, and establishing Redis integration blueprints.
- **Completed Milestones**:
  - Full decoupling of Next.js frontend and Express REST API backend.
  - Creation of authoritative `docs/` technical documentation system (23 standardized documents).
  - Schema migrations for `User`, `Program`, `Course`, `Resource`, `Category`, `Tag`, `Rating`.

---

## Document Cross-References

- **[future-improvements.md](./future-improvements.md)** — Architectural integration blueprints
- **[../decisions/evolution-log.md](../decisions/evolution-log.md)** — Historical evolution log
