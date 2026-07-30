# Student Hub - Engineering & Architecture Documentation

Welcome to the central technical documentation portal for **Student Hub**, an academic resource platform designed to connect students with peer-curated course materials, textbooks, notes, and past examination papers.

This portal serves as the single source of truth for all software engineering, system architecture, database models, API specifications, operational procedures, and architectural evolution history for the Student Hub project.

---

## 🏛 Documentation Hierarchy

The documentation is organized into domain-specific directories under `docs/`:

```
docs/
├── README.md                                  # Documentation Index & Portal Guide (This File)
│
├── architecture/                              # High-Level & Subsystem Architecture
│   ├── architecture.md                        # Overall System Architecture & Topology
│   ├── frontend-architecture.md               # Next.js App Router & Feature-Sliced Design (FSD)
│   ├── backend-architecture.md                # Express.js REST API Single Source of Truth
│   ├── database-architecture.md               # PostgreSQL & Prisma Data Persistence Architecture
│   └── deployment-architecture.md             # Multi-Tier Cloud Deployment Infrastructure
│
├── api/                                       # REST API & Integration Specifications
│   ├── api-design.md                          # API Design Principles, Envelopes & Error Contracts
│   ├── authentication-api.md                  # Identity & Auth REST API Endpoints
│   ├── resources-api.md                       # Academic Resources REST API Endpoints
│   └── future-api.md                          # Future REST, WebSocket & GraphQL API Roadmap
│
├── database/                                  # Data Modeling & Persistence Layer
│   ├── erd.md                                 # Entity Relationship Diagram (Mermaid ERD)
│   ├── schema.md                              # Declarative Schema & Field Data Dictionary
│   └── migrations.md                          # Zero-Downtime Database Migration Guidelines
│
├── decisions/                                 # Architecture Decisions & History
│   ├── architecture-decisions.md              # Architecture Decision Records (ADRs 001–008)
│   ├── tech-stack.md                          # Comprehensive Tech Stack & Trade-Offs Matrix
│   ├── evolution-log.md                       # Architecture Evolution Log (Permanent History)
│   └── engineering-journal.md                 # Principal Architect Engineering Journal
│
├── setup/                                     # Onboarding & Operations Guides
│   ├── frontend-setup.md                      # Frontend Developer Onboarding Guide
│   ├── backend-setup.md                       # Backend Developer Onboarding & DB Setup
│   └── deployment-guide.md                    # Production Deployment & Infrastructure Guide
│
├── roadmap/                                   # Project Planning & Technical Vision
│   ├── roadmap.md                             # Milestone Roadmap & Sprint Status
│   └── future-improvements.md                 # Architectural Integration Blueprints (Redis, Docker, Queues)
│
└── case-study/                                # Case Studies & Technical Summaries
    └── StudentHub-Engineering-Case-Study.md   # Executive Engineering Case Study & Interview Guide
```

---

## 🎯 Engineering Principles

1. **Strict Decoupling**: The Next.js frontend and Express.js backend operate as independent, decoupled applications. The frontend renders UI; the backend owns business logic, data persistence, and cloud storage.
2. **Stateless API Design**: The backend maintains no in-memory session state. Authentication relies on stateless **JSON Web Tokens (JWT)**.
3. **Immutability of Decision History**: Previous architectural decisions are **never deleted**. When decisions change, historical records are updated to `[Deprecated]`, `[Replaced]`, or `[Superseded]` with clear explanations of why the transition occurred.
4. **Strict Layer Isolation**: Dependencies flow unidirectionally from outer transport layers inward toward pure domain logic services.

---

## ⚡ Quick Navigation Matrix

| Topic | Primary Document | Description |
|-------|------------------|-------------|
| **System Overview** | [architecture/architecture.md](./architecture/architecture.md) | High-level system architecture and topology diagrams |
| **Frontend Setup** | [setup/frontend-setup.md](./setup/frontend-setup.md) | Quickstart guide for Next.js frontend developers |
| **Backend Setup** | [backend-setup.md](./setup/backend-setup.md) | Express API, PostgreSQL, and Prisma local setup |
| **REST API Specs** | [api/api-design.md](./api/api-design.md) | Standardized API JSON envelope, status codes & errors |
| **Database Model** | [database/erd.md](./database/erd.md) | Full Mermaid Entity Relationship Diagram |
| **Tech Trade-Offs** | [decisions/tech-stack.md](./decisions/tech-stack.md) | Deep analysis of why Node, Express, Postgres, & Prisma were chosen |
| **Architecture History** | [decisions/evolution-log.md](./decisions/evolution-log.md) | History of major system redesigns and transitions |
| **Engineering Case Study**| [case-study/StudentHub-Engineering-Case-Study.md](./case-study/StudentHub-Engineering-Case-Study.md) | Executive architectural breakdown and interview guide |

---

## 🛠 Maintenance & Governance

This documentation suite is a **living specification**. Any engineer making architectural modifications, adding API routes, modifying database models, or introducing infrastructure components **must update the relevant markdown files in `docs/` as part of their pull request**.

Refer to [decisions/engineering-journal.md](./decisions/engineering-journal.md) to understand the architectural reasoning behind key platform decisions.
