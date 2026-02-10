

# VizTec — Final Implementation Plan

## Phase 1: Design System & Layout Foundation

### Global Theme Setup
- Light mode only with Segoe UI / Inter font family
- Azure Blue (#0078D4) accent color for buttons, active nav, CTAs, focus outlines
- Neutral layered backgrounds (luminance 0.97 base)
- Typography ramp: 12px captions → 40px hero headings
- Corner radius: 4px inputs/buttons, 8px cards/panels
- Subtle hover elevation, fade transitions, smooth modals
- High contrast, visible focus outlines, keyboard navigable

---

## Phase 2: Public Marketing Website (No Auth Required)

### Home Page (`/`)
- **Hero Section**: FloatingLines 3D background (three.js) — decorative only, lazy-loaded, with static gradient fallback on mobile for performance
- Heading, subtext, 3 CTA buttons (Login, Register as Admin, Contact Us)
- **Problem Section**: 5 cards explaining BI sharing pain points
- **Target Users**: 4 cards (Freelancers, Consulting Firms, Analytics Agencies, Business Consultants)
- **Real-World Scenarios**: 6 cards with Problem → Solution format
- **Features Section**: 6 feature highlights
- **Footer CTA**: Login, Register as Admin, Contact Us

### About Page (`/about`)
- Mission, Why VizTec Exists, What It Does
- Who We Serve (4 audiences), Philosophy (4 principles), Vision
- Contact Us CTA button

### Contact Page (`/contact`)
- Form: Name (required), Company Name (optional), Email (required), Phone (optional), Message (required)
- Client-side validation with Zod, saves to `contact_leads` table
- Success confirmation, form clears after submit

---

## Phase 3: Backend & Database (Lovable Cloud / Supabase)

### Database Schema
- **profiles**: id (FK to auth.users), first_name, last_name, company_name, email, phone, industry (admin only), created_at
- **user_roles**: id, user_id (FK to auth.users), role (enum: admin/customer) — separate table, never on profiles
- **reports**: id, report_name, description, iframe_url, created_by_admin_id (FK), created_at
- **customer_reports**: id, customer_id (FK), report_id (FK), assigned_at
- **contact_leads**: id, name, company_name, email, phone, message, created_at

### Security
- `has_role()` security definer function to prevent RLS recursion
- **Admin scoping**: Admins can ONLY see/manage customers and reports they created (via `created_by_admin_id` checks in RLS)
- Customers can only view their own profile and assigned reports
- Contact leads insertable by anonymous/public users
- Trigger to auto-create profile on signup

---

## Phase 4: Authentication Pages

### Login Page (`/login`)
- Email + Password fields
- Role-based redirect: Admin → `/admin/dashboard`, Customer → `/customer/dashboard`
- Link to "Register as Admin"
- Server-side role validation (never client-side localStorage)

### Admin Registration (`/register-admin`)
- Fields: First Name, Last Name, Email, Phone, Industry (dropdown: Freelancer / Business Consultancy / Agency), Password, Confirm Password
- Validates: email uniqueness, password match, all required fields
- Creates auth user + profile + admin role
- Redirects to Login on success

---

## Phase 5: Admin Application

### Admin Layout
- Vertical left sidebar: Dashboard, Customers, Reports
- Top bar: profile info + logout button
- Protected routes — only accessible to admin role (server-validated)

### Admin Dashboard (`/admin/dashboard`)
- Welcome screen with navigation cards: Manage Customers, Manage Reports

### Customer Management (`/admin/customers`)
- **List view**: Table of customers created by this admin, with edit/delete actions
- **Create form**: Customer Name, Company Name (optional), Email, Phone (optional), Password, Confirm Password
- **Edit form**: Same fields but password fields hidden — no accidental password resets on edit
- Admin creates customer auth accounts server-side with customer role assigned

### Report Management (`/admin/reports`)
- **List view**: Table of reports created by this admin, with edit/delete actions
- **Create/Edit form**: Report Name, Description (optional), Embedded iframe URL, Assign Customer (dropdown of admin's customers)
- **iframe URL validation**: Must be valid URL format; warning shown if not HTTPS (not blocked, just warned)
- Saves report and creates/updates customer-report assignment

---

## Phase 6: Customer Application

### Customer Layout
- Simple top navbar with app name, Change Password link, Logout button
- Protected routes — only accessible to customer role

### Customer Dashboard (`/customer/dashboard`)
- Title: "My Reports"
- Card grid showing assigned reports: Report Name, Description, View Report button

### Report Viewer (`/customer/reports/:id`)
- Back button, report title
- Full-width iframe rendering the assigned dashboard URL

### Change Password (`/customer/change-password`)
- Current Password, New Password, Confirm New Password
- Validates current password correctness, new passwords must match
- Updates password, shows success message

