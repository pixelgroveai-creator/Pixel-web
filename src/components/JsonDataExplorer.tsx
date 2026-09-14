import React, { useState } from 'react';
import { X, Code2, Copy, Check, Download, RefreshCw, FileText, Database } from 'lucide-react';
import { NOTHING_STORE_DATA } from '../data/nothingStoreData';
import { CERTIFICATE_TRANSPARENCY_DATA } from '../data/certificateTransparencyData';

interface JsonDataExplorerProps {
  onClose: () => void;
}

export const JsonDataExplorer: React.FC<JsonDataExplorerProps> = ({ onClose }) => {
  const [activeFile, setActiveFile] = useState<'nothing' | 'ct'>('nothing');
  const [copied, setCopied] = useState(false);
  const [isFetchingLive, setIsFetchingLive] = useState(false);
  const [filterKeyword, setFilterKeyword] = useState('');

  const currentJsonString =
    activeFile === 'nothing'
      ? JSON.stringify(NOTHING_STORE_DATA, null, 2)
      : JSON.stringify(CERTIFICATE_TRANSPARENCY_DATA, null, 2);

  const handleCopy = () => {
    navigator.clipboard.writeText(currentJsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const filename =
      activeFile === 'nothing'
        ? 'nothing_store_india_scrape.json'
        : 'certificate_transparency_v89.30.json';
    const blob = new Blob([currentJsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleTestBackendEndpoint = async () => {
    setIsFetchingLive(true);
    try {
      const endpoint =
        activeFile === 'nothing'
          ? '/api/json-data/nothing'
          : '/api/json-data/certificate-transparency';
      const res = await fetch(endpoint);
      if (res.ok) {
        const json = await res.json();
        console.log('[API TEST] Received live data from', endpoint, json);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setIsFetchingLive(false), 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl h-[85vh] rounded-3xl bg-[#121212] border border-[#333] shadow-[0_0_60px_rgba(0,0,0,0.9)] flex flex-col overflow-hidden text-white font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#181818] border-b border-[#262626]">
          <div className="flex items-center gap-3">
            <Code2 size={18} className="text-[#ff2a2a]" />
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
              Supported JSON Files &amp; API Datasets
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#737373] hover:text-white hover:bg-[#262626] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Dataset Tabs & Action Bar */}
        <div className="px-6 py-3 bg-[#141414] border-b border-[#242424] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveFile('nothing')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                activeFile === 'nothing'
                  ? 'bg-white text-black font-bold'
                  : 'bg-[#1e1e1e] text-[#a3a3a3] hover:text-white'
              }`}
            >
              <FileText size={13} />
              <span>Nothing Store (in.nothing.tech)</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/20">JSON 1</span>
            </button>

            <button
              onClick={() => setActiveFile('ct')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer ${
                activeFile === 'ct'
                  ? 'bg-white text-black font-bold'
                  : 'bg-[#1e1e1e] text-[#a3a3a3] hover:text-white'
              }`}
            >
              <Database size={13} />
              <span>Certificate Transparency (v89.30)</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-black/20">JSON 2</span>
            </button>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={handleTestBackendEndpoint}
              className="px-3 py-1.5 rounded-lg bg-[#222] hover:bg-[#333] text-[#d4d4d4] hover:text-white flex items-center gap-1.5 cursor-pointer"
              title="Test backend API route"
            >
              <RefreshCw size={13} className={isFetchingLive ? 'animate-spin text-[#ff2a2a]' : ''} />
              <span>Query /api</span>
            </button>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg bg-[#222] hover:bg-[#333] text-[#d4d4d4] hover:text-white flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check size={13} className="text-[#4edea3]" /> : <Copy size={13} />}
              <span>{copied ? 'Copied' : 'Copy JSON'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 rounded-lg bg-white text-black font-bold hover:bg-[#e0e0e0] flex items-center gap-1.5 cursor-pointer"
            >
              <Download size={13} />
              <span>Download .json</span>
            </button>
          </div>
        </div>

        {/* JSON Code Viewer Container */}
        <div className="flex-1 p-6 overflow-y-auto bg-[#0a0a0a] text-xs font-mono">
          <pre className="text-[#a3a3a3] leading-relaxed select-text whitespace-pre-wrap">
            {currentJsonString}
          </pre>
        </div>

        {/* Footer info strip */}
        <div className="px-6 py-2.5 bg-[#141414] border-t border-[#222] flex items-center justify-between text-[11px] text-[#737373]">
          <span>
            {activeFile === 'nothing'
              ? 'ENDPOINT: GET /api/json-data/nothing • 4 Hardware Records'
              : 'ENDPOINT: GET /api/json-data/certificate-transparency • 7 Operators • 30+ RFC Logs'}
          </span>
          <span className="text-[#4edea3]">● Supported &amp; Synchronized in Memory</span>
        </div>
      </div>
    </div>
  );
};
