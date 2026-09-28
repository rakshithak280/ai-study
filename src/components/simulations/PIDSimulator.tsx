import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Zap, HelpCircle } from 'lucide-react';

interface SimulationPoint {
  time: number;
  setpoint: number;
  response: number;
  controlEffort: number;
}

export const PIDSimulator: React.FC = () => {
  const [kp, setKp] = useState<number>(2.4);
  const [ki, setKi] = useState<number>(0.8);
  const [kd, setKd] = useState<number>(0.35);
  const [setpoint, setSetpoint] = useState<number>(50);
  const [disturbance, setDisturbance] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [plantType, setPlantType] = useState<'drone' | 'thermal' | 'motor' | 'server'>('drone');

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const historyRef = useRef<SimulationPoint[]>([]);
  const stateRef = useRef<{ y: number; v: number; integral: number; prevError: number; time: number }>({
    y: 0,
    v: 0,
    integral: 0,
    prevError: 0,
    time: 0
  });

  // Calculate live telemetry
  const [metrics, setMetrics] = useState({
    currentVal: 0,
    overshootPct: 0,
    peakVal: 0,
    steadyStateError: 0
  });

  const resetSimulation = () => {
    stateRef.current = { y: 0, v: 0, integral: 0, prevError: 0, time: 0 };
    historyRef.current = [];
    setDisturbance(0);
    setMetrics({ currentVal: 0, overshootPct: 0, peakVal: 0, steadyStateError: 0 });
  };

  const applyPreset = (type: 'ideal' | 'ringing' | 'sluggish' | 'unstable') => {
    if (type === 'ideal') {
      setKp(2.2);
      setKi(0.9);
      setKd(0.45);
    } else if (type === 'ringing') {
      setKp(5.8);
      setKi(0.1);
      setKd(0.05);
    } else if (type === 'sluggish') {
      setKp(0.6);
      setKi(0.15);
      setKd(0.8);
    } else if (type === 'unstable') {
      setKp(7.5);
      setKi(4.2);
      setKd(0.01);
    }
    resetSimulation();
  };

  const injectDisturbance = () => {
    stateRef.current.y += 25;
    setDisturbance(25);
    setTimeout(() => setDisturbance(0), 1000);
  };

  // Simulation physics loop
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      const dt = 0.04;
      const s = stateRef.current;

      const error = setpoint - s.y;
      s.integral += error * dt;
      // anti-windup clamp
      s.integral = Math.max(-100, Math.min(100, s.integral));
      const derivative = (error - s.prevError) / dt;
      s.prevError = error;

      let u = kp * error + ki * s.integral + kd * derivative;
      // actuator physical saturation limit (-120 to +120)
      u = Math.max(-120, Math.min(120, u));

      // Plant dynamics (2nd-order dynamical system m*y'' + c*y' + k*y = u)
      let m = 1.0;
      let c = 0.8;
      let kSpring = 0.1;

      if (plantType === 'thermal') {
        // 1st-order dominant thermal lag
        m = 0.2;
        c = 2.5;
        kSpring = 0.5;
      } else if (plantType === 'motor') {
        // Fast electro-mechanical
        m = 0.6;
        c = 1.2;
        kSpring = 0.05;
      } else if (plantType === 'server') {
        // Queue delay with rate limit
        m = 0.4;
        c = 1.8;
        kSpring = 0.2;
      }

      const accel = (u - c * s.v - kSpring * s.y) / m;
      s.v += accel * dt;
      s.y += s.v * dt;
      s.time += dt;

      // Maintain buffer
      historyRef.current.push({
        time: s.time,
        setpoint,
        response: s.y,
        controlEffort: u
      });

      if (historyRef.current.length > 250) {
        historyRef.current.shift();
      }

      // Compute overshoot
      const maxPeak = Math.max(...historyRef.current.map((p) => p.response), 0);
      const os = setpoint > 0 ? Math.max(0, ((maxPeak - setpoint) / setpoint) * 100) : 0;
      const sse = Math.abs(setpoint - s.y);

      setMetrics({
        currentVal: Math.round(s.y * 10) / 10,
        overshootPct: Math.round(os * 10) / 10,
        peakVal: Math.round(maxPeak * 10) / 10,
        steadyStateError: Math.round(sse * 10) / 10
      });
    }, 40);

    return () => clearInterval(interval);
  }, [isRunning, kp, ki, kd, setpoint, plantType]);

  // Render Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = 'rgba(51, 65, 85, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let y = 0; y < height; y += 40) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    for (let x = 0; x < width; x += 50) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    ctx.stroke();

    const history = historyRef.current;
    if (history.length < 2) return;

    const maxVal = 100;
    const minVal = -20;
    const valRange = maxVal - minVal;

    const scaleY = (v: number) => height - ((v - minVal) / valRange) * (height - 30) - 15;
    const scaleX = (idx: number) => (idx / (history.length - 1)) * (width - 40) + 20;

    // Draw Setpoint Line (dashed white)
    const setpointY = scaleY(setpoint);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.setLineDash([6, 6]);
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(20, setpointY);
    ctx.lineTo(width - 20, setpointY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Label setpoint
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = '11px monospace';
    ctx.fillText(`Target: ${setpoint.toFixed(0)}`, width - 90, setpointY - 6);

    // Draw Control Effort (subtle amber fill/line)
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.35)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    history.forEach((pt, i) => {
      const x = scaleX(i);
      const y = scaleY(pt.controlEffort * 0.4);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Draw System Response (vibrant cyan line)
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    history.forEach((pt, i) => {
      const x = scaleX(i);
      const y = scaleY(pt.response);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.stroke();

    // Latest point indicator
    const lastIdx = history.length - 1;
    const lastX = scaleX(lastIdx);
    const lastY = scaleY(history[lastIdx].response);
    ctx.fillStyle = '#22d3ee';
    ctx.beginPath();
    ctx.arc(lastX, lastY, 4.5, 0, Math.PI * 2);
    ctx.fill();
  }, [setpoint]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-slate-200">
      {/* Header and Sandbox Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Dynamic System Sandbox</span>
            <span aria-hidden="true">·</span>
            <span>Closed-Loop Feedback</span>
            <span aria-hidden="true">·</span>
            <span>Continuous Real-Time</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-100 mt-1">PID Closed-Loop Controller Simulator</h3>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg flex items-center gap-1.5 transition-colors ${
              isRunning ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30' : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
            }`}
          >
            {isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isRunning ? 'Pause' : 'Resume'}</span>
          </button>

          <button
            onClick={resetSimulation}
            className="px-3 py-1.5 text-xs font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>

          <button
            onClick={injectDisturbance}
            className="px-3 py-1.5 text-xs font-medium text-rose-300 bg-rose-950/40 border border-rose-800/50 rounded-lg hover:bg-rose-900/50 transition-colors flex items-center gap-1.5"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Inject Disturbance (+25)</span>
          </button>
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Left: Canvas & Telemetry */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Canvas Wrapper */}
          <div className="relative bg-slate-950 border border-slate-800/80 rounded-lg p-2 overflow-hidden shadow-inner">
            <div className="absolute top-3 left-4 flex items-center gap-4 text-xs z-10">
              <span className="flex items-center gap-1.5 text-cyan-400">
                <span className="w-3 h-0.5 bg-cyan-400 inline-block"></span>
                <span>Response y(t)</span>
              </span>
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-3 h-0.5 border-b border-dashed border-slate-300 inline-block"></span>
                <span>Target Setpoint</span>
              </span>
              <span className="flex items-center gap-1.5 text-amber-400/80">
                <span className="w-3 h-0.5 bg-amber-400/60 inline-block"></span>
                <span>Effort u(t)</span>
              </span>
            </div>

            <canvas
              ref={canvasRef}
              width={680}
              height={260}
              className="w-full h-64 block rounded"
            />
          </div>

          {/* Telemetry Readout Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-800/50 border border-slate-800 p-3 rounded-lg">
              <span className="text-xs text-slate-400 block">Current Output</span>
              <span className="text-lg font-mono font-semibold text-cyan-300 tabular-nums">
                {metrics.currentVal.toFixed(1)}
              </span>
              <span className="text-[11px] text-slate-500 block">Target: {setpoint}</span>
            </div>

            <div className="bg-slate-800/50 border border-slate-800 p-3 rounded-lg">
              <span className="text-xs text-slate-400 block">Peak Overshoot</span>
              <span className={`text-lg font-mono font-semibold tabular-nums ${metrics.overshootPct > 20 ? 'text-rose-400' : 'text-emerald-400'}`}>
                {metrics.overshootPct.toFixed(1)}%
              </span>
              <span className="text-[11px] text-slate-500 block">Peak: {metrics.peakVal.toFixed(1)}</span>
            </div>

            <div className="bg-slate-800/50 border border-slate-800 p-3 rounded-lg">
              <span className="text-xs text-slate-400 block">Steady-State Error</span>
              <span className={`text-lg font-mono font-semibold tabular-nums ${metrics.steadyStateError < 1 ? 'text-emerald-400' : 'text-amber-400'}`}>
                {metrics.steadyStateError.toFixed(1)}
              </span>
              <span className="text-[11px] text-slate-500 block">{metrics.steadyStateError < 0.5 ? 'Zero Offset' : 'Lagging'}</span>
            </div>

            <div className="bg-slate-800/50 border border-slate-800 p-3 rounded-lg">
              <span className="text-xs text-slate-400 block">Plant System</span>
              <span className="text-sm font-medium text-slate-200 capitalize mt-1 block">
                {plantType === 'drone' ? 'Quadcopter Altitude' : plantType === 'thermal' ? 'Thermal Chamber' : plantType === 'motor' ? 'DC Servo Motor' : 'Cloud Server Queue'}
              </span>
              <span className="text-[11px] text-slate-500 block">2nd-Order Dynamics</span>
            </div>
          </div>
        </div>

        {/* Right: Controller Sliders & Presets */}
        <div className="lg:col-span-4 flex flex-col gap-5 bg-slate-950/60 border border-slate-800/80 p-4 rounded-lg">
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Tuning Presets</h4>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => applyPreset('ideal')}
                className="px-2.5 py-1.5 text-xs text-left bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors"
              >
                Critically Damped (Ideal)
              </button>
              <button
                onClick={() => applyPreset('ringing')}
                className="px-2.5 py-1.5 text-xs text-left bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors"
              >
                Underdamped (Ringing)
              </button>
              <button
                onClick={() => applyPreset('sluggish')}
                className="px-2.5 py-1.5 text-xs text-left bg-slate-800 hover:bg-slate-700 text-slate-200 rounded transition-colors"
              >
                Overdamped (Sluggish)
              </button>
              <button
                onClick={() => applyPreset('unstable')}
                className="px-2.5 py-1.5 text-xs text-left bg-slate-800 hover:bg-slate-700 text-rose-300 rounded transition-colors"
              >
                Unstable (High Gain)
              </button>
            </div>
          </div>

          {/* Plant Selector */}
          <div>
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-1.5">
              Simulated Physical Plant
            </label>
            <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-900 rounded-lg text-xs">
              <button
                onClick={() => setPlantType('drone')}
                className={`py-1.5 px-2 rounded font-medium transition-colors ${plantType === 'drone' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Drone Altitude
              </button>
              <button
                onClick={() => setPlantType('motor')}
                className={`py-1.5 px-2 rounded font-medium transition-colors ${plantType === 'motor' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                DC Motor RPM
              </button>
              <button
                onClick={() => setPlantType('thermal')}
                className={`py-1.5 px-2 rounded font-medium transition-colors ${plantType === 'thermal' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Thermal CSTR
              </button>
              <button
                onClick={() => setPlantType('server')}
                className={`py-1.5 px-2 rounded font-medium transition-colors ${plantType === 'server' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
              >
                Server Load Queue
              </button>
            </div>
          </div>

          {/* Sliders */}
          <div className="space-y-4 pt-2 border-t border-slate-800">
            {/* Setpoint */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Target Setpoint</span>
                <span className="font-mono text-cyan-400 tabular-nums">{setpoint}</span>
              </div>
              <input
                type="range"
                min="10"
                max="90"
                step="5"
                value={setpoint}
                onChange={(e) => setSetpoint(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
            </div>

            {/* Kp */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Proportional Gain (Kp)</span>
                <span className="font-mono text-cyan-400 tabular-nums">{kp.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="8.0"
                step="0.1"
                value={kp}
                onChange={(e) => setKp(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[11px] text-slate-500 block mt-0.5">Increases responsiveness; too high causes ringing</span>
            </div>

            {/* Ki */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Integral Gain (Ki)</span>
                <span className="font-mono text-cyan-400 tabular-nums">{ki.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="4.0"
                step="0.05"
                value={ki}
                onChange={(e) => setKi(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[11px] text-slate-500 block mt-0.5">Eliminates persistent steady-state offset error</span>
            </div>

            {/* Kd */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-slate-300 font-medium">Derivative Gain (Kd)</span>
                <span className="font-mono text-cyan-400 tabular-nums">{kd.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.0"
                max="1.5"
                step="0.02"
                value={kd}
                onChange={(e) => setKd(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
              />
              <span className="text-[11px] text-slate-500 block mt-0.5">Damps overshoot; predicts future trend</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
