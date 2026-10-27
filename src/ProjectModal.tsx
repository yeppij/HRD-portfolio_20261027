import React, { useEffect } from 'react';
import { ProjectItem } from './data';
import { X, CheckCircle2, TrendingUp, Target, Award, Layers } from 'lucide-react';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/85 backdrop-blur-md"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 border-b border-slate-800 bg-slate-950/80">
          <div className="space-y-1.5 pr-6">
            <div className="flex items-center gap-3 text-xs font-semibold text-amber-400">
              <span className="tracking-wider uppercase">PROJECT {project.number}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-300 font-medium">{project.category}</span>
              <span className="text-slate-600">·</span>
              <span className="text-slate-400 font-normal">{project.period}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white leading-snug">
              {project.title}
            </h2>
            <div className="text-sm text-slate-400 flex items-center gap-2 pt-1">
              <span className="font-medium text-slate-300">고객/기관:</span> {project.client}
              <span className="text-slate-600">·</span>
              <span className="font-medium text-slate-300">역할:</span> {project.role}
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="닫기"
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors shrink-0"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 divide-y divide-slate-800/80">
          {/* Key Metric Banner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gradient-to-r from-amber-500/10 via-slate-800/60 to-slate-800/40 border border-amber-500/30 rounded-xl p-5">
            <div>
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                대표 성과 지표
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-300 tracking-tight font-mono">
                {project.keyMetric}
              </div>
            </div>
            <div className="sm:border-l sm:border-slate-700/60 sm:pl-5 flex flex-col justify-center">
              <div className="text-xs text-slate-400 mb-1">비즈니스 임팩트</div>
              <div className="text-sm font-medium text-slate-200">
                {project.metricLabel}
              </div>
            </div>
          </div>

          {/* Project Image if available */}
          {project.image && (
            <div className="pt-6">
              <div className="relative rounded-xl overflow-hidden border border-slate-700/60 aspect-video max-h-72 w-full bg-slate-950">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 text-xs font-medium text-slate-300 bg-slate-900/80 backdrop-blur-sm px-2.5 py-1 rounded">
                  {project.client} 실전 프로젝트
                </div>
              </div>
            </div>
          )}

          {/* Section 1: Overview & Stack */}
          <div className="pt-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-400" />
              프로젝트 개요 및 핵심 역량 기술
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/40">
                <span className="text-xs font-semibold text-slate-400 block mb-1">프로젝트 유형</span>
                <p className="text-slate-200">{project.overview.type}</p>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/40">
                <span className="text-xs font-semibold text-slate-400 block mb-1">주요 이해관계자</span>
                <p className="text-slate-200">{project.overview.stakeholders.join(', ')}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              {project.overview.tech.map((item, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700 rounded-md"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Section 2: Problem & Challenge */}
          <div className="pt-6 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-red-400" />
              해결해야 할 핵심 문제 (Pain Points)
            </h3>
            <ul className="space-y-2">
              {project.problem.map((prob, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                  <span>{prob}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 3: Strategies */}
          <div className="pt-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              해결 전략 (Strategic Solution)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {project.strategy.map((strat, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-800/40 border border-slate-700/50 space-y-1.5">
                  <div className="text-sm font-semibold text-amber-300">
                    {strat.title}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {strat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Execution */}
          <div className="pt-6 space-y-3">
            <h3 className="text-base font-bold text-white">주요 실행 내용 (Execution)</h3>
            <ul className="space-y-2">
              {project.execution.map((exec, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-300 leading-relaxed">
                  <span className="text-amber-400 font-bold shrink-0">✓</span>
                  <span>{exec}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Section 5: Measurable Results Table */}
          <div className="pt-6 space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-amber-400" />
              정량 성과 지표 (Results & Impact)
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-700/80">
              <table className="w-full text-left text-sm text-slate-300">
                <thead className="bg-slate-800/80 text-xs font-semibold text-slate-400 uppercase border-b border-slate-700">
                  <tr>
                    <th className="px-4 py-3">성과 지표</th>
                    <th className="px-4 py-3 text-right">결과</th>
                    <th className="px-4 py-3">비즈니스 의미</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {project.results.map((res, idx) => (
                    <tr key={idx} className="hover:bg-slate-800/40 transition-colors">
                      <td className="px-4 py-3 font-medium text-white">{res.metric}</td>
                      <td className="px-4 py-3 font-semibold text-amber-400 text-right font-mono">{res.result}</td>
                      <td className="px-4 py-3 text-xs text-slate-300">{res.meaning}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Section 6: Key Learning & Insight */}
          <div className="pt-6">
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                KEY LEARNING & INSIGHT
              </span>
              <p className="text-sm text-slate-300 leading-relaxed font-normal">
                "{project.keyLearning}"
              </p>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="text-xs text-slate-400">
            장은영 HRD Career Portfolio · Project Case Study
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
