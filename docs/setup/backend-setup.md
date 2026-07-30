# Backend Setup & Developer Onboarding Guide - Student Hub

> **Document Status**: Active / Authoritative  
> **Target Audience**: Backend Software Engineers  
> **Stack**: Node.js, Express.js, TypeScript, PostgreSQL, Prisma, AWS S3  
> **Last Updated**: 2026-07-29  

---

## 1. Prerequisites

- **Node.js**: `v20.0.0+`
- **PostgreSQL**: `v16.0+` (Running locally or via Docker)
- **AWS S3 Account / Credentials** (or LocalStack S3 emulator)

---

## 2. Local Environment Setup

1. **Navigate to Backend Workspace**:
   ```bash
   cd backend
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment File**:
   Create `backend/.env` based on `.env.example`:
   ```env
   PORT=5000
   NODE_ENV=development
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/studenthub_db?schema=public"
   JWT_SECRET="super-secret-development-jwt-key-min-32-chars"
   JWT_EXPIRES_IN="7d"
   AWS_REGION="us-east-1"
   AWS_ACCESS_KEY_ID="dev-access-key"
   AWS_SECRET_ACCESS_KEY="dev-secret-key"
   AWS_S3_BUCKET_NAME="student-hub-dev-assets"
   ```

4. **Initialize PostgreSQL Database via Docker (Optional)**:
   ```bash
   docker run --name studenthub-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=studenthub_db -p 5432:5432 -d postgres:16-alpine
   ```

5. **Run Prisma Migrations & Seed Initial Data**:
   ```bash
   npx prisma migrate dev
   npx prisma db seed
   ```

6. **Start Development Server**:
   ```bash
   npm run dev
   ```
   The backend API will launch at [http://localhost:5000/api/v1](http://localhost:5000/api/v1).

---

## 3. Useful Development Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Runs Express API via `ts-node-dev` with live reload at `localhost:5000`. |
| `npm run build` | Compiles TypeScript into JavaScript distribution binaries in `dist/`. |
| `npx prisma studio` | Opens Prisma Studio web UI for viewing database records locally at `localhost:5555`. |
| `npx prisma migrate dev` | Applies new schema changes and generates SQL migration files. |

---

## Document Cross-References

- **[../architecture/backend-architecture.md](../architecture/backend-architecture.md)** — Express backend specification
- **[../database/schema.md](../database/schema.md)** — Database schema definition
