import { createClient, SupabaseClient } from '@supabase/supabase-js';

export interface LeadEnquiryRecord {
  id?: string;
  dispatch_id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  services: string[];
  budget?: string | null;
  message: string;
  location?: string;
  studio_node?: string;
  status?: 'QUEUED' | 'DISPATCHED' | 'ACKNOWLEDGED' | 'CONTACTED' | 'CONVERTED' | 'ARCHIVED';
  priority?: 'STANDARD_QUEUE' | 'HIGH_VELOCITY_SPRINT' | 'ENTERPRISE_PRIORITY';
  trust_score?: number;
  authentication_status?: 'AUTHENTICATED' | 'FLAGGED_FOR_MANUAL_REVIEW';
  suspicious_flags?: string[];
  routed_to?: string;
  source?: string;
  ip_address?: string | null;
  user_agent?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface BookingEnquiryRecord {
  id?: string;
  booking_id: string;
  client_name: string;
  client_email: string;
  client_phone?: string | null;
  selected_date: string;
  selected_time: string;
  call_topic: string;
  meet_url?: string;
  coordinator?: string;
  studio_location?: string;
  status?: 'CONFIRMED' | 'RESCHEDULED' | 'COMPLETED' | 'CANCELLED';
  routed_to?: string;
  created_at?: string;
  updated_at?: string;
}

let supabaseInstance: SupabaseClient | null = null;

function sanitizeUrlAndKey(rawUrl?: string, rawKey?: string): { url: string; key: string } {
  let url = (rawUrl || '').trim();
  let key = (rawKey || '').trim();
  while (url.endsWith('.') || url.endsWith('/')) {
    url = url.slice(0, -1).trim();
  }
  while (key.endsWith('.')) {
    key = key.slice(0, -1).trim();
  }
  return { url, key };
}

/**
 * Returns true if both Supabase URL and an API key are provided
 */
export function isSupabaseConfigured(): boolean {
  const rawUrl = process.env.SUPABASE_URL || (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_URL);
  const rawKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 
                 process.env.SUPABASE_ANON_KEY || 
                 (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_ANON_KEY);
  const { url, key } = sanitizeUrlAndKey(rawUrl, rawKey);
  return Boolean(url.length > 0 && key.length > 0);
}

/**
 * Lazily initialize and return the Supabase client
 */
export function getSupabaseClient(): SupabaseClient | null {
  if (supabaseInstance) {
    return supabaseInstance;
  }

  const rawUrl = process.env.SUPABASE_URL || (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_URL);
  const rawKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 
                 process.env.SUPABASE_ANON_KEY || 
                 (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_SUPABASE_ANON_KEY);

  const { url, key } = sanitizeUrlAndKey(rawUrl, rawKey);

  if (!url || !key) {
    return null;
  }

  try {
    supabaseInstance = createClient(url, key, {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });
    return supabaseInstance;
  } catch (err) {
    console.error('[SUPABASE INIT ERROR]:', err);
    return null;
  }
}

/**
 * Inserts a lead enquiry into Supabase
 */
export async function insertLeadEnquiryToSupabase(record: LeadEnquiryRecord): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> {
  const client = getSupabaseClient();
  if (!client) {
    return {
      success: false,
      error: 'Supabase credentials not configured. Please set SUPABASE_URL and SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY in your environment.'
    };
  }

  try {
    const { data, error } = await client
      .from('lead_enquiries')
      .insert([
        {
          dispatch_id: record.dispatch_id,
          name: record.name,
          email: record.email,
          phone: record.phone || null,
          company: record.company || null,
          services: record.services || ['web'],
          budget: record.budget || '2L-5L',
          message: record.message,
          location: record.location || 'Lucknow',
          studio_node: record.studio_node || 'LKO-IST-01',
          status: record.status || 'DISPATCHED',
          priority: record.priority || 'STANDARD_QUEUE',
          trust_score: record.trust_score ?? 100,
          authentication_status: record.authentication_status || 'AUTHENTICATED',
          suspicious_flags: record.suspicious_flags || [],
          routed_to: record.routed_to || 'pixelgrove.ai@gmail.com',
          source: record.source || 'Website Project Discovery Form',
          ip_address: record.ip_address || null,
          user_agent: record.user_agent || null
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('[SUPABASE INSERT ERROR]:', error.message);
      return { success: false, error: error.message };
    }

    console.log(`[SUPABASE] Successfully stored lead enquiry ${record.dispatch_id} in Lucknow node database.`);
    return { success: true, data };
  } catch (err: any) {
    console.error('[SUPABASE UNEXPECTED ERROR]:', err);
    return { success: false, error: err?.message || 'Unknown Supabase insert error' };
  }
}

/**
 * Inserts a strategy call booking into Supabase
 */
export async function insertBookingToSupabase(record: BookingEnquiryRecord): Promise<{
  success: boolean;
  data?: any;
  error?: string;
}> {
  const client = getSupabaseClient();
  if (!client) {
    return {
      success: false,
      error: 'Supabase credentials not configured.'
    };
  }

  try {
    const { data, error } = await client
      .from('booking_enquiries')
      .insert([
        {
          booking_id: record.booking_id,
          client_name: record.client_name,
          client_email: record.client_email,
          client_phone: record.client_phone || null,
          selected_date: record.selected_date,
          selected_time: record.selected_time,
          call_topic: record.call_topic,
          meet_url: record.meet_url || 'https://meet.google.com/pgr-lead-disc',
          coordinator: record.coordinator || 'Vinayak Grover (Founder and CEO of pixelgrove.ai)',
          studio_location: record.studio_location || 'Lucknow, Uttar Pradesh, India',
          status: record.status || 'CONFIRMED',
          routed_to: record.routed_to || 'pixelgrove.ai@gmail.com'
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('[SUPABASE BOOKING INSERT ERROR]:', error.message);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err?.message || 'Unknown Supabase error' };
  }
}

/**
 * Tests connection and queries table status from Supabase
 */
export async function testSupabaseConnection(): Promise<{
  configured: boolean;
  connected: boolean;
  tableFound?: boolean;
  leadCount?: number;
  error?: string;
  studioLocation: string;
  node: string;
}> {
  const studioLocation = 'Lucknow, Uttar Pradesh, India';
  const node = 'LKO-IST-01';

  if (!isSupabaseConfigured()) {
    return {
      configured: false,
      connected: false,
      studioLocation,
      node,
      error: 'SUPABASE_URL and SUPABASE_ANON_KEY / SUPABASE_SERVICE_ROLE_KEY are not configured in environment.'
    };
  }

  const client = getSupabaseClient();
  if (!client) {
    return {
      configured: true,
      connected: false,
      studioLocation,
      node,
      error: 'Could not create Supabase client instance.'
    };
  }

  try {
    const { count, error } = await client
      .from('lead_enquiries')
      .select('*', { count: 'exact', head: true });

    if (error) {
      return {
        configured: true,
        connected: false,
        tableFound: false,
        error: error.message,
        studioLocation,
        node
      };
    }

    return {
      configured: true,
      connected: true,
      tableFound: true,
      leadCount: count ?? 0,
      studioLocation,
      node
    };
  } catch (err: any) {
    return {
      configured: true,
      connected: false,
      error: err?.message || 'Failed to ping Supabase database',
      studioLocation,
      node
    };
  }
}
