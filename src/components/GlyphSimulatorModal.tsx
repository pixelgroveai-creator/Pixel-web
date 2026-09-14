import React, { useState, useEffect } from 'react';
import { X, Bell, Sliders, Volume2, Smartphone, Play, Pause, RotateCcw, Check, Sparkles } from 'lucide-react';

interface GlyphSimulatorModalProps {
  type: 'essential' | 'delivery' | 'kef' | 'os';
  onClose: () => void;
}

export const GlyphSimulatorModal: React.FC<GlyphSimulatorModalProps> = ({ type, onClose }) => {
  // Mode: Essential Notifications (Phone 4a Pro)
  const [essentialApp, setEssentialApp] = useState<'whatsapp' | 'uber' | 'flight' | 'bank'>('whatsapp');
  const [glyphIlluminated, setGlyphIlluminated] = useState(true);

  // Mode: Glyph Bar Delivery (Phone 4a)
  const [deliveryProgress, setDeliveryProgress] = useState(65);
  const [isPlayingDelivery, setIsPlayingDelivery] = useState(true);

  // Mode: KEF Audio (Headphone 1)
  const [kefPreset, setKefPreset] = useState<'kef_reference' | 'bass_punch' | 'vocal_clarity' | 'spatial'>('kef_reference');
  const [ancEnabled, setAncEnabled] = useState(true);

  // Mode: OS 5.0
  const [osClockFormat, setOsClockFormat] = useState<'dot' | 'clean'>('dot');
  const [widgetToggled, setWidgetToggled] = useState(true);
  const [betaSignedUp, setBetaSignedUp] = useState(false);

  // Delivery Progress auto-advance loop
  useEffect(() => {
    if (type !== 'delivery' || !isPlayingDelivery) return;
    const interval = setInterval(() => {
      setDeliveryProgress((prev) => (prev >= 100 ? 15 : prev + 5));
    }, 900);
    return () => clearInterval(interval);
  }, [type, isPlayingDelivery]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl rounded-3xl bg-[#121212] border border-[#333] shadow-[0_0_50px_rgba(0,0,0,0.9)] overflow-hidden text-white font-mono"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#181818] border-b border-[#262626]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff2a2a] animate-pulse" />
            <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-white">
              {type === 'essential' && 'phone ( 4a ) pro • Essential Notifications'}
              {type === 'delivery' && 'phone ( 4a ) • Live Glyph Bar Delivery Simulator'}
              {type === 'kef' && 'headphone ( 1 ) • KEF Audio Acoustic Lab'}
              {type === 'os' && 'NOTHING OS 5.0 • Interactive Widget Canvas'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-[#737373] hover:text-white hover:bg-[#262626] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* ============================================================== */}
          {/* 1. ESSENTIAL NOTIFICATIONS (Phone 4a Pro) */}
          {/* ============================================================== */}
          {type === 'essential' && (
            <div className="space-y-6">
              <p className="text-xs text-[#a3a3a3] font-sans leading-relaxed">
                Essential Notifications ensure you never miss VIP contacts. The dedicated top Glyph zone remains subtly lit until you unlock your phone.
              </p>

              {/* Interactive Phone Vector Graphic with Animated Glyph Zones */}
              <div className="relative mx-auto w-48 h-80 rounded-[36px] bg-[#000] border-4 border-[#333] shadow-2xl p-4 flex flex-col items-center justify-between overflow-hidden">
                {/* Camera punch hole */}
                <div className="w-3 h-3 rounded-full bg-[#111] border border-[#222]" />

                {/* Back Glyph Visualizer */}
                <div className="relative w-36 h-56 rounded-2xl bg-[#0d0d0d] border border-[#222] p-3 flex flex-col justify-between">
                  {/* Top Essential Glyph Zone */}
                  <div
                    className={`w-full h-8 rounded-lg border transition-all duration-300 flex items-center justify-center ${
                      glyphIlluminated
                        ? 'bg-white shadow-[0_0_20px_#ffffff] border-white text-black'
                        : 'bg-[#141414] border-[#222] text-[#444]'
                    }`}
                  >
                    <span className="text-[9px] font-bold tracking-widest">
                      {glyphIlluminated ? 'GLYPH ACTIVE' : 'STANDBY'}
                    </span>
                  </div>

                  {/* Mid camera loop glyph */}
                  <div className="w-14 h-14 rounded-full border-2 border-[#222] self-center flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-[#ff2a2a] shadow-[0_0_6px_#ff2a2a]" />
                  </div>

                  {/* Bottom battery glyph indicator */}
                  <div className="w-full h-1.5 rounded-full bg-[#222] overflow-hidden">
                    <div className="w-4/5 h-full bg-white/40" />
                  </div>
                </div>

                <div className="text-[10px] text-[#737373]">NOTHING (4a) PRO</div>
              </div>

              {/* Selector Controls */}
              <div className="space-y-2">
                <span className="text-xs text-[#737373] uppercase tracking-wider block">
                  Simulate Inbound Priority Alert:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <button
                    onClick={() => {
                      setEssentialApp('whatsapp');
                      setGlyphIlluminated(true);
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      essentialApp === 'whatsapp'
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-[#171717] text-[#a3a3a3] border-[#2e2e2e] hover:border-[#444]'
                    }`}
                  >
                    WhatsApp (CEO)
                  </button>
                  <button
                    onClick={() => {
                      setEssentialApp('uber');
                      setGlyphIlluminated(true);
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      essentialApp === 'uber'
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-[#171717] text-[#a3a3a3] border-[#2e2e2e] hover:border-[#444]'
                    }`}
                  >
                    Uber Cab Arrived
                  </button>
                  <button
                    onClick={() => {
                      setEssentialApp('flight');
                      setGlyphIlluminated(true);
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      essentialApp === 'flight'
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-[#171717] text-[#a3a3a3] border-[#2e2e2e] hover:border-[#444]'
                    }`}
                  >
                    Gate Boarding
                  </button>
                  <button
                    onClick={() => {
                      setEssentialApp('bank');
                      setGlyphIlluminated(true);
                    }}
                    className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      essentialApp === 'bank'
                        ? 'bg-white text-black border-white font-bold'
                        : 'bg-[#171717] text-[#a3a3a3] border-[#2e2e2e] hover:border-[#444]'
                    }`}
                  >
                    Bank Auth OTP
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-[#222]">
                <button
                  onClick={() => setGlyphIlluminated(!glyphIlluminated)}
                  className="px-4 py-2 rounded-lg bg-[#222] hover:bg-[#333] text-xs text-white cursor-pointer"
                >
                  {glyphIlluminated ? 'Dismiss Notification' : 'Illuminate Glyph'}
                </button>
                <span className="text-xs text-[#737373]">
                  Status: {glyphIlluminated ? 'Subtle Ambient Glow Active' : 'Screen & Back Dark'}
                </span>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 2. GLYPH BAR DELIVERY (Phone 4a) */}
          {/* ============================================================== */}
          {type === 'delivery' && (
            <div className="space-y-6">
              <p className="text-xs text-[#a3a3a3] font-sans leading-relaxed">
                The new linear Glyph Bar shows live progress for food delivery (Zomato / Swiggy), ride sharing, and timers at a single glance without turning on the screen.
              </p>

              {/* Progress Simulation Bar */}
              <div className="p-6 rounded-2xl bg-[#0c0c0c] border border-[#222] space-y-4">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-white font-bold">Zomato Food Delivery #8821</span>
                  <span className="text-[#4cd7f6]">{deliveryProgress}% Completed</span>
                </div>

                {/* Simulated Physical Glyph Light Strip */}
                <div className="space-y-1.5">
                  <div className="text-[10px] text-[#737373] uppercase tracking-widest">
                    PHONE (4a) PHYSICAL GLYPH BAR:
                  </div>
                  <div className="h-5 w-full rounded-full bg-[#1c1c1c] border border-[#333] p-0.5 overflow-hidden flex items-center">
                    <div
                      className="h-full rounded-full bg-white shadow-[0_0_15px_#ffffff] transition-all duration-500"
                      style={{ width: `${deliveryProgress}%` }}
                    />
                  </div>
                </div>

                {/* Stage Indicators */}
                <div className="grid grid-cols-4 gap-2 text-[10px] text-center pt-2">
                  <div className={deliveryProgress >= 25 ? 'text-white font-bold' : 'text-[#555]'}>
                    1. Accepted (25%)
                  </div>
                  <div className={deliveryProgress >= 50 ? 'text-white font-bold' : 'text-[#555]'}>
                    2. Kitchen (50%)
                  </div>
                  <div className={deliveryProgress >= 75 ? 'text-white font-bold' : 'text-[#555]'}>
                    3. On Way (75%)
                  </div>
                  <div className={deliveryProgress >= 100 ? 'text-[#4edea3] font-bold' : 'text-[#555]'}>
                    4. At Door (100%)
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlayingDelivery(!isPlayingDelivery)}
                    className="px-4 py-2 rounded-xl bg-white text-black text-xs font-bold flex items-center gap-1.5 cursor-pointer hover:bg-[#e0e0e0]"
                  >
                    {isPlayingDelivery ? <Pause size={14} /> : <Play size={14} />}
                    <span>{isPlayingDelivery ? 'Pause Stream' : 'Resume Stream'}</span>
                  </button>
                  <button
                    onClick={() => setDeliveryProgress(25)}
                    className="p-2 rounded-xl bg-[#222] text-[#a3a3a3] hover:text-white cursor-pointer"
                    title="Reset to 25%"
                  >
                    <RotateCcw size={14} />
                  </button>
                </div>
                <span className="text-xs text-[#737373]">Live Swiggy / Uber API Hook</span>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 3. KEF ACOUSTIC LAB (Headphone 1) */}
          {/* ============================================================== */}
          {type === 'kef' && (
            <div className="space-y-6">
              <p className="text-xs text-[#a3a3a3] font-sans leading-relaxed">
                Co-developed with legendary British audio master KEF. Switch acoustic sound curves and experience 45dB Smart Active Noise Cancellation.
              </p>

              {/* Animated Equalizer Visualizer */}
              <div className="p-6 rounded-2xl bg-[#0c0c0c] border border-[#222] flex flex-col items-center justify-center space-y-4">
                <div className="flex items-end gap-2 h-24 w-full max-w-sm justify-center">
                  {[40, 65, 85, 55, 95, 75, 60, 80, 50, 90, 70, 45].map((height, i) => (
                    <div
                      key={i}
                      className="w-4 rounded-t bg-gradient-to-t from-[#ff2a2a] to-white transition-all duration-300"
                      style={{
                        height: `${Math.min(100, height * (kefPreset === 'bass_punch' && i < 4 ? 1.3 : 1))}%`
                      }}
                    />
                  ))}
                </div>
                <span className="text-[11px] text-[#737373] uppercase tracking-wider">
                  Preset: {kefPreset.replace('_', ' ').toUpperCase()} • 40mm Planar Driver
                </span>
              </div>

              {/* Presets Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <button
                  onClick={() => setKefPreset('kef_reference')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    kefPreset === 'kef_reference'
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-[#171717] text-[#a3a3a3] border-[#2e2e2e]'
                  }`}
                >
                  KEF Reference
                </button>
                <button
                  onClick={() => setKefPreset('bass_punch')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    kefPreset === 'bass_punch'
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-[#171717] text-[#a3a3a3] border-[#2e2e2e]'
                  }`}
                >
                  Bass Punch
                </button>
                <button
                  onClick={() => setKefPreset('vocal_clarity')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    kefPreset === 'vocal_clarity'
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-[#171717] text-[#a3a3a3] border-[#2e2e2e]'
                  }`}
                >
                  Vocal Clarity
                </button>
                <button
                  onClick={() => setKefPreset('spatial')}
                  className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                    kefPreset === 'spatial'
                      ? 'bg-white text-black border-white font-bold'
                      : 'bg-[#171717] text-[#a3a3a3] border-[#2e2e2e]'
                  }`}
                >
                  Spatial Audio
                </button>
              </div>

              {/* ANC Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#171717] border border-[#2e2e2e]">
                <div>
                  <span className="font-bold text-sm text-white block">Hybrid Smart ANC (45dB)</span>
                  <span className="text-xs text-[#737373]">Blocks environmental noise with inverse acoustic phase</span>
                </div>
                <button
                  onClick={() => setAncEnabled(!ancEnabled)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    ancEnabled ? 'bg-[#4edea3] text-black' : 'bg-[#333] text-white'
                  }`}
                >
                  {ancEnabled ? 'ANC ON' : 'TRANSPARENCY'}
                </button>
              </div>
            </div>
          )}

          {/* ============================================================== */}
          {/* 4. NOTHING OS 5.0 WIDGETS */}
          {/* ============================================================== */}
          {type === 'os' && (
            <div className="space-y-6">
              <p className="text-xs text-[#a3a3a3] font-sans leading-relaxed">
                Nothing OS 5.0 refines the monochrome widget canvas with glanceable real-time updates and ultra-low latency haptics.
              </p>

              {/* Simulated Lockscreen Canvas */}
              <div className="p-6 rounded-2xl bg-[#0c0c0c] border border-[#222] space-y-4">
                <div className="flex items-center justify-between border-b border-[#1f1f1f] pb-3 text-xs text-[#737373]">
                  <span>NOTHING OS 5.0 BETA PREVIEW</span>
                  <span>LUCKNOW • 24°C</span>
                </div>

                {/* Big Dot Matrix Clock */}
                <div className="text-center py-4">
                  <div className="text-5xl sm:text-6xl font-extrabold tracking-tighter text-white font-mono">
                    {osClockFormat === 'dot' ? '12:45' : '12 : 45'}
                  </div>
                  <div className="text-xs text-[#737373] mt-1 uppercase tracking-widest">
                    THURSDAY, 10 SEPTEMBER
                  </div>
                </div>

                {/* Widgets Row */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-xl bg-[#171717] border border-[#292929] text-center space-y-1">
                    <span className="text-[10px] text-[#737373] uppercase">PEDOMETER</span>
                    <div className="text-lg font-bold text-white">8,420</div>
                    <span className="text-[9px] text-[#4edea3]">Goal 84%</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#171717] border border-[#292929] text-center space-y-1">
                    <span className="text-[10px] text-[#737373] uppercase">BATTERY</span>
                    <div className="text-lg font-bold text-white">92%</div>
                    <span className="text-[9px] text-[#737373]">65W Turbo</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#171717] border border-[#292929] text-center space-y-1">
                    <span className="text-[10px] text-[#737373] uppercase">GLYPH TORCH</span>
                    <button
                      onClick={() => setWidgetToggled(!widgetToggled)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold mt-1 cursor-pointer transition-all ${
                        widgetToggled ? 'bg-white text-black' : 'bg-[#292929] text-[#a3a3a3]'
                      }`}
                    >
                      {widgetToggled ? 'ON' : 'OFF'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Beta Enrollment Form */}
              <div className="p-4 rounded-xl bg-[#171717] border border-[#2e2e2e] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div>
                  <span className="font-bold text-xs text-white block">Enroll IMEI / Google Account in Open Beta</span>
                  <span className="text-[11px] text-[#737373]">Receive OTA update directly to phone (4a) or phone (4a) pro</span>
                </div>
                <button
                  onClick={() => setBetaSignedUp(true)}
                  disabled={betaSignedUp}
                  className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer ${
                    betaSignedUp ? 'bg-[#4edea3] text-black' : 'bg-[#ff2a2a] text-white hover:bg-[#e02020]'
                  }`}
                >
                  {betaSignedUp ? 'OTA Requested ✓' : 'Register Now'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
