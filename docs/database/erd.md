# Entity Relationship Diagram (ERD) - Student Hub

> **Document Status**: Active / Authoritative  
> **Database**: PostgreSQL 16+  
> **ORM Engine**: Prisma ORM  
> **Last Updated**: 2026-07-29  

---

## 1. Complete System ERD Diagram

The following Mermaid diagram defines the complete relational model for Student Hub:

```mermaid
erDiagram
    User ||--o{ Resource : "authors"
    User ||--o{ Rating : "writes"
    User }|--|| Program : "enrolled_in"

    Program ||--|{ Course : "contains"
    Course ||--o{ Resource : "belongs_to"

    Category ||--o{ Resource : "categorizes"
    Resource ||--|{ ResourceTag : "has_tag"
    Tag ||--|{ ResourceTag : "tagged_in"
    Resource ||--o{ Rating : "receives"

    User {
        string id PK
        string email UK
        string passwordHash
        string fullName
        string role
        string programId FK
        datetime createdAt
        datetime updatedAt
    }

    Program {
        string id PK
        string code UK
        string name
        string department
        datetime createdAt
    }

    Course {
        string id PK
        string code UK
        string name
        string description
        string programId FK
        datetime createdAt
    }

    Category {
        string id PK
        string name UK
        string slug UK
        string description
    }

    Resource {
        string id PK
        string title
        string description
        string fileUrl
        string s3Key
        int fileSize
        string mimeType
        string categoryId FK
        string courseId FK
        string authorId FK
        datetime createdAt
        datetime updatedAt
    }

    Tag {
        string id PK
        string name UK
        string slug UK
    }

    ResourceTag {
        string resourceId PK,FK
        string tagId PK,FK
    }

    Rating {
        string id PK
        int score
        string comment
        string userId FK
        string resourceId FK
        datetime createdAt
    }
```

---

## 2. Table Cardinality Summary

- **`User` to `Program`**: Many-to-One (`User.programId` -> `Program.id`). Multiple students enroll in a single academic program.
- **`Program` to `Course`**: One-to-Many (`Course.programId` -> `Program.id`). A program contains multiple required and elective courses.
- **`Course` to `Resource`**: One-to-Many (`Resource.courseId` -> `Course.id`). A course houses multiple academic study materials.
- **`User` to `Resource`**: One-to-Many (`Resource.authorId` -> `User.id`). A student uploads multiple academic resources.
- **`Resource` to `Tag`**: Many-to-Many via join table `ResourceTag` (`resourceId`, `tagId`).
- **`Resource` to `Rating`**: One-to-Many (`Rating.resourceId` -> `Resource.id`).

---

## Document Cross-References

- **[schema.md](./schema.md)** — Detailed schema field data dictionary
- **[migrations.md](./migrations.md)** — Database migration workflow
- **[../architecture/database-architecture.md](../architecture/database-architecture.md)** — High-level database architecture
