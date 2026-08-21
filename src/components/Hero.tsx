import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ArrowDownRight, Terminal } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { smoothScrollTo } from '../utils/scroll';

export const Hero: React.FC = () => {
  const [time, setTime] = useState<string>('');
  const { profile } = portfolioData;

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString('en-US', {
          timeZone: profile.timeZone || 'Asia/Jakarta',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }) + ' UTC+7'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [profile.timeZone]);

  const nameLetters = profile.name.split('');

  return (
    <section
      id="hero"
      className="min-h-[100dvh] flex flex-col justify-between px-5 sm:px-8 md:px-16 lg:px-24 pt-20 sm:pt-24 pb-10 relative z-10 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Top micro metadata bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5 font-mono text-xs text-slate-400"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c4f041] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#c4f041]"></span>
          </span>
          <span className="tracking-widest uppercase text-slate-200">{profile.status}</span>
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <div className="hidden sm:flex items-center gap-2 text-slate-400">
            <Terminal className="w-3.5 h-3.5 text-[#c4f041]" />
            <span className="uppercase">{profile.role}</span>
          </div>
          <span className="text-[#c4f041] bg-[#c4f041]/10 px-2.5 py-1 rounded border border-[#c4f041]/20 font-medium">
            {time || 'LIVE CLOCK'}
          </span>
        </div>
      </motion.div>

      {/* Centerpiece: Clean Editorial Title & Layout */}
      <div className="my-auto py-8 sm:py-12 md:py-16">
        <div className="relative">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center gap-3 mb-3 sm:mb-4"
          >
            <span className="w-6 h-[1px] bg-[#c4f041]" />
            <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#c4f041]">
              {profile.eyebrow}
            </span>
          </motion.div>

          {/* Main Display Name: Clean, Striking Typography with Colored Accent Dot */}
          <div className="relative flex items-baseline flex-nowrap select-none w-full max-w-full overflow-visible py-1 sm:py-2">
            {nameLetters.map((letter, idx) => {
              // 1st A (idx 1) and 2nd R (idx 3) get font-display font-black text-stroke
              // 2nd A (idx 4) and remaining letters (F, 1st R, S) get font-display font-black text-white
              const isStrokeLetter = idx === 1 || idx === 3;

              return (
                <motion.span
                  key={idx}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.15 + idx * 0.06,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`text-[clamp(2.4rem,8.6vw,9.2rem)] leading-[0.95] shrink-0 inline-block transition-colors duration-200 tracking-tighter font-display font-black ${
                    isStrokeLetter
                      ? 'text-stroke hover:text-[#c4f041]'
                      : 'text-white'
                  }`}
                >
                  {letter}
                </motion.span>
              );
            })}
            {/* Colored Accent Period */}
            <motion.span
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.7,
                delay: 0.15 + nameLetters.length * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[clamp(2.4rem,8.6vw,9.2rem)] leading-[0.95] shrink-0 inline-block tracking-tighter font-display font-black text-[#c4f041]"
            >
              .
            </motion.span>
          </div>

          {/* Professional Identity Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-xs sm:text-sm text-slate-300 mt-4 sm:mt-6"
          >
            <span className="text-[#c4f041] font-bold">~/</span>
            <span className="text-white font-semibold">{profile.fullName}</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400">commonly called <strong className="text-[#c4f041] font-semibold">{profile.preferredName}</strong></span>
          </motion.div>

          {/* Subtext Statement */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-6 sm:mt-8 grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 items-end"
          >
            <div className="md:col-span-7">
              <h2 className="text-sm sm:text-base font-mono text-slate-400 mb-2">
                {profile.role}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-300 font-sans font-light leading-relaxed">
                {profile.bioShort}
              </p>
            </div>

            <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-wrap items-stretch sm:items-center md:justify-end gap-3 sm:gap-4">
              <button
                onClick={() => smoothScrollTo('#projects', { duration: 1.8 })}
                className="group inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-[#c4f041] text-[#07090e] font-sans font-bold text-sm hover:bg-[#d6ff52] hover:shadow-[0_0_25px_rgba(196,240,65,0.4)] transition-all duration-300 transform active:scale-95 text-center cursor-pointer"
              >
                <span>EXPLORE WORK</span>
                <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
              </button>

              <button
                onClick={() => smoothScrollTo('#contact', { duration: 1.8 })}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full glass-panel text-slate-200 font-sans font-medium text-sm hover:text-white hover:border-[#c4f041]/40 transition-all duration-300 active:scale-95 text-center cursor-pointer"
              >
                <span>GET IN TOUCH</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom bar: Socials & Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/10"
      >
        <div className="flex items-center gap-3 sm:gap-4">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/5 hover:bg-[#c4f041] text-slate-300 hover:text-[#07090e] transition-all duration-300 hover:scale-110"
            aria-label="GitHub Profile"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-white/5 hover:bg-[#c4f041] text-slate-300 hover:text-[#07090e] transition-all duration-300 hover:scale-110"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="p-2.5 rounded-full bg-white/5 hover:bg-[#c4f041] text-slate-300 hover:text-[#07090e] transition-all duration-300 hover:scale-110"
            aria-label="Send Email"
          >
            <Mail className="w-4 h-4" />
          </a>
        </div>

        <div className="flex items-center gap-2.5 font-mono text-xs text-slate-500">
          <span className="hidden sm:inline">SCROLL DOWN</span>
          <div className="w-4 h-7 rounded-full border border-slate-700 flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="w-1 h-1.5 bg-[#c4f041] rounded-full"
            />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

