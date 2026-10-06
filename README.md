# Pixelgrove AI Lead Capture, Enquiry API & Admin Intelligence Portal

A full-stack, enterprise-grade lead capture system and administrative management suite engineered for **Pixelgrove AI Studio** (Lucknow Node: `LKO-IST-01`).

---

## 🏛️ System Architecture

```
                                  [Inbound Visitors]
                                          │
                  ┌───────────────────────┴───────────────────────┐
                  ▼                                               ▼
         [Project Discovery Form]                        [Admin Portal UI]
       (POST /api/leads with auth)                   (Protected by Passcode)
                  │                                               │
                  ▼                                               ▼
     ┌─────────────────────────┐                     ┌─────────────────────────┐
     │   Express Backend API   │                     │  Admin REST Endpoints   │
     │  - Input Sanitization   │◄────────────────────┤  - Status & Notes Sync  │
     │  - Authenticity Scoring │                     │  - CSV Export Engine    │
     │  - Dual-Write Routing   │                     │  - Metrics & Pipelines  │
     └────────────┬────────────┘                     └─────────────────────────┘
                  │
        ┌─────────┴────────────────────────┐
        ▼                                  ▼
┌──────────────────┐             ┌─────────────────────────┐
│  Local Data Store│             │   Supabase PostgreSQL   │
│ (data/leads.json)│             │ (lead_enquiries table)  │
│ Zero-config local│             │ RLS, Indexes, Triggers  │
└──────────────────┘             └─────────────────────────┘
```

The system operates on a **Dual-Write Architecture**:
1. **Immediate Local Persistence**: Ingested submissions and updates are recorded synchronously in `/data/leads.json` and `/data/bookings.json`. The app works 100% out of the box locally with zero external dependencies.
2. **Cloud PostgreSQL Database (Supabase)**: When configured via environment variables, submissions are simultaneously synced with PostgreSQL `lead_enquiries` and `booking_enquiries` with Row Level Security (RLS).
3. **Admin Intelligence Panel**: A protected web interface embedded in the app (accessible via the top-bar button, footer link, or direct `#admin` route) providing search, filtering, status transitions, notes, and CSV export.

---

## 🚀 Key Features

### 1. Backend REST API (`server.ts`)
- **`POST /api/leads`**: Ingests new project inquiries with customer data (name, email, phone, company, services, budget, project requirements).
- **`POST /api/admin/login`**: Authenticates admin using `ADMIN_PASSWORD` (default: `pixelgrove2026`). Issues a signed base64 session token.
- **`GET /api/admin/leads`**: Returns paginated/filtered leads with live query parameters (`search`, `status`, `budget`, `sort`).
- **`PATCH /api/admin/leads/:id`**: Updates lead status (`NEW`, `CONTACTED`, `QUALIFIED`, `CONVERTED`, `ARCHIVED`), internal admin notes, or priority.
- **`DELETE /api/admin/leads/:id`**: Removes a lead record.
- **`GET /api/admin/bookings`**: Lists scheduled 1-on-1 architecture strategy calls.
- **`GET /api/admin/stats`**: Aggregate metrics including conversion rates, high-priority counts, and pipeline valuation.
- **`GET /api/admin/export/csv`**: Generates RFC 4180-compliant CSV download for spreadsheet analysis.

### 2. Database Schema (`supabase/schema.sql`)
- PostgreSQL schema defining `lead_enquiries` and `booking_enquiries`.
- Automatically generated UUID primary keys with `gen_random_uuid()`.
- Automated `updated_at` timestamps managed via PostgreSQL triggers.
- Inverted indexes (GIN) on service arrays, B-Tree indexes on `email`, `created_at`, `status`, and `phone`.
- Row Level Security (RLS) policies allowing secure public inserts and service role reads.

### 3. Admin Panel (`src/components/AdminPanel.tsx`)
- **Authentication Gate**: Passcode login with automatic persistent session in `localStorage`.
- **Live Metrics Dashboard**: Quick KPIs for Total Leads, New/Queued, Contacted, Converted, and Strategy Call bookings.
- **Real-Time Search & Filters**: Live query matching across names, emails, phone numbers, companies, notes, and IDs.
- **Status Pipeline Dropdown**: 1-click status update (`NEW` ➔ `CONTACTED` ➔ `QUALIFIED` ➔ `CONVERTED` ➔ `ARCHIVED`).
- **Internal Notes Drawer**: Private team notes stored per lead.
- **One-Click Communication**: Direct `mailto:` and WhatsApp deep links.
- **Export to CSV**: Instant spreadsheet download.

---

## 🛠️ Local Setup & Quickstart

### Prerequisites
- Node.js (v18+ or v20+)
- npm or pnpm

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

Review or adjust `.env`:
```env
# Admin Panel Passcode (used to log into /admin)
ADMIN_PASSWORD="pixelgrove2026"

# Optional: Supabase PostgreSQL credentials
SUPABASE_URL="https://your-project-id.supabase.co"
SUPABASE_ANON_KEY="your-anon-public-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-secret-key"

# Optional: SMTP Email routing
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="pixelgrove.ai@gmail.com"
SMTP_PASS="your-app-password"
```

> **Note**: Even without Supabase or SMTP credentials configured, the system operates seamlessly using local JSON persistence (`data/leads.json`) and the FormSubmit fallback gateway!

### 3. Run Development Server
```bash
npm run dev
```
The server will boot on `http://localhost:3000`.

---

## 📊 Database Setup (PostgreSQL / Supabase)

If you wish to connect a live PostgreSQL database:
1. Open your database management tool or Supabase dashboard at [database.new](https://database.new).
2. Navigate to the **SQL Editor**.
3. Copy and run the contents of [`supabase/schema.sql`](./supabase/schema.sql).
4. Add your database URL and API keys to `.env`.

---

## 🔐 Accessing the Admin Panel

You can open the Admin Portal using any of these methods:
1. Click the **"Admin Leads"** button in the top navigation header.
2. Click the **"Admin Leads Portal"** link in the website footer.
3. Append `#admin` to your browser URL (e.g. `http://localhost:3000/#admin`).

**Default Passcode**: `pixelgrove2026` (or the value of `ADMIN_PASSWORD` in `.env`).

---

## 🧪 Testing the API via cURL

### Ingest a new lead:
```bash
curl -X POST http://localhost:3000/api/leads \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Arjun Sharma",
    "email": "arjun@lucknowventures.in",
    "phone": "+91 98765 43210",
    "company": "Lucknow Ventures",
    "services": ["ai_enterprise", "web_platform"],
    "budget": "5L-10L",
    "projectDetails": "Autonomous customer care agent and web portal for hospitality group."
  }'
```

### Log in to Admin API:
```bash
curl -X POST http://localhost:3000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{"password": "pixelgrove2026"}'
```

### Retrieve leads with search and filter:
```bash
curl -X GET "http://localhost:3000/api/admin/leads?search=Arjun&status=ALL" \
  -H "Authorization: Bearer pixelgrove2026"
```

### Update lead status:
```bash
curl -X PATCH "http://localhost:3000/api/admin/leads/YOUR_LEAD_ID" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer pixelgrove2026" \
  -d '{"status": "CONTACTED", "adminNotes": "Introductory discovery call conducted."}'
```
