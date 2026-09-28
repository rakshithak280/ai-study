import React from 'react';
import { BranchId } from '../types';
import { BRANCHES } from '../data/engineeringData';
import { X, Check } from 'lucide-react';

interface BranchSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentBranch: BranchId;
  onSelectBranch: (branch: BranchId) => void;
}

export const BranchSelectorModal: React.FC<BranchSelectorModalProps> = ({
  isOpen,
  onClose,
  currentBranch,
  onSelectBranch,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div>
          <span className="text-xs text-cyan-400 font-mono">Personalized Perspective</span>
          <h2 className="text-2xl font-serif-title font-semibold text-slate-100 mt-1">
            Select Your Native Engineering Branch
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1.5 leading-relaxed">
            OmniEngineer dynamically adapts all analogies, difficulty ratings, and lesson explanations to anchor directly in what you already know.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BRANCHES.map((b) => {
            const isSelected = b.id === currentBranch;

            return (
              <button
                key={b.id}
                onClick={() => {
                  onSelectBranch(b.id);
                  onClose();
                }}
                className={`p-5 rounded-xl text-left border transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800/90 border-cyan-500 shadow-md shadow-cyan-950/20'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-cyan-400 font-bold">{b.code}</span>
                    {isSelected && (
                      <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                        <Check className="w-3.5 h-3.5" />
                        <span>Active</span>
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-slate-100">{b.name}</h3>
                  <p className="text-xs text-slate-400 mt-1">{b.tagline}</p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 space-y-1">
                  <div className="truncate">
                    <span className="text-slate-500">Law: </span>
                    <code className="text-slate-300 font-mono">{b.keyGoverningLaw}</code>
                  </div>
                  <div className="truncate">
                    <span className="text-slate-500">Core: </span>
                    <span>{b.coreConcepts.slice(0, 3).join(', ')}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
