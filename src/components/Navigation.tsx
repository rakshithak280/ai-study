import React from 'react';
import { BranchId } from '../types';
import { BRANCHES } from '../data/engineeringData';
import { ChevronDown } from 'lucide-react';

interface NavigationProps {
  currentTab: 'curriculum' | 'bridge' | 'simulations' | 'mentor' | 'capstones' | 'toolbox';
  onSelectTab: (tab: 'curriculum' | 'bridge' | 'simulations' | 'mentor' | 'capstones' | 'toolbox') => void;
  currentBranch: BranchId;
  onOpenBranchModal: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentTab,
  onSelectTab,
  currentBranch,
  onOpenBranchModal,
}) => {
  const currentBranchObj = BRANCHES.find((b) => b.id === currentBranch) || BRANCHES[0];

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('curriculum')}
          className="text-lg font-serif-title font-bold tracking-tight text-slate-100 hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0"
        >
          OmniEngineer
        </button>

        {/* Zone 2: 4-6 clean text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectTab('curriculum')}
            className={`transition-colors whitespace-nowrap pb-0.5 border-b-2 ${
              currentTab === 'curriculum'
                ? 'text-cyan-300 border-cyan-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Curriculum
          </button>

          <button
            onClick={() => onSelectTab('bridge')}
            className={`transition-colors whitespace-nowrap pb-0.5 border-b-2 ${
              currentTab === 'bridge'
                ? 'text-cyan-300 border-cyan-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Branch Bridge
          </button>

          <button
            onClick={() => onSelectTab('simulations')}
            className={`transition-colors whitespace-nowrap pb-0.5 border-b-2 ${
              currentTab === 'simulations'
                ? 'text-cyan-300 border-cyan-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Simulations
          </button>

          <button
            onClick={() => onSelectTab('mentor')}
            className={`transition-colors whitespace-nowrap pb-0.5 border-b-2 ${
              currentTab === 'mentor'
                ? 'text-cyan-300 border-cyan-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            AI Mentor
          </button>

          <button
            onClick={() => onSelectTab('capstones')}
            className={`transition-colors whitespace-nowrap pb-0.5 border-b-2 ${
              currentTab === 'capstones'
                ? 'text-cyan-300 border-cyan-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Capstones
          </button>

          <button
            onClick={() => onSelectTab('toolbox')}
            className={`transition-colors whitespace-nowrap pb-0.5 border-b-2 ${
              currentTab === 'toolbox'
                ? 'text-cyan-300 border-cyan-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            Toolbox
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBranchModal}
            className="px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 rounded-lg transition-colors flex items-center gap-2 whitespace-nowrap shrink-0"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span className="hidden sm:inline">Branch:</span>
            <strong className="text-cyan-300">{currentBranchObj.code}</strong>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* Mobile nav bar below on small screens */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800/80 px-2 py-2 overflow-x-auto text-xs bg-slate-950">
        <button
          onClick={() => onSelectTab('curriculum')}
          className={`px-2 py-1 rounded whitespace-nowrap ${currentTab === 'curriculum' ? 'text-cyan-300 font-semibold' : 'text-slate-400'}`}
        >
          Curriculum
        </button>
        <button
          onClick={() => onSelectTab('bridge')}
          className={`px-2 py-1 rounded whitespace-nowrap ${currentTab === 'bridge' ? 'text-cyan-300 font-semibold' : 'text-slate-400'}`}
        >
          Bridge
        </button>
        <button
          onClick={() => onSelectTab('simulations')}
          className={`px-2 py-1 rounded whitespace-nowrap ${currentTab === 'simulations' ? 'text-cyan-300 font-semibold' : 'text-slate-400'}`}
        >
          Simulations
        </button>
        <button
          onClick={() => onSelectTab('mentor')}
          className={`px-2 py-1 rounded whitespace-nowrap ${currentTab === 'mentor' ? 'text-cyan-300 font-semibold' : 'text-slate-400'}`}
        >
          AI Mentor
        </button>
        <button
          onClick={() => onSelectTab('capstones')}
          className={`px-2 py-1 rounded whitespace-nowrap ${currentTab === 'capstones' ? 'text-cyan-300 font-semibold' : 'text-slate-400'}`}
        >
          Capstones
        </button>
        <button
          onClick={() => onSelectTab('toolbox')}
          className={`px-2 py-1 rounded whitespace-nowrap ${currentTab === 'toolbox' ? 'text-cyan-300 font-semibold' : 'text-slate-400'}`}
        >
          Toolbox
        </button>
      </div>
    </header>
  );
};
