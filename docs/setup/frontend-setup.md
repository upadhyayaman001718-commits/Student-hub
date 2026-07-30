# Frontend Setup & Developer Onboarding Guide - Student Hub

> **Document Status**: Active / Authoritative  
> **Target Audience**: Frontend Software Engineers  
> **Stack**: Next.js (App Router), React, TypeScript, Tailwind CSS  
> **Last Updated**: 2026-07-29  

---

## 1. Prerequisites

Ensure your local machine has the following tools installed:
- **Node.js**: `v18.18.0` or higher (Recommended: Node 20 LTS)
- **npm**: `v9.0.0` or higher
- **Git**: `v2.30.0` or higher

---

## 2. Quickstart Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/upadhyayaman001718-commits/student-hub.git
   cd student-hub
   ```

2. **Install Frontend Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create a `.env.local` file in the root directory:
   ```env
   # Frontend Environment Configuration
   NEXT_PUBLIC_API_URL=http://localhost:5000/api/v1
   NEXT_PUBLIC_APP_ENV=development
   ```

4. **Launch Development Server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 3. Available npm Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts Next.js development server with hot-module replacement (HMR) at `localhost:3000`. |
| `npm run build` | Compiles production-optimized Next.js build bundle. |
| `npm run start` | Launches production server using compiled `.next` build. |
| `npm run lint` | Runs ESLint analysis across `src/` to verify code quality and FSD import rules. |

---

## 4. Feature-Sliced Design (FSD) Developer Guidelines

When building new UI capabilities, follow the FSD layer rules:
1. Creating a generic UI button or card? Place it in `src/shared/components/`.
2. Creating a domain noun display (e.g. `CourseBadge`)? Place it in `src/entities/course/`.
3. Creating a user action flow (e.g. `FilterResourcesModal`)? Place it in `src/features/search/`.
4. Creating a composed page layout block (e.g. `GlobalNavbar`)? Place it in `src/widgets/navbar/`.

---

## Document Cross-References

- **[../architecture/frontend-architecture.md](../architecture/frontend-architecture.md)** — Frontend architecture specification
- **[backend-setup.md](./backend-setup.md)** — Backend setup guide
