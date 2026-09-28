import React, { useState } from 'react';
import { Subject, BranchId, SubjectCategory } from '../types';
import { SUBJECTS, BRANCHES } from '../data/engineeringData';
import { Search, Clock, Award, BookOpen, CheckCircle2, XCircle, Code2, ChevronRight, X } from 'lucide-react';

interface CurriculumViewProps {
  currentBranch: BranchId;
  onOpenSimulation?: (simType: string) => void;
}

export const CurriculumView: React.FC<CurriculumViewProps> = ({ currentBranch }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSubject, setActiveSubject] = useState<Subject | null>(null);
  const [selectedQuizAnswers, setSelectedQuizAnswers] = useState<Record<string, number>>({});
  const [showQuizExplanations, setShowQuizExplanations] = useState<Record<string, boolean>>({});

  const currentBranchObj = BRANCHES.find((b) => b.id === currentBranch) || BRANCHES[0];

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Subjects' },
    { id: 'cross_frontiers', label: 'Cross-Disciplinary Frontiers' },
    { id: 'computer_science_ai', label: 'Software, Algorithms & AI' },
    { id: 'electrical_silicon', label: 'Electrical, Signals & Embedded' },
    { id: 'mechanical_thermal', label: 'Mechanical, Fluids & Thermal' },
    { id: 'civil_materials', label: 'Structural, Civil & Materials' }
  ];

  const filteredSubjects = SUBJECTS.filter((sub) => {
    const matchesCat = selectedCategory === 'all' || sub.category === selectedCategory;
    const matchesQuery = sub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      sub.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  const handleSelectQuiz = (questionId: string, optionIndex: number) => {
    setSelectedQuizAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
    setShowQuizExplanations((prev) => ({ ...prev, [questionId]: true }));
  };

  return (
    <div className="space-y-6">
      {/* Top Filter and Search Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 p-1 bg-slate-900 border border-slate-800 rounded-xl">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search subjects, formulas, or skills..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Subject Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredSubjects.map((sub) => {
          const branchMeta = sub.branchMotivation[currentBranch] || sub.branchMotivation.mechanical;

          return (
            <div
              key={sub.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700/80 transition-all group"
            >
              <div>
                {/* Meta header: zero-pill unboxed text */}
                <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                  <span className="font-mono text-cyan-400">{sub.level}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{sub.estimatedHours} hrs</span>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>{sub.modules.length} Modules</span>
                </div>

                <h3 className="text-lg font-semibold text-slate-100 group-hover:text-cyan-300 transition-colors">
                  {sub.title}
                </h3>

                <p className="text-xs text-slate-400 mt-2 line-clamp-2 leading-relaxed">
                  {sub.summary}
                </p>

                {/* Branch Relevance Callout */}
                <div className="mt-4 p-3 bg-slate-950/70 border border-slate-800/80 rounded-xl text-xs space-y-1">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Relevance to {currentBranchObj.name}:</span>
                    <span className="font-mono text-cyan-400">Difficulty: {branchMeta.difficultyRating}/5</span>
                  </div>
                  <p className="text-slate-300 font-medium line-clamp-2">
                    {branchMeta.importance}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[11px] text-slate-500">
                  <span>{sub.tags[0]}</span>
                  <span aria-hidden="true">/</span>
                  <span>{sub.tags[1] || 'Core'}</span>
                </div>

                <button
                  onClick={() => setActiveSubject(sub)}
                  className="px-3.5 py-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/50 rounded-lg transition-colors flex items-center gap-1.5"
                >
                  <span>Open Course</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detailed Course Drawer / Modal */}
      {activeSubject && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-8 shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setActiveSubject(null)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-100 hover:bg-slate-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Subject Overview */}
            <div className="border-b border-slate-800 pb-6 pr-10">
              <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                <span className="text-cyan-400 font-mono">{activeSubject.level}</span>
                <span aria-hidden="true">·</span>
                <span>{activeSubject.estimatedHours} Total Hours</span>
                <span aria-hidden="true">·</span>
                <span>Tailored for {currentBranchObj.name}</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif-title font-semibold text-slate-100">
                {activeSubject.title}
              </h2>
              <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                {activeSubject.description}
              </p>
            </div>

            {/* Branch-Specific Bridge Note */}
            <div className="bg-slate-950 border border-cyan-500/30 p-5 rounded-xl text-xs space-y-2">
              <span className="text-cyan-400 font-semibold uppercase tracking-wider block">
                Why A {currentBranchObj.name} Student Needs This
              </span>
              <p className="text-slate-200 leading-relaxed text-sm">
                {activeSubject.branchMotivation[currentBranch]?.importance || activeSubject.branchMotivation.mechanical.importance}
              </p>
              <p className="text-slate-400 italic">
                Native Analogy: "{activeSubject.branchMotivation[currentBranch]?.nativeAnalogy || activeSubject.branchMotivation.mechanical.nativeAnalogy}"
              </p>
            </div>

            {/* Syllabus Modules */}
            <div>
              <h3 className="text-base font-semibold text-slate-200 mb-4">
                Structured Learning Modules
              </h3>
              <div className="space-y-3">
                {activeSubject.modules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="bg-slate-950/60 border border-slate-800 p-4 rounded-xl space-y-2"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-100">
                        {idx + 1}. {mod.title}
                      </span>
                      <span className="text-slate-500 font-mono">{mod.duration}</span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {mod.summary}
                    </p>
                    {mod.keyFormulas && (
                      <div className="flex flex-wrap gap-2 pt-1 font-mono text-[11px] text-cyan-300">
                        {mod.keyFormulas.map((f, i) => (
                          <code key={i} className="bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                            {f}
                          </code>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Key Governing Equations */}
            {activeSubject.keyFormulas && activeSubject.keyFormulas.length > 0 && (
              <div>
                <h3 className="text-base font-semibold text-slate-200 mb-4">
                  Universal Governing Equations & Physical Meanings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {activeSubject.keyFormulas.map((kf, i) => (
                    <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 font-mono text-xs">
                      <span className="text-cyan-400 font-semibold block">{kf.name}</span>
                      <div className="text-sm font-bold text-slate-100 bg-slate-900 p-2.5 rounded border border-slate-800">
                        {kf.formula}
                      </div>
                      <p className="text-[11px] text-slate-400 font-sans">{kf.variables}</p>
                      <p className="text-[11px] text-slate-300 font-sans italic">{kf.physicalMeaning}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Code Snippet / Lab Starter */}
            {activeSubject.codeSnippet && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-slate-200 flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-cyan-400" />
                    <span>{activeSubject.codeSnippet.title}</span>
                  </h3>
                  <span className="text-xs font-mono text-slate-500 uppercase">{activeSubject.codeSnippet.language}</span>
                </div>
                <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto">
                  <pre className="text-xs font-mono text-cyan-200 leading-relaxed">
                    <code>{activeSubject.codeSnippet.code}</code>
                  </pre>
                </div>
              </div>
            )}

            {/* Knowledge Check Quiz */}
            {activeSubject.quiz && activeSubject.quiz.length > 0 && (
              <div className="border-t border-slate-800 pt-6">
                <h3 className="text-base font-semibold text-slate-200 mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span>Interactive Concept Mastery Check</span>
                </h3>

                <div className="space-y-6">
                  {activeSubject.quiz.map((q, qIndex) => {
                    const selectedOpt = selectedQuizAnswers[q.id];
                    const isAnswered = selectedOpt !== undefined;
                    const isCorrect = selectedOpt === q.correctIndex;

                    return (
                      <div key={q.id} className="bg-slate-950/70 border border-slate-800 p-5 rounded-xl space-y-3">
                        <span className="text-xs text-slate-500 font-mono">Question {qIndex + 1}</span>
                        <p className="text-sm font-medium text-slate-100">{q.question}</p>

                        <div className="space-y-2">
                          {q.options.map((opt, optIndex) => {
                            let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                            if (isAnswered) {
                              if (optIndex === q.correctIndex) {
                                btnStyle = 'bg-emerald-950/50 border-emerald-500 text-emerald-200';
                              } else if (optIndex === selectedOpt) {
                                btnStyle = 'bg-rose-950/50 border-rose-500 text-rose-200';
                              } else {
                                btnStyle = 'bg-slate-900/40 border-slate-800/40 text-slate-500';
                              }
                            }

                            return (
                              <button
                                key={optIndex}
                                onClick={() => handleSelectQuiz(q.id, optIndex)}
                                disabled={isAnswered}
                                className={`w-full p-3 rounded-lg border text-left text-xs font-medium transition-colors flex items-center justify-between ${btnStyle}`}
                              >
                                <span>{opt}</span>
                                {isAnswered && optIndex === q.correctIndex && (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                )}
                                {isAnswered && optIndex === selectedOpt && !isCorrect && (
                                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                                )}
                              </button>
                            );
                          })}
                        </div>

                        {isAnswered && (
                          <div className={`p-3 rounded-lg text-xs mt-2 ${isCorrect ? 'bg-emerald-950/40 text-emerald-300 border border-emerald-800/40' : 'bg-rose-950/40 text-rose-300 border border-rose-800/40'}`}>
                            <strong className="block mb-1">{isCorrect ? 'Correct!' : 'Incorrect'}</strong>
                            <p className="text-slate-300">{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
