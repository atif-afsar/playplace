# 📋 PRD (Product Requirement Document)
## Project: Play Place International School — Website + Admin Panel + Parent Portal

> **What is a PRD?** Think of it like a **map for a road trip**. It tells Cursor (your AI coder) exactly where we're going (features), what car we're driving (tech stack), and which roads to take first, second, third (build order). Without this map, Cursor will guess randomly and create messy code.

---

## 1. Project Summary

We are building a **3-in-1 system**:

1. **Public Website** — parents/visitors see school info, apply for admission
2. **Admin Panel** — staff manage students, results, fees, timetable, attendance
3. **Parent Portal** — parents log in to see their child's attendance, results, fees

**Design reference:** UI designs are already made in **Stitch** (connected via MCP in Cursor). Cursor should copy the *visual design* (colors, layout, spacing, components) from Stitch screens, but rebuild them as clean, reusable React components — not just paste raw HTML.

---

## 2. Tech Stack (Our "Ingredients")

| Layer | Technology | Why |
|---|---|---|
| Frontend | **React (Vite)** | Fast, component-based |
| Styling | **Tailwind CSS** | Matches Stitch's utility-class output, fast to theme |
| Backend/Database | **Supabase** (Postgres + Auth + Storage) | One tool for database, login, and file storage |
| Auth | **Supabase Auth** | Handles Admin login + Parent login with roles |
| File/Image storage | **Supabase Storage** | Store student photos, gallery images, report card PDFs |
| Hosting | Vercel/Netlify (frontend) + Supabase (backend) | Free tier friendly |
| Design Source | **Stitch (via MCP in Cursor)** | Visual reference only — Cursor rebuilds it properly in Tailwind |

---

## 3. Design System (Apply to Every Page)

Cursor must create a **single Tailwind config** so every page matches the logo's playful theme — never let Cursor invent new colors per page.

```js
// tailwind.config.js — colors block
colors: {
  skyblue: '#5DC9F1',
  sunyellow: '#FFC93C',
  grassgreen: '#6FCF97',
  coral: '#FF8552',
  darktext: '#2D2D2D',
}
```

- **Font:** Fredoka or Baloo 2 (Google Fonts) for headings, Poppins for body text
- **Corners:** `rounded-2xl` or `rounded-3xl` everywhere (buttons, cards, inputs)
- **Shadows:** soft shadows only — `shadow-md` / `shadow-lg`, never harsh
- **Buttons:** big, rounded, coral or sunyellow background, white bold text

📌 **Rule for Cursor:** Before writing any component, first create `src/styles/theme.js` or Tailwind config with these tokens, so every screen pulls from the same palette.

---

## 4. Folder Structure (So Cursor Doesn't Make a Mess)

```
play-place-school/
├── src/
│   ├── assets/                 (logo, illustrations)
│   ├── components/
│   │   ├── common/             (Button, Card, Input, Modal, Navbar, Footer)
│   │   ├── public/              (HomeHero, AboutSection, GalleryGrid, etc.)
│   │   └── admin/               (Sidebar, StatCard, DataTable, Charts)
│   ├── pages/
│   │   ├── public/              (Home.jsx, About.jsx, Admissions.jsx, Academics.jsx, Gallery.jsx, Events.jsx, Contact.jsx, Login.jsx)
│   │   ├── admin/                (Dashboard.jsx, ManageAdmissions.jsx, ManageStudents.jsx, Timetable.jsx, Results.jsx, Attendance.jsx, Fees.jsx, Teachers.jsx, Notices.jsx, GalleryManager.jsx)
│   │   └── parent/               (ParentDashboard.jsx, ViewTimetable.jsx, ViewResults.jsx, FeeStatus.jsx, Notices.jsx)
│   ├── lib/
│   │   └── supabaseClient.js
│   ├── context/
│   │   └── AuthContext.jsx      (stores logged-in user + role: admin/parent)
│   ├── routes/
│   │   └── AppRoutes.jsx         (all routes + protected route logic)
│   └── App.jsx
├── .env                          (Supabase URL + anon key)
└── tailwind.config.js
```

---

## 5. Database Design (Supabase Tables)

> Think of each table like a **labeled drawer** in a filing cabinet — each drawer only stores one type of information.

### `students`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | auto |
| full_name | text | |
| dob | date | |
| gender | text | |
| class | text | e.g. "Nursery", "LKG" |
| roll_number | text | |
| parent_id | uuid (FK → parents.id) | links to parent account |
| photo_url | text | Supabase Storage link |
| status | text | active / inactive |
| created_at | timestamp | default now() |

### `admissions`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| child_name | text | |
| dob | date | |
| gender | text | |
| class_applied | text | |
| parent_name | text | |
| phone | text | |
| email | text | |
| address | text | |
| photo_url | text | |
| status | text | pending / approved / rejected |
| created_at | timestamp | |

### `parents` (linked to Supabase Auth users)
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK, = auth.users.id) | |
| full_name | text | |
| phone | text | |
| email | text | |

### `teachers`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| full_name | text | |
| subject | text | |
| assigned_class | text | |
| phone | text | |
| email | text | |

### `timetable`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| class | text | |
| day | text | Monday–Saturday |
| time_slot | text | e.g. "9:00–9:45" |
| subject | text | |
| teacher_id | uuid (FK) | |

### `results`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| student_id | uuid (FK) | |
| subject | text | |
| marks_obtained | numeric | |
| max_marks | numeric | |
| grade | text | |
| remarks | text | |
| term | text | e.g. "Term 1" |

### `attendance`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| student_id | uuid (FK) | |
| date | date | |
| status | text | present / absent |

### `fees`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| student_id | uuid (FK) | |
| amount | numeric | |
| due_date | date | |
| status | text | paid / due / overdue |
| paid_on | date | nullable |

### `notices`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| title | text | |
| description | text | |
| target_class | text | nullable, "all" if for everyone |
| created_at | timestamp | |

### `gallery`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| image_url | text | |
| category | text | Events / Sports Day / Classroom |
| caption | text | |

### `events`
| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| title | text | |
| description | text | |
| event_date | date | |
| location | text | |

📌 **Security rule (RLS):** Turn ON Row Level Security for every table.
- **Admin role** → full access to everything
- **Parent role** → can only `SELECT` rows where `student_id` belongs to their own linked child (via `parent_id`)
- **Public (not logged in)** → can only `INSERT` into `admissions` table (submit form) and `SELECT` from `gallery`, `events`, `notices` (where target is public)

---

## 6. Authentication & Roles

- Use **Supabase Auth** (email + password)
- Add a `role` field: store in a `profiles` table linked to `auth.users.id` → values: `"admin"` or `"parent"`
- After login, `AuthContext.jsx` checks the role and redirects:
  - `admin` → `/admin/dashboard`
  - `parent` → `/parent/dashboard`
- Use **Protected Routes** — if a parent tries to visit `/admin/...` directly by typing URL, redirect them back to login (Cursor should build a `<ProtectedRoute role="admin">` wrapper component)

---

## 7. Feature List Per Page (Functionality Cursor Must Build)

### 🌍 Public Website
| Page | Functionality |
|---|---|
| Home | Static content + pull latest 3 events from `events` table + latest 4 gallery images |
| About | Static content (no database needed) |
| Admissions | Form → `INSERT` into `admissions` table + upload photo to Supabase Storage |
| Academics | Static content listing classes |
| Gallery | Fetch all from `gallery` table, filter by category (client-side filter) |
| Events | Fetch all from `events` table, sorted by date |
| Contact | Form → send email via Supabase Edge Function (or just store in a `messages` table for now) |
| Login | Supabase Auth login, redirect by role |

### 🛠️ Admin Panel
| Page | Functionality |
|---|---|
| Dashboard | Show counts: total students (`count` from students), pending admissions, total fees collected (`sum` from fees where paid), total teachers. Show chart: monthly fee collection (group by month), pie chart: students per class |
| Manage Admissions | Table of all `admissions`, buttons to Approve (update status + auto-create row in `students` + create parent login) / Reject (update status) |
| Manage Students | CRUD (Create/Read/Update/Delete) on `students` table, with photo upload |
| Timetable Manager | Select class → fetch/edit `timetable` rows → Save (upsert) |
| Results | Select class + student → enter marks per subject → `INSERT`/`UPDATE` into `results` → auto-calculate grade based on marks (e.g. 90+=A, 75+=B, etc.) |
| Attendance | Select class + date → list students → toggle present/absent → bulk `INSERT`/`UPSERT` into `attendance` |
| Fees | Table of all fee records, filter by status, "Mark as Paid" button updates status + paid_on date |
| Teachers | CRUD on `teachers` table |
| Notices | CRUD on `notices` table, choose target class or "all" |
| Gallery Manager | Upload image to Supabase Storage → `INSERT` row in `gallery` with category |

### 👨‍👩‍👧 Parent Portal
| Page | Functionality |
|---|---|
| Dashboard | Show child's name, class, attendance % (calculate from attendance table), upcoming events |
| Timetable | Fetch timetable for child's class (read-only) |
| Results | Fetch results for child, show as report card view |
| Fees | Fetch fee records for child, show paid/due status |
| Notices | Fetch notices where target_class = child's class OR "all" |

---

## 8. Step-by-Step Build Guide (The Order to Give Cursor Tasks)

> Like building a house: **foundation → walls → roof → paint**. Don't ask Cursor to build the dashboard before the login system exists.

### Phase 1 — Setup (Day 1)
1. Create Vite + React project, install Tailwind, configure `tailwind.config.js` with the theme colors above
2. Create Supabase project → copy URL + anon key into `.env`
3. Create all database tables (Step 5) using Supabase SQL editor
4. Set up Supabase Storage buckets: `student-photos`, `gallery-images`, `admission-photos`
5. Enable RLS and write basic policies (start simple, refine later)

**Prompt for Cursor:**
```
Set up a new React + Vite project with Tailwind CSS configured with these custom colors: skyblue #5DC9F1, sunyellow #FFC93C, grassgreen #6FCF97, coral #FF8552. Install and configure Supabase client using environment variables from .env (VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY). Create the folder structure: src/components (common, public, admin), src/pages (public, admin, parent), src/lib, src/context, src/routes.
```

### Phase 2 — Auth System (Day 2)
6. Build Login page (match Stitch design) with Supabase Auth
7. Build `AuthContext.jsx` to track logged-in user + role
8. Build `ProtectedRoute.jsx` wrapper
9. Set up React Router with all routes (public, admin, parent)

**Prompt for Cursor:**
```
Using the Stitch design connected via MCP for the Login page as visual reference, build a Login.jsx page in src/pages/public with Supabase email/password authentication. After login, fetch the user's role from a "profiles" table and store it in an AuthContext. Create a ProtectedRoute component that redirects users to /login if not authenticated, and to their correct dashboard based on role if they try to access the wrong section. Set up React Router with routes for all public, admin, and parent pages.
```

### Phase 3 — Public Website (Day 3–4)
10. Build Navbar + Footer (shared components) first
11. Build Home, About, Academics (static-heavy pages)
12. Build Admissions page with working form → Supabase insert + photo upload
13. Build Gallery + Events pages (fetch from Supabase)
14. Build Contact page

**Prompt for Cursor (repeat per page):**
```
Using the Stitch design for the [Home / Admissions / Gallery] page as visual reference, rebuild it as a React component in src/pages/public using Tailwind CSS matching our theme (rounded-2xl cards, Fredoka font for headings, sky blue/yellow/coral colors). Make it fully responsive for mobile. [For Admissions:] Connect the form to Supabase — insert into the "admissions" table and upload the photo to the "admission-photos" storage bucket, show a success message after submission.
```

### Phase 4 — Admin Panel (Day 5–8)
15. Build Admin Sidebar + layout shell first (used by every admin page)
16. Build Dashboard (stats + charts)
17. Build Manage Admissions (approve/reject logic — this is important, do it early)
18. Build Manage Students (CRUD)
19. Build Timetable Manager
20. Build Results page (with auto-grade calculation)
21. Build Attendance page
22. Build Fees page
23. Build Teachers, Notices, Gallery Manager (simpler CRUD pages, do last)

**Prompt for Cursor (example for Dashboard):**
```
Using the Stitch design for the Admin Dashboard as visual reference, build Dashboard.jsx in src/pages/admin. Fetch real data from Supabase: total count of students, count of admissions where status=pending, sum of fees where status=paid, count of teachers. Display these as 4 stat cards. Add a bar chart (using recharts) showing monthly fee collection and a pie chart showing student count grouped by class. Use the shared AdminLayout component with sidebar navigation.
```

### Phase 5 — Parent Portal (Day 9)
24. Build Parent Dashboard, Timetable view, Results view, Fees view, Notices view — all read-only, filtered by the logged-in parent's child

**Prompt for Cursor:**
```
Build the Parent Portal pages in src/pages/parent: ParentDashboard, ViewTimetable, ViewResults, FeeStatus, Notices. Each page should fetch data from Supabase filtered to only show the logged-in parent's linked child (using parent_id from the students table matched to the logged-in user's id). Keep the same playful theme but simplified for parents — read-only views with friendly cards, no edit buttons.
```

### Phase 6 — Polish & Security (Day 10)
25. Add RLS policies properly for every table (test as both admin and parent user)
26. Add loading states + error handling everywhere
27. Add form validation (required fields, phone/email format)
28. Test on mobile view
29. Deploy frontend to Vercel, confirm Supabase env variables are set correctly

---

## 9. Important Rules for Cursor While Building

- ✅ Always reuse the shared `Button`, `Card`, `Input` components — never create one-off styled buttons per page
- ✅ Always use the Stitch MCP design as a **visual reference only** — write clean semantic Tailwind classes, don't just dump copied HTML
- ✅ Always connect real Supabase data — no dummy/hardcoded data in final pages
- ✅ Always handle loading and empty states (e.g. "No students found yet")
- ✅ Keep mobile responsiveness in mind for every page (parents will check on phones)
- ❌ Don't create a new color or font — pull only from `tailwind.config.js`
- ❌ Don't skip RLS — even in testing, treat security as part of the build, not an afterthought

---

## 10. What to Tell Cursor First (Kickoff Prompt)

Paste this as your very first message to Cursor to set the context for the whole project:

```
We are building "Play Place International School" — a full website + admin panel + parent portal using React (Vite), Tailwind CSS, and Supabase (database, auth, storage). I have Stitch connected via MCP with UI designs already made for each page — use those as the visual reference, but rebuild everything as clean, reusable, responsive React + Tailwind components connected to real Supabase data (not static/dummy data). Our theme colors are: skyblue #5DC9F1, sunyellow #FFC93C, grassgreen #6FCF97, coral #FF8552, using Fredoka font for headings and Poppins for body text, with rounded-2xl corners and soft shadows everywhere. I'll give you tasks phase by phase — starting with project setup, then authentication, then public pages, then the admin panel, then the parent portal. Confirm you understand before we start Phase 1.
```

---

## ✅ Summary Checklist

- [ ] Supabase project created + tables created
- [ ] Tailwind theme configured
- [ ] Auth + role-based routing working
- [ ] All 8 public pages built
- [ ] All 10 admin pages built
- [ ] All 5 parent pages built
- [ ] RLS policies tested
- [ ] Deployed and working on mobile
