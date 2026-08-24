import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, ChevronLeft, ChevronRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Reveal } from './Reveal';

const EASE = [0.16, 1, 0.3, 1] as const;
const pad = (n: number) => String(n).padStart(2, '0');

export const HorizontalProjects: React.FC = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const pitchRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  // Static grid on large screens (everything visible, nothing moves);
  // arrow-driven carousel below the lg breakpoint.
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== 'undefined' &&
      window.matchMedia('(min-width: 1024px)').matches
  );
  const { projects } = portfolioData;
  const count = projects.items.length;

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const onChange = () => setIsDesktop(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Scroll position + active card index — driven by the same pitch the arrows use,
  // so the counter can never drift out of sync with the buttons.
  const updateScrollState = useCallback(() => {
    const el = scrollContainerRef.current;
    if (!el || isDesktop) return;

    const scrollLeft = el.scrollLeft;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < maxScroll - 10);

    const pitch = pitchRef.current || 1;
    setActiveIndex(Math.min(count - 1, Math.max(0, Math.round(scrollLeft / pitch))));
  }, [count, isDesktop]);

  useEffect(() => {
    if (isDesktop) return;
    const el = scrollContainerRef.current;
    if (!el) return;

    const measurePitch = () => {
      const cards = el.querySelectorAll<HTMLElement>('.project-card');
      if (cards.length >= 2) {
        pitchRef.current = cards[1].offsetLeft - cards[0].offsetLeft;
      } else {
        const first = cards[0];
        pitchRef.current = (first?.clientWidth ?? 600) + 24;
      }
      updateScrollState();
    };

    measurePitch();
    el.addEventListener('scroll', updateScrollState, { passive: true });
    window.addEventListener('resize', measurePitch);
    return () => {
      el.removeEventListener('scroll', updateScrollState);
      window.removeEventListener('resize', measurePitch);
    };
  }, [updateScrollState, isDesktop]);

  const scrollToIndex = (index: number) => {
    scrollContainerRef.current?.scrollTo({
      left: Math.min(count - 1, Math.max(0, index)) * pitchRef.current,
      behavior: 'smooth',
    });
  };

  const renderCard = (proj: (typeof projects.items)[number], pIdx: number) => (
    <motion.article
      key={proj.id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: pIdx * 0.08, ease: EASE }}
      className={`project-card group relative glass-panel rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 hover:border-[var(--accent-muted)] transition-colors duration-500 hover-lift will-change-transform flex flex-col justify-between ${
        isDesktop ? 'w-full p-6' : 'shrink-0 w-[86vw] sm:w-[560px] md:w-[640px] p-6 sm:p-9 md:p-10'
      }`}
    >
      {/* Per-project glow tint */}
      <div
        aria-hidden="true"
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(closest-side, ${proj.color}55, transparent 100%)`,
          filter: 'blur(40px)',
        }}
      />

      {/* Watermark numeral in the project's own accent */}
      <div
        aria-hidden="true"
        className={`absolute right-3 sm:right-4 -bottom-5 sm:-bottom-7 font-display font-black leading-none select-none pointer-events-none opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500 ${
          isDesktop ? 'text-7xl' : 'text-8xl sm:text-9xl md:text-[10rem]'
        }`}
        style={{ color: proj.color }}
      >
        {proj.num}
      </div>

      {/* Card top */}
      <div className="relative">
        <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 mb-5 sm:mb-6">
          <span
            className="font-mono text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded bg-white/5 whitespace-nowrap"
            style={{ color: proj.color }}
          >
            PROJECT //{proj.num}
          </span>
          <span className="font-mono text-[11px] sm:text-xs text-slate-400 truncate">
            {proj.tagline}
          </span>
        </div>

        <h3
          className={`font-display font-bold text-white group-hover:text-[var(--accent)] transition-colors duration-300 mb-3 ${
            isDesktop ? 'text-xl md:text-2xl' : 'text-2xl sm:text-3xl md:text-4xl'
          }`}
        >
          {proj.title}
        </h3>

        <p
          className={`font-sans text-slate-300 leading-relaxed ${
            isDesktop ? 'text-xs md:text-sm' : 'text-sm sm:text-base'
          }`}
        >
          {proj.description}
        </p>
      </div>

      {/* Card footer */}
      <div
        className={`relative mt-8 pt-5 border-t border-white/10 ${
          isDesktop
            ? 'flex flex-col items-start gap-4'
            : 'flex flex-col sm:flex-row sm:items-center justify-between gap-4'
        }`}
      >
        <div className="flex flex-wrap gap-2">
          {proj.tech.map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 text-[11px] sm:text-xs rounded-md bg-white/5 border border-white/5 text-slate-300 font-mono"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 shrink-0 pt-1 sm:pt-0">
          <a
            href={proj.github}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="open"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white transition-colors p-1 cursor-pointer"
          >
            <Github className="w-4 h-4" />
            <span>CODE</span>
          </a>
          <a
            href={proj.live}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="open"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--accent)] text-[#07090e] font-sans font-bold text-xs hover:shadow-[0_0_15px_var(--accent-muted)] transition-all cursor-pointer"
          >
            <span>DEMO</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </motion.article>
  );

  return (
    <section id="projects" className="relative z-10 py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24">
        {/* ── Header: eyebrow → editorial headline → divider w/ controls ── */}
        <Reveal>
          <div className="flex items-center gap-3 mb-3 sm:mb-4">
            <span className="w-6 sm:w-8 h-[1px] bg-[var(--accent)]" />
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[var(--accent)]">
              {projects.sectionLabel}
            </span>
          </div>

          <div className="border-b border-white/10 pb-8 sm:pb-10 mb-6 sm:mb-8">
            <h2 className="font-display font-black tracking-tight leading-[0.95] text-white text-[clamp(2.5rem,6vw,4.75rem)]">
              Selected{' '}
              <span className="text-stroke-accent">Work</span>
              <span className="text-[var(--accent)]">.</span>
            </h2>

            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row sm:items-end justify-between gap-5 sm:gap-8">
              <p className="font-sans text-sm sm:text-base text-slate-400 max-w-md leading-relaxed">
                {isDesktop
                  ? 'Featured applications and full-stack systems, at a glance.'
                  : 'Featured applications and full-stack systems — moved with the arrows, one project at a time.'}
              </p>

              {!isDesktop ? (
                <div className="flex items-center gap-4 shrink-0">
                  <div
                    className="font-mono text-xs text-slate-400 flex items-center gap-2"
                    aria-live="polite"
                  >
                    <span className="text-[var(--accent)] font-bold">
                      {pad(activeIndex + 1)}
                    </span>
                    <span className="text-slate-600">/</span>
                    <span>{pad(count)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => scrollToIndex(activeIndex - 1)}
                      disabled={!canScrollLeft}
                      aria-label="Previous project"
                      data-cursor="prev"
                      className={`p-2.5 rounded-full border border-white/10 transition-all cursor-pointer ${
                        canScrollLeft
                          ? 'bg-white/5 hover:bg-[var(--accent)] text-slate-200 hover:text-[#07090e] active:scale-95'
                          : 'opacity-30 cursor-not-allowed text-slate-600'
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => scrollToIndex(activeIndex + 1)}
                      disabled={!canScrollRight}
                      aria-label="Next project"
                      data-cursor="next"
                      className={`p-2.5 rounded-full border border-white/10 transition-all cursor-pointer ${
                        canScrollRight
                          ? 'bg-white/5 hover:bg-[var(--accent)] text-slate-200 hover:text-[#07090e] active:scale-95'
                          : 'opacity-30 cursor-not-allowed text-slate-600'
                      }`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="font-mono text-xs text-slate-400 tracking-wider shrink-0 pb-1">
                  <span className="text-[var(--accent)] font-bold">{pad(count)}</span>{' '}
                  PROJECTS
                </div>
              )}
            </div>
          </div>
        </Reveal>

        {/* ── Cards: static grid on desktop, arrow-driven track on mobile ── */}
        {isDesktop ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-8 py-2 w-full items-stretch">
            {projects.items.map(renderCard)}
          </div>
        ) : (
          <>
            <div
              ref={scrollContainerRef}
              className={`flex flex-row gap-5 sm:gap-8 overflow-x-hidden py-2 w-full items-stretch ${
                canScrollLeft ? 'mask-fade-l' : ''
              } ${canScrollRight ? 'mask-fade-r' : ''}`}
            >
              {projects.items.map(renderCard)}
            </div>

            {/* Position dots, echoing the site's dot navigation */}
            <div className="mt-6 flex items-center justify-center gap-2.5">
              {projects.items.map((proj, i) => (
                <button
                  key={proj.id}
                  onClick={() => scrollToIndex(i)}
                  aria-label={`Go to project ${i + 1}: ${proj.title}`}
                  aria-current={activeIndex === i}
                  data-cursor="goto"
                  className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                    activeIndex === i
                      ? 'w-8 bg-[var(--accent)]'
                      : 'w-2.5 bg-white/15 hover:bg-white/30'
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};
