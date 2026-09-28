/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BranchId } from './types';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { CurriculumView } from './components/CurriculumView';
import { BranchBridgeView } from './components/BranchBridgeView';
import { SimulationsView } from './components/SimulationsView';
import { MentorView } from './components/MentorView';
import { CapstoneStudio } from './components/CapstoneStudio';
import { ToolboxView } from './components/ToolboxView';
import { BranchSelectorModal } from './components/BranchSelectorModal';
import { BRANCHES } from './data/engineeringData';

export default function App() {
  const [currentBranch, setCurrentBranch] = useState<BranchId>(() => {
    const saved = localStorage.getItem('omni_branch');
    if (saved && BRANCHES.some((b) => b.id === saved)) {
      return saved as BranchId;
    }
    return 'mechanical'; // Default native branch
  });

  const [currentTab, setCurrentTab] = useState<
    'curriculum' | 'bridge' | 'simulations' | 'mentor' | 'capstones' | 'toolbox'
  >('curriculum');

  const [isBranchModalOpen, setIsBranchModalOpen] = useState<boolean>(false);

  useEffect(() => {
    localStorage.setItem('omni_branch', currentBranch);
  }, [currentBranch]);

  const currentBranchObj = BRANCHES.find((b) => b.id === currentBranch) || BRANCHES[0];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* 3-Zone Top Navigation Contract */}
      <Navigation
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        currentBranch={currentBranch}
        onOpenBranchModal={() => setIsBranchModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Hero Section displayed on Curriculum tab */}
        {currentTab === 'curriculum' && (
          <HeroSection
            currentBranch={currentBranch}
            onExploreBridges={() => setCurrentTab('bridge')}
            onExploreSimulations={() => setCurrentTab('simulations')}
            onOpenBranchModal={() => setIsBranchModalOpen(true)}
          />
        )}

        {/* View Routing */}
        {currentTab === 'curriculum' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-cyan-400">Universal Catalog</span>
                <h2 className="text-2xl font-serif-title font-semibold text-slate-100 mt-0.5">
                  Core Engineering Subjects & Emerging Disciplines
                </h2>
              </div>
              <span className="hidden sm:inline text-xs text-slate-400">
                Personalized for <strong className="text-slate-200">{currentBranchObj.name}</strong>
              </span>
            </div>
            <CurriculumView
              currentBranch={currentBranch}
              onOpenSimulation={() => setCurrentTab('simulations')}
            />
          </div>
        )}

        {currentTab === 'bridge' && (
          <BranchBridgeView
            currentBranch={currentBranch}
            onSelectBranch={setCurrentBranch}
          />
        )}

        {currentTab === 'simulations' && (
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono text-cyan-400">Interactive Laboratories</span>
              <h2 className="text-2xl font-serif-title font-semibold text-slate-100 mt-1">
                Real-Time Engineering Simulation Sandboxes
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Interact directly with closed-loop dynamics, transistor gates, structural elasticity, and analog filtering.
              </p>
            </div>
            <SimulationsView currentBranch={currentBranch} />
          </div>
        )}

        {currentTab === 'mentor' && (
          <MentorView currentBranch={currentBranch} />
        )}

        {currentTab === 'capstones' && (
          <CapstoneStudio currentBranch={currentBranch} />
        )}

        {currentTab === 'toolbox' && (
          <ToolboxView />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif-title font-semibold text-slate-300">OmniEngineer</span>
            <span aria-hidden="true">·</span>
            <span>Universal Cross-Branch Engineering Platform</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span>Mechanical</span>
            <span aria-hidden="true">·</span>
            <span>Electrical</span>
            <span aria-hidden="true">·</span>
            <span>Computer Science</span>
            <span aria-hidden="true">·</span>
            <span>Civil</span>
            <span aria-hidden="true">·</span>
            <span>Aerospace</span>
            <span aria-hidden="true">·</span>
            <span>Materials</span>
          </div>

          <div>
            <span>Empowering every engineer to build without silos</span>
          </div>
        </div>
      </footer>

      {/* Branch Selector Modal */}
      <BranchSelectorModal
        isOpen={isBranchModalOpen}
        onClose={() => setIsBranchModalOpen(false)}
        currentBranch={currentBranch}
        onSelectBranch={setCurrentBranch}
      />
    </div>
  );
}
