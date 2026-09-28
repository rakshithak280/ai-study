import React, { useState } from 'react';
import { PIDSimulator } from './simulations/PIDSimulator';
import { ALUSimulator } from './simulations/ALUSimulator';
import { BeamDeflectionSimulator } from './simulations/BeamDeflectionSimulator';
import { SignalFilterSimulator } from './simulations/SignalFilterSimulator';
import { Activity, Cpu, Sliders, Waves } from 'lucide-react';
import { BranchId } from '../types';

interface SimulationsViewProps {
  currentBranch: BranchId;
}

export const SimulationsView: React.FC<SimulationsViewProps> = ({ currentBranch }) => {
  const [activeTab, setActiveTab] = useState<'pid' | 'alu' | 'beam' | 'filter'>('pid');

  return (
    <div className="space-y-6">
      {/* Simulation Selector Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-2 rounded-xl">
        <div className="flex items-center gap-1.5 p-1 bg-slate-950/80 rounded-lg flex-wrap">
          <button
            onClick={() => setActiveTab('pid')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'pid'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>PID Closed-Loop</span>
          </button>

          <button
            onClick={() => setActiveTab('alu')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'alu'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Silicon 4-Bit ALU</span>
          </button>

          <button
            onClick={() => setActiveTab('beam')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'beam'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Beam Deflection & Stress</span>
          </button>

          <button
            onClick={() => setActiveTab('filter')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === 'filter'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Waves className="w-3.5 h-3.5" />
            <span>RC Filter Oscilloscope</span>
          </button>
        </div>

        <div className="text-xs text-slate-400 pr-2">
          <span>Active Simulation Mode: </span>
          <strong className="text-slate-200 uppercase tracking-wider font-mono">
            {activeTab}
          </strong>
        </div>
      </div>

      {/* Dynamic Sandbox Display */}
      {activeTab === 'pid' && <PIDSimulator />}
      {activeTab === 'alu' && <ALUSimulator />}
      {activeTab === 'beam' && <BeamDeflectionSimulator />}
      {activeTab === 'filter' && <SignalFilterSimulator />}
    </div>
  );
};
