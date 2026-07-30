# Database Schema Data Dictionary - Student Hub

> **Document Status**: Active / Authoritative  
> **Database Engine**: PostgreSQL 16+  
> **ORM Engine**: Prisma ORM  
> **Schema File Location**: `backend/prisma/schema.prisma`  
> **Last Updated**: 2026-07-29  

---

## 1. Table Specifications

### 1.1 Table: `User`
Stores user profile information and authentication credentials.

| Column Name | Type | Modifiers | Description |
|-------------|------|-----------|-------------|
| `id` | `String` | `@id @default(cuid())` | Primary key (CUID string). |
| `email` | `String` | `@unique` | Student university email address. |
| `passwordHash` | `String` | | Hashed password generated via `bcrypt`. |
| `fullName` | `String` | | Full display name of the user. |
| `role` | `Role` | `@default(STUDENT)` | Enum: `STUDENT`, `CONTRIBUTOR`, `ADMIN`. |
| `programId` | `String?` | `@relation` | Foreign key referencing `Program.id`. |
| `createdAt` | `DateTime` | `@default(now())` | Account creation timestamp. |
| `updatedAt` | `DateTime` | `@updatedAt` | Account record update timestamp. |

---

### 1.2 Table: `Program`
Stores academic majors and degree programs.

| Column Name | Type | Modifiers | Description |
|-------------|------|-----------|-------------|
| `id` | `String` | `@id @default(cuid())` | Primary key. |
| `code` | `String` | `@unique` | Program code (e.g. `BSCS`, `BSEE`). |
| `name` | `String` | | Full program title. |
| `department` | `String` | | Academic department name. |
| `createdAt` | `DateTime` | `@default(now())` | Creation timestamp. |

---

### 1.3 Table: `Course`
Stores academic courses under specific programs.

| Column Name | Type | Modifiers | Description |
|-------------|------|-----------|-------------|
| `id` | `String` | `@id @default(cuid())` | Primary key. |
| `code` | `String` | `@unique` | Course code (e.g. `CS101`, `MATH201`). |
| `name` | `String` | | Course name. |
| `description` | `String?` | | Detailed course syllabus description. |
| `programId` | `String` | `@relation` | Foreign key referencing `Program.id`. |
| `createdAt` | `DateTime` | `@default(now())` | Creation timestamp. |

---

### 1.4 Table: `Resource`
Stores metadata and cloud location references for uploaded academic materials.

| Column Name | Type | Modifiers | Description |
|-------------|------|-----------|-------------|
| `id` | `String` | `@id @default(cuid())` | Primary key. |
| `title` | `String` | | Title of the document or notes. |
| `description` | `String?` | | Overview of resource contents. |
| `fileUrl` | `String` | | Public URL or S3 location string. |
| `s3Key` | `String` | | Unique AWS S3 object key. |
| `fileSize` | `Int` | | File size in bytes. |
| `mimeType` | `String` | | MIME type (e.g. `application/pdf`). |
| `categoryId` | `String` | `@relation` | Foreign key referencing `Category.id`. |
| `courseId` | `String` | `@relation` | Foreign key referencing `Course.id`. |
| `authorId` | `String` | `@relation` | Foreign key referencing `User.id`. |
| `createdAt` | `DateTime` | `@default(now())` | Upload timestamp. |
| `updatedAt` | `DateTime` | `@updatedAt` | Last modification timestamp. |

---

## 2. Declarative Prisma Schema Definition

```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  STUDENT
  CONTRIBUTOR
  ADMIN
}

model User {
  id           String     @id @default(cuid())
  email        String     @unique
  passwordHash String
  fullName     String
  role         Role       @default(STUDENT)
  programId    String?
  program      Program?   @relation(fields: [programId], references: [id])
  resources    Resource[]
  ratings      Rating[]
  createdAt    DateTime   @default(now())
  updatedAt    DateTime   @updatedAt
}

model Program {
  id         String   @id @default(cuid())
  code       String   @unique
  name       String
  department String
  courses    Course[]
  users      User[]
  createdAt  DateTime @default(now())
}

model Course {
  id          String     @id @default(cuid())
  code        String     @unique
  name        String
  description String?
  programId   String
  program     Program    @relation(fields: [programId], references: [id])
  resources   Resource[]
  createdAt   DateTime   @default(now())
}

model Category {
  id          String     @id @default(cuid())
  name        String     @unique
  slug        String     @unique
  description String?
  resources   Resource[]
}

model Resource {
  id          String        @id @default(cuid())
  title       String
  description String?
  fileUrl     String
  s3Key       String
  fileSize    Int
  mimeType    String
  categoryId  String
  category    Category      @relation(fields: [categoryId], references: [id])
  courseId    String
  course      Course        @relation(fields: [courseId], references: [id])
  authorId    String
  author      User          @relation(fields: [authorId], references: [id])
  tags        ResourceTag[]
  ratings     Rating[]
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt

  @@index([courseId])
  @@index([authorId])
  @@index([categoryId])
}

model Tag {
  id        String        @id @default(cuid())
  name      String        @unique
  slug      String        @unique
  resources ResourceTag[]
}

model ResourceTag {
  resourceId String
  resource   Resource @relation(fields: [resourceId], references: [id], onDelete: Cascade)
  tagId      String
  tag        Tag      @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([resourceId, tagId])
}

model Rating {
  id         String   @id @default(cuid())
  score      Int
  comment    String?
  userId     String
  user       User     @relation(fields: [userId], references: [id])
  resourceId String
  resource   Resource @relation(fields: [resourceId], references: [id], onDelete: Cascade)
  createdAt  DateTime @default(now())
}
```

---

## Document Cross-References

- **[erd.md](./erd.md)** — Entity Relationship Diagram
- **[migrations.md](./migrations.md)** — Migration guidelines
