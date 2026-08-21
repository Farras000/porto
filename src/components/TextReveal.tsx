import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  isHighlight?: boolean;
}

const Word: React.FC<WordProps> = ({ children, progress, range, isHighlight }) => {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const blur = useTransform(progress, range, [12, 0]);
  const scale = useTransform(progress, range, [0.96, 1]);

  return (
    <span className="relative inline-block mr-[0.25em] sm:mr-[0.3em] mb-[0.15em] transition-colors duration-200">
      <motion.span
        style={{
          opacity,
          filter: useTransform(blur, (b) => `blur(${b}px)`),
          scale,
        }}
        className={`inline-block font-display font-medium tracking-tight will-change-[filter,opacity,transform] ${
          isHighlight ? 'text-[#c4f041] font-bold' : 'text-slate-100'
        }`}
      >
        {children}
      </motion.span>
    </span>
  );
};

export const TextReveal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { about, profile } = portfolioData;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'center 0.15'],
  });

  const paragraph = about.manifesto;
  const words = paragraph.split(' ');
  const highlights = about.highlights;
  const totalWords = words.length;

  return (
    <section
      id="about"
      ref={containerRef}
      className="min-h-[60vh] sm:min-h-[70vh] flex flex-col justify-center px-5 sm:px-8 md:px-16 lg:px-24 py-20 sm:py-28 relative z-10 max-w-7xl mx-auto"
    >
      <div className="flex items-center gap-3 mb-6 sm:mb-8">
        <span className="w-6 sm:w-8 h-[1px] bg-[#c4f041]" />
        <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#c4f041]">
          {about.sectionLabel}
        </span>
      </div>

      <div className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl leading-[1.3] text-slate-600 font-display">
        {words.map((word, i) => {
          // Distribute across 0 -> 0.75 so all words de-blur completely in advance
          const start = (i / totalWords) * 0.72;
          const end = Math.min(start + (1 / totalWords) * 1.8, 1);
          const cleanWord = word.replace(/[^a-zA-Z]/g, '').toLowerCase();
          const isHighlight = highlights.some((h) => h.toLowerCase().includes(cleanWord));

          return (
            <Word
              key={i}
              progress={scrollYProgress}
              range={[start, end]}
              isHighlight={isHighlight}
            >
              {word}
            </Word>
          );
        })}
      </div>

      {/* Auxiliary specs grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-white/10">
        {about.pillars.map((pillar) => (
          <div key={pillar.title}>
            <span className="font-mono text-xs text-slate-500 block mb-1.5 tracking-wider uppercase">
              {pillar.title}
            </span>
            <p className="font-sans text-sm text-slate-300 font-medium leading-relaxed">
              {pillar.desc}
            </p>
          </div>
        ))}
        <div>
          <span className="font-mono text-xs text-slate-500 block mb-1.5 tracking-wider uppercase">
            STATUS
          </span>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 rounded-full bg-[#c4f041] animate-pulse" />
            <span className="font-mono text-xs text-[#c4f041] tracking-wider uppercase">
              {profile.status}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

