import React, { useState } from 'react';
import { BranchId, ConceptBridge } from '../types';
import { BRANCHES, CONCEPT_BRIDGES } from '../data/engineeringData';
import { ArrowRight, Sparkles, BookOpen, Layers, AlertCircle, PlayCircle, Send, Loader2 } from 'lucide-react';

interface BranchBridgeViewProps {
  currentBranch: BranchId;
  onSelectBranch: (branch: BranchId) => void;
}

export const BranchBridgeView: React.FC<BranchBridgeViewProps> = ({ currentBranch, onSelectBranch }) => {
  const [selectedConceptId, setSelectedConceptId] = useState<string>(CONCEPT_BRIDGES[0].id);
  const [customConcept, setCustomConcept] = useState<string>('');
  const [customResult, setCustomResult] = useState<string | null>(null);
  const [isLoadingCustom, setIsLoadingCustom] = useState<boolean>(false);

  const activeBridgeData = CONCEPT_BRIDGES.find((c) => c.id === selectedConceptId) || CONCEPT_BRIDGES[0];
  const branchTranslation = activeBridgeData.bridges[currentBranch] || activeBridgeData.bridges.mechanical;
  const currentBranchObj = BRANCHES.find((b) => b.id === currentBranch) || BRANCHES[0];

  const handleAskCustomBridge = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customConcept.trim()) return;

    setIsLoadingCustom(true);
    setCustomResult(null);

    try {
      const response = await fetch('/api/analogy-engine', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nativeBranch: currentBranchObj.name,
          targetConcept: customConcept
        })
      });

      const data = await response.json();
      setCustomResult(data.analogy || 'No analogy could be generated.');
    } catch (err) {
      setCustomResult(`### Translating "${customConcept}" for ${currentBranchObj.name} Students\n\nWhen exploring this topic through your engineering foundation, recognize that the governing equations share identical linear or harmonic properties with systems in ${currentBranchObj.name}. Focus on invariants (conservation of energy, momentum, or charge) and boundary conditions.`);
    } finally {
      setIsLoadingCustom(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Branch Perspective Switcher */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-cyan-400 mb-2 font-mono">
            <span>BranchBridge Analogy Engine</span>
            <span aria-hidden="true">·</span>
            <span>Zero-Jargon Cross-Translation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-title font-semibold text-slate-100">
            Learn Any Engineering Subject Through The Lens of Your Own Branch
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            You don't need to relearn physics from scratch. Every domain in engineering—from deep learning backpropagation to fluid mechanics—shares identical mathematical invariants, effort-flow laws, and dynamic feedback structures.
          </p>
        </div>

        {/* Current Native Branch Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 font-medium">Your Native Discipline:</span>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-700/80 rounded-lg text-xs font-semibold text-slate-200">
              <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
              <span>{currentBranchObj.name} ({currentBranchObj.code})</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
            <span className="text-slate-500 whitespace-nowrap mr-1">Switch:</span>
            {BRANCHES.map((b) => (
              <button
                key={b.id}
                onClick={() => onSelectBranch(b.id)}
                className={`px-2.5 py-1 rounded text-xs transition-colors whitespace-nowrap ${
                  b.id === currentBranch
                    ? 'bg-cyan-600 text-white font-medium'
                    : 'bg-slate-800/80 text-slate-400 hover:text-slate-200'
                }`}
              >
                {b.code}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Concept Selector Pills */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Curated Cross-Branch Bridges
          </span>
          <span className="text-xs text-slate-500">
            Translating directly into {currentBranchObj.name}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {CONCEPT_BRIDGES.map((bridge) => {
            const isSelected = bridge.id === selectedConceptId;
            return (
              <button
                key={bridge.id}
                onClick={() => {
                  setSelectedConceptId(bridge.id);
                  setCustomResult(null);
                }}
                className={`p-4 rounded-xl text-left border transition-all ${
                  isSelected
                    ? 'bg-slate-800/90 border-cyan-500/50 shadow-md shadow-cyan-950/20'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-cyan-400 font-mono">{bridge.targetDomain}</span>
                  <span className="text-slate-500">Interactive Bridge</span>
                </div>
                <h4 className="text-base font-semibold text-slate-100">{bridge.targetConcept}</h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {bridge.summary}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Bridge Detail View */}
      {!customResult ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
          {/* Header Lockup */}
          <div className="border-b border-slate-800 pb-6">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <span>{currentBranchObj.name} Perspective</span>
              <span aria-hidden="true">→</span>
              <span className="text-cyan-400 font-semibold">{activeBridgeData.targetConcept}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-serif-title font-semibold text-slate-100">
              The {currentBranchObj.name} Translation Matrix
            </h3>
          </div>

          {/* Section 1: The Core Intuition */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-950/70 border border-slate-800/80 p-5 rounded-xl space-y-2">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Core Mental Model</span>
              </span>
              <p className="text-sm text-slate-200 leading-relaxed">
                {branchTranslation.coreIntuition}
              </p>
            </div>

            <div className="bg-slate-950/70 border border-slate-800/80 p-5 rounded-xl space-y-2">
              <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>The Everyday Analogy</span>
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">
                {branchTranslation.familiarAnalogy}
              </p>
            </div>
          </div>

          {/* Section 2: Equivalence Mapping Table */}
          <div>
            <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider block mb-3">
              Direct Terminology & Physics Translation
            </span>
            <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/50">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold">
                    <th className="py-3 px-4">Concept in {currentBranchObj.name}</th>
                    <th className="py-3 px-4">Equivalent in {activeBridgeData.targetConcept}</th>
                    <th className="py-3 px-4">Shared Physical / Mathematical Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {branchTranslation.mappingTable.map((row, i) => (
                    <tr key={i} className="hover:bg-slate-900/40 transition-colors">
                      <td className="py-3 px-4 font-medium text-cyan-300">
                        {row.nativeTerm}
                      </td>
                      <td className="py-3 px-4 font-mono font-medium text-amber-300">
                        {row.targetTerm}
                      </td>
                      <td className="py-3 px-4 text-slate-300">
                        {row.sharedPhysicalRole}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 3: Governing Math Side-by-Side */}
          <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-4">
              Mathematical Equivalence (Isomorphic Systems)
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800">
                <span className="text-[11px] text-cyan-400 uppercase block mb-1">
                  Your Familiar {currentBranchObj.code} Formula
                </span>
                <code className="text-sm text-slate-100 block whitespace-pre-wrap font-mono">
                  {branchTranslation.mathematicalEquivalence.nativeEquation}
                </code>
              </div>

              <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-800">
                <span className="text-[11px] text-amber-400 uppercase block mb-1">
                  Target Domain Formula
                </span>
                <code className="text-sm text-slate-100 block whitespace-pre-wrap font-mono">
                  {branchTranslation.mathematicalEquivalence.targetEquation}
                </code>
              </div>
            </div>

            <p className="text-xs text-slate-400 mt-3 italic">
              Universal Underlying Math: {branchTranslation.mathematicalEquivalence.underlyingUniversalMath}
            </p>
          </div>

          {/* Section 4: Common Pitfalls & First Experiment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
            <div className="flex gap-3 text-xs bg-rose-950/20 border border-rose-900/40 p-4 rounded-xl text-rose-200">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-rose-300 mb-1 font-semibold">Common {currentBranchObj.name} Stumbling Block</strong>
                <p className="text-slate-300 leading-relaxed">{branchTranslation.commonTrap}</p>
              </div>
            </div>

            <div className="flex gap-3 text-xs bg-emerald-950/20 border border-emerald-900/40 p-4 rounded-xl text-emerald-200">
              <PlayCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-emerald-300 mb-1 font-semibold">10-Minute Hands-On Lab</strong>
                <p className="text-slate-300 leading-relaxed">{branchTranslation.quickExperiment}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Custom Query Response */
        <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-xs text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>AI Cross-Branch Generated Translation</span>
            </div>
            <button
              onClick={() => setCustomResult(null)}
              className="text-xs text-slate-400 hover:text-slate-200 underline"
            >
              Back to curated bridges
            </button>
          </div>

          <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-200 space-y-3 leading-relaxed">
            {customResult.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>
      )}

      {/* Ask Any Custom Cross-Branch Concept Bar */}
      <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl">
        <form onSubmit={handleAskCustomBridge} className="space-y-3">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Have a specific technology or concept you want translated into {currentBranchObj.name}?</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={customConcept}
              onChange={(e) => setCustomConcept(e.target.value)}
              placeholder="e.g. Transformers in Deep Learning, Blockchain Consensus, Quantum Qubits, Navier-Stokes..."
              className="flex-1 bg-slate-950 border border-slate-700/80 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={isLoadingCustom || !customConcept.trim()}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-cyan-600 rounded-xl hover:bg-cyan-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2 whitespace-nowrap"
            >
              {isLoadingCustom ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Translating...</span>
                </>
              ) : (
                <>
                  <span>Translate Concept</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
