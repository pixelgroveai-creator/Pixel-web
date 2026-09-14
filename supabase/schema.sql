-- ==============================================================================
-- Supabase PostgreSQL Master Schema: Pixelgrove AI Lead Engine
-- Location: Lucknow, Uttar Pradesh, India (Node: LKO-IST-01)
-- Target: Supabase SQL Editor / CLI Migration
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 1. Lead Enquiries Table
CREATE TABLE IF NOT EXISTS lead_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    dispatch_id VARCHAR(64) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    company VARCHAR(255),
    services TEXT[] NOT NULL DEFAULT ARRAY['web']::TEXT[],
    budget VARCHAR(100) DEFAULT '2L-5L',
    message TEXT NOT NULL,
    location VARCHAR(128) DEFAULT 'Lucknow',
    studio_node VARCHAR(64) DEFAULT 'LKO-IST-01',
    status VARCHAR(50) NOT NULL DEFAULT 'QUEUED'
        CHECK (status IN ('QUEUED', 'DISPATCHED', 'ACKNOWLEDGED', 'CONTACTED', 'CONVERTED', 'ARCHIVED')),
    priority VARCHAR(50) NOT NULL DEFAULT 'STANDARD_QUEUE'
        CHECK (priority IN ('STANDARD_QUEUE', 'HIGH_VELOCITY_SPRINT', 'ENTERPRISE_PRIORITY')),
    trust_score INTEGER DEFAULT 100
        CHECK (trust_score >= 0 AND trust_score <= 100),
    authentication_status VARCHAR(64) DEFAULT 'AUTHENTICATED'
        CHECK (authentication_status IN ('AUTHENTICATED', 'FLAGGED_FOR_MANUAL_REVIEW')),
    suspicious_flags TEXT[] DEFAULT ARRAY[]::TEXT[],
    routed_to VARCHAR(255) NOT NULL DEFAULT 'pixelgrove.ai@gmail.com',
    source VARCHAR(128) DEFAULT 'Website Project Discovery Form',
    ip_address VARCHAR(64),
    user_agent TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 2. Indexes
CREATE INDEX IF NOT EXISTS idx_lead_enquiries_email ON lead_enquiries (email);
CREATE INDEX IF NOT EXISTS idx_lead_enquiries_created_at ON lead_enquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_lead_enquiries_status ON lead_enquiries (status);
CREATE INDEX IF NOT EXISTS idx_lead_enquiries_priority ON lead_enquiries (priority);
CREATE INDEX IF NOT EXISTS idx_lead_enquiries_phone ON lead_enquiries (phone) WHERE phone IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_lead_enquiries_services ON lead_enquiries USING GIN (services);

-- 3. Trigger for updated_at
DROP TRIGGER IF EXISTS trigger_lead_enquiries_updated_at ON lead_enquiries;
CREATE TRIGGER trigger_lead_enquiries_updated_at
BEFORE UPDATE ON lead_enquiries
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- 4. Bookings Table
CREATE TABLE IF NOT EXISTS booking_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id VARCHAR(64) UNIQUE NOT NULL,
    client_name VARCHAR(255) NOT NULL,
    client_email VARCHAR(255) NOT NULL,
    client_phone VARCHAR(50),
    selected_date VARCHAR(100) NOT NULL,
    selected_time VARCHAR(100) NOT NULL,
    call_topic TEXT NOT NULL,
    meet_url TEXT DEFAULT 'https://meet.google.com/pgr-lead-disc',
    coordinator VARCHAR(255) DEFAULT 'Vinayak Grover (Founder and CEO of pixelgrove.ai)',
    studio_location VARCHAR(128) DEFAULT 'Lucknow, Uttar Pradesh, India',
    status VARCHAR(50) NOT NULL DEFAULT 'CONFIRMED'
        CHECK (status IN ('CONFIRMED', 'RESCHEDULED', 'COMPLETED', 'CANCELLED')),
    routed_to VARCHAR(255) NOT NULL DEFAULT 'pixelgrove.ai@gmail.com',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_booking_enquiries_email ON booking_enquiries (client_email);
CREATE INDEX IF NOT EXISTS idx_booking_enquiries_created_at ON booking_enquiries (created_at DESC);

DROP TRIGGER IF EXISTS trigger_booking_enquiries_updated_at ON booking_enquiries;
CREATE TRIGGER trigger_booking_enquiries_updated_at
BEFORE UPDATE ON booking_enquiries
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- 5. Row Level Security
ALTER TABLE lead_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert into lead_enquiries"
    ON lead_enquiries FOR INSERT TO anon, authenticated, service_role
    WITH CHECK (true);

CREATE POLICY "Allow service_role read access on lead_enquiries"
    ON lead_enquiries FOR SELECT TO service_role, authenticated
    USING (true);

CREATE POLICY "Allow service_role update access on lead_enquiries"
    ON lead_enquiries FOR UPDATE TO service_role
    USING (true);

CREATE POLICY "Allow public insert into booking_enquiries"
    ON booking_enquiries FOR INSERT TO anon, authenticated, service_role
    WITH CHECK (true);

CREATE POLICY "Allow service_role read access on booking_enquiries"
    ON booking_enquiries FOR SELECT TO service_role, authenticated
    USING (true);
