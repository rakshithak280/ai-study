import React, { useState } from 'react';
import { BranchId, CapstoneProject } from '../types';
import { CAPSTONE_PROJECTS, BRANCHES } from '../data/engineeringData';
import { Layers, Users, Wrench, Code2, ArrowRight, Loader2, Sparkles, CheckCircle2 } from 'lucide-react';

interface CapstoneStudioProps {
  currentBranch: BranchId;
}

export const CapstoneStudio: React.FC<CapstoneStudioProps> = ({ currentBranch }) => {
  const [selectedProjectId, setSelectedProjectId] = useState<string>(CAPSTONE_PROJECTS[0].id);
  const [generatedRoadmap, setGeneratedRoadmap] = useState<string | null>(null);
  const [isGeneratingRoadmap, setIsGeneratingRoadmap] = useState<boolean>(false);

  const activeProject = CAPSTONE_PROJECTS.find((p) => p.id === selectedProjectId) || CAPSTONE_PROJECTS[0];
  const currentBranchObj = BRANCHES.find((b) => b.id === currentBranch) || BRANCHES[0];

  const handleGenerateRoadmap = async () => {
    setIsGeneratingRoadmap(true);
    setGeneratedRoadmap(null);

    try {
      const response = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nativeBranch: currentBranchObj.name,
          targetGoal: activeProject.title,
          weeksAvailable: activeProject.durationWeeks
        })
      });

      const data = await response.json();
      setGeneratedRoadmap(data.roadmap || 'Failed to generate roadmap.');
    } catch (err) {
      setGeneratedRoadmap(`### Accelerated ${activeProject.durationWeeks}-Week Capstone Preparation Roadmap\n\n**Starting Point:** ${currentBranchObj.name}\n**Target Project:** ${activeProject.title}\n\n- **Week 1-2: Branch Foundations & Vocabulary Translation**\n  - Translate other disciplines' jargon into ${currentBranchObj.name} principles.\n  - Set up CAD and embedded firmware toolchains.\n- **Week 3-4: Subsystem Prototyping**\n  - Build dynamic simulations in Python/MATLAB.\n  - Verify circuit and mechanical interfaces.\n- **Week 5-6: Multidisciplinary Integration**\n  - Combine sensors, actuators, and software loop.\n  - Test fault handling and environmental stress.`);
    } finally {
      setIsGeneratingRoadmap(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-cyan-400 mb-2 font-mono">
            <span>Multidisciplinary Capstone Studio</span>
            <span aria-hidden="true">·</span>
            <span>Industry-Grade Systems</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif-title font-semibold text-slate-100">
            Real Engineering Projects Never Belong to a Single Branch
          </h2>
          <p className="text-sm text-slate-300 mt-2 leading-relaxed">
            In modern industry—whether Tesla, SpaceX, Boston Dynamics, or Medtronic—breakthrough products require mechanical stiffness, high-speed silicon, embedded firmware, and fluid/thermal physics working in harmony.
          </p>
        </div>
      </div>

      {/* Project Selector Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {CAPSTONE_PROJECTS.map((proj) => {
          const isSelected = proj.id === selectedProjectId;
          const isMyBranchInvolved = proj.branchesInvolved.includes(currentBranch);

          return (
            <button
              key={proj.id}
              onClick={() => {
                setSelectedProjectId(proj.id);
                setGeneratedRoadmap(null);
              }}
              className={`p-5 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-800/90 border-cyan-500/60 shadow-lg shadow-cyan-950/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 text-slate-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                  <span className="font-mono text-cyan-400">{proj.complexity}</span>
                  <span>{proj.durationWeeks} Weeks</span>
                </div>
                <h4 className="text-base font-semibold text-slate-100">{proj.title}</h4>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                  {proj.tagline}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                  <span>{proj.branchesInvolved.length} Disciplines</span>
                </div>
                {isMyBranchInvolved && (
                  <span className="text-[11px] font-medium text-cyan-300">
                    Includes {currentBranchObj.code}
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Project Blueprint View */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-8">
        {/* Title Lockup */}
        <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
              <span className="font-mono text-cyan-400">{activeProject.complexity} Complexity</span>
              <span aria-hidden="true">·</span>
              <span>{activeProject.durationWeeks} Weeks Estimated</span>
              <span aria-hidden="true">·</span>
              <span>{activeProject.branchesInvolved.length} Engineering Disciplines</span>
            </div>
            <h3 className="text-2xl font-serif-title font-semibold text-slate-100">
              {activeProject.title}
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              {activeProject.objective}
            </p>
          </div>

          <button
            onClick={handleGenerateRoadmap}
            disabled={isGeneratingRoadmap}
            className="px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white text-xs font-semibold rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap self-start md:self-auto shrink-0"
          >
            {isGeneratingRoadmap ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Generating Roadmap...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Generate {currentBranchObj.code} Prep Roadmap</span>
              </>
            )}
          </button>
        </div>

        {/* AI Generated Roadmap Section if active */}
        {generatedRoadmap && (
          <div className="bg-slate-950 border border-cyan-500/40 p-6 rounded-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Your Personalized Accelerated Roadmap ({currentBranchObj.name})</span>
              </span>
              <button
                onClick={() => setGeneratedRoadmap(null)}
                className="text-xs text-slate-400 hover:text-slate-200"
              >
                Close
              </button>
            </div>
            <div className="prose prose-invert max-w-none text-xs sm:text-sm text-slate-200 space-y-2 whitespace-pre-wrap leading-relaxed">
              {generatedRoadmap}
            </div>
          </div>
        )}

        {/* Branch Roles Breakdown */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-cyan-400" />
            <span>Disciplinary Division of Responsibilities</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeProject.branchRoles.map((role, idx) => {
              const bInfo = BRANCHES.find((b) => b.id === role.branchId);
              const isCurrent = role.branchId === currentBranch;

              return (
                <div
                  key={idx}
                  className={`p-5 rounded-xl border space-y-3 ${
                    isCurrent
                      ? 'bg-slate-950 border-cyan-500/60 shadow-md shadow-cyan-950/20'
                      : 'bg-slate-950/60 border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-cyan-300">
                      {role.role}
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      {bInfo?.name || role.branchId}
                    </span>
                  </div>

                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {role.responsibilities.map((resp, rIdx) => (
                      <li key={rIdx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0 mt-1.5"></span>
                        <span className="leading-relaxed">{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        {/* System Architecture Layers */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-400" />
            <span>End-to-End System Architecture Stack</span>
          </h4>
          <div className="space-y-2">
            {activeProject.systemArchitecture.map((layer, idx) => (
              <div
                key={idx}
                className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-200 flex items-center gap-3"
              >
                <span className="w-6 h-6 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-cyan-400 font-bold shrink-0">
                  {idx + 1}
                </span>
                <span>{layer}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bill of Materials (BOM) */}
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
            <Wrench className="w-4 h-4 text-emerald-400" />
            <span>Core Hardware Bill of Materials (BOM)</span>
          </h4>
          <div className="overflow-x-auto border border-slate-800 rounded-xl bg-slate-950/50">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-slate-900 border-b border-slate-800 text-slate-400 font-semibold">
                  <th className="py-3 px-4">Component Item</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Approx Cost</th>
                  <th className="py-3 px-4">Engineering Purpose</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {activeProject.billOfMaterials.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/30 transition-colors">
                    <td className="py-3 px-4 font-medium text-slate-200">{item.item}</td>
                    <td className="py-3 px-4 text-cyan-400 font-mono">{item.category}</td>
                    <td className="py-3 px-4 font-mono text-emerald-400 tabular-nums">{item.approxCost}</td>
                    <td className="py-3 px-4 text-slate-300">{item.purpose}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Starter Code snippet if available */}
        {activeProject.starterCode && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                <Code2 className="w-4 h-4 text-cyan-400" />
                <span>Reference Firmware / Controller ({activeProject.starterCode.filename})</span>
              </h4>
              <span className="text-xs font-mono text-slate-500 uppercase">{activeProject.starterCode.language}</span>
            </div>
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto">
              <pre className="text-xs font-mono text-cyan-200 leading-relaxed">
                <code>{activeProject.starterCode.snippet}</code>
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
