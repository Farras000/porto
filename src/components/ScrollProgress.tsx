import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { smoothScrollTo } from '../utils/scroll';

const sections = [
  { id: 'hero', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'skills', label: 'SKILLS' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'contact', label: 'CONTACT' },
];

export const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const currentProgress = totalScroll > 0 ? (currentScroll / totalScroll) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, currentProgress)));

      // Determine active section
      const scrollPos = currentScroll + window.innerHeight * 0.35;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    smoothScrollTo('#' + id, { duration: 1.8 });
  };

  return (
    <>
      {/* Mobile top progress bar */}
      <div className="fixed top-0 left-0 right-0 h-[2px] bg-white/5 z-50 md:hidden">
        <div
          className="h-full bg-[#c4f041] transition-all duration-150 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Desktop vertical floating navigation & progress */}
      <nav
        aria-label="Section Navigation"
        className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-end gap-6"
      >
        <div className="flex flex-col items-end gap-4 py-4 px-2 rounded-full backdrop-blur-md bg-[#07090e]/40 border border-white/5">
          {sections.map((section, idx) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="group relative flex items-center gap-3 cursor-pointer p-1.5 focus:outline-none"
                aria-label={`Scroll to ${section.label}`}
              >
                {/* Tooltip on hover or active */}
                <span
                  className={`font-mono text-[10px] uppercase tracking-widest transition-all duration-300 pointer-events-none ${
                    isActive
                      ? 'text-[#c4f041] opacity-100 translate-x-0'
                      : 'text-slate-500 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0'
                  }`}
                >
                  0{idx + 1} // {section.label}
                </span>

                {/* Dot indicator */}
                <div className="relative flex items-center justify-center w-3 h-3">
                  <div
                    className={`rounded-full transition-all duration-300 ${
                      isActive
                        ? 'w-2.5 h-2.5 bg-[#c4f041] shadow-[0_0_8px_#c4f041]'
                        : 'w-1.5 h-1.5 bg-slate-600 group-hover:bg-slate-400 group-hover:scale-125'
                    }`}
                  />
                  {isActive && (
                    <motion.div
                      layoutId="activeDotRing"
                      className="absolute inset-0 rounded-full border border-[#c4f041]/40 animate-ping"
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Vertical percentage track */}
        <div className="flex items-center gap-2 pr-2">
          <span className="font-mono text-[10px] text-slate-500 font-medium tracking-wider">
            {Math.round(progress)}%
          </span>
          <div className="w-[1px] h-12 bg-white/10 relative overflow-hidden rounded-full">
            <div
              className="w-full bg-[#c4f041] transition-all duration-150 absolute top-0"
              style={{ height: `${progress}%` }}
            />
          </div>
        </div>
      </nav>
    </>
  );
};
