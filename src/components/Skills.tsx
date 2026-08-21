import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout, Server, Database, Cpu, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const iconMap = {
  layout: <Layout className="w-5 h-5 text-[#c4f041]" />,
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
      <div className="w-full overflow-hidden border-y border-white/10 bg-[#07090e]/80 py-3.5 sm:py-4 mb-14 sm:mb-20 backdrop-blur-sm select-none">
        <div className="animate-marquee flex items-center gap-8 sm:gap-12 font-mono text-xs sm:text-sm tracking-widest text-slate-400">
          {skills.ticker.concat(skills.ticker).map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 sm:gap-6 whitespace-nowrap">
              <span className="hover:text-[#c4f041] transition-colors">{item}</span>
              <span className="text-[#c4f041]/40 text-xs">✦</span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 md:px-16 lg:px-24">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4 sm:gap-6">
          <div>
            <div className="flex items-center gap-3 mb-2.5 sm:mb-3">
              <span className="w-6 sm:w-8 h-[1px] bg-[#c4f041]" />
              <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#c4f041]">
                {skills.sectionLabel}
              </span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl md:text-6xl text-white tracking-tight">
              {skills.title}
            </h2>
          </div>
          <p className="font-sans text-xs sm:text-sm text-slate-400 max-w-md">
            {skills.subtitle}
          </p>
        </div>

        {/* Stacked Interactive Rows */}
        <div className="divide-y divide-white/10 border-y border-white/10">
          {skills.categories.map((cat) => {
            const isHovered = activeCategory === cat.id;
            const icon = iconMap[cat.iconName] || <Cpu className="w-5 h-5 text-[#c4f041]" />;

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5 }}
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
                    <div>
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="p-2 rounded-lg bg-white/5">{icon}</div>
                        <h3 className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-slate-100">
                          {cat.title}
                        </h3>
                      </div>
                      <p className="font-sans text-xs text-slate-400 mt-1.5 sm:mt-2 leading-relaxed">
                        {cat.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Right Column: Skills pills with clean tags */}
                  <div className="lg:col-span-7 flex flex-wrap gap-2 sm:gap-2.5">
                    {cat.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="group/pill relative px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-[#0f141f] border border-white/10 hover:border-[#c4f041]/50 transition-all duration-200 cursor-default"
                      >
                        <div className="flex items-center gap-1.5 sm:gap-2">
                          <span className="font-sans text-xs sm:text-sm font-semibold text-slate-200 group-hover/pill:text-[#c4f041] transition-colors">
                            {skill.name}
                          </span>
                          <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover/pill:text-[#c4f041] group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5 transition-transform" />
                        </div>
                        <span className="font-mono text-[10px] text-slate-500 block mt-0.5">
                          {skill.note}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

