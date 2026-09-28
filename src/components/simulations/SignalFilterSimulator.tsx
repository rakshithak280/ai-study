import React, { useState, useEffect, useRef } from 'react';
import { Activity, Radio, HelpCircle } from 'lucide-react';

export const SignalFilterSimulator: React.FC = () => {
  const [filterType, setFilterType] = useState<'low_pass' | 'high_pass'>('low_pass');
  const [resistorOhms, setResistorOhms] = useState<number>(1000); // 1kΩ
  const [capacitorMicroFarads, setCapacitorMicroFarads] = useState<number>(1.0); // 1μF
  const [inputFreqHz, setInputFreqHz] = useState<number>(300); // 300Hz
  const [noiseLevel, setNoiseLevel] = useState<number>(0.3); // High frequency noise amplitude

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filter cutoff frequency: fc = 1 / (2 * pi * R * C)
  const C = capacitorMicroFarads * 1e-6; // Farads
  const R = resistorOhms; // Ohms
  const cutoffFreqHz = 1 / (2 * Math.PI * R * C);

  // Frequency response transfer function
  // Low pass: H(f) = 1 / sqrt(1 + (f / fc)^2)
  // High pass: H(f) = (f / fc) / sqrt(1 + (f / fc)^2)
  const ratio = inputFreqHz / cutoffFreqHz;
  const gainLinear = filterType === 'low_pass' ? 1 / Math.sqrt(1 + ratio * ratio) : ratio / Math.sqrt(1 + ratio * ratio);
  const gainDb = 20 * Math.log10(Math.max(0.001, gainLinear));
  const phaseDeg = filterType === 'low_pass' ? -Math.atan(ratio) * (180 / Math.PI) : (90 - Math.atan(ratio) * (180 / Math.PI));

  // Animated Oscilloscope Canvas
  useEffect(() => {
    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.05;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);

      // Oscilloscope Phosphor Graticule Grid
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.7)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x < width; x += 40) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += 30) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();

      // Center zero line
      ctx.strokeStyle = 'rgba(71, 85, 105, 0.5)';
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();

      // Channel 1: Input Waveform (with noise) (Amber)
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.65)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        const t = (x / width) * 4 * Math.PI + time;
        const fundamental = Math.sin(t * (inputFreqHz / 100));
        // High frequency noise harmonic
        const noise = Math.sin(t * 18) * noiseLevel * 0.7;
        const yVal = fundamental + noise;
        const yPos = height / 2 - yVal * (height * 0.28);

        if (x === 0) ctx.moveTo(x, yPos);
        else ctx.lineTo(x, yPos);
      }
      ctx.stroke();

      // Channel 2: Filtered Output Waveform (Cyan)
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.beginPath();

      const phaseRad = phaseDeg * (Math.PI / 180);
      const noiseAttenuation = filterType === 'low_pass' ? 1 / Math.sqrt(1 + Math.pow(inputFreqHz * 18 / cutoffFreqHz, 2)) : 1;

      for (let x = 0; x < width; x++) {
        const t = (x / width) * 4 * Math.PI + time;
        const fundamentalOut = Math.sin(t * (inputFreqHz / 100) + phaseRad) * gainLinear;
        const noiseOut = Math.sin(t * 18 + phaseRad) * noiseLevel * 0.7 * noiseAttenuation;
        const yVal = fundamentalOut + noiseOut;
        const yPos = height / 2 - yVal * (height * 0.28);

        if (x === 0) ctx.moveTo(x, yPos);
        else ctx.lineTo(x, yPos);
      }
      ctx.stroke();

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [inputFreqHz, cutoffFreqHz, gainLinear, phaseDeg, noiseLevel, filterType]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-200">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Signal Processing & Filter Theory Sandbox</span>
            <span aria-hidden="true">·</span>
            <span>Analog RC Circuit</span>
            <span aria-hidden="true">·</span>
            <span>Live Oscilloscope</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-100 mt-1">RC Filter Frequency Response & Oscilloscope</h3>
        </div>

        {/* Filter Cutoff Callout */}
        <div className="flex items-center gap-2 bg-slate-800/80 px-3.5 py-1.5 rounded-lg border border-slate-700/60 text-xs font-mono">
          <Radio className="w-4 h-4 text-cyan-400" />
          <span>Cutoff: <strong className="text-cyan-300">{cutoffFreqHz.toFixed(1)} Hz</strong> (-3 dB point)</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left: Dual Oscilloscope Display */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          <div className="relative bg-slate-950 border border-slate-800 rounded-lg p-2 overflow-hidden shadow-inner">
            <div className="absolute top-3 left-4 flex items-center gap-4 text-xs z-10">
              <span className="flex items-center gap-1.5 text-amber-400">
                <span className="w-3 h-0.5 bg-amber-400 inline-block"></span>
                <span>CH1: Raw Noisy Input</span>
              </span>
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-3 h-0.5 bg-cyan-400 inline-block"></span>
                <span>CH2: Filtered Output</span>
              </span>
            </div>

            <canvas
              ref={canvasRef}
              width={680}
              height={260}
              className="w-full h-64 block rounded"
            />
          </div>

          {/* Telemetry Readouts */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-800/50 border border-slate-800 p-3 rounded-lg">
              <span className="text-xs text-slate-400 block">Signal Gain</span>
              <span className={`text-lg font-mono font-semibold tabular-nums ${gainDb < -3 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {gainDb.toFixed(1)} dB
              </span>
              <span className="text-[11px] text-slate-500 block">Linear: {(gainLinear * 100).toFixed(0)}%</span>
            </div>

            <div className="bg-slate-800/50 border border-slate-800 p-3 rounded-lg">
              <span className="text-xs text-slate-400 block">Phase Lag / Lead</span>
              <span className="text-lg font-mono font-semibold text-purple-400 tabular-nums">
                {phaseDeg.toFixed(1)}°
              </span>
              <span className="text-[11px] text-slate-500 block">Time delay shift</span>
            </div>

            <div className="bg-slate-800/50 border border-slate-800 p-3 rounded-lg">
              <span className="text-xs text-slate-400 block">Input Frequency</span>
              <span className="text-lg font-mono font-semibold text-cyan-300 tabular-nums">
                {inputFreqHz} Hz
              </span>
              <span className="text-[11px] text-slate-500 block">Ratio f/fc: {ratio.toFixed(2)}x</span>
            </div>

            <div className="bg-slate-800/50 border border-slate-800 p-3 rounded-lg">
              <span className="text-xs text-slate-400 block">Filtering Status</span>
              <span className="text-sm font-semibold text-slate-200 mt-0.5 block">
                {ratio < 0.5 ? 'Passband (Clean)' : ratio > 2.0 ? 'Stopband (Attenuated)' : 'Transition Region'}
              </span>
              <span className="text-[11px] text-slate-500 block">1st-Order -20dB/dec</span>
            </div>
          </div>
        </div>

        {/* Right: Controls & Circuit Values */}
        <div className="lg:col-span-4 flex flex-col gap-4 bg-slate-950/60 border border-slate-800/80 p-4 rounded-lg">
          {/* Topology Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
              Filter Topology
            </label>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900 rounded-lg text-xs font-medium">
              <button
                onClick={() => setFilterType('low_pass')}
                className={`py-1.5 rounded transition-colors ${filterType === 'low_pass' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Low-Pass (RC)
              </button>
              <button
                onClick={() => setFilterType('high_pass')}
                className={`py-1.5 rounded transition-colors ${filterType === 'high_pass' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                High-Pass (CR)
              </button>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-3.5 pt-2 border-t border-slate-800">
            {/* Input Frequency */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Input Signal Frequency</span>
                <span className="font-mono text-cyan-400 tabular-nums">{inputFreqHz} Hz</span>
              </div>
              <input
                type="range"
                min="20"
                max="2000"
                step="20"
                value={inputFreqHz}
                onChange={(e) => setInputFreqHz(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Resistor */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Resistor Value (R)</span>
                <span className="font-mono text-cyan-400 tabular-nums">{(resistorOhms / 1000).toFixed(1)} kΩ</span>
              </div>
              <input
                type="range"
                min="100"
                max="10000"
                step="100"
                value={resistorOhms}
                onChange={(e) => setResistorOhms(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Capacitor */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">Capacitor Value (C)</span>
                <span className="font-mono text-cyan-400 tabular-nums">{capacitorMicroFarads.toFixed(2)} µF</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="10.0"
                step="0.1"
                value={capacitorMicroFarads}
                onChange={(e) => setCapacitorMicroFarads(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Noise Level */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300">High-Frequency Noise</span>
                <span className="font-mono text-amber-400 tabular-nums">{(noiseLevel * 100).toFixed(0)}%</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="0.8"
                step="0.05"
                value={noiseLevel}
                onChange={(e) => setNoiseLevel(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>

          {/* Cross Branch Analogy */}
          <div className="bg-slate-900/60 border border-slate-800 p-3 rounded-lg text-[11px] leading-relaxed text-slate-300 mt-2">
            <span className="text-cyan-400 font-semibold block mb-0.5">Physical Analogy</span>
            This electrical RC low-pass filter is mechanically identical to an automotive suspension shock absorber or a hydraulic accumulator smoothing out pump pressure pulses!
          </div>
        </div>
      </div>
    </div>
  );
};
