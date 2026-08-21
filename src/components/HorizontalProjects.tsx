import React, { useRef, useState, useEffect } from 'react';
import { ExternalLink, Github, Code, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

export const HorizontalProjects: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { projects } = portfolioData;

  const updateScrollState = React.useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < maxScroll - 10);

    // Calculate approximate active card index
    const cardWidth = el.querySelector('.project-card')?.clientWidth || 600;
    const newIndex = Math.min(
      Math.round(scrollLeft / (cardWidth + 24)),
      projects.items.length - 1
    );
    setActiveIndex(Math.max(0, newIndex));
  }, [projects.items.length]);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener('scroll', updateScrollState, { passive: true });
    updateScrollState();

    // Wheel listener to translate vertical scroll to horizontal scroll inside the card track
    const handleWheel = (e: WheelEvent) => {
      // If user is scrolling vertically with mouse wheel over the track, scroll horizontally
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX) && Math.abs(e.deltaY) > 5) {
        const atLeft = el.scrollLeft <= 0;
        const atRight = el.scrollLeft >= el.scrollWidth - el.clientWidth - 5;

        // If not at horizontal boundaries, consume wheel for horizontal scroll
        if ((e.deltaY > 0 && !atRight) || (e.deltaY < 0 && !atLeft)) {
          e.preventDefault();
          el.scrollBy({
            left: e.deltaY * 1.5,
            behavior: 'auto',
          });
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      el.removeEventListener('scroll', updateScrollState);
      el.removeEventListener('wheel', handleWheel);
    };
  }, [updateScrollState]);

  const scrollToDirection = (direction: 'left' | 'right') => {
    const el = scrollContainerRef.current;
    if (!el) return;

    const cardWidth = el.querySelector('.project-card')?.clientWidth || 600;
    const scrollAmount = cardWidth + 32;

    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  return (
    <section id="projects" className="relative z-10 py-16 sm:py-24">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24 mb-8 sm:mb-12">
        <div className="flex items-center gap-3 mb-2.5 sm:mb-3">
          <span className="w-6 sm:w-8 h-[1px] bg-[#c4f041]" />
          <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#c4f041]">
            {projects.sectionLabel}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6">
          <div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight">
              {projects.title}
            </h2>
            <p className="font-sans text-xs sm:text-sm text-slate-400 mt-2">
              Explore featured applications and full-stack systems.
            </p>
          </div>

          {/* Navigation Controls & Progress */}
          <div className="flex items-center gap-4">
            <div className="font-mono text-xs text-slate-400 flex items-center gap-2">
              <span className="text-[#c4f041] font-bold">
                0{activeIndex + 1}
              </span>
              <span className="text-slate-600">/</span>
              <span>0{projects.items.length}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollToDirection('left')}
                disabled={!canScrollLeft}
                aria-label="Scroll to previous project"
                className={`p-2.5 rounded-full border border-white/10 transition-all cursor-pointer ${
                  canScrollLeft
                    ? 'bg-white/5 hover:bg-[#c4f041] text-slate-200 hover:text-[#07090e] active:scale-95'
                    : 'opacity-30 cursor-not-allowed text-slate-600'
                }`}
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => scrollToDirection('right')}
                disabled={!canScrollRight}
                aria-label="Scroll to next project"
                className={`p-2.5 rounded-full border border-white/10 transition-all cursor-pointer ${
                  canScrollRight
                    ? 'bg-white/5 hover:bg-[#c4f041] text-slate-200 hover:text-[#07090e] active:scale-95'
                    : 'opacity-30 cursor-not-allowed text-slate-600'
                }`}
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Centered Horizontal Scroll Track */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24">
        <div
          ref={scrollContainerRef}
          className="flex flex-row gap-5 sm:gap-8 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-4 w-full cursor-grab active:cursor-grabbing"
        >
          {projects.items.map((proj) => (
            <div
              key={proj.id}
              className="project-card snap-center shrink-0 w-[88vw] sm:w-[580px] md:w-[680px] lg:w-[740px] glass-panel rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 relative overflow-hidden border border-white/10 hover:border-[#c4f041]/40 transition-all duration-500 group flex flex-col justify-between"
            >
              {/* Watermark Number */}
              <div
                className="absolute right-3 sm:right-4 -bottom-4 sm:-bottom-6 font-display font-black text-8xl sm:text-9xl md:text-[11rem] select-none pointer-events-none opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                style={{ color: proj.color }}
              >
                {proj.num}
              </div>

              {/* Card Top */}
              <div>
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5 sm:pb-4 mb-4 sm:mb-6">
                  <span
                    className="font-mono text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded bg-white/5"
                    style={{ color: proj.color }}
                  >
                    PROJECT //{proj.num}
                  </span>
                  <span className="font-mono text-[11px] sm:text-xs text-slate-400">
                    {proj.tagline}
                  </span>
                </div>

                <h3 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-white group-hover:text-[#c4f041] transition-colors duration-300 mb-2">
                  {proj.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed mb-6">
                  {proj.description}
                </p>
              </div>

              {/* Code / Visual Preview Sandbox Box */}
              {proj.previewCode && (
                <div className="my-3 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-[#080b12] border border-white/5 relative overflow-hidden group/preview">
                  <div className="flex items-center justify-between pb-2.5 border-b border-white/5 mb-2.5 font-mono text-[10px] sm:text-[11px] text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500/40" />
                      <span className="w-2 h-2 rounded-full bg-yellow-500/40" />
                      <span className="w-2 h-2 rounded-full bg-green-500/40" />
                      <span className="ml-1 sm:ml-2 text-slate-400">{proj.previewCode.filename}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Code className="w-3.5 h-3.5 text-slate-500" />
                      <span>SOURCE</span>
                    </div>
                  </div>

                  <div className="font-mono text-[11px] sm:text-xs text-slate-400 space-y-1 opacity-85 group-hover/preview:opacity-100 transition-opacity overflow-x-auto">
                    {proj.previewCode.snippet.map((line, lIdx) => (
                      <div key={lIdx} className="whitespace-pre">
                        {line}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Card Footer: Tech Tags & Direct Action Links */}
              <div className="mt-5 pt-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 sm:px-2.5 py-1 text-[11px] sm:text-xs rounded-md bg-white/5 border border-white/5 text-slate-300 font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 sm:gap-4 shrink-0 pt-2 sm:pt-0">
                  <a
                    href={proj.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors p-1"
                  >
                    <Github className="w-4 h-4" />
                    <span>CODE</span>
                  </a>
                  <a
                    href={proj.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-[#c4f041] text-[#07090e] font-sans font-bold text-xs hover:bg-[#d6ff52] transition-colors"
                  >
                    <span>DEMO</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


