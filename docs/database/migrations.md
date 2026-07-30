# Database Migration Guidelines & Strategy - Student Hub

> **Document Status**: Active / Authoritative  
> **Tooling**: Prisma Migrate (`npx prisma migrate`)  
> **Database Engine**: PostgreSQL 16+  
> **Last Updated**: 2026-07-29  

---

## 1. Zero-Downtime Migration Philosophy

In production, database schema migrations MUST occur without causing service downtime or breaking active API instances. To ensure zero downtime, Student Hub adheres to the **Expand and Contract** pattern for all destructive schema changes.

```
Step 1: EXPAND (Add new column/table alongside old; Deploy code writing to BOTH)
       │
       ▼
Step 2: MIGRATE (Backfill historical records from old column to new column)
       │
       ▼
Step 3: CONTRACT (Update code to read from NEW column; Drop old column in next migration)
```

---

## 2. Standard Migration Workflow

### Local Development Migrations
When adding or modifying models in `backend/prisma/schema.prisma`:

1. Edit `backend/prisma/schema.prisma`.
2. Generate and apply the migration locally:
   ```bash
   npx prisma migrate dev --name add_resource_rating_comments
   ```
3. Commit the generated SQL migration file located under `backend/prisma/migrations/<timestamp>_add_resource_rating_comments/migration.sql`.

### Production Deployment Migrations
During deployment pipelines (CI/CD / Render build phase), execute:
```bash
npx prisma migrate deploy
```

> **CRITICAL RULE**: NEVER run `prisma migrate dev` or `prisma db push` in production. Always use `prisma migrate deploy`.

---

## 3. Rollback & Disaster Recovery Protocols

Because PostgreSQL migrations applied via Prisma execute inside transactional blocks:

1. **Transaction Failure**: If a migration fails halfway through execution, PostgreSQL automatically rolls back the transaction state cleanly.
2. **Reverting Broken Schema**:
   - If a newly deployed migration causes application errors, deploy a new migration that reverses the SQL actions (`CREATE` ➔ `DROP` or `ADD COLUMN` ➔ `DROP COLUMN`).
   - Restore database snapshots from point-in-time RDS / Neon automated backups if catastrophic data corruption occurs.

---

## Document Cross-References

- **[schema.md](./schema.md)** — Detailed schema field data dictionary
- **[erd.md](./erd.md)** — Entity Relationship Diagram
