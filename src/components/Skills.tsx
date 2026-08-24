import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Cpu } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Reveal } from './Reveal';

const iconMap = {
  layout: <Layout className="w-5 h-5 text-[var(--accent)]" />,
  server: <Server className="w-5 h-5 text-[#38bdf8]" />,
  database: <Database className="w-5 h-5 text-[#a855f7]" />,
  cpu: <Cpu className="w-5 h-5 text-[#f59e0b]" />,
};

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { skills } = portfolioData;

  return (
    <section id="skills" className="py-16 sm:py-24 relative z-10 overflow-hidden">
      {/* Infinite Marquee Ticker Strip */}
      <div className="w-full overflow-hidden border-y border-white/10 bg-[#07090e]/80 py-3.5 sm:py-4 mb-14 sm:mb-20 backdrop-blur-sm select-none" data-cursor="drag">
        <div className="animate-marquee flex items-center gap-8 sm:gap-12 font-mono text-xs sm:text-sm tracking-widest text-slate-400">
          {[...skills.ticker, ...skills.ticker, ...skills.ticker, ...skills.ticker].map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 sm:gap-6 whitespace-nowrap">
              <span className="hover:text-[var(--accent)] transition-colors">{item}</span>
              <span className="text-[var(--accent-muted)] text-xs">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <Reveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2.5 sm:mb-3">
              <span className="w-6 sm:w-8 h-[1px] bg-[var(--accent)]" />
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[var(--accent)]">
                {skills.sectionLabel}
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight">
              {skills.title}
            </h2>
          </div>
        </Reveal>

        {/* Stacked Interactive Rows */}
        <Reveal stagger={0.12} className="divide-y divide-white/10 border-y border-white/10">
          {skills.categories.map((cat) => {
            const isHovered = activeCategory === cat.id;
            const icon = iconMap[cat.iconName] || <Cpu className="w-5 h-5 text-[var(--accent)]" />;

            return (
              <div
                key={cat.id}
                onMouseEnter={() => setActiveCategory(cat.id)}
                onMouseLeave={() => setActiveCategory(null)}
                className={`py-7 sm:py-9 md:py-10 transition-all duration-300 ${
                  isHovered ? 'bg-white/[0.02] px-3 sm:px-6 -mx-3 sm:-mx-6 rounded-2xl' : ''
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
                  {/* Left Column: Number + Title */}
                  <div className="lg:col-span-5 flex items-start gap-3 sm:gap-4">
                    <span className="font-mono text-xs sm:text-sm text-slate-500 font-bold tracking-widest mt-1">
                      /{cat.index}
                    </span>
                    <div className="w-full">
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="p-2 rounded-lg bg-white/5">{icon}</div>
                        <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-slate-100">
                          {cat.title}
                        </h3>
                      </div>
                      <p className="font-sans text-xs text-slate-400 mt-1.5 sm:mt-2 leading-relaxed">
                        {cat.subtitle}
                      </p>

                      {/* Animated proficiency underline — fills on scroll (GPU scaleX) */}
                      <div className="mt-3 sm:mt-4 h-[3px] w-full max-w-[220px] rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 1 }}
                          viewport={{ once: true, margin: '-40px' }}
                          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                          style={{ transformOrigin: 'left' }}
                          className="h-full w-full rounded-full bg-gradient-to-r from-[var(--accent)] to-[var(--accent-glow)]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Skills Pills */}
                  <div className="lg:col-span-7 flex flex-wrap gap-2 sm:gap-2.5">
                    {cat.skills.map((skill, skillIdx) => (
                      <motion.span
                        key={skill.name}
                        initial={{ opacity: 0, y: 12, scale: 0.96 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true, margin: '-40px' }}
                        transition={{ duration: 0.45, delay: 0.15 + skillIdx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                        className="group/pill text-left px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-white/10 bg-[#0f141f] hover:border-[var(--accent)]/50 hover:bg-white/[0.04] hover:-translate-y-0.5 transition-all duration-200 cursor-default will-change-transform"
                      >
                        <div className="flex items-center gap-2">
                          <span className="font-sans text-xs sm:text-sm font-semibold text-slate-200 group-hover/pill:text-[var(--accent)] transition-colors">
                            {skill.name}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover/pill:bg-[var(--accent)] transition-colors" />
                        </div>
                        <span className="font-mono text-[10px] text-slate-500 block mt-0.5">
                          {skill.note}
                        </span>
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
};


