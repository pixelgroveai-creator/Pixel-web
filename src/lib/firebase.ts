import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import {
  getFirestore,
  Firestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  orderBy,
  getDocFromServer
} from 'firebase/firestore';
import fs from 'fs';
import path from 'path';

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
  status?: 'QUEUED' | 'DISPATCHED' | 'ACKNOWLEDGED' | 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'ARCHIVED';
  priority?: 'STANDARD_QUEUE' | 'HIGH_VELOCITY_SPRINT' | 'ENTERPRISE_PRIORITY';
  trust_score?: number;
  authentication_status?: 'AUTHENTICATED' | 'FLAGGED_FOR_MANUAL_REVIEW';
  suspicious_flags?: string[];
  routed_to?: string;
  source?: string;
  ip_address?: string | null;
  user_agent?: string | null;
  adminNotes?: string;
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

let firebaseAppInstance: FirebaseApp | null = null;
let firestoreDbInstance: Firestore | null = null;

export function getFirebaseConfig() {
  try {
    const configPath = path.join(process.cwd(), 'firebase-applet-config.json');
    if (fs.existsSync(configPath)) {
      const raw = fs.readFileSync(configPath, 'utf8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.warn('[FIREBASE] Could not read firebase-applet-config.json:', err);
  }

  // Fallback if file read fails
  return {
    projectId: 'stoked-moon-28chg',
    appId: '1:436657311148:web:8be45a11424f1d17d33e09',
    apiKey: 'AIzaSyBjAlilCfYVi1cbJNSxFiV7zcsJ-Yef9h0',
    authDomain: 'stoked-moon-28chg.firebaseapp.com',
    firestoreDatabaseId: 'ai-studio-mockupflow-ff7becb2-0b7a-414a-bb59-fa2718578c68',
    storageBucket: 'stoked-moon-28chg.firebasestorage.app',
    messagingSenderId: '436657311148'
  };
}

export function isFirebaseConfigured(): boolean {
  const config = getFirebaseConfig();
  return Boolean(config && config.projectId && config.apiKey);
}

export function getFirebaseApp(): FirebaseApp {
  if (firebaseAppInstance) {
    return firebaseAppInstance;
  }
  const existingApps = getApps();
  if (existingApps.length > 0) {
    firebaseAppInstance = existingApps[0];
    return firebaseAppInstance;
  }
  const config = getFirebaseConfig();
  firebaseAppInstance = initializeApp(config);
  return firebaseAppInstance;
}

export function getFirestoreDb(): Firestore | null {
  if (firestoreDbInstance) {
    return firestoreDbInstance;
  }
  try {
    const app = getFirebaseApp();
    const config = getFirebaseConfig();
    const databaseId = config.firestoreDatabaseId || undefined;
    firestoreDbInstance = databaseId ? getFirestore(app, databaseId) : getFirestore(app);
    return firestoreDbInstance;
  } catch (err) {
    console.error('[FIREBASE FIRESTORE INIT ERROR]:', err);
    return null;
  }
}

/**
 * Inserts or updates a lead enquiry into Google Cloud Firestore
 */
export async function insertLeadEnquiryToFirestore(record: LeadEnquiryRecord): Promise<{
  success: boolean;
  docId?: string;
  error?: string;
}> {
  const db = getFirestoreDb();
  if (!db) {
    return {
      success: false,
      error: 'Google Cloud Firestore is not initialized.'
    };
  }

  try {
    const docId = record.dispatch_id;
    const docRef = doc(db, 'leads', docId);
    const dataToSave = {
      id: docId,
      dispatch_id: record.dispatch_id,
      name: record.name,
      email: record.email,
      phone: record.phone || null,
      company: record.company || null,
      services: record.services || ['web'],
      budget: record.budget || '2L-5L',
      projectDetails: record.message,
      message: record.message,
      location: record.location || 'Lucknow',
      studio_node: record.studio_node || 'LKO-IST-01',
      status: record.status || 'NEW',
      priority: record.priority || 'STANDARD_QUEUE',
      trust_score: record.trust_score ?? 100,
      authentication_status: record.authentication_status || 'AUTHENTICATED',
      suspicious_flags: record.suspicious_flags || [],
      routed_to: record.routed_to || 'pixelgrove.ai@gmail.com',
      source: record.source || 'Website Project Discovery Form',
      ip_address: record.ip_address || null,
      user_agent: record.user_agent || null,
      adminNotes: record.adminNotes || '',
      timestamp: record.created_at || new Date().toISOString(),
      created_at: record.created_at || new Date().toISOString(),
      updated_at: record.updated_at || new Date().toISOString()
    };

    await setDoc(docRef, dataToSave, { merge: true });

    // Also persist in dedicated 'lead_queries' table/collection
    const queryDocRef = doc(db, 'lead_queries', docId);
    await setDoc(queryDocRef, dataToSave, { merge: true });

    console.log(`[GOOGLE CLOUD FIRESTORE] Saved lead query ${docId} to 'lead_queries' & 'leads' collections successfully.`);
    return { success: true, docId };
  } catch (err: any) {
    console.error('[GOOGLE CLOUD FIRESTORE INSERT ERROR]:', err);
    return { success: false, error: err?.message || 'Unknown Firestore insert error' };
  }
}

/**
 * Syncs all historical / local leads into the Firebase 'lead_queries' table
 */
export async function syncAllLeadsToFirebase(leads: any[]): Promise<{
  success: boolean;
  syncedCount: number;
  error?: string;
}> {
  const db = getFirestoreDb();
  if (!db) {
    return { success: false, syncedCount: 0, error: 'Firestore not initialized' };
  }

  try {
    let count = 0;
    for (const lead of leads) {
      const docId = lead.id || lead.dispatch_id || `PG-${Date.now().toString().slice(-6)}`;
      const payload = {
        id: docId,
        dispatch_id: lead.dispatch_id || docId,
        name: lead.name || 'Anonymous Client',
        email: lead.email || 'unknown@example.com',
        phone: lead.phone || null,
        company: lead.company || null,
        services: lead.services || ['web'],
        budget: lead.budget || '2L-5L',
        projectDetails: lead.projectDetails || lead.message || '',
        message: lead.message || lead.projectDetails || '',
        location: lead.location || 'Lucknow',
        studio_node: lead.studio_node || 'LKO-IST-01',
        status: lead.status || 'NEW',
        priority: lead.priority || 'STANDARD_QUEUE',
        trust_score: lead.trust_score ?? lead.authentication?.trustScore ?? 100,
        authentication_status: lead.authentication_status ?? lead.authentication?.status ?? 'AUTHENTICATED',
        suspicious_flags: lead.suspicious_flags ?? lead.authentication?.suspiciousFlags ?? [],
        routed_to: lead.routedTo || lead.routed_to || 'pixelgrove.ai@gmail.com',
        source: lead.source || 'Website Project Discovery Form',
        adminNotes: lead.adminNotes || '',
        timestamp: lead.timestamp || lead.created_at || new Date().toISOString(),
        created_at: lead.created_at || lead.timestamp || new Date().toISOString(),
        updated_at: lead.updated_at || new Date().toISOString()
      };

      // Save into both collections
      await setDoc(doc(db, 'lead_queries', docId), payload, { merge: true });
      await setDoc(doc(db, 'leads', docId), payload, { merge: true });
      count++;
    }
    console.log(`[FIREBASE SYNC] Successfully synced ${count} lead queries to 'lead_queries' table in Firestore.`);
    return { success: true, syncedCount: count };
  } catch (err: any) {
    console.error('[FIREBASE SYNC ERROR]:', err);
    return { success: false, syncedCount: 0, error: err?.message };
  }
}

/**
 * Fetches all records directly from the 'lead_queries' table in Firebase
 */
export async function fetchLeadQueriesFromFirestore(): Promise<any[]> {
  const db = getFirestoreDb();
  if (!db) return [];
  try {
    const q = query(collection(db, 'lead_queries'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
  } catch (err) {
    console.error('[FIREBASE FETCH LEAD QUERIES ERROR]:', err);
    return [];
  }
}

/**
 * Inserts a strategy call booking into Google Cloud Firestore
 */
export async function insertBookingToFirestore(record: BookingEnquiryRecord): Promise<{
  success: boolean;
  docId?: string;
  error?: string;
}> {
  const db = getFirestoreDb();
  if (!db) {
    return {
      success: false,
      error: 'Google Cloud Firestore is not initialized.'
    };
  }

  try {
    const docId = record.booking_id;
    const docRef = doc(db, 'bookings', docId);
    const dataToSave = {
      id: docId,
      booking_id: record.booking_id,
      clientName: record.client_name,
      clientEmail: record.client_email,
      clientPhone: record.client_phone || null,
      selectedDate: record.selected_date,
      selectedTime: record.selected_time,
      callTopic: record.call_topic,
      meetUrl: record.meet_url || 'https://meet.google.com/pgr-lead-disc',
      coordinator: record.coordinator || 'Vinayak Grover (Founder and CEO of pixelgrove.ai)',
      studioLocation: record.studio_location || 'Lucknow, Uttar Pradesh, India',
      status: record.status || 'CONFIRMED',
      routedTo: record.routed_to || 'pixelgrove.ai@gmail.com',
      timestamp: record.created_at || new Date().toISOString(),
      created_at: record.created_at || new Date().toISOString(),
      updated_at: record.updated_at || new Date().toISOString()
    };

    await setDoc(docRef, dataToSave, { merge: true });
    console.log(`[GOOGLE CLOUD FIRESTORE] Saved booking ${docId} to 'bookings' collection successfully.`);
    return { success: true, docId };
  } catch (err: any) {
    console.error('[GOOGLE CLOUD FIRESTORE BOOKING INSERT ERROR]:', err);
    return { success: false, error: err?.message || 'Unknown Firestore booking error' };
  }
}

/**
 * Updates a lead in Google Cloud Firestore
 */
export async function updateLeadInFirestore(id: string, updates: Record<string, any>): Promise<boolean> {
  const db = getFirestoreDb();
  if (!db) return false;
  try {
    const patch = {
      ...updates,
      updated_at: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    // Update in leads collection
    const leadRef = doc(db, 'leads', id);
    await updateDoc(leadRef, patch).catch(() => {});

    // Update in lead_queries collection
    const queryRef = doc(db, 'lead_queries', id);
    await updateDoc(queryRef, patch).catch(() => {});

    return true;
  } catch (err) {
    console.error(`[FIRESTORE] Failed to update lead ${id}:`, err);
    return false;
  }
}

/**
 * Deletes a lead in Google Cloud Firestore
 */
export async function deleteLeadFromFirestore(id: string): Promise<boolean> {
  const db = getFirestoreDb();
  if (!db) return false;
  try {
    const leadRef = doc(db, 'leads', id);
    await deleteDoc(leadRef).catch(() => {});

    const queryRef = doc(db, 'lead_queries', id);
    await deleteDoc(queryRef).catch(() => {});

    return true;
  } catch (err) {
    console.error(`[FIRESTORE] Failed to delete lead ${id}:`, err);
    return false;
  }
}

/**
 * Tests connection to Google Cloud Firestore
 */
export async function testFirestoreConnection(): Promise<{
  configured: boolean;
  connected: boolean;
  leadCount?: number;
  leadQueryCount?: number;
  tables?: string[];
  error?: string;
  studioLocation: string;
  node: string;
  projectId: string;
  databaseId?: string;
}> {
  const studioLocation = 'Lucknow, Uttar Pradesh, India';
  const node = 'LKO-IST-01';
  const config = getFirebaseConfig();

  if (!isFirebaseConfigured()) {
    return {
      configured: false,
      connected: false,
      studioLocation,
      node,
      projectId: '',
      error: 'Google Cloud Firebase configuration missing.'
    };
  }

  const db = getFirestoreDb();
  if (!db) {
    return {
      configured: true,
      connected: false,
      studioLocation,
      node,
      projectId: config.projectId,
      error: 'Could not create Firestore database client instance.'
    };
  }

  try {
    // Read count from both collections
    const leadsRef = collection(db, 'leads');
    const leadsSnapshot = await getDocs(leadsRef);

    const leadQueriesRef = collection(db, 'lead_queries');
    const queriesSnapshot = await getDocs(leadQueriesRef);

    return {
      configured: true,
      connected: true,
      leadCount: leadsSnapshot.size,
      leadQueryCount: queriesSnapshot.size,
      tables: ['lead_queries', 'leads', 'bookings'],
      studioLocation,
      node,
      projectId: config.projectId,
      databaseId: config.firestoreDatabaseId
    };
  } catch (err: any) {
    return {
      configured: true,
      connected: false,
      error: err?.message || 'Failed to ping Google Cloud Firestore database',
      studioLocation,
      node,
      projectId: config.projectId,
      databaseId: config.firestoreDatabaseId
    };
  }
}
