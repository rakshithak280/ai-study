import React from 'react';
import { BranchId } from '../types';
import { BRANCHES } from '../data/engineeringData';
import { ArrowRight, Sparkles, Activity, Layers } from 'lucide-react';
import heroImg from '../assets/images/hero_engineering_crossroads_1790589843439.jpg';

interface HeroSectionProps {
  currentBranch: BranchId;
  onExploreBridges: () => void;
  onExploreSimulations: () => void;
  onOpenBranchModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  currentBranch,
  onExploreBridges,
  onExploreSimulations,
  onOpenBranchModal,
}) => {
  const currentBranchObj = BRANCHES.find((b) => b.id === currentBranch) || BRANCHES[0];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950">
      {/* Background visual asset with contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImg}
          alt="Multidisciplinary engineering workspace with circuits, gears, and structural blueprints"
          className="w-full h-full object-cover object-center opacity-30 mix-blend-luminosity filter contrast-125"
          referrerPolicy="no-referrer"
        />
        {/* Scrim overlay for minimum 4.5:1 text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/85 to-slate-950/40" />
      </div>

      <div className="relative z-10 p-6 sm:p-10 lg:p-14 max-w-4xl space-y-6">
        {/* Unboxed metadata kicker */}
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <span>The Universal Engineering Curriculum</span>
          <span aria-hidden="true">·</span>
          <span>Cross-Branch Translation Engine</span>
        </div>

        {/* Primary Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif-title font-bold text-slate-100 tracking-tight leading-[1.1] max-w-3xl">
          Learn Any Engineering Subject. <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300">
            Regardless of Your Branch.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
          Whether you are a Mechanical student mastering Deep Learning, a Computer Science student understanding Semiconductor VLSI, or a Civil engineer building autonomous IoT systems: OmniEngineer grounds every formula and skill in concepts you already know.
        </p>

        {/* Primary Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={onExploreBridges}
            className="px-5 py-3 text-xs sm:text-sm font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl transition-colors flex items-center gap-2 shadow-lg shadow-cyan-900/30"
          >
            <span>Explore Branch Bridges</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreSimulations}
            className="px-5 py-3 text-xs sm:text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl transition-colors flex items-center gap-2"
          >
            <Activity className="w-4 h-4 text-cyan-400" />
            <span>Interactive Sandboxes</span>
          </button>

          <button
            onClick={onOpenBranchModal}
            className="px-4 py-3 text-xs sm:text-sm text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1.5"
          >
            <span>Perspective:</span>
            <strong className="text-cyan-300 font-medium underline underline-offset-4">
              {currentBranchObj.name}
            </strong>
          </button>
        </div>

        {/* Unboxed Metadata Stats - No Pills */}
        <div className="pt-6 border-t border-slate-800/80 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-mono text-cyan-300 font-bold tabular-nums">8</span>
            <span>Core Disciplines</span>
          </div>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-cyan-300 font-bold tabular-nums">4</span>
            <span>Live Physics Sandboxes</span>
          </div>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <div className="flex items-center gap-2">
            <span className="font-mono text-cyan-300 font-bold tabular-nums">100%</span>
            <span>Isomorphic Mathematical Equivalences</span>
          </div>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <div>Zero Department Silos</div>
        </div>
      </div>
    </div>
  );
};
