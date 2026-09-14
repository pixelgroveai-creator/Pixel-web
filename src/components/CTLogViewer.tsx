import React, { useState, useMemo } from 'react';
import {
  ShieldCheck,
  Search,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  Copy,
  Check,
  Filter,
  Layers,
  Clock,
  Key,
  Database,
  Lock,
  RefreshCw
} from 'lucide-react';
import { CERTIFICATE_TRANSPARENCY_DATA, CTLogEntry, CTOperator } from '../data/certificateTransparencyData';

export const CTLogViewer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOperator, setSelectedOperator] = useState<string>('all');
  const [selectedState, setSelectedState] = useState<string>('all');
  const [logTypeFilter, setLogTypeFilter] = useState<'all' | 'standard' | 'tiled'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Aggregate stats from JSON 2
  const stats = useMemo(() => {
    let totalStandardLogs = 0;
    let totalTiledLogs = 0;
    let usableCount = 0;
    let qualifiedCount = 0;
    let readonlyCount = 0;
    let retiredCount = 0;

    CERTIFICATE_TRANSPARENCY_DATA.operators.forEach((op) => {
      totalStandardLogs += op.logs.length;
      totalTiledLogs += op.tiled_logs.length;

      const allLogs = [...op.logs, ...op.tiled_logs];
      allLogs.forEach((l) => {
        if (l.state.usable) usableCount++;
        else if (l.state.qualified) qualifiedCount++;
        else if (l.state.readonly) readonlyCount++;
        else if (l.state.retired) retiredCount++;
      });
    });

    return {
      operatorsCount: CERTIFICATE_TRANSPARENCY_DATA.operators.length,
      totalLogs: totalStandardLogs + totalTiledLogs,
      totalStandardLogs,
      totalTiledLogs,
      usableCount,
      qualifiedCount,
      readonlyCount,
      retiredCount
    };
  }, []);

  // Filtered operators and logs
  const filteredOperators = useMemo(() => {
    return CERTIFICATE_TRANSPARENCY_DATA.operators
      .filter((op) => {
        if (selectedOperator !== 'all' && op.name !== selectedOperator) return false;
        return true;
      })
      .map((op) => {
        const filterLogs = (logs: CTLogEntry[]) => {
          return logs.filter((log) => {
            // Log state filter
            if (selectedState !== 'all') {
              if (selectedState === 'usable' && !log.state.usable) return false;
              if (selectedState === 'qualified' && !log.state.qualified) return false;
              if (selectedState === 'readonly' && !log.state.readonly) return false;
              if (selectedState === 'retired' && !log.state.retired) return false;
            }

            // Search query filter
            if (searchQuery.trim()) {
              const q = searchQuery.toLowerCase();
              const matchDesc = log.description.toLowerCase().includes(q);
              const matchId = log.log_id.toLowerCase().includes(q);
              const matchUrl = (log.url || log.submission_url || '').toLowerCase().includes(q);
              const matchKey = log.key.toLowerCase().includes(q);
              return matchDesc || matchId || matchUrl || matchKey;
            }

            return true;
          });
        };

        const standard = logTypeFilter === 'tiled' ? [] : filterLogs(op.logs);
        const tiled = logTypeFilter === 'standard' ? [] : filterLogs(op.tiled_logs);

        return {
          ...op,
          logs: standard,
          tiled_logs: tiled,
          totalMatching: standard.length + tiled.length
        };
      })
      .filter((op) => op.totalMatching > 0);
  }, [searchQuery, selectedOperator, selectedState, logTypeFilter]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getStateBadge = (state: CTLogEntry['state']) => {
    if (state.usable) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#4edea3]/10 border border-[#4edea3]/30 text-[#4edea3] text-[10px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4edea3]" />
          USABLE
        </span>
      );
    }
    if (state.qualified) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#4cd7f6]/10 border border-[#4cd7f6]/30 text-[#4cd7f6] text-[10px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#4cd7f6]" />
          QUALIFIED (TILED)
        </span>
      );
    }
    if (state.readonly) {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#ffb74d]/10 border border-[#ffb74d]/30 text-[#ffb74d] text-[10px] font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ffb74d]" />
          READONLY
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#737373]/20 border border-[#737373]/30 text-[#a3a3a3] text-[10px] font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-[#737373]" />
        RETIRED
      </span>
    );
  };

  return (
    <section className="w-full bg-[#0a0a0a] text-white py-12 sm:py-16" id="ct-logs">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Title & Philosophy */}
        <div className="border-b border-[#222] pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1c1c1c] border border-[#ff2a2a]/30 text-xs font-mono text-[#ff2a2a] mb-3">
              <ShieldCheck size={14} />
              <span>TRANSPARENCY PROTOCOL • RFC 6962 / RFC 9162</span>
            </div>
            <h2 className="font-mono text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white">
              Certificate Transparency Directory
            </h2>
            <p className="text-sm sm:text-base text-[#a3a3a3] mt-2 max-w-2xl font-sans">
              Nothing devices, Nothing OS OTA updates, and secure cloud pipelines audit TLS certificates against this public, cryptographically verifiable log list (Version {CERTIFICATE_TRANSPARENCY_DATA.version}).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-3 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-[#737373]">
              SPEC: <strong className="text-white">RFC 6962 &amp; Tiled</strong>
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-[#141414] border border-[#262626] text-[#737373]">
              LOG LIST VER: <strong className="text-[#ff2a2a]">{CERTIFICATE_TRANSPARENCY_DATA.version}</strong>
            </span>
          </div>
        </div>

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#121212] border border-[#222] space-y-1">
            <div className="flex items-center justify-between text-[#737373] text-xs font-mono uppercase">
              <span>Trusted Operators</span>
              <Database size={16} className="text-[#ff2a2a]" />
            </div>
            <div className="text-3xl font-mono font-bold text-white">
              {stats.operatorsCount}
            </div>
            <p className="text-[11px] font-mono text-[#737373]">
              Google, Cloudflare, DigiCert, Let's Encrypt...
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#121212] border border-[#222] space-y-1">
            <div className="flex items-center justify-between text-[#737373] text-xs font-mono uppercase">
              <span>Active Public Logs</span>
              <Layers size={16} className="text-[#4cd7f6]" />
            </div>
            <div className="text-3xl font-mono font-bold text-white">
              {stats.totalLogs}
            </div>
            <p className="text-[11px] font-mono text-[#737373]">
              {stats.totalStandardLogs} Standard + {stats.totalTiledLogs} RFC 9162 Tiled
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#121212] border border-[#222] space-y-1">
            <div className="flex items-center justify-between text-[#737373] text-xs font-mono uppercase">
              <span>Usable / Qualified</span>
              <CheckCircle2 size={16} className="text-[#4edea3]" />
            </div>
            <div className="text-3xl font-mono font-bold text-[#4edea3]">
              {stats.usableCount + stats.qualifiedCount}
            </div>
            <p className="text-[11px] font-mono text-[#737373]">
              Active ingestion &amp; cryptographic audit
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#121212] border border-[#222] space-y-1">
            <div className="flex items-center justify-between text-[#737373] text-xs font-mono uppercase">
              <span>Max Merge Delay</span>
              <Clock size={16} className="text-[#ffb74d]" />
            </div>
            <div className="text-3xl font-mono font-bold text-white">
              60s – 24h
            </div>
            <p className="text-[11px] font-mono text-[#737373]">
              Tiled logs deliver sub-minute guarantees
            </p>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="p-4 rounded-2xl bg-[#141414] border border-[#262626] flex flex-col md:flex-row items-stretch md:items-center gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#737373]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by log name, log ID, operator, or URL..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c0c0c] border border-[#2e2e2e] text-xs font-mono text-white placeholder-[#555] focus:outline-none focus:border-white transition-colors"
            />
          </div>

          {/* Operator Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <select
              value={selectedOperator}
              onChange={(e) => setSelectedOperator(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-[#0c0c0c] border border-[#2e2e2e] text-xs font-mono text-white focus:outline-none focus:border-white"
            >
              <option value="all">All Operators ({CERTIFICATE_TRANSPARENCY_DATA.operators.length})</option>
              {CERTIFICATE_TRANSPARENCY_DATA.operators.map((op) => (
                <option key={op.name} value={op.name}>
                  {op.name}
                </option>
              ))}
            </select>

            {/* State Filter */}
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-[#0c0c0c] border border-[#2e2e2e] text-xs font-mono text-white focus:outline-none focus:border-white"
            >
              <option value="all">All States</option>
              <option value="usable">Usable ({stats.usableCount})</option>
              <option value="qualified">Qualified Tiled ({stats.qualifiedCount})</option>
              <option value="readonly">Readonly ({stats.readonlyCount})</option>
              <option value="retired">Retired ({stats.retiredCount})</option>
            </select>

            {/* Log Type Toggle */}
            <div className="flex items-center rounded-xl bg-[#0c0c0c] border border-[#2e2e2e] p-0.5 text-xs font-mono">
              <button
                onClick={() => setLogTypeFilter('all')}
                className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  logTypeFilter === 'all' ? 'bg-white text-black font-bold' : 'text-[#737373] hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setLogTypeFilter('standard')}
                className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  logTypeFilter === 'standard' ? 'bg-white text-black font-bold' : 'text-[#737373] hover:text-white'
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setLogTypeFilter('tiled')}
                className={`px-3 py-2 rounded-lg transition-colors cursor-pointer ${
                  logTypeFilter === 'tiled' ? 'bg-white text-black font-bold' : 'text-[#737373] hover:text-white'
                }`}
              >
                Tiled
              </button>
            </div>
          </div>
        </div>

        {/* Operators & Logs Explorer List */}
        <div className="space-y-8">
          {filteredOperators.length === 0 ? (
            <div className="p-12 text-center rounded-2xl bg-[#121212] border border-[#222] space-y-3">
              <AlertCircle size={32} className="text-[#ff2a2a] mx-auto" />
              <p className="font-mono text-sm text-white">No Certificate Transparency logs matched your filter criteria.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedOperator('all');
                  setSelectedState('all');
                  setLogTypeFilter('all');
                }}
                className="px-4 py-2 rounded-full bg-[#222] hover:bg-[#333] text-xs font-mono text-white cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            filteredOperators.map((operator) => {
              const allLogs = [
                ...operator.logs.map((l) => ({ ...l, isTiled: false })),
                ...operator.tiled_logs.map((l) => ({ ...l, isTiled: true }))
              ];

              return (
                <div
                  key={operator.name}
                  className="rounded-3xl bg-[#121212] border border-[#222] overflow-hidden"
                >
                  {/* Operator Header Bar */}
                  <div className="px-6 py-4 bg-[#171717] border-b border-[#242424] flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-white" />
                      <h3 className="font-mono text-lg font-bold text-white uppercase tracking-wider">
                        {operator.name}
                      </h3>
                      <span className="text-xs font-mono text-[#737373]">
                        ({operator.email.join(', ')})
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="px-2.5 py-1 rounded-md bg-[#222] text-[#d4d4d4]">
                        {allLogs.length} {allLogs.length === 1 ? 'log' : 'logs'} listed
                      </span>
                    </div>
                  </div>

                  {/* Operator Log Entries Grid */}
                  <div className="p-6 grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {allLogs.map((log, lIndex) => {
                      const logKeyId = `${operator.name}-${lIndex}-${log.log_id.slice(0, 10)}`;

                      return (
                        <div
                          key={logKeyId}
                          className="p-5 rounded-2xl bg-[#0c0c0c] border border-[#1f1f1f] hover:border-[#333] transition-all space-y-3 font-mono text-xs"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white text-sm">
                                  {log.description}
                                </span>
                                {log.isTiled && (
                                  <span className="px-1.5 py-0.5 rounded bg-[#4cd7f6]/10 border border-[#4cd7f6]/30 text-[#4cd7f6] text-[9px] uppercase tracking-wider">
                                    RFC 9162 Tiled
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-[#737373] block mt-0.5">
                                MMD: {log.mmd}s ({log.mmd === 60 ? 'Instant Tiled Feed' : '24-hour SLA'})
                              </span>
                            </div>
                            {getStateBadge(log.state)}
                          </div>

                          {/* Endpoint URLs */}
                          <div className="p-3 rounded-xl bg-[#141414] border border-[#222] space-y-1 text-[11px]">
                            {log.url && (
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[#737373]">URL:</span>
                                <a
                                  href={log.url}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[#4cd7f6] hover:underline truncate max-w-[280px] sm:max-w-xs flex items-center gap-1"
                                >
                                  <span className="truncate">{log.url}</span>
                                  <ExternalLink size={11} />
                                </a>
                              </div>
                            )}

                            {log.submission_url && (
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[#737373]">SUBMISSION:</span>
                                <span className="text-[#a3a3a3] truncate max-w-[280px] sm:max-w-xs">
                                  {log.submission_url}
                                </span>
                              </div>
                            )}

                            {log.monitoring_url && (
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-[#737373]">MONITORING:</span>
                                <span className="text-[#a3a3a3] truncate max-w-[280px] sm:max-w-xs">
                                  {log.monitoring_url}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Cryptographic Log ID & Public Key */}
                          <div className="space-y-1.5 pt-1">
                            <div className="flex items-center justify-between text-[11px]">
                              <span className="text-[#737373] flex items-center gap-1">
                                <Key size={11} className="text-[#ff2a2a]" />
                                LOG_ID (SHA-256 Hash):
                              </span>
                              <button
                                onClick={() => handleCopy(log.log_id, `${logKeyId}-id`)}
                                className="text-[#a3a3a3] hover:text-white flex items-center gap-1 cursor-pointer"
                                title="Copy Log ID"
                              >
                                {copiedId === `${logKeyId}-id` ? (
                                  <>
                                    <Check size={11} className="text-[#4edea3]" />
                                    <span className="text-[#4edea3]">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy size={11} />
                                    <span>Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                            <div className="p-2 rounded-lg bg-[#141414] text-[#d4d4d4] font-mono text-[10px] truncate border border-[#1f1f1f]">
                              {log.log_id}
                            </div>
                          </div>

                          {/* Readonly Final Tree Head if present (e.g. Sectigo) */}
                          {log.state.readonly?.final_tree_head && (
                            <div className="p-2.5 rounded-lg bg-[#1a1408] border border-[#ffb74d]/30 text-[10px] space-y-1">
                              <div className="text-[#ffb74d] font-bold">
                                FINAL TREE HEAD (FROZEN ARCHIVE):
                              </div>
                              <div className="text-[#e2e2ea]">
                                Size: {log.state.readonly.final_tree_head.tree_size.toLocaleString()} certificates
                              </div>
                              <div className="text-[#a3a3a3] truncate">
                                Root: {log.state.readonly.final_tree_head.sha256_root_hash}
                              </div>
                            </div>
                          )}

                          {/* Temporal Validity Interval */}
                          <div className="flex items-center justify-between text-[10px] text-[#737373] pt-1 border-t border-[#1a1a1a]">
                            <span>
                              START: {new Date(log.temporal_interval.start_inclusive).toLocaleDateString()}
                            </span>
                            <span>
                              EXPIRY: {new Date(log.temporal_interval.end_exclusive).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
