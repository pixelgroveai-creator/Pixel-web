import React, { useEffect, useRef, useState } from 'react';
import { Waves, Play, Pause, Compass, Sparkles, Wind } from 'lucide-react';

interface FluidGalaxyBackgroundProps {
  interactive?: boolean;
}

export const FluidGalaxyBackground: React.FC<FluidGalaxyBackgroundProps> = ({ interactive = true }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageElementRef = useRef<HTMLImageElement | null>(null);

  // Flow State
  const [isPlaying, setIsPlaying] = useState(true);
  const [flowSpeedMode, setFlowSpeedMode] = useState<'gentle' | 'river' | 'surge'>('river');
  const [currentDeg, setCurrentDeg] = useState(0);
  const [currentVelocityText, setCurrentVelocityText] = useState('0.09°/s');
  const [showControls, setShowControls] = useState(false);

  // Physics refs
  const physicsRef = useRef({
    angle: 0,
    speedMultiplier: 1.0,
    isPaused: false,
    mouse: { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, moving: false },
    lastTime: performance.now(),
    particles: [] as Array<{
      x: number;
      y: number;
      radius: number;
      angle: number;
      dist: number;
      speed: number;
      baseColor: string;
      glowColor: string;
      alpha: number;
      pulseRate: number;
      phase: number;
    }>,
    ripples: [] as Array<{
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      alpha: number;
    }>
  });

  // Keep state sync with refs
  useEffect(() => {
    physicsRef.current.isPaused = !isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    switch (flowSpeedMode) {
      case 'gentle':
        physicsRef.current.speedMultiplier = 0.55;
        break;
      case 'river':
        physicsRef.current.speedMultiplier = 1.0;
        break;
      case 'surge':
        physicsRef.current.speedMultiplier = 1.75;
        break;
    }
  }, [flowSpeedMode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Create River Flowing Bioluminescent Synaptic Particles
    const particleCount = 140;
    const particles = [];
    const colors = [
      { base: 'rgba(255, 179, 71, ', glow: '#ffb347' }, // Amber synaptic
      { base: 'rgba(255, 77, 148, ', glow: '#ff4d94' }, // Magenta glow
      { base: 'rgba(128, 131, 255, ', glow: '#8083ff' }, // Electric indigo
      { base: 'rgba(76, 215, 246, ', glow: '#4cd7f6' }, // Cyan current
      { base: 'rgba(255, 220, 140, ', glow: '#ffdc8c' }  // Warm star
    ];

    const maxDim = Math.max(width, height);
    for (let i = 0; i < particleCount; i++) {
      const palette = colors[i % colors.length];
      const distRatio = Math.pow(Math.random(), 0.75); // denser towards inner spiral
      particles.push({
        x: width / 2,
        y: height / 2,
        radius: Math.random() * 2.2 + 0.8,
        angle: Math.random() * Math.PI * 2,
        dist: distRatio * (maxDim * 0.55) + 30,
        speed: (Math.random() * 0.0008 + 0.0004) * (Math.random() > 0.3 ? 1 : -0.7),
        baseColor: palette.base,
        glowColor: palette.glow,
        alpha: Math.random() * 0.6 + 0.25,
        pulseRate: Math.random() * 0.002 + 0.001,
        phase: Math.random() * Math.PI * 2
      });
    }
    physicsRef.current.particles = particles;

    // Handle Window Resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Fluid Mouse Interaction (creates river disturbance & ripples)
    const handleMouseMove = (e: MouseEvent) => {
      const normX = e.clientX / window.innerWidth;
      const normY = e.clientY / window.innerHeight;
      physicsRef.current.mouse.targetX = normX;
      physicsRef.current.mouse.targetY = normY;
      physicsRef.current.mouse.moving = true;

      // Add fluid ripple on fast movement
      if (Math.random() < 0.18) {
        physicsRef.current.ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 8,
          maxRadius: Math.random() * 90 + 50,
          alpha: 0.35
        });
        if (physicsRef.current.ripples.length > 8) {
          physicsRef.current.ripples.shift();
        }
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Main Fluid & Rotation Animation Loop
    let lastDegUpdate = 0;

    const render = (now: number) => {
      animId = requestAnimationFrame(render);

      const state = physicsRef.current;
      const dt = Math.min((now - state.lastTime) / 1000, 0.1);
      state.lastTime = now;

      // Smooth mouse interpolation
      state.mouse.x += (state.mouse.targetX - state.mouse.x) * 0.04;
      state.mouse.y += (state.mouse.targetY - state.mouse.y) * 0.04;

      // Fluid River Motion Physics:
      // A natural river experiences continuous, non-linear harmonic surges:
      // Base current + multi-frequency sinusoidal velocity waves
      if (!state.isPaused) {
        const t = now * 0.001; // seconds
        // Compound organic water harmonic waves (creates smooth acceleration & deceleration)
        const primaryCurrent = 0.0016; // ~60-80s full revolution
        const riverSurge1 = Math.sin(t * 0.28) * 0.0009; // 22s river surge
        const riverSurge2 = Math.cos(t * 0.62) * 0.0005; // 10s tributary acceleration
        const riverSurge3 = Math.sin(t * 1.15) * 0.00025; // 5s surface eddy wave

        const instantVelocity = (primaryCurrent + riverSurge1 + riverSurge2 + riverSurge3) * state.speedMultiplier;
        state.angle = (state.angle + instantVelocity) % (Math.PI * 2);

        // Periodically update HUD text (every ~200ms)
        if (now - lastDegUpdate > 200) {
          lastDegUpdate = now;
          const degrees = (state.angle * (180 / Math.PI)) % 360;
          setCurrentDeg(Math.round(degrees));
          const degPerSec = ((instantVelocity * 60 * 180) / Math.PI).toFixed(2);
          setCurrentVelocityText(`${degPerSec}°/s`);
        }
      }

      // Calculate Water River Meander Drift & Breathing Scale
      const t = now * 0.001;
      const riverMeanderX = Math.sin(t * 0.35) * 16 + (state.mouse.x - 0.5) * 28;
      const riverMeanderY = Math.cos(t * 0.28) * 12 + (state.mouse.y - 0.5) * 20;
      const waterBreathingScale = 1.38 + Math.sin(t * 0.42) * 0.028; // organic swell & contraction

      // Apply transform to the background image container
      if (containerRef.current) {
        const rad = state.angle;
        containerRef.current.style.transform = `translate(${riverMeanderX}px, ${riverMeanderY}px) scale(${waterBreathingScale}) rotate(${rad}rad)`;
      }

      // Draw Fluid Synaptic River Currents on Canvas
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2 + riverMeanderX * 0.6;
      const centerY = height / 2 + riverMeanderY * 0.6;

      // 1. Render Fluid Ripples
      for (let r = state.ripples.length - 1; r >= 0; r--) {
        const ripple = state.ripples[r];
        ripple.radius += 1.8;
        ripple.alpha *= 0.96;

        ctx.beginPath();
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(76, 215, 246, ${ripple.alpha * 0.4})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();

        if (ripple.alpha < 0.02 || ripple.radius > ripple.maxRadius) {
          state.ripples.splice(r, 1);
        }
      }

      // 2. Render River Flow Particles along rotating vortex
      ctx.save();
      for (let i = 0; i < state.particles.length; i++) {
        const p = state.particles[i];

        if (!state.isPaused) {
          // Angular river speed accelerates near core (Kepler/river vortex)
          const coreAcceleration = (1 - Math.min(p.dist / (maxDim * 0.5), 1)) * 0.0015;
          p.angle += (p.speed + coreAcceleration) * state.speedMultiplier;
          p.phase += p.pulseRate * 60 * dt;
        }

        // Calculate position relative to swirling river center
        const totalAngle = p.angle + state.angle * 0.4;
        const currentDist = p.dist + Math.sin(p.phase) * 14;

        const px = centerX + Math.cos(totalAngle) * currentDist;
        const py = centerY + Math.sin(totalAngle) * currentDist;

        // Skip if outside viewport with margin
        if (px < -60 || px > width + 60 || py < -60 || py > height + 60) {
          continue;
        }

        const pulseAlpha = p.alpha * (0.65 + Math.sin(p.phase) * 0.35);

        // Soft Outer Glow
        const grad = ctx.createRadialGradient(px, py, 0, px, py, p.radius * 3.5);
        grad.addColorStop(0, `${p.baseColor}${pulseAlpha})`);
        grad.addColorStop(0.4, `${p.baseColor}${pulseAlpha * 0.5})`);
        grad.addColorStop(1, 'rgba(0,0,0,0)');

        ctx.beginPath();
        ctx.arc(px, py, p.radius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Bright Nucleus Point
        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.6, p.radius * 0.7), 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
      }
      ctx.restore();
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      id="fluid-galaxy-viewport"
      className="fixed inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none"
      style={{ backgroundColor: '#0c0e13' }}
    >
      {/* 
        360-Degree Continuous Rotating Galaxy Layer
        Scaled with ample bleed (1.42x) to eliminate corner clipping during rotation.
        Driven smoothly by fluid river harmonic physics.
      */}
      <div
        ref={containerRef}
        id="fluid-galaxy-image-wrapper"
        className="absolute inset-0 w-full h-full will-change-transform"
        style={{
          transformOrigin: '50% 50%',
          backgroundImage: 'url(/galaxy_neural_bg.jpg), url("/images (1).jpeg")',
          backgroundPosition: 'center center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          filter: 'brightness(0.92) contrast(1.08) saturate(1.12)'
        }}
      />

      {/* Bioluminescent Fluid River Canvas Overlay */}
      <canvas
        ref={canvasRef}
        id="fluid-river-canvas"
        className="absolute inset-0 w-full h-full pointer-events-none mix-blend-screen opacity-70"
      />

      {/* Atmospheric Depth Veil: Ensures Stack Section & Text Readability */}
      <div
        id="fluid-galaxy-veil"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 45%, rgba(12, 14, 19, 0.42) 0%, rgba(12, 14, 19, 0.72) 65%, rgba(12, 14, 19, 0.94) 100%)'
        }}
      />

      {/* Subtle Linear Gradients for Seamless Content Framing */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0e13]/60 via-transparent to-[#0c0e13]/85 pointer-events-none" />

      {/* Interactive River Flow Controls (Floating Indicator & Physics HUD) */}
      <div
        id="galaxy-motion-hud"
        className="fixed bottom-5 right-5 z-40 pointer-events-auto flex flex-col items-end gap-2 text-xs font-mono"
      >
        {showControls && (
          <div className="p-3.5 rounded-xl bg-[#111319]/90 backdrop-blur-xl border border-[#464554]/40 shadow-[0_12px_36px_rgba(0,0,0,0.6)] text-[#c7c4d7] w-64 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center justify-between border-b border-[#464554]/30 pb-2 mb-2.5">
              <div className="flex items-center gap-1.5 text-[#4cd7f6] font-semibold">
                <Waves size={14} className="animate-pulse" />
                <span>Galaxy River Dynamics</span>
              </div>
              <span className="text-[10px] text-[#4edea3] bg-[#00885d]/30 px-1.5 py-0.5 rounded border border-[#4edea3]/30">
                360° Flow
              </span>
            </div>

            <div className="space-y-2 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="text-[#908fa0]">Current Rotation:</span>
                <span className="text-white font-bold">{currentDeg}°</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#908fa0]">River Velocity:</span>
                <span className="text-[#ffb347] font-semibold">{currentVelocityText}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#908fa0]">Motion Profile:</span>
                <span className="text-[#c0c1ff] capitalize">{flowSpeedMode} Current</span>
              </div>

              {/* Speed Mode Selectors */}
              <div className="pt-2 border-t border-[#464554]/30">
                <span className="block text-[10px] text-[#908fa0] mb-1.5 uppercase tracking-wider">
                  Flow Velocity:
                </span>
                <div className="grid grid-cols-3 gap-1">
                  {(['gentle', 'river', 'surge'] as const).map((mode) => (
                    <button
                      type="button"
                      key={mode}
                      onClick={() => setFlowSpeedMode(mode)}
                      className={`px-2 py-1 rounded text-[10px] capitalize transition-all cursor-pointer ${
                        flowSpeedMode === mode
                          ? 'bg-[#8083ff] text-[#0d0096] font-bold shadow-[0_0_10px_rgba(128,131,255,0.4)]'
                          : 'bg-[#1d2025] text-[#908fa0] hover:text-white hover:bg-[#282a30]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* HUD Toggle & Pause/Play Button */}
        <div className="flex items-center gap-1.5 bg-[#111319]/85 backdrop-blur-md border border-[#464554]/40 p-1.5 rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.4)]">
          <button
            type="button"
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause Galaxy Rotation' : 'Resume Galaxy Rotation'}
            className="p-1.5 rounded-full bg-[#1d2025] hover:bg-[#8083ff]/20 text-[#c7c4d7] hover:text-[#c0c1ff] transition-colors cursor-pointer"
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} className="text-[#4edea3]" />}
          </button>

          <button
            type="button"
            onClick={() => setShowControls(!showControls)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] text-[#c7c4d7] hover:text-white hover:bg-[#282a30] transition-colors cursor-pointer"
          >
            <Compass size={13} className={`text-[#4cd7f6] ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '14s' }} />
            <span>{currentDeg}°</span>
          </button>
        </div>
      </div>
    </div>
  );
};
