import React, { useState } from 'react';
import { 
  PORTFOLIO_DATA, 
  ProjectItem 
} from './data';
import { ProjectModal } from './ProjectModal';
import { ContactModal } from './ContactModal';
import { FloatingWidget } from './FloatingWidget';
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  TrendingUp, 
  Users, 
  CheckCircle2, 
  ChevronRight, 
  ExternalLink, 
  Mail, 
  Phone, 
  MapPin, 
  Copy, 
  Check, 
  Star, 
  Sparkles, 
  Compass, 
  Target, 
  Layers, 
  BookOpen, 
  Zap, 
  Building2,
  Calendar,
  Search
} from 'lucide-react';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const { profile, signatureAchievements, careerJourney, corePillars, clientLogos, reviews, projects, framework3Steps, skills, certifications, awards, facilitationStats } = PORTFOLIO_DATA;

  // Filter projects by category
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  const categories = [
    { key: 'all', label: '전체 프로젝트' },
    { key: 'Skill-Based HRD', label: '직무체계 & 스킬 아카데미' },
    { key: 'Onboarding & Leadership', label: '온보딩 & 리더십 평가' },
    { key: 'Learning Content & EdTech', label: '에듀테크 & AI 콘텐츠' },
    { key: 'Facilitation & Culture', label: '조직문화 & 몰입형 연수' },
  ];

  const handleCopy = (text: string, type: 'email' | 'phone') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else {
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* 1. TOP UTILITY STRIP (세움스피치 상단 유틸리티 바 대응) */}
      <div className="bg-slate-950/90 border-b border-slate-800/80 text-xs text-slate-400 py-2 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5" />
              HRD Specialist Career Portfolio
            </span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <span className="hidden sm:inline text-slate-400">
              비즈니스 성과를 리딩하는 전략적 인재육성 파트너
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <button
              onClick={() => handleCopy(profile.phone, 'phone')}
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer"
              title="전화번호 복사"
            >
              <Phone className="w-3 h-3 text-amber-400" />
              <span>{profile.phone}</span>
              {copiedPhone && <span className="text-[10px] text-emerald-400 font-sans">복사됨</span>}
            </button>
            <span className="text-slate-700">|</span>
            <button
              onClick={() => handleCopy(profile.email, 'email')}
              className="flex items-center gap-1.5 hover:text-amber-300 transition-colors cursor-pointer"
              title="이메일 복사"
            >
              <Mail className="w-3 h-3 text-amber-400" />
              <span>{profile.email}</span>
              {copiedEmail && <span className="text-[10px] text-emerald-400 font-sans">복사됨</span>}
            </button>
          </div>
        </div>
      </div>

      {/* 2. TOP BAR (3-Zone Top Bar Contract) */}
      <header className="sticky top-0 z-30 bg-[#090d16]/95 backdrop-blur-md border-b border-slate-800/80 px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a 
            href="#" 
            className="text-lg sm:text-xl font-bold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2"
          >
            <span className="w-7 h-7 rounded-lg bg-amber-400 text-slate-950 font-extrabold flex items-center justify-center text-sm shadow-sm">
              E
            </span>
            <span>장은영 <span className="text-xs font-normal text-slate-400 font-mono">HRD Portfolio</span></span>
          </a>

          {/* Zone 2: 4-5 clean single-line nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
            <button 
              onClick={() => scrollToSection('profile')} 
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              프로필
            </button>
            <button 
              onClick={() => scrollToSection('pillars')} 
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              핵심역량
            </button>
            <button 
              onClick={() => scrollToSection('projects')} 
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              주요 프로젝트
            </button>
            <button 
              onClick={() => scrollToSection('framework')} 
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              HRD 프레임워크
            </button>
            <button 
              onClick={() => scrollToSection('experience')} 
              className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              현장경험 및 스킬
            </button>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-4 py-2 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-md shadow-amber-400/20 cursor-pointer"
            >
              프로젝트 협업 문의
            </button>
          </div>
        </div>
      </header>

      {/* 3. HERO SECTION (세움스피치 메인 히어로 레이아웃 대응) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#090d16] via-[#0f1422] to-[#090d16] py-12 sm:py-20 px-4 sm:px-8 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Typographic Drama */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/10 border border-amber-400/30 rounded-full text-xs font-semibold text-amber-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>조직의 KPI와 정렬된 데이터 기반 인재육성 전략</span>
            </div>

            <div className="space-y-3">
              <h1 className="text-3xl sm:text-5xl lg:text-[3.25rem] font-extrabold tracking-tight text-white leading-tight">
                교육을 넘어 <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500">
                  비즈니스 성과
                </span>로 증명합니다
              </h1>
              <p className="text-lg sm:text-xl font-medium text-slate-300">
                Business-First, Result-Oriented HRD Specialist
              </p>
            </div>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-2xl">
              교육학적 깊이와 현장 데이터 분석 역량을 결합하여, 기업의 직무교육체계 수립부터 
              에듀테크 기반 콘텐츠 혁신, 리더십 파이프라인, 조직문화 개선까지 HRD 전 과정을 설계하고 
              측정 가능한 비즈니스 성장으로 연결합니다.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-6 py-3 text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all shadow-lg shadow-amber-400/25 flex items-center gap-2 cursor-pointer"
              >
                <span>대표 프로젝트 7선 탐색</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsContactOpen(true)}
                className="px-6 py-3 text-sm font-medium text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-xl transition-colors cursor-pointer"
              >
                커리어 요약 & 미팅 요청
              </button>
            </div>

            {/* Micro proof badges row */}
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-slate-800/80">
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="text-xl font-extrabold text-amber-400 font-mono">7년 5개월</div>
                <div className="text-xs text-slate-400 mt-0.5">교육·HRD 경력</div>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="text-xl font-extrabold text-amber-400 font-mono">97개 직무</div>
                <div className="text-xs text-slate-400 mt-0.5">JD 전사 정밀 분석</div>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="text-xl font-extrabold text-amber-400 font-mono">200% 증액</div>
                <div className="text-xs text-slate-400 mt-0.5">3년 연속 수주 달성</div>
              </div>
              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800">
                <div className="text-xl font-extrabold text-amber-400 font-mono">4.85 / 5.0</div>
                <div className="text-xs text-slate-400 mt-0.5">학습자 만족도</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Portrait Container */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-md">
              {/* Outer Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/20 to-amber-300/10 rounded-2xl blur-xl opacity-75" />
              
              <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-2xl">
                <img 
                  src="/src/assets/images/hero_hrd_expert_1793101197181.jpg" 
                  alt="HRD Specialist 장은영" 
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover aspect-[4/5]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                
                {/* Floating identity card on the portrait */}
                <div className="absolute bottom-4 inset-x-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700/90 backdrop-blur-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
                        HRD SPECIALIST
                      </div>
                      <div className="text-lg font-bold text-white">
                        장은영 <span className="text-xs text-slate-400 font-normal">| 프로젝트 리더</span>
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-400 flex items-center justify-center font-bold text-sm">
                      ★
                    </div>
                  </div>
                  <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] text-slate-300 flex items-center justify-between">
                    <span>한양대학교 교육학·국어교육</span>
                    <span className="text-amber-400 font-medium">휴넷 · KMAC · 트랙앤그로우</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HIGHLIGHT QUOTE RIBBON (세움스피치 노란색 슬로건 바 대응) */}
      <section className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 py-6 px-4 text-slate-950 shadow-md">
        <div className="max-w-5xl mx-auto text-center space-y-1.5">
          <div className="text-xs font-extrabold uppercase tracking-widest text-slate-900/70">
            WORK PHILOSOPHY & CORE BELIEF
          </div>
          <p className="text-lg sm:text-2xl font-extrabold tracking-tight leading-snug">
            "{profile.philosophy}"
          </p>
          <div className="text-xs font-bold text-slate-800 pt-1">
            — HRD Specialist & Project Leader 장은영
          </div>
        </div>
      </section>

      {/* 5. CLIENT & INSTITUTION LOGO SHOWCASE (세움스피치 합격 로고 슬라이더/그리드 대응) */}
      <section className="py-12 bg-slate-950/70 border-b border-slate-800/80 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-1">
              PROVEN TRACK RECORD & PARTNERS
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              신뢰로 입증된 주요 고객사 및 프로젝트 수행 기관
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {clientLogos.map((client, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/90 hover:border-amber-400/50 transition-all flex flex-col items-center text-center group"
              >
                {/* Circular Badge Emblem */}
                <div className="w-12 h-12 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-amber-400 font-bold text-sm mb-2.5 group-hover:scale-105 group-hover:bg-amber-400/10 transition-transform">
                  <Building2 className="w-5 h-5 text-amber-400" />
                </div>
                <div className="text-xs font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                  {client.name}
                </div>
                <div className="text-[10px] text-slate-400 mb-1">
                  {client.category}
                </div>
                <div className="text-[10px] text-amber-400 font-medium line-clamp-1">
                  {client.metric}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FOUR PILLARS MATRIX & SIGNATURE STATS (세움스피치 2x2 그리드 + 개강 공지 위젯 대응) */}
      <section id="pillars" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#0b0f1a] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
              CORE COMPETENCIES & VALUE PROPOSITION
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              접근 방식이 다르면 <br className="sm:hidden" />성과가 달라집니다
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              조직의 비즈니스 현안을 진단하고, 지속 가능한 인재육성 체계로 구현하는 4대 전문 영역입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* 2x2 Matrix Cards (8 cols) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {corePillars.map((pillar) => (
                <div 
                  key={pillar.id}
                  className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-amber-400/60 transition-all flex flex-col justify-between group shadow-sm hover:shadow-xl"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-400 tracking-wider">
                        {pillar.code}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        {pillar.badge}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                      {pillar.title}
                    </h3>
                    <div className="text-xs font-semibold text-slate-300">
                      {pillar.subtitle}
                    </div>

                    <p className="text-xs text-slate-400 leading-relaxed">
                      {pillar.description}
                    </p>

                    <div className="pt-2 border-t border-slate-800/80">
                      <div className="text-[11px] text-slate-400">
                        <span className="text-slate-300 font-medium">대표 경험:</span> {pillar.cases}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 mt-2">
                    <button
                      onClick={() => scrollToSection('projects')}
                      className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1 group-hover:translate-x-1 transition-transform cursor-pointer"
                    >
                      관련 프로젝트 상세 보기 <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Signature Achievements Board (4 cols - 세움스피치 우측 공지/개강일정 카드 대응) */}
            <div className="lg:col-span-4 p-6 sm:p-7 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-amber-500/30 shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div>
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    SIGNATURE IMPACT
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    핵심 실적 리포트
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold text-xs">
                  KPI
                </div>
              </div>

              <div className="space-y-4">
                {signatureAchievements.map((achieve, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition-colors"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">
                        {achieve.title}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        {achieve.impact}
                      </div>
                    </div>
                    <div className="text-right shrink-0 pl-3">
                      <div className="text-sm font-extrabold text-amber-400 font-mono">
                        {achieve.metric}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {achieve.subtext}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl transition-colors shadow-md text-center cursor-pointer"
                >
                  맞춤형 HRD 솔루션 제안 요청
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. REAL REVIEWS & TESTIMONIAL CAROUSEL (세움스피치 노란색 수강생 리얼 후기 섹션 대응) */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 bg-amber-400 text-slate-950">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="text-center space-y-1">
            <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900/70">
              VOICE OF CLIENTS & LEARNERS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-950">
              수강생 & 고객사 리얼 평가
            </h2>
            <p className="text-sm font-medium text-slate-800 max-w-xl mx-auto">
              숫자와 결과로 증명되는 교육 만족도, 현장에서 체감한 생생한 피드백입니다.
            </p>
          </div>

          {/* Review Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {reviews.map((rev) => (
              <div 
                key={rev.id}
                className="p-6 rounded-2xl bg-slate-950 text-slate-100 shadow-xl flex flex-col justify-between border border-slate-800 space-y-4 hover:-translate-y-1 transition-transform"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                      {rev.badge}
                    </span>
                  </div>

                  <p className="text-sm font-bold text-white leading-snug">
                    "{rev.highlight}"
                  </p>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {rev.content}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <div>
                    <span className="font-semibold text-white">{rev.author}</span>
                    <span className="text-slate-500 mx-1">·</span>
                    <span>{rev.role}</span>
                  </div>
                  <span className="text-[11px] text-amber-400 font-medium">{rev.organization}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TOTAL PROJECTS & CASE STUDIES CATALOG (세움스피치 3x3 다크 강좌 카탈로그 그리드 대응) */}
      <section id="projects" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#090d16] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header & Filter Controls */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                PROJECT PORTFOLIO & CASE STUDIES
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                7대 핵심 프로젝트 상세 분석
              </h2>
              <p className="text-sm text-slate-400">
                각 프로젝트를 클릭하시면 배경, 당면 과제, 전략, 실행, 성과 지표를 상세히 확인하실 수 있습니다.
              </p>
            </div>

            {/* Category Filter Tabs */}
            <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-900 border border-slate-800 rounded-xl">
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat.key
                      ? 'bg-amber-400 text-slate-950 shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          {/* 3x3 / Grid of Project Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="group relative rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-amber-400/80 transition-all overflow-hidden flex flex-col justify-between cursor-pointer shadow-md hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Image Header with Scrim */}
                {proj.image && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-950">
                    <img 
                      src={proj.image} 
                      alt={proj.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
                    
                    <div className="absolute top-3 left-3 text-[11px] font-mono font-bold text-amber-400 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-700/60">
                      PROJECT {proj.number}
                    </div>

                    <div className="absolute top-3 right-3 text-[11px] font-medium text-slate-300 bg-slate-900/80 px-2 py-0.5 rounded">
                      {proj.client}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-[11px] font-semibold text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded">
                        {proj.category}
                      </span>
                    </div>
                  </div>
                )}

                {/* Card Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                      {proj.summary}
                    </p>
                  </div>

                  {/* Highlight Metric Pill */}
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-400">주요 성과</div>
                      <div className="text-xs font-bold text-amber-400 font-mono">
                        {proj.keyMetric}
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-amber-400 group-hover:bg-amber-400/10 transition-colors">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Card Footer Button */}
                <div className="px-6 py-3 border-t border-slate-800 bg-slate-950/50 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:text-amber-400 transition-colors">
                  <span>자세한 케이스 스터디 보기</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. DIFFERENTIATING 3-STEP SYSTEM (세움스피치 3개 겹쳐진 원형 다이어그램 대응) */}
      <section id="framework" className="py-16 sm:py-24 px-4 sm:px-8 bg-gradient-to-b from-[#090d16] via-[#0e1422] to-[#090d16] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              DIFFERENTIATED METHODOLOGY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              차이를 만드는 장은영의 <br />3단계 HRD 프레임워크
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed">
              정밀한 현장 진단에서 시작해 비즈니스 정렬 커리큘럼, 그리고 측정 가능한 임팩트 창출까지 
              체계적인 3단계 프로세스를 거칩니다.
            </p>
          </div>

          {/* 3 Circular Infographic Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {framework3Steps.map((step, idx) => (
              <div 
                key={idx}
                className="relative p-8 rounded-3xl bg-slate-900/90 border border-slate-700/80 flex flex-col items-center text-center space-y-4 shadow-xl hover:border-amber-400/70 transition-all group"
              >
                {/* Step Circle Badge */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg shadow-amber-400/20 group-hover:scale-110 transition-transform">
                  {step.step}
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-semibold text-amber-400 block tracking-wide">
                    {step.subtitle}
                  </span>
                  <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                    {step.title}
                  </h3>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.description}
                </p>

                <div className="w-full pt-4 border-t border-slate-800 text-left space-y-2">
                  {step.items.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. EXECUTIVE PROFILE & CAREER JOURNEY (세움스피치 김지윤 대표원장 상세 프로필 대응) */}
      <section id="profile" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#0b0f1a] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              CAREER JOURNEY & LEADERSHIP
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              커리어의 확장과 성장 궤적
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              학습자를 이해하는 교육기획자에서 비즈니스 문제를 해결하는 HRD 컨설턴트, 
              그리고 조직의 성장을 설계하는 프로젝트 리더로 진화해 왔습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left: Profile Portrait & Identity Details (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-2xl overflow-hidden border border-slate-700/80 bg-slate-900 shadow-xl">
                <img 
                  src="/src/assets/images/hero_hrd_expert_1793101197181.jpg" 
                  alt="장은영 프로필" 
                  referrerPolicy="no-referrer"
                  className="w-full aspect-[4/3] object-cover" 
                />
                <div className="p-6 space-y-4">
                  <div>
                    <div className="text-xs font-bold text-amber-400 tracking-wider uppercase mb-1">
                      PROFESSIONAL IDENTITY
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      장은영 <span className="text-sm font-normal text-slate-400">Eunyoung Jang</span>
                    </h3>
                    <p className="text-xs text-amber-300 font-semibold mt-1">
                      {profile.title}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {profile.subtitle}
                  </p>

                  <div className="pt-3 border-t border-slate-800 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">총 경력:</span>
                      <span className="text-white font-medium">{profile.experienceYears}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">최종 학력:</span>
                      <span className="text-white font-medium">{profile.education}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">활동 거점:</span>
                      <span className="text-white font-medium">{profile.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Career Journey Timeline (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-amber-400" />
                커리어 타임라인 (Career Milestones)
              </h3>

              <div className="space-y-4">
                {careerJourney.map((job, idx) => (
                  <div 
                    key={idx}
                    className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-colors space-y-2.5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/20">
                        {job.period}
                      </span>
                      <span className="text-xs font-semibold text-slate-300">
                        {job.position}
                      </span>
                    </div>

                    <div className="text-base font-bold text-white">
                      {job.company}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {job.summary}
                    </p>

                    <div className="pt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-800/80 text-xs">
                      <div className="text-slate-400">
                        <span className="text-slate-300 font-medium">축적 전문성:</span> {job.expertise.join(' · ')}
                      </div>
                      <div className="text-amber-400 font-medium">
                        ★ {job.highlight}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. SKILLS, CERTIFICATIONS & AWARDS (세움스피치 강사진 섹션 대응) */}
      <section id="experience" className="py-16 sm:py-24 px-4 sm:px-8 bg-[#090d16] border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              COMPETENCY RADAR & CREDENTIALS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              10대 핵심 스킬 & 수상 이력
            </h2>
            <p className="text-sm text-slate-400">
              전략 수립부터 데이터 분석, 퍼실리테이션, 제안 PT 경쟁 1위까지 검증된 실무 역량입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* 10 Core Skills (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Target className="w-5 h-5 text-amber-400" />
                10대 핵심 역량 숙련도
              </h3>

              <div className="space-y-3">
                {skills.map((skill, idx) => (
                  <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-bold text-white">{skill.name}</span>
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${i < skill.level ? 'fill-amber-400 text-amber-400' : 'text-slate-700'}`} 
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {skill.field}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards & Certifications (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Awards */}
              <div className="space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-400" />
                  주요 수상 내역 (Awards)
                </h3>
                <div className="space-y-2.5">
                  {awards.map((award, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold text-white">{award.name}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{award.issuer}</div>
                      </div>
                      <span className="text-[10px] font-mono font-medium text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded shrink-0">
                        {award.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div className="space-y-4 pt-2">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-amber-400" />
                  보유 자격 (Certifications)
                </h3>
                <div className="space-y-2.5">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start justify-between gap-3">
                      <div>
                        <div className="text-xs font-bold text-white">{cert.name}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5">{cert.issuer}</div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0">
                        {cert.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FIELD GALLERY & ACTIVITY HIGHLIGHTS (세움스피치 강의실 시설 갤러리 및 오시는길 대응) */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 bg-slate-950/80 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              WORK ENVIRONMENTS & FIELD SCENES
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              강의와 퍼실리테이션, 현장의 기록
            </h2>
            <p className="text-sm text-slate-400 max-w-xl mx-auto">
              대규모 기업 연수부터 에듀테크 스튜디오, 로컬 몰입형 워크숍까지 생생한 교육 현장입니다.
            </p>
          </div>

          {/* 3 Showcase Visual Scenes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src="/src/assets/images/project_corporate_workshop_1793101196808.jpg" 
                  alt="기업 맞춤형 직무 아카데미" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="text-xs font-bold text-white">기업 맞춤형 직무 아카데미</div>
                  <div className="text-[11px] text-amber-400">현대차 · 캐논코리아 · 공영홈쇼핑</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src="/src/assets/images/project_edtech_ai_1793101197471.jpg" 
                  alt="AI 기반 교육 콘텐츠 혁신 스튜디오" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="text-xs font-bold text-white">에듀테크 & AI 교강사 스튜디오</div>
                  <div className="text-[11px] text-amber-400">콘텐츠 제작비용 50% 절감</div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 group">
              <div className="relative aspect-[16/10] overflow-hidden">
                <img 
                  src="/src/assets/images/project_local_retreat_1793101197788.jpg" 
                  alt="하동 로컬 몰입형 조직문화 연수 공간" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <div className="text-xs font-bold text-white">몰입형 조직문화 연수 파빌리온</div>
                  <div className="text-[11px] text-amber-400">경남 하동 로컬 DB 120개소 구축</div>
                </div>
              </div>
            </div>
          </div>

          {/* Facilitation Stats Bar */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center">
            {facilitationStats.map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
                  {stat.metric}
                </div>
                <div className="text-xs text-slate-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 13. BOTTOM COLLABORATION BANNER (세움스피치 밀슈 제휴 배너 대응) */}
      <section className="py-16 sm:py-20 px-4 sm:px-8 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 text-slate-950 text-center">
        <div className="max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-extrabold uppercase tracking-widest text-slate-900/70 block">
            LET'S SHAPE THE FUTURE TOGETHER
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-snug">
            조직의 성장과 비즈니스 성과를 <br className="sm:hidden" />
            함께 설계할 HRD 파트너를 찾으시나요?
          </h2>
          <p className="text-sm sm:text-base font-medium text-slate-900 max-w-2xl mx-auto leading-relaxed">
            현장의 문제를 데이터로 진단하고, 구성원의 역량 강화가 조직의 지속 가능한 비즈니스 성장으로 이어지는 
            최적의 솔루션을 함께 만들어 가겠습니다.
          </p>

          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setIsContactOpen(true)}
              className="px-8 py-3.5 bg-slate-950 hover:bg-slate-900 text-amber-400 font-bold text-sm rounded-xl transition-all shadow-xl cursor-pointer"
            >
              프로젝트 제안 & 티타임 요청
            </button>
            <a
              href="mailto:wkd0926@gmail.com"
              className="px-8 py-3.5 bg-white/90 hover:bg-white text-slate-950 font-bold text-sm rounded-xl transition-colors"
            >
              이메일 바로 보내기
            </a>
          </div>
        </div>
      </section>

      {/* 14. FOOTER (세움스피치 하단 사업자 정보 및 고객센터 대응) */}
      <footer className="py-12 px-4 sm:px-8 bg-slate-950 text-slate-400 text-xs border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-3">
            <div className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-5 h-5 rounded bg-amber-400 text-slate-950 font-extrabold flex items-center justify-center text-xs">
                E
              </span>
              장은영 HRD Career Portfolio
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Business-First, Result-Oriented HRD Specialist<br />
              현장의 이슈를 데이터로 읽고 최적의 솔루션으로 비즈니스 성장을 리딩합니다.
            </p>
            <div className="text-[11px] text-slate-500 pt-2">
              © 2026 Eunyoung Jang. All rights reserved.
            </div>
          </div>

          <div className="md:col-span-4 space-y-2">
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              Contact & Location
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>010-5254-2856</span>
              <button 
                onClick={() => handleCopy('010-5254-2856', 'phone')}
                className="text-[10px] text-amber-400 hover:underline cursor-pointer ml-1"
              >
                {copiedPhone ? '복사완료' : '복사'}
              </button>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <Mail className="w-3.5 h-3.5 text-amber-400" />
              <span>wkd0926@gmail.com</span>
              <button 
                onClick={() => handleCopy('wkd0926@gmail.com', 'email')}
                className="text-[10px] text-amber-400 hover:underline cursor-pointer ml-1"
              >
                {copiedEmail ? '복사완료' : '복사'}
              </button>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>서울특별시 금천구 (전국 온·오프라인 프로젝트 지원)</span>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider mb-2">
              Quick Navigation
            </div>
            <div className="flex flex-col gap-1.5 text-slate-400">
              <button onClick={() => scrollToSection('pillars')} className="text-left hover:text-amber-400 transition-colors cursor-pointer">
                · 핵심 전문 영역 4대 축
              </button>
              <button onClick={() => scrollToSection('projects')} className="text-left hover:text-amber-400 transition-colors cursor-pointer">
                · 한국석유공사 97개 직무 분석 케이스
              </button>
              <button onClick={() => scrollToSection('projects')} className="text-left hover:text-amber-400 transition-colors cursor-pointer">
                · AI 교강사 에듀테크 혁신 케이스
              </button>
              <button onClick={() => scrollToSection('profile')} className="text-left hover:text-amber-400 transition-colors cursor-pointer">
                · 한양대 · 휴넷 · KMAC 커리어
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Quick Action Widget (세움스피치 우측 플로팅 퀵메뉴 대응) */}
      <FloatingWidget 
        onOpenContact={() => setIsContactOpen(true)}
        onScrollToProjects={() => scrollToSection('projects')}
      />

      {/* Project Deep Case Study Modal */}
      <ProjectModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Contact & Consultation Request Modal */}
      <ContactModal 
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}
