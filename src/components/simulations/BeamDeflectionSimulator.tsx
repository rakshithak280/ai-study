import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, AlertTriangle, ShieldAlert } from 'lucide-react';

interface Material {
  name: string;
  eGPa: number; // Young's Modulus in GPa
  yieldMPa: number; // Yield Strength in MPa
  density: number; // kg/m³
}

const MATERIALS: Record<string, Material> = {
  steel: { name: 'A36 Structural Steel', eGPa: 200, yieldMPa: 250, density: 7850 },
  aluminum: { name: '6061-T6 Aluminum', eGPa: 69, yieldMPa: 276, density: 2700 },
  titanium: { name: 'Ti-6Al-4V Grade 5 Titanium', eGPa: 114, yieldMPa: 880, density: 4430 },
  carbon: { name: 'Carbon Fiber Composite (Unidirectional)', eGPa: 150, yieldMPa: 600, density: 1600 },
  concrete: { name: 'Reinforced Concrete (Grade 35)', eGPa: 30, yieldMPa: 35, density: 2400 }
};

export const BeamDeflectionSimulator: React.FC = () => {
  const [supportType, setSupportType] = useState<'simply_supported' | 'cantilever'>('simply_supported');
  const [materialKey, setMaterialKey] = useState<string>('steel');
  const [lengthMeters, setLengthMeters] = useState<number>(4.0);
  const [loadNewtons, setLoadNewtons] = useState<number>(8000);
  const [loadPosRatio, setLoadPosRatio] = useState<number>(0.5); // position as fraction of length
  const [sectionType, setSectionType] = useState<'i_beam' | 'rectangle'>('i_beam');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const mat = MATERIALS[materialKey];
  const E = mat.eGPa * 1e9; // Pa
  const L = lengthMeters; // m
  const P = loadNewtons; // N
  const a = L * loadPosRatio; // m
  const b = L - a; // m

  // Cross section properties
  // Standard compact I-beam (e.g. W150x14 approx): depth = 0.15m, I ≈ 1.2e-5 m^4, c = 0.075m
  // Rectangle: width = 0.08m, depth = 0.14m, I = (b*h^3)/12 = (0.08 * 0.14^3)/12 ≈ 1.83e-5 m^4, c = 0.07m
  const I = sectionType === 'i_beam' ? 1.2e-5 : 1.83e-5;
  const c = sectionType === 'i_beam' ? 0.075 : 0.07;

  // Beam mechanics calculations
  let maxDeflectionMm = 0;
  let maxMomentNm = 0;

  if (supportType === 'simply_supported') {
    // Max moment under load
    maxMomentNm = (P * a * b) / L;
    // Deflection at center (approx when a ~ L/2)
    maxDeflectionMm = ((P * a * b * (L + Math.min(a, b))) / (9 * Math.sqrt(3) * E * I * L)) * 1000;
  } else {
    // Cantilever: load at distance a from fixed support
    maxMomentNm = P * a;
    maxDeflectionMm = ((P * a * a * (3 * L - a)) / (6 * E * I)) * 1000;
  }

  // Max bending stress: sigma = (M * c) / I
  const maxStressMPa = (maxMomentNm * c) / I / 1e6;
  const factorOfSafety = maxStressMPa > 0 ? mat.yieldMPa / maxStressMPa : 99.9;

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Padding
    const padX = 60;
    const padY = 70;
    const beamW = width - padX * 2;
    const baselineY = padY;

    // Draw baseline / unloaded beam (dashed line)
    ctx.strokeStyle = 'rgba(71, 85, 105, 0.4)';
    ctx.setLineDash([4, 4]);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padX, baselineY);
    ctx.lineTo(padX + beamW, baselineY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Supports
    ctx.fillStyle = '#64748b';
    if (supportType === 'simply_supported') {
      // Left pinned support (triangle)
      ctx.beginPath();
      ctx.moveTo(padX, baselineY);
      ctx.lineTo(padX - 12, baselineY + 20);
      ctx.lineTo(padX + 12, baselineY + 20);
      ctx.closePath();
      ctx.fill();

      // Right roller support (circle)
      ctx.beginPath();
      ctx.arc(padX + beamW, baselineY + 10, 10, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Cantilever fixed wall on left
      ctx.fillStyle = '#475569';
      ctx.fillRect(padX - 16, baselineY - 30, 16, 60);
      // hatching
      ctx.strokeStyle = '#334155';
      ctx.lineWidth = 2;
      for (let y = baselineY - 26; y < baselineY + 26; y += 8) {
        ctx.beginPath();
        ctx.moveTo(padX - 16, y);
        ctx.lineTo(padX - 24, y + 8);
        ctx.stroke();
      }
    }

    // Draw Deflected Elastic Curve
    const deflectionScale = 25; // Exaggerate visual deflection
    ctx.strokeStyle = factorOfSafety < 1.0 ? '#f43f5e' : factorOfSafety < 2.0 ? '#f59e0b' : '#38bdf8';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();

    const steps = 100;
    for (let i = 0; i <= steps; i++) {
      const xRatio = i / steps;
      const xPos = xRatio * L;
      const canvasX = padX + xRatio * beamW;

      let v = 0;
      if (supportType === 'simply_supported') {
        if (xPos <= a) {
          v = (P * b * xPos * (L * L - b * b - xPos * xPos)) / (6 * E * I * L);
        } else {
          const xPrime = L - xPos;
          v = (P * a * xPrime * (L * L - a * a - xPrime * xPrime)) / (6 * E * I * L);
        }
      } else {
        // Cantilever fixed at x = 0
        if (xPos <= a) {
          v = (P * xPos * xPos * (3 * a - xPos)) / (6 * E * I);
        } else {
          v = (P * a * a * (3 * xPos - a)) / (6 * E * I);
        }
      }

      const canvasY = baselineY + v * 1000 * deflectionScale;
      if (i === 0) ctx.moveTo(canvasX, canvasY);
      else ctx.lineTo(canvasX, canvasY);
    }
    ctx.stroke();

    // Draw Load Arrow
    const loadCanvasX = padX + loadPosRatio * beamW;
    ctx.strokeStyle = '#ef4444';
    ctx.fillStyle = '#ef4444';
    ctx.lineWidth = 2.5;

    // Arrow stem
    ctx.beginPath();
    ctx.moveTo(loadCanvasX, baselineY - 45);
    ctx.lineTo(loadCanvasX, baselineY - 6);
    ctx.stroke();

    // Arrow head
    ctx.beginPath();
    ctx.moveTo(loadCanvasX - 6, baselineY - 14);
    ctx.lineTo(loadCanvasX + 6, baselineY - 14);
    ctx.lineTo(loadCanvasX, baselineY - 2);
    ctx.closePath();
    ctx.fill();

    // Load Label
    ctx.fillStyle = '#f87171';
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    ctx.fillText(`${(P / 1000).toFixed(1)} kN`, loadCanvasX, baselineY - 52);

    // Bending Moment Diagram (BMD) below
    const bmdBaseY = baselineY + 100;
    ctx.strokeStyle = 'rgba(100, 116, 139, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(padX, bmdBaseY);
    ctx.lineTo(padX + beamW, bmdBaseY);
    ctx.stroke();

    ctx.fillStyle = 'rgba(56, 189, 248, 0.15)';
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(padX, bmdBaseY);

    if (supportType === 'simply_supported') {
      ctx.lineTo(loadCanvasX, bmdBaseY + 38);
      ctx.lineTo(padX + beamW, bmdBaseY);
    } else {
      ctx.lineTo(padX, bmdBaseY + 45);
      ctx.lineTo(loadCanvasX, bmdBaseY);
      ctx.lineTo(padX + beamW, bmdBaseY);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // BMD Title
    ctx.fillStyle = '#94a3b8';
    ctx.font = '10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Bending Moment Diagram (BMD)', padX, bmdBaseY - 6);
  }, [supportType, materialKey, lengthMeters, loadNewtons, loadPosRatio, sectionType, factorOfSafety]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Structural & Continuum Mechanics Sandbox</span>
            <span aria-hidden="true">·</span>
            <span>Euler-Bernoulli Elasticity</span>
            <span aria-hidden="true">·</span>
            <span>Factor of Safety Check</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-100 mt-1">Beam Deflection & Bending Stress Simulator</h3>
        </div>

        {/* Structural Health Tag */}
        <div className="flex items-center gap-2">
          {factorOfSafety >= 2.0 ? (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>NOMINAL (FOS: {factorOfSafety.toFixed(2)})</span>
            </span>
          ) : factorOfSafety >= 1.0 ? (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-950/60 border border-amber-500/40 text-amber-300">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>HIGH STRESS (FOS: {factorOfSafety.toFixed(2)})</span>
            </span>
          ) : (
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-rose-950/60 border border-rose-500/50 text-rose-300">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>YIELD FAILURE (FOS: {factorOfSafety.toFixed(2)})</span>
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left: Canvas & Numerical Readouts */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="relative bg-slate-950 border border-slate-800 rounded-lg p-2 shadow-inner">
            <canvas
              ref={canvasRef}
              width={680}
              height={270}
              className="w-full h-64 block rounded"
            />
          </div>

          {/* Key Output Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-800/50 border border-slate-800 p-3 rounded-lg">
              <span className="text-xs text-slate-400 block">Max Deflection (δ)</span>
              <span className="text-lg font-mono font-semibold text-cyan-300 tabular-nums">
                {maxDeflectionMm.toFixed(2)} mm
              </span>
              <span className="text-[11px] text-slate-500 block">Span ratio: L/{(lengthMeters / (maxDeflectionMm / 1000)).toFixed(0)}</span>
            </div>

            <div className="bg-slate-800/50 border border-slate-800 p-3 rounded-lg">
              <span className="text-xs text-slate-400 block">Max Bending Moment</span>
              <span className="text-lg font-mono font-semibold text-amber-300 tabular-nums">
                {(maxMomentNm / 1000).toFixed(2)} kNm
              </span>
              <span className="text-[11px] text-slate-500 block">M_max = (P·a·b)/L</span>
            </div>

            <div className="bg-slate-800/50 border border-slate-800 p-3 rounded-lg">
              <span className="text-xs text-slate-400 block">Max Fiber Stress (σ)</span>
              <span className={`text-lg font-mono font-semibold tabular-nums ${factorOfSafety < 1.0 ? 'text-rose-400' : 'text-slate-100'}`}>
                {maxStressMPa.toFixed(1)} MPa
              </span>
              <span className="text-[11px] text-slate-500 block">Yield: {mat.yieldMPa} MPa</span>
            </div>

            <div className="bg-slate-800/50 border border-slate-800 p-3 rounded-lg">
              <span className="text-xs text-slate-400 block">Factor of Safety</span>
              <span className={`text-lg font-mono font-semibold tabular-nums ${factorOfSafety < 1.0 ? 'text-rose-400' : factorOfSafety < 2.0 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {factorOfSafety.toFixed(2)}x
              </span>
              <span className="text-[11px] text-slate-500 block">{factorOfSafety >= 2.0 ? 'AISC Code Safe' : 'Insufficient Margin'}</span>
            </div>
          </div>
        </div>

        {/* Right: Controls & Material Selection */}
        <div className="lg:col-span-4 flex flex-col gap-4 bg-slate-950/60 border border-slate-800/80 p-4 rounded-lg">
          {/* Support Condition */}
          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
              Support Boundary Condition
            </label>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900 rounded-lg text-xs font-medium">
              <button
                onClick={() => setSupportType('simply_supported')}
                className={`py-1.5 rounded transition-colors ${supportType === 'simply_supported' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Simply Supported (Bridge)
              </button>
              <button
                onClick={() => setSupportType('cantilever')}
                className={`py-1.5 rounded transition-colors ${supportType === 'cantilever' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Cantilever (Balcony / Wing)
              </button>
            </div>
          </div>

          {/* Material Picker */}
          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
              Material Specification
            </label>
            <select
              value={materialKey}
              onChange={(e) => setMaterialKey(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700/80 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            >
              {Object.entries(MATERIALS).map(([key, item]) => (
                <option key={key} value={key}>
                  {item.name} (E={item.eGPa} GPa, Yield={item.yieldMPa} MPa)
                </option>
              ))}
            </select>
          </div>

          {/* Sliders */}
          <div className="space-y-3.5 pt-2 border-t border-slate-800">
            {/* Span Length */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Beam Span (Length)</span>
                <span className="font-mono text-cyan-400 tabular-nums">{lengthMeters.toFixed(1)} m</span>
              </div>
              <input
                type="range"
                min="1.0"
                max="8.0"
                step="0.5"
                value={lengthMeters}
                onChange={(e) => setLengthMeters(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Load Magnitude */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Applied Force (Load P)</span>
                <span className="font-mono text-cyan-400 tabular-nums">{(loadNewtons / 1000).toFixed(1)} kN</span>
              </div>
              <input
                type="range"
                min="1000"
                max="25000"
                step="500"
                value={loadNewtons}
                onChange={(e) => setLoadNewtons(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Load Position */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Load Location along Span</span>
                <span className="font-mono text-cyan-400 tabular-nums">{(lengthMeters * loadPosRatio).toFixed(2)} m</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="0.9"
                step="0.05"
                value={loadPosRatio}
                onChange={(e) => setLoadPosRatio(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
