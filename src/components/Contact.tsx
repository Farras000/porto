import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Copy, Check, ArrowUpRight, Globe } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { Reveal } from './Reveal';

export const Contact: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { contact, profile } = portfolioData;
  const emailAddress = profile.email;

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-20 sm:py-28 px-5 sm:px-8 md:px-16 lg:px-24 relative z-10 max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-5 sm:mb-6">
        <span className="w-6 sm:w-8 h-[1px] bg-[var(--accent)]" />
        <span className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[var(--accent)]">
          {contact.sectionLabel}
        </span>
      </div>

      {/* Editorial Headline */}
      <Reveal className="mb-10 sm:mb-16">
        <h2 className="font-display font-black text-[clamp(2.5rem,7.5vw,6.5rem)] text-white tracking-tight leading-[1.05] select-none break-words">
          {contact.headingStart} <br className="hidden sm:inline" />
          <span className="text-stroke-accent hover:text-[var(--accent)] transition-colors duration-500 inline-block pr-1">
            {contact.headingStroke}
          </span>
          <span className="text-[var(--accent)]">{contact.headingEnd}</span>
        </h2>
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-start border-t border-white/10 pt-8 sm:pt-12">
        {/* Left Column: Direct Action */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 space-y-6 sm:space-y-8"
        >
          <p className="font-sans text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed max-w-xl">
            {contact.description}
          </p>

          {/* Interactive Email Bar with Mobile Stack */}
          <div className="glass-panel p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 sm:gap-3.5 overflow-hidden">
              <div className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-[var(--accent-muted)] text-[var(--accent)] shrink-0">
                <Mail className="w-4 sm:w-5 h-4 sm:h-5" />
              </div>
              <div className="truncate">
                <span className="font-mono text-[10px] sm:text-xs text-slate-500 uppercase tracking-wider block">
                  PRIMARY EMAIL
                </span>
                <a
                  href={`mailto:${emailAddress}`}
                  data-cursor="open"
                  className="font-mono text-sm sm:text-base md:text-lg font-bold text-white hover:text-[var(--accent)] transition-colors truncate block"
                >
                  {emailAddress}
                </a>
              </div>
            </div>

            <button
              onClick={copyEmail}
              data-cursor="copy"
              className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-3 rounded-xl sm:rounded-2xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border border-white/10 font-mono text-xs transition-all active:scale-95 cursor-pointer shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[var(--accent)]" />
                  <span className="text-[var(--accent)]">COPIED!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span>COPY EMAIL</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Right Column: Status & Channels */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 space-y-4 sm:space-y-6"
        >
          <div className="glass-panel p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-white/10 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="font-mono text-xs text-slate-500 uppercase">STATUS</span>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                <span className="font-mono text-xs text-[var(--accent)] font-bold uppercase">{profile.status}</span>
              </div>
            </div>

            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <span className="font-mono text-xs text-slate-500 uppercase">LOCATION</span>
              <div className="flex items-center gap-1.5 text-slate-300 font-mono text-xs">
                <Globe className="w-3.5 h-3.5 text-slate-500" />
                <span>{profile.location} (UTC+7)</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-slate-500 uppercase">RESPONSE TIME</span>
              <span className="font-mono text-xs text-slate-300">{contact.responseTime}</span>
            </div>
          </div>

          {/* Social Links List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="open"
              className="hover-lift flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl glass-panel border border-white/10 hover:border-[var(--accent-muted)] text-slate-300 hover:text-white transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Github className="w-4 h-4 text-slate-400 group-hover:text-[var(--accent)] transition-colors" />
                <span className="font-mono text-xs font-semibold">GITHUB</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="open"
              className="hover-lift flex items-center justify-between p-3.5 sm:p-4 rounded-xl sm:rounded-2xl glass-panel border border-white/10 hover:border-[var(--accent-muted)] text-slate-300 hover:text-white transition-all group"
            >
              <div className="flex items-center gap-2.5">
                <Linkedin className="w-4 h-4 text-slate-400 group-hover:text-[var(--accent)] transition-colors" />
                <span className="font-mono text-xs font-semibold">LINKEDIN</span>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

