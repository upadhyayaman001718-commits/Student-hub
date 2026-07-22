# Student Hub — Project History

## Project Beginning
This project started with a simple idea: students always struggle to find study resources. We share Notes, PYQs, Lab Manuals, Assignments, Books, and PPTs, but they are usually scattered across WhatsApp groups, Google Drives, and local folders. The goal of **Student Hub** is to bring everything together into one structured, easily searchable library. 

To build this, I decided to use:
*   **Next.js** for modern routing and Server-Side Rendering (which is great for future SEO on resource pages).
    *   **React** for building interactive, component-based UIs.
    *   **TypeScript** to prevent runtime errors by enforcing type safety.
    *   **Tailwind CSS** for fast styling using utility classes.

---

## Initial Project Architecture
To prevent the codebase from turning into a big folder of messy components, I set up a folder structure inspired by **Feature-Sliced Design (FSD)**:
*   `src/app/` — Next.js routing and page layouts.
    *   `src/features/` — Independent capabilities grouped by action (like `browse`, `search`, `upload`).
    *   `src/entities/` — Nouns or domain models (like a `Course` or `Resource`).
    *   `src/widgets/` — Composite page sections (like a Navbar or Footer).
    *   `src/shared/` — Reusable elements (common UI components, utilities, types, config).
    *   `src/infra/` & `src/processes/` — Adapters for databases and session flows (for future database integration).

**What I Learned:** Choosing an architecture early on keeps imports predictable. The target import rule is that code can only import from folders below it (`app` $\rightarrow$ `widgets` $\rightarrow$ `features` $\rightarrow$ `entities` $\rightarrow$ `shared`), never upwards or across features. This prevents circular dependency hell later.

---

## Homepage Development
I started drafting the core landing page inside `src/app/page.tsx`.
*   **Hero section:** Communicated the purpose of the site and added the primary search area.
*   **Popular Courses:** I created a local array of program objects (CS, Electrical, Mechanical, etc.) and built a reusable `ProgramCard` component to display them. I practiced using `Array.map()` to dynamically loop over this data and render cards in a responsive grid.
*   **Recently Uploaded:** I added a mock data file (`recentlyUpload.ts`) with some sample study files. I built a `RecentlyUploadedCard` component to map out these resources dynamically.
*   **Upload Resource Promo Section:** Set up a promotional banner `UploadResourceSection` containing grid chips of document types (Notes, PYQs, Lab Manuals, etc.) to prompt users to submit material.
*   **Stats Section:** Created mock dashboard statistics (e.g. 150+ Resources, 25+ Courses) and mapped them into visual cards with hover effects.

---

## UI Dependencies and Components
To style cards and inputs quickly, I initialized **shadcn/ui** which installed basic components like `button.tsx`, `card.tsx`, and `input.tsx` into my local `src/components/ui/` folder. I also added **lucide-react** for icons.

*   **The Problem:** The app crashed with a runtime error because I used the `<Card>` and `<CardContent>` tags in my stats section before writing the import statements.
*   **The Fix:** I imported `Card` and `CardContent` correctly from `@/components/ui/card` at the top of the file.
*   **What I Learned:** Even though shadcn files are local, you still have to import them like any other dependency.

---

## Important Next.js Version Problem
While installing dependencies, the Next.js version was accidentally downgraded all the way to `9.3.3`. 

*   **The Problem:** The compiler crashed immediately. Next.js 9 threw errors saying that it didn't recognize my TypeScript config format (`next.config.ts`), could not process the React Server Components `"use client"` boundary directive, and complained that the project was missing a `pages/` directory.
*   **The Fix:** I inspected `package.json`, realized the version was wrong, and updated the dependency block to restore Next.js to version `16.2.10`. After running a clean install and removing the `.next` compilation cache directory, the server compiled successfully.
*   **What I Learned:** Old versions of Next.js do not support App Router conventions (`app/` layouts). Keeping track of dependency versions in `package.json` is critical when running build checks.

---

## Search Feature
Next, I tackled client-side searching to filter mock resources on the home page.
*   **Controlled Input:** I learned about React's state management hook, `useState`. I initialized a `search` string state and bound it to the search input using `value={search}` and updating it with `onChange={(e) => setSearch(e.target.value)}`.
*   **Filtering Logic:** I used `.filter()`, `.includes()`, and `.toLowerCase()` to match the `recentlyUploaded` data items against user queries.
*   **Refactoring component responsibilities:** 
    *   *The mistake:* Initially, I filtered the "Recently Uploaded" section array directly. This meant that typing in search would shrink the "Recently Uploaded" block, which is bad UX.
    *   *The fix:* I restored the Recently Uploaded block to always show the latest files, and created a separate `SearchResults.tsx` component that only appears when a query is active.
*   **Conditional Rendering:** I wrapped the search results component in a conditional check: `search.trim() !== ""`. This avoids triggering search results if users type blank spaces. I also added a fallback message to inform the user if no resources match their query.

---

## React Component and TypeScript Improvements
As the codebase grew, TypeScript errors began failing the production build.
*   **Implicit any errors:** 
    *   *The Problem:* The compiler complained that the props `course`, `program`, and `sem` in `ProgramCard` and `RecentlyUploadedCard` implicitly had an `any` type under strict checks.
    *   *The Fix:* I defined clean TS interfaces (`ProgramCardProps` and `RecentlyUploadedCardProps`) and annotated the function signatures. I also made sure custom keys like `filetype` and `uploadedTime` were marked as optional (`?`) since some mock elements don't contain them.
*   **Casing standards:** I renamed the `recentlyUploadedCard` function to capitalized `RecentlyUploadedCard` to comply with standard React casing rules.
*   **What I Learned:** Destructuring props in TS files without typing them throws compile-time errors under strict configuration settings. Typings should be established upfront to keep the build passing.

---

## Upload Page and Next.js Routing
Instead of squeezing the upload form onto the home page, I decided it deserved its own route.
*   **Folder-based Routing:** I created the nested path `src/app/upload/page.tsx` using the Next.js App Router format.
*   **Folder Casing Problem:** 
    *   *The Problem:* I initially named the folder with a capital letter (`src/app/Upload`). While it ran fine on my local machine (Windows is case-insensitive), compiling the build triggered casing conflicts saying that uppercase `Upload` clashed with lowercase path imports.
    *   *The Fix:* I renamed the folder to lowercase `upload`, deleted the cached `.next` directory to clean type metadata, and verified that both `/` and `/upload` resolved cleanly.
*   **What I Learned:** Web servers are often case-sensitive. Keeping route folder names lowercase is a safe practice to prevent platform build errors.

---

## UploadForm Development
I began building the form layout inside `src/shared/components/UploadForm.tsx` to handle resource uploads.
*   **"use client" boundary:** I learned that because this form needs state controls and select events, it must be declared as a Client Component using `"use client"`.
*   **Form states:** I declared individual state hooks to track the upload inputs: `program`, `course`, `semester`, `subject`, `title`, `description`, `resourceType`, and `file`.
*   **Dependent Dropdowns:** I created a courses mapping dictionary (`coursesByProgram` inside `courses.ts`). 
    *   *Lookup logic:* The "Course" select options evaluate dynamic arrays by accessing the dictionary based on the currently selected "Program" state.
    *   *Dropdown reset:* To avoid inconsistent state (like leaving a Computer Science course selected after switching the program to MCA), I set the Course select state back to `""` whenever the Program value changes.
*   **What is next:** I need to build out similar dependency lists for semesters and subjects so that selections flow cleanly from Program $\rightarrow$ Course $\rightarrow$ Semester $\rightarrow$ Subject.

---

## Current Development State

### Completed
*   Feature-Sliced Design folder layout scaffolded.
*   Framework configured with Next.js 16.2.10, React 19, TypeScript, Tailwind 4, and ESLint.
*   Base shadcn/ui components (`Button`, `Card`, `Input`) installed.
*   Homepage layout:
    *   Hero heading and styling.
    *   Interactive client-side search box filtering mock resources with `useState`.
    *   Dynamic Popular Courses grid mapping `ProgramCard` components.
    *   Recently Uploaded section showing mock database items via `RecentlyUploadedCard`.
    *   Upload Promotional section showing document categories.
*   Upload route setup and form baseline:
    *   `/upload` page route linked and loading `UploadForm.tsx`.
    *   `UploadForm` state tracking and dependent program-course select filters.

### In Progress
*   **Multi-level dropdown dependencies:** Setting up the semester and subject options to dynamically render based on course selections.

### Planned (Placeholders in Code)
*   **Navbar & Footer Components:** Currently static placeholders in `src/app/page.tsx`. Reusable widgets need to be built and integrated.
*   **Form Primitives:** Implement `FormInput.tsx` and `FormSelect.tsx` (currently empty files) to clean up form styling.
*   **Upload Tips:** Mount `UploadTips.tsx` side-by-side with the form to guide students.
*   **History sync:** Use a local storage state tracker to populate the "Recently Opened" homepage section.
*   **Backend & DB adapter layers:** Prisma configuration (PostgreSQL) and S3 bucket adapters under `infra/` have not been set up.

---

## My Dev Checklist: What's Next?

### Completed So Far
*   [x] Set up FSD layered folders
*   [x] Initialized Next.js, TypeScript, Tailwind 4, and ESLint
*   [x] Mapped out popular courses and metrics lists
*   [x] Wired client-side search filtering state
*   [x] Built `/upload` route and mapped out the Program/Course dependent dropdowns

### In Progress
*   [ ] Multi-level dropdown hierarchies (adding Semesters and Subjects dynamically)

### Planned (Placeholders in Code)
*   [ ] Build proper `Navbar` and `Footer` components (currently just placeholder blocks in `page.tsx`)
*   [ ] Build reusable `FormInput` and `FormSelect` components (currently empty files)
*   [ ] Set up LocalStorage history tracking to populate the "Recently Opened" homepage section
*   [ ] Connect PostgreSQL/Prisma (database), AWS S3 (file uploads), and user Auth
