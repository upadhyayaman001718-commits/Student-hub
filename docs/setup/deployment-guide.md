# Production Deployment & Infrastructure Operations Guide - Student Hub

> **Document Status**: Active / Authoritative  
> **Target Audience**: DevOps Engineers, System Administrators  
> **Platforms**: Vercel (Frontend), Render / AWS EC2 (Backend), Managed PostgreSQL (RDS/Neon), AWS S3  
> **Last Updated**: 2026-07-29  

---

## 1. Overview & Cloud Topology

Production Student Hub deployments separate edge rendering (Vercel CDN) from core API processing (Render / AWS EC2), managed database operations (PostgreSQL), and file object storage (AWS S3).

---

## 2. Step-by-Step Deployment Instructions

### 2.1 Managed PostgreSQL Database Setup
1. Provision a PostgreSQL 16 instance on AWS RDS or Neon.
2. Obtain the production connection string enabling connection pooling:
   ```env
   DATABASE_URL="postgresql://db_user:password@prod-db.neon.tech/studenthub_prod?sslmode=require"
   ```

### 2.2 Express Backend API Deployment (Render / AWS EC2)
1. Environment Configuration: In the cloud platform dashboard, populate runtime secrets:
   - `PORT=5000`
   - `NODE_ENV=production`
   - `DATABASE_URL=...`
   - `JWT_SECRET=...`
   - `AWS_ACCESS_KEY_ID=...`
   - `AWS_SECRET_ACCESS_KEY=...`
   - `AWS_S3_BUCKET_NAME=student-hub-prod-assets`
2. Build & Deploy Pipeline Command:
   ```bash
   npm install && npx prisma migrate deploy && npm run build
   ```
3. Start Command:
   ```bash
   node dist/server.js
   ```

### 2.3 Next.js Frontend Deployment (Vercel)
1. Import repository to Vercel.
2. Configure Environment Variable:
   ```env
   NEXT_PUBLIC_API_URL=https://api.studenthub.app/api/v1
   ```
3. Deploy to production domain `https://studenthub.app`.

---

## 3. Post-Deployment Verification

1. Verify CORS: Confirm HTTP `200 OK` response headers contain `Access-Control-Allow-Origin: https://studenthub.app`.
2. Check Health Check Endpoint: Issue `GET https://api.studenthub.app/api/v1/health`.

---

## Document Cross-References

- **[../architecture/deployment-architecture.md](../architecture/deployment-architecture.md)** — Deployment topology specification
- **[backend-setup.md](./backend-setup.md)** — Local backend developer setup
