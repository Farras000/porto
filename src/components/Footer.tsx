import React from 'react';
import { ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { smoothScrollTo } from '../utils/scroll';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    smoothScrollTo(0, { duration: 1.8 });
  };

  const { profile } = portfolioData;

  return (
    <footer className="relative z-10 border-t border-white/10 py-8 sm:py-12 px-5 sm:px-8 md:px-16 lg:px-24 bg-[#05070a]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 font-mono text-xs text-slate-500 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-4">
          <span className="text-slate-300 font-bold">{profile.name}</span>
          <span>© {new Date().getFullYear()} ALL RIGHTS RESERVED</span>
        </div>

        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 text-slate-400 hover:text-[#c4f041] transition-colors group cursor-pointer p-1"
        >
          <span>BACK TO TOP</span>
          <div className="p-1 rounded-full bg-white/5 group-hover:bg-[#c4f041] group-hover:text-[#07090e] transition-all">
            <ArrowUp className="w-3.5 h-3.5" />
          </div>
        </button>
      </div>
    </footer>
  );
};

