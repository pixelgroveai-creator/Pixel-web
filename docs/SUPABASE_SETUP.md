# Supabase Backend Infrastructure: Pixelgrove AI Lead Engine

## Overview
This document guides you through setting up, configuring, and verifying the PostgreSQL database in **Supabase** for capturing and managing lead enquiries and technical strategy bookings submitted through the Pixelgrove AI website.

- **Studio Headquarters:** Lucknow, Uttar Pradesh, India
- **Global Studio Node:** `LKO-IST-01`
- **Primary Routing Inbox:** `pixelgrove.ai@gmail.com`
- **Migration File:** `supabase/migrations/20260914000000_create_lead_enquiries.sql`
- **Master Schema:** `supabase/schema.sql`

---

## 1. Quick Setup in Supabase Dashboard (SQL Editor)

1. Open your [Supabase Dashboard](https://supabase.com/dashboard) and create or select your project.
2. Navigate to the **SQL Editor** in the left sidebar.
3. Click **New query**.
4. Copy and paste the contents of `supabase/schema.sql` (or `supabase/migrations/20260914000000_create_lead_enquiries.sql`).
5. Click **Run**.
6. Verify both tables appear in **Table Editor**:
   - `lead_enquiries`
   - `booking_enquiries`

---

## 2. Database Schema Specification

### Table: `lead_enquiries`
Captures inbound project discovery inquiries and client RFPs.

| Column | Type | Constraints / Defaults | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Unique database identifier |
| `dispatch_id` | `VARCHAR(64)` | `UNIQUE NOT NULL` | Tracking ID, e.g. `PG-829104` |
| `name` | `VARCHAR(255)` | `NOT NULL` | Client / Contact name |
| `email` | `VARCHAR(255)` | `NOT NULL` | Client business email |
| `phone` | `VARCHAR(50)` | `NULLABLE` | Direct contact or WhatsApp number |
| `company` | `VARCHAR(255)` | `NULLABLE` | Organization name |
| `services` | `TEXT[]` | `NOT NULL DEFAULT ARRAY['web']` | Array of requested services (`web`, `restaurant-tech`, `ai-stack`, etc.) |
| `budget` | `VARCHAR(100)` | `DEFAULT '2L-5L'` | Budget tier |
| `message` | `TEXT` | `NOT NULL` | Detailed project scope & goals |
| `location` | `VARCHAR(128)` | `DEFAULT 'Lucknow'` | Studio location handling request (`Lucknow`) |
| `studio_node` | `VARCHAR(64)` | `DEFAULT 'LKO-IST-01'` | Studio node identifier |
| `status` | `VARCHAR(50)` | `CHECK IN ('QUEUED', 'DISPATCHED', ...)` | Status lifecycle |
| `priority` | `VARCHAR(50)` | `CHECK IN ('STANDARD_QUEUE', 'HIGH_VELOCITY_SPRINT', 'ENTERPRISE_PRIORITY')` | Routing priority |
| `trust_score` | `INTEGER` | `DEFAULT 100` | Automated authenticity score (0-100) |
| `authentication_status` | `VARCHAR(64)` | `DEFAULT 'AUTHENTICATED'` | `AUTHENTICATED` or `FLAGGED_FOR_MANUAL_REVIEW` |
| `suspicious_flags` | `TEXT[]` | `DEFAULT ARRAY[]` | Security or quality flags |
| `routed_to` | `VARCHAR(255)` | `DEFAULT 'pixelgrove.ai@gmail.com'` | Destination recipient |
| `source` | `VARCHAR(128)` | `DEFAULT 'Website Project Discovery Form'` | Source referral |
| `ip_address` | `VARCHAR(64)` | `NULLABLE` | Submitter IP address |
| `user_agent` | `TEXT` | `NULLABLE` | Client browser agent |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Submission timestamp |
| `updated_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Auto-updated on record changes |

### Table: `booking_enquiries`
Captures scheduled technical strategy calls and architect consults.

| Column | Type | Constraints / Defaults | Description |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY DEFAULT gen_random_uuid()` | Unique booking identifier |
| `booking_id` | `VARCHAR(64)` | `UNIQUE NOT NULL` | Booking code, e.g. `MEET-391024` |
| `client_name` | `VARCHAR(255)` | `NOT NULL` | Client name |
| `client_email` | `VARCHAR(255)` | `NOT NULL` | Client email address |
| `client_phone` | `VARCHAR(50)` | `NULLABLE` | Direct phone number |
| `selected_date` | `VARCHAR(100)` | `NOT NULL` | Scheduled meeting date |
| `selected_time` | `VARCHAR(100)` | `NOT NULL` | Scheduled time slot (IST) |
| `call_topic` | `TEXT` | `NOT NULL` | Architectural focus / agenda |
| `meet_url` | `TEXT` | `DEFAULT 'https://meet.google.com/pgr-lead-disc'` | Video conference URL |
| `coordinator` | `VARCHAR(255)` | `DEFAULT 'Vinayak Grover...'` | Assigned lead coordinator |
| `studio_location` | `VARCHAR(128)` | `DEFAULT 'Lucknow, Uttar Pradesh, India'` | Studio location (`Lucknow`) |
| `status` | `VARCHAR(50)` | `DEFAULT 'CONFIRMED'` | Booking status |
| `routed_to` | `VARCHAR(255)` | `DEFAULT 'pixelgrove.ai@gmail.com'` | Destination recipient |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Record creation timestamp |
| `updated_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Auto-updated on record changes |

---

## 3. Row Level Security (RLS) Policies

Both tables are secured with Row Level Security:

1. **Anonymous / Public Inserts**: Any visitor on the website can submit a project enquiry or book a meeting (`INSERT` allowed for `anon`, `authenticated`, `service_role`).
2. **Restricted Reads**: Only authenticated studio team members or backend services using the `service_role` secret key can read (`SELECT`) lead submissions.
3. **Restricted Modifications**: Updates and deletions are restricted to `service_role` to prevent tampering.

---

## 4. Environment Variables Setup

Add the following variables to your environment (e.g. `.env` file or cloud secrets):

```env
# Supabase PostgreSQL Configuration
SUPABASE_URL="https://YOUR_PROJECT_ID.supabase.co"
SUPABASE_ANON_KEY="YOUR_SUPABASE_ANON_KEY"
SUPABASE_SERVICE_ROLE_KEY="YOUR_SUPABASE_SERVICE_ROLE_KEY"

# Studio Node
STUDIO_LOCATION="Lucknow, Uttar Pradesh, India"
STUDIO_NODE="LKO-IST-01"
```

The application automatically verifies Supabase connectivity and operates gracefully with durable local fallbacks if credentials are not yet configured.
