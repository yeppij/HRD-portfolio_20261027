import React, { useState } from 'react';
import { MessageSquare, ArrowUp, ArrowDown, PhoneCall, Copy, Check, FileText } from 'lucide-react';

interface FloatingWidgetProps {
  onOpenContact: () => void;
  onScrollToProjects: () => void;
}

export const FloatingWidget: React.FC<FloatingWidgetProps> = ({ onOpenContact, onScrollToProjects }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('010-5254-2856');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToBottom = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  return (
    <div className="fixed right-3 sm:right-6 bottom-6 z-40 flex flex-col items-center gap-2">
      {/* Main floating action cluster */}
      <div className="bg-slate-900/95 border border-slate-700/90 shadow-2xl rounded-2xl p-2 flex flex-col items-center gap-1.5 backdrop-blur-md">
        {/* Quick Consultation Button */}
        <button
          onClick={onOpenContact}
          className="w-12 h-12 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl flex flex-col items-center justify-center transition-all shadow-md group relative"
          title="프로젝트 / 상담 문의"
        >
          <MessageSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
          <span className="text-[9px] font-bold mt-0.5 tracking-tighter">문의</span>
        </button>

        {/* Jump to Projects */}
        <button
          onClick={onScrollToProjects}
          className="w-12 h-11 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl flex flex-col items-center justify-center transition-colors group"
          title="대표 프로젝트 바로가기"
        >
          <FileText className="w-4 h-4 text-amber-400 transition-transform group-hover:scale-110" />
          <span className="text-[9px] font-medium text-slate-300 mt-0.5">프로젝트</span>
        </button>

        {/* Copy Phone / Call */}
        <button
          onClick={handleCopyPhone}
          className="w-12 h-11 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl flex flex-col items-center justify-center transition-colors group relative"
          title="연락처 복사 (010-5254-2856)"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-emerald-400" />
              <span className="text-[9px] font-bold text-emerald-400 mt-0.5">복사됨</span>
            </>
          ) : (
            <>
              <PhoneCall className="w-4 h-4 text-amber-400 transition-transform group-hover:scale-110" />
              <span className="text-[9px] font-medium text-slate-300 mt-0.5">전화번호</span>
            </>
          )}
        </button>

        <div className="w-8 h-[1px] bg-slate-800 my-0.5" />

        {/* Scroll Top */}
        <button
          onClick={scrollToTop}
          className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          title="맨 위로"
        >
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

        {/* Scroll Down */}
        <button
          onClick={scrollToBottom}
          className="w-8 h-8 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          title="맨 아래로"
        >
          <ArrowDown className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
