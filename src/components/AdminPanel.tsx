import React, { useState, useEffect, useMemo } from 'react';
import {
  Lock,
  Unlock,
  Search,
  Filter,
  Download,
  RefreshCw,
  Eye,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  Mail,
  Phone,
  Building2,
  Calendar,
  DollarSign,
  TrendingUp,
  X,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  ArrowUpDown,
  Send,
  Save,
  LogOut,
  Database
} from 'lucide-react';

interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  services: string[];
  budget?: string;
  projectDetails?: string;
  location: string;
  studioNode: string;
  routedTo: string;
  status: 'QUEUED' | 'DISPATCHED' | 'ACKNOWLEDGED' | 'NEW' | 'CONTACTED' | 'QUALIFIED' | 'CONVERTED' | 'ARCHIVED';
  priority: 'HIGH_VELOCITY_SPRINT' | 'STANDARD_QUEUE' | 'ENTERPRISE_PRIORITY';
  authentication?: {
    status: string;
    trustScore: number;
    isGenuine: boolean;
    suspiciousFlags: string[];
  };
  firestoreStored?: boolean;
  supabaseStored?: boolean;
  timestamp: string;
  updatedAt?: string;
  adminNotes?: string;
  source: string;
}

interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone?: string;
  selectedDate: string;
  selectedTime: string;
  callTopic: string;
  routedTo: string;
  meetUrl: string;
  coordinator: string;
  studioLocation: string;
  status: string;
  timestamp: string;
}

interface Stats {
  total: number;
  newCount: number;
  contactedCount: number;
  qualifiedCount: number;
  convertedCount: number;
  archivedCount: number;
  highPriorityCount: number;
  authenticatedCount: number;
}

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  // Authentication state
  const [authToken, setAuthToken] = useState<string | null>(() => {
    return localStorage.getItem('pixelgrove_admin_token') || null;
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Data states
  const [leads, setLeads] = useState<Lead[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'leads' | 'bookings'>('leads');

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [budgetFilter, setBudgetFilter] = useState<string>('ALL');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  // Selected Lead Modal
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [adminNotesInput, setAdminNotesInput] = useState('');
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [isSyncingToFirebase, setIsSyncingToFirebase] = useState(false);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  // Check auth on open
  useEffect(() => {
    if (isOpen && authToken) {
      fetchLeads();
      fetchBookings();
    }
  }, [isOpen, authToken]);

  const handleLogin = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!passwordInput.trim()) {
      setAuthError('Please enter administrator password');
      return;
    }

    setIsAuthenticating(true);
    setAuthError(null);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passwordInput.trim() })
      });

      const data = await res.json();
      if (res.ok && data.token) {
        localStorage.setItem('pixelgrove_admin_token', data.token);
        setAuthToken(data.token);
        setPasswordInput('');
        fetchLeads(data.token);
        fetchBookings(data.token);
      } else {
        setAuthError(data.error || 'Authentication failed. Please check password.');
      }
    } catch {
      setAuthError('Network error while authenticating');
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('pixelgrove_admin_token');
    setAuthToken(null);
    setLeads([]);
    setBookings([]);
    setSelectedLead(null);
  };

  const fetchLeads = async (token = authToken) => {
    if (!token) return;
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (statusFilter !== 'ALL') params.append('status', statusFilter);
      if (budgetFilter !== 'ALL') params.append('budget', budgetFilter);
      params.append('sort', sortOrder);

      const res = await fetch(`/api/admin/leads?${params.toString()}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (res.status === 401) {
        handleLogout();
        return;
      }

      const data = await res.json();
      if (data.success) {
        setLeads(data.leads || []);
        setStats(data.stats || null);
      }
    } catch (err) {
      console.error('Failed to fetch admin leads:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBookings = async (token = authToken) => {
    if (!token) return;
    try {
      const res = await fetch('/api/admin/bookings', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data.success) {
        setBookings(data.bookings || []);
      }
    } catch (err) {
      console.error('Failed to fetch bookings:', err);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: Lead['status']) => {
    if (!authToken) return;
    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ status: newStatus })
      });

      const data = await res.json();
      if (data.success) {
        setLeads((prev) =>
          prev.map((lead) => (lead.id === id ? { ...lead, status: newStatus } : lead))
        );
        if (selectedLead && selectedLead.id === id) {
          setSelectedLead({ ...selectedLead, status: newStatus });
        }
        showSuccess(`Lead status updated to ${newStatus}`);
      }
    } catch {
      alert('Failed to update lead status');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedLead || !authToken) return;
    setIsSavingNotes(true);
    try {
      const res = await fetch(`/api/admin/leads/${selectedLead.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ adminNotes: adminNotesInput })
      });

      const data = await res.json();
      if (data.success) {
        setSelectedLead((prev) => prev ? { ...prev, adminNotes: adminNotesInput } : null);
        setLeads((prev) =>
          prev.map((lead) =>
            lead.id === selectedLead.id ? { ...lead, adminNotes: adminNotesInput } : lead
          )
        );
        showSuccess('Admin internal notes saved');
      }
    } catch {
      alert('Failed to save notes');
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleDeleteLead = async (id: string, name: string) => {
    if (!authToken) return;
    if (!confirm(`Are you sure you want to delete lead ${id} (${name})? This action cannot be undone.`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/leads/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });

      const data = await res.json();
      if (data.success) {
        setLeads((prev) => prev.filter((lead) => lead.id !== id));
        if (selectedLead?.id === id) setSelectedLead(null);
        showSuccess(`Lead ${id} deleted`);
      }
    } catch {
      alert('Failed to delete lead');
    }
  };

  const handleExportCsv = () => {
    if (!authToken) return;
    window.open(`/api/admin/export/csv?token=${encodeURIComponent(authToken)}`, '_blank');
  };

  const handleSyncToFirebase = async () => {
    if (!authToken || isSyncingToFirebase) return;
    setIsSyncingToFirebase(true);
    try {
      const res = await fetch('/api/admin/firebase/sync', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${authToken}`
        }
      });
      const data = await res.json();
      if (data.success) {
        showSuccess(`Synced ${data.syncedCount} lead queries to Firebase 'lead_queries' table`);
        fetchLeads();
      } else {
        alert(data.error || 'Failed to sync to Firebase');
      }
    } catch {
      alert('Network error while syncing to Firebase');
    } finally {
      setIsSyncingToFirebase(false);
    }
  };

  const showSuccess = (msg: string) => {
    setActionSuccessMsg(msg);
    setTimeout(() => setActionSuccessMsg(null), 3000);
  };

  const openLeadDetail = (lead: Lead) => {
    setSelectedLead(lead);
    setAdminNotesInput(lead.adminNotes || '');
  };

  const formatIST = (timestampStr: string) => {
    try {
      const d = new Date(timestampStr);
      return new Intl.DateTimeFormat('en-IN', {
        timeZone: 'Asia/Kolkata',
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }).format(d);
    } catch {
      return timestampStr;
    }
  };

  // Status color helpers
  const getStatusBadge = (status?: string) => {
    switch ((status || 'NEW').toUpperCase()) {
      case 'NEW':
      case 'QUEUED':
        return 'bg-[#4edea3]/20 text-[#4edea3] border-[#4edea3]/40';
      case 'DISPATCHED':
      case 'ACKNOWLEDGED':
        return 'bg-[#8083ff]/20 text-[#c0c1ff] border-[#8083ff]/40';
      case 'CONTACTED':
        return 'bg-[#4cd7f6]/20 text-[#4cd7f6] border-[#4cd7f6]/40';
      case 'QUALIFIED':
        return 'bg-[#ffb4ab]/20 text-[#ffb4ab] border-[#ffb4ab]/40';
      case 'CONVERTED':
        return 'bg-[#4edea3]/30 text-[#4edea3] border-[#4edea3]/60 font-semibold';
      case 'ARCHIVED':
        return 'bg-[#464554]/30 text-[#908fa0] border-[#464554]/50';
      default:
        return 'bg-[#464554]/20 text-[#c7c4d7] border-[#464554]/30';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-[#0c0e13]/85 backdrop-blur-xl animate-fade-in overflow-y-auto">
      {/* Container Card */}
      <div className="relative w-full max-w-7xl min-h-[90vh] max-h-[94vh] flex flex-col bg-[#111319] border border-[#464554]/30 rounded-2xl shadow-[0_12px_48px_rgba(0,0,0,0.8)] overflow-hidden">
        {/* Top Header Bar */}
        <div className="h-16 px-4 sm:px-6 border-b border-[#464554]/30 bg-[#161820]/90 flex items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#8083ff]/20 border border-[#8083ff]/40 flex items-center justify-center text-[#c0c1ff]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Pixelgrove Lead Intelligence & Admin Portal
                </h2>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded text-[10px] font-mono uppercase bg-[#282a30] text-[#4edea3] border border-[#4edea3]/30">
                  Node: LKO-IST-01 (Lucknow)
                </span>
              </div>
              <p className="text-xs text-[#908fa0] hidden sm:block">
                Inbound inquiries live synced with Firebase 'lead_queries' table &amp; Firestore persistence
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {authToken && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-[#282a30] hover:bg-[#33353b] text-[#c7c4d7] hover:text-white text-xs font-medium border border-[#464554]/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Log out of Admin Portal"
              >
                <LogOut className="w-3.5 h-3.5 text-[#ffb4ab]" />
                <span className="hidden md:inline">Logout</span>
              </button>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-[#282a30] hover:bg-[#33353b] text-[#c7c4d7] hover:text-white transition-colors cursor-pointer"
              title="Close Admin Panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Action success toast */}
        {actionSuccessMsg && (
          <div className="absolute top-20 right-6 z-50 px-4 py-2 rounded-lg bg-[#166534] text-white text-xs font-medium shadow-lg flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4" />
            {actionSuccessMsg}
          </div>
        )}

        {/* Content Body */}
        {!authToken ? (
          /* ========================================== */
          /* Login Authentication Shield Screen         */
          /* ========================================== */
          <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
            <div className="w-full max-w-md bg-[#161820] border border-[#464554]/40 rounded-xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#8083ff]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#8083ff]/20 border border-[#8083ff]/40 flex items-center justify-center text-[#c0c1ff] mb-4">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">Administrator Sign In</h3>
                <p className="text-xs text-[#908fa0]">
                  Enter your administrative passcode to inspect, update, and export leads.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-[#c7c4d7] mb-1.5">
                    Admin Passcode
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Enter password..."
                    autoFocus
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[#0c0e13] border border-[#464554]/40 focus:border-[#8083ff] focus:outline-none text-white text-sm placeholder-[#908fa0]"
                  />
                  {authError && (
                    <div className="mt-2 text-xs text-[#ffb4ab] flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>{authError}</span>
                    </div>
                  )}
                </div>

                <div className="p-2.5 rounded-lg bg-[#282a30]/50 border border-[#464554]/30 text-[11px] text-[#908fa0] flex items-center justify-between">
                  <span>Default local test passcode:</span>
                  <button
                    type="button"
                    onClick={() => setPasswordInput('pixelgrove2026')}
                    className="text-[#8083ff] hover:text-[#c0c1ff] font-mono font-medium cursor-pointer underline"
                  >
                    pixelgrove2026
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={isAuthenticating}
                  className="w-full py-2.5 px-4 rounded-lg bg-[#8083ff] hover:bg-[#c0c1ff] text-[#0d0096] text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_16px_rgba(128,131,255,0.3)]"
                >
                  {isAuthenticating ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Unlock className="w-4 h-4" />
                      <span>Access Leads Admin Panel</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* ========================================== */
          /* Authenticated Dashboard View               */
          /* ========================================== */
          <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
            {/* Top Metric Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 p-4 sm:p-6 border-b border-[#464554]/20 bg-[#161820]/40 flex-shrink-0">
              <div className="p-3 rounded-xl bg-[#161820] border border-[#464554]/30">
                <span className="text-[11px] text-[#908fa0] uppercase tracking-wider block">
                  Total Leads
                </span>
                <span className="text-xl font-bold text-white font-mono mt-0.5 block">
                  {stats?.total ?? leads.length}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#161820] border border-[#4edea3]/30">
                <span className="text-[11px] text-[#4edea3] uppercase tracking-wider block flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3] animate-pulse" />
                  New / Queued
                </span>
                <span className="text-xl font-bold text-[#4edea3] font-mono mt-0.5 block">
                  {stats?.newCount ?? 0}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#161820] border border-[#8083ff]/30">
                <span className="text-[11px] text-[#c0c1ff] uppercase tracking-wider block">
                  High Priority
                </span>
                <span className="text-xl font-bold text-[#c0c1ff] font-mono mt-0.5 block">
                  {stats?.highPriorityCount ?? 0}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#161820] border border-[#4cd7f6]/30">
                <span className="text-[11px] text-[#4cd7f6] uppercase tracking-wider block">
                  Contacted
                </span>
                <span className="text-xl font-bold text-[#4cd7f6] font-mono mt-0.5 block">
                  {stats?.contactedCount ?? 0}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#161820] border border-[#464554]/30">
                <span className="text-[11px] text-[#c7c4d7] uppercase tracking-wider block">
                  Qualified / Converted
                </span>
                <span className="text-xl font-bold text-white font-mono mt-0.5 block">
                  {(stats?.qualifiedCount ?? 0) + (stats?.convertedCount ?? 0)}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-[#161820] border border-[#464554]/30">
                <span className="text-[11px] text-[#c7c4d7] uppercase tracking-wider block">
                  Strategy Bookings
                </span>
                <span className="text-xl font-bold text-[#4edea3] font-mono mt-0.5 block">
                  {bookings.length}
                </span>
              </div>
            </div>

            {/* Filter and Control Bar */}
            <div className="p-4 sm:px-6 border-b border-[#464554]/20 bg-[#161820]/20 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 flex-shrink-0">
              {/* Tab Switcher */}
              <div className="flex items-center gap-1.5 p-1 bg-[#161820] rounded-lg border border-[#464554]/30">
                <button
                  onClick={() => setActiveTab('leads')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeTab === 'leads'
                      ? 'bg-[#8083ff] text-[#0d0096] font-semibold shadow-sm'
                      : 'text-[#c7c4d7] hover:text-white'
                  }`}
                >
                  Captured Leads ({leads.length})
                </button>
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                    activeTab === 'bookings'
                      ? 'bg-[#8083ff] text-[#0d0096] font-semibold shadow-sm'
                      : 'text-[#c7c4d7] hover:text-white'
                  }`}
                >
                  Strategy Calls ({bookings.length})
                </button>
              </div>

              {/* Search & Actions */}
              <div className="flex flex-wrap items-center gap-2.5">
                {/* Search input */}
                <div className="relative min-w-[220px] flex-1 md:flex-initial">
                  <Search className="w-4 h-4 text-[#908fa0] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && fetchLeads()}
                    placeholder="Search name, email, company..."
                    className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[#161820] border border-[#464554]/40 text-xs text-white placeholder-[#908fa0] focus:border-[#8083ff] focus:outline-none"
                  />
                </div>

                {/* Status selector */}
                {activeTab === 'leads' && (
                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setTimeout(() => fetchLeads(), 50);
                    }}
                    className="px-2.5 py-1.5 rounded-lg bg-[#161820] border border-[#464554]/40 text-xs text-[#c7c4d7] focus:border-[#8083ff] focus:outline-none cursor-pointer"
                  >
                    <option value="ALL">All Statuses</option>
                    <option value="NEW">New / Queued</option>
                    <option value="DISPATCHED">Dispatched</option>
                    <option value="CONTACTED">Contacted</option>
                    <option value="QUALIFIED">Qualified</option>
                    <option value="CONVERTED">Converted</option>
                    <option value="ARCHIVED">Archived</option>
                  </select>
                )}

                {/* Refresh */}
                <button
                  onClick={() => {
                    fetchLeads();
                    fetchBookings();
                  }}
                  disabled={isLoading}
                  className="p-1.5 rounded-lg bg-[#161820] hover:bg-[#282a30] text-[#c7c4d7] hover:text-white border border-[#464554]/40 transition-colors cursor-pointer"
                  title="Refresh Leads"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#8083ff]' : ''}`} />
                </button>

                {/* Sync to Firebase lead_queries table */}
                <button
                  onClick={handleSyncToFirebase}
                  disabled={isSyncingToFirebase}
                  className="px-3 py-1.5 rounded-lg bg-[#282a30] hover:bg-[#33353b] text-[#c7c4d7] hover:text-white border border-[#8083ff]/40 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  title="Sync all lead queries to Firebase 'lead_queries' table"
                >
                  <Database className={`w-3.5 h-3.5 ${isSyncingToFirebase ? 'animate-spin text-[#8083ff]' : 'text-[#8083ff]'}`} />
                  <span>{isSyncingToFirebase ? 'Syncing...' : 'Sync to Firebase'}</span>
                </button>

                {/* CSV Export */}
                <button
                  onClick={handleExportCsv}
                  className="px-3 py-1.5 rounded-lg bg-[#282a30] hover:bg-[#33353b] text-[#c7c4d7] hover:text-white border border-[#464554]/40 text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Export all leads to CSV"
                >
                  <Download className="w-3.5 h-3.5 text-[#4edea3]" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Scrollable Table Area */}
            <div className="flex-1 overflow-auto p-4 sm:p-6 min-h-0">
              {activeTab === 'leads' ? (
                /* ========================================== */
                /* LEADS TABLE                                */
                /* ========================================== */
                leads.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-center p-6 rounded-xl bg-[#161820]/30 border border-dashed border-[#464554]/30">
                    <Building2 className="w-10 h-10 text-[#908fa0] mb-3 opacity-40" />
                    <h4 className="text-sm font-semibold text-white mb-1">No Leads Found</h4>
                    <p className="text-xs text-[#908fa0] max-w-sm">
                      No customer inquiries match the current filter criteria, or no submissions have been captured yet.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl border border-[#464554]/30 overflow-hidden bg-[#161820]/50 shadow-md">
                    <table className="w-full text-left text-xs text-[#c7c4d7] border-collapse">
                      <thead className="bg-[#161820] text-[#908fa0] uppercase tracking-wider font-mono text-[11px] border-b border-[#464554]/30">
                        <tr>
                          <th className="py-3 px-4 font-semibold">Dispatch ID</th>
                          <th className="py-3 px-4 font-semibold">Client / Company</th>
                          <th className="py-3 px-4 font-semibold">Contact Details</th>
                          <th className="py-3 px-4 font-semibold">Services & Budget</th>
                          <th className="py-3 px-4 font-semibold">Date (IST)</th>
                          <th className="py-3 px-4 font-semibold">Status</th>
                          <th className="py-3 px-4 font-semibold text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#464554]/20">
                        {leads.map((lead) => (
                          <tr
                            key={lead.id}
                            className="hover:bg-[#282a30]/40 transition-colors group cursor-pointer"
                            onClick={() => openLeadDetail(lead)}
                          >
                            {/* ID & Priority */}
                            <td className="py-3.5 px-4 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <span className="font-mono font-medium text-white group-hover:text-[#8083ff] transition-colors">
                                  {lead.id}
                                </span>
                              </div>
                              <div className="flex items-center gap-1 mt-0.5">
                                {lead.priority === 'HIGH_VELOCITY_SPRINT' ? (
                                  <span className="inline-block px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#8083ff]/20 text-[#c0c1ff] border border-[#8083ff]/30">
                                    High Priority
                                  </span>
                                ) : (
                                  <span className="inline-block px-1.5 py-0.2 rounded text-[9px] font-mono bg-[#282a30] text-[#908fa0]">
                                    Standard
                                  </span>
                                )}
                              </div>
                            </td>

                            {/* Client & Organization */}
                            <td className="py-3.5 px-4">
                              <div className="font-semibold text-white flex items-center gap-1.5">
                                <span>{lead.name}</span>
                                {lead.authentication?.status === 'AUTHENTICATED' && (
                                  <span title="Verified authentic client" className="text-[#4edea3]">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-[#908fa0] flex items-center gap-1 mt-0.5">
                                <Building2 className="w-3 h-3 text-[#908fa0]" />
                                <span>{lead.company || 'Private Client'}</span>
                              </div>
                            </td>

                            {/* Email & Phone */}
                            <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                              <div className="flex items-center gap-1 text-[#c7c4d7]">
                                <Mail className="w-3 h-3 text-[#8083ff]" />
                                <a
                                  href={`mailto:${lead.email}`}
                                  className="hover:text-white hover:underline truncate max-w-[180px]"
                                >
                                  {lead.email}
                                </a>
                              </div>
                              {lead.phone && (
                                <div className="flex items-center gap-1 text-[11px] text-[#908fa0] mt-0.5">
                                  <Phone className="w-3 h-3 text-[#4edea3]" />
                                  <a href={`tel:${lead.phone}`} className="hover:text-[#4edea3]">
                                    {lead.phone}
                                  </a>
                                </div>
                              )}
                            </td>

                            {/* Services & Budget */}
                            <td className="py-3.5 px-4">
                              <div className="flex flex-wrap gap-1 max-w-[200px]">
                                {(lead.services || ['web']).slice(0, 2).map((srv, idx) => (
                                  <span
                                    key={idx}
                                    className="px-1.5 py-0.5 rounded bg-[#282a30] text-[#c7c4d7] text-[10px]"
                                  >
                                    {srv}
                                  </span>
                                ))}
                                {(lead.services || []).length > 2 && (
                                  <span className="text-[10px] text-[#908fa0]">
                                    +{lead.services.length - 2}
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-[#4edea3] font-mono mt-1">
                                {lead.budget || 'Custom'}
                              </div>
                            </td>

                            {/* Submission Date */}
                            <td className="py-3.5 px-4 whitespace-nowrap text-[11px] font-mono text-[#908fa0]">
                              {formatIST(lead.timestamp)}
                            </td>

                            {/* Status Selector */}
                            <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                              <select
                                value={lead.status || 'NEW'}
                                onChange={(e) => handleUpdateStatus(lead.id, e.target.value as any)}
                                className={`px-2 py-1 rounded text-[11px] font-medium border focus:outline-none cursor-pointer ${getStatusBadge(
                                  lead.status
                                )}`}
                              >
                                <option value="NEW">NEW</option>
                                <option value="CONTACTED">CONTACTED</option>
                                <option value="QUALIFIED">QUALIFIED</option>
                                <option value="CONVERTED">CONVERTED</option>
                                <option value="ARCHIVED">ARCHIVED</option>
                              </select>
                            </td>

                            {/* Actions */}
                            <td
                              className="py-3.5 px-4 text-right whitespace-nowrap"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => openLeadDetail(lead)}
                                  className="p-1.5 rounded bg-[#282a30] hover:bg-[#33353b] text-[#c7c4d7] hover:text-white transition-colors cursor-pointer"
                                  title="View lead requirements & internal notes"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <a
                                  href={`mailto:${lead.email}?subject=Regarding%20your%20inquiry%20to%20Pixelgrove%20AI&body=Hi%20${encodeURIComponent(
                                    lead.name
                                  )},%0A%0AThank%20you%20for%20reaching%20out%20to%20Pixelgrove%20AI%20Studio%20(Lucknow).`}
                                  className="p-1.5 rounded bg-[#282a30] hover:bg-[#8083ff]/30 text-[#8083ff] hover:text-[#c0c1ff] transition-colors cursor-pointer"
                                  title="Reply via Email"
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                </a>
                                <button
                                  onClick={() => handleDeleteLead(lead.id, lead.name)}
                                  className="p-1.5 rounded bg-[#282a30] hover:bg-[#ffb4ab]/20 text-[#908fa0] hover:text-[#ffb4ab] transition-colors cursor-pointer"
                                  title="Delete Lead"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              ) : (
                /* ========================================== */
                /* BOOKINGS TABLE                             */
                /* ========================================== */
                bookings.length === 0 ? (
                  <div className="h-64 flex flex-col items-center justify-center text-center p-6 rounded-xl bg-[#161820]/30 border border-dashed border-[#464554]/30">
                    <Calendar className="w-10 h-10 text-[#908fa0] mb-3 opacity-40" />
                    <h4 className="text-sm font-semibold text-white mb-1">No Strategy Calls Booked Yet</h4>
                    <p className="text-xs text-[#908fa0] max-w-sm">
                      Strategy sessions booked via the 15-Minute Architecture call modal will populate here.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl border border-[#464554]/30 overflow-hidden bg-[#161820]/50 shadow-md">
                    <table className="w-full text-left text-xs text-[#c7c4d7] border-collapse">
                      <thead className="bg-[#161820] text-[#908fa0] uppercase tracking-wider font-mono text-[11px] border-b border-[#464554]/30">
                        <tr>
                          <th className="py-3 px-4 font-semibold">Booking ID</th>
                          <th className="py-3 px-4 font-semibold">Client Name</th>
                          <th className="py-3 px-4 font-semibold">Contact Email</th>
                          <th className="py-3 px-4 font-semibold">Scheduled Date & Time</th>
                          <th className="py-3 px-4 font-semibold">Discussion Agenda</th>
                          <th className="py-3 px-4 font-semibold">Meeting URL</th>
                          <th className="py-3 px-4 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#464554]/20">
                        {bookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-[#282a30]/40 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-medium text-white">
                              {booking.id}
                            </td>
                            <td className="py-3.5 px-4 font-semibold text-white">
                              {booking.clientName}
                            </td>
                            <td className="py-3.5 px-4">
                              <a
                                href={`mailto:${booking.clientEmail}`}
                                className="text-[#8083ff] hover:underline"
                              >
                                {booking.clientEmail}
                              </a>
                            </td>
                            <td className="py-3.5 px-4 font-mono text-white">
                              <span className="text-[#4edea3]">{booking.selectedDate}</span> at{' '}
                              <span className="text-[#c0c1ff]">{booking.selectedTime}</span>
                            </td>
                            <td className="py-3.5 px-4 text-[#c7c4d7] max-w-xs truncate">
                              {booking.callTopic}
                            </td>
                            <td className="py-3.5 px-4">
                              <a
                                href={booking.meetUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-xs text-[#4cd7f6] hover:underline"
                              >
                                <span>Join Room</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#4edea3]/20 text-[#4edea3] border border-[#4edea3]/40">
                                {booking.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* LEAD DETAIL MODAL DRAWER                   */}
        {/* ========================================== */}
        {selectedLead && (
          <div className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-[#0c0e13]/80 backdrop-blur-md animate-fade-in">
            <div className="w-full max-w-2xl bg-[#161820] border border-[#464554]/40 rounded-2xl p-5 sm:p-7 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#464554]/30 pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-[#8083ff]">{selectedLead.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${getStatusBadge(selectedLead.status)}`}>
                      {selectedLead.status || 'NEW'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mt-1">{selectedLead.name}</h3>
                  <p className="text-xs text-[#908fa0]">
                    {selectedLead.company || 'Private Client'} • {selectedLead.location}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedLead(null)}
                  className="p-1.5 rounded-lg bg-[#282a30] hover:bg-[#33353b] text-[#c7c4d7] hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Lead Details Grid */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#0c0e13]/60 border border-[#464554]/30 text-xs mb-4">
                <div>
                  <span className="text-[11px] text-[#908fa0] block">Email</span>
                  <a
                    href={`mailto:${selectedLead.email}`}
                    className="text-white hover:text-[#8083ff] font-medium break-all"
                  >
                    {selectedLead.email}
                  </a>
                </div>
                <div>
                  <span className="text-[11px] text-[#908fa0] block">Phone</span>
                  <a
                    href={`tel:${selectedLead.phone || ''}`}
                    className="text-white hover:text-[#4edea3] font-medium"
                  >
                    {selectedLead.phone || 'Not provided'}
                  </a>
                </div>
                <div>
                  <span className="text-[11px] text-[#908fa0] block">Capital Allocation / Budget</span>
                  <span className="text-[#4edea3] font-mono font-medium">{selectedLead.budget || 'Custom'}</span>
                </div>
                <div>
                  <span className="text-[11px] text-[#908fa0] block">Submission Date (IST)</span>
                  <span className="text-[#c7c4d7] font-mono">{formatIST(selectedLead.timestamp)}</span>
                </div>
              </div>

              {/* Services */}
              <div className="mb-4">
                <span className="text-xs font-semibold text-white block mb-1.5">
                  Requested Engineering Services:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(selectedLead.services || ['web']).map((srv, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-md bg-[#282a30] text-[#c7c4d7] text-xs border border-[#464554]/30"
                    >
                      {srv}
                    </span>
                  ))}
                </div>
              </div>

              {/* Project Requirements text */}
              <div className="mb-4">
                <span className="text-xs font-semibold text-white block mb-1.5">
                  Project Brief & Requirements:
                </span>
                <div className="p-3.5 rounded-xl bg-[#0c0e13] border border-[#464554]/40 text-xs text-[#e2e2ea] whitespace-pre-wrap leading-relaxed">
                  {selectedLead.projectDetails || 'No project description provided.'}
                </div>
              </div>

              {/* Admin Internal Notes Editor */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-semibold text-white">
                    Internal Admin Notes:
                  </span>
                  <span className="text-[11px] text-[#908fa0]">
                    Only visible to studio team
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={adminNotesInput}
                  onChange={(e) => setAdminNotesInput(e.target.value)}
                  placeholder="e.g., Called client on 14 Sept; agreed to sprint kickoff on Monday; quote sent ₹6.5L..."
                  className="w-full p-3 rounded-xl bg-[#0c0e13] border border-[#464554]/40 text-xs text-white placeholder-[#908fa0] focus:border-[#8083ff] focus:outline-none"
                />
                <button
                  onClick={handleSaveNotes}
                  disabled={isSavingNotes}
                  className="mt-2 px-3 py-1.5 rounded-lg bg-[#8083ff] hover:bg-[#c0c1ff] text-[#0d0096] text-xs font-semibold transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isSavingNotes ? 'Saving...' : 'Save Notes'}</span>
                </button>
              </div>

              {/* Quick Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#464554]/30">
                <div className="flex items-center gap-2">
                  <select
                    value={selectedLead.status || 'NEW'}
                    onChange={(e) => handleUpdateStatus(selectedLead.id, e.target.value as any)}
                    className="px-2.5 py-1.5 rounded-lg bg-[#282a30] text-xs font-medium text-white border border-[#464554]/40 focus:outline-none cursor-pointer"
                  >
                    <option value="NEW">Status: NEW</option>
                    <option value="CONTACTED">Status: CONTACTED</option>
                    <option value="QUALIFIED">Status: QUALIFIED</option>
                    <option value="CONVERTED">Status: CONVERTED</option>
                    <option value="ARCHIVED">Status: ARCHIVED</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${selectedLead.email}?subject=Pixelgrove%20AI%20Discovery%20Response%20-%20${selectedLead.id}`}
                    className="px-3 py-1.5 rounded-lg bg-[#8083ff]/20 hover:bg-[#8083ff]/30 text-[#c0c1ff] text-xs font-medium border border-[#8083ff]/40 transition-colors flex items-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send Email Reply</span>
                  </a>
                  {selectedLead.phone && (
                    <a
                      href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-[#166534]/40 hover:bg-[#166534]/60 text-[#4edea3] text-xs font-medium border border-[#4edea3]/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
