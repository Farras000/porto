import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Terminal,
  Copy,
  Check,
  ExternalLink,
  ArrowRight,
  Sparkles,
  X,
  Home,
  User,
  Cpu,
  Briefcase,
  Mail
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { smoothScrollTo } from '../utils/scroll';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [mode, setMode] = useState<'search' | 'terminal'>('search');
  const [copied, setCopied] = useState(false);
  
  const [terminalHistory, setTerminalHistory] = useState<
    Array<{ cmd: string; output: string | React.ReactNode }>
  >([
    {
      cmd: 'welcome',
      output: 'Farras CLI v1.0.0 — Type "help" to see available commands.',
    },
  ]);
  const [terminalInput, setTerminalInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const termEndRef = useRef<HTMLDivElement>(null);
  const { profile, projects, skills } = portfolioData;

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  useEffect(() => {
    if (mode === 'terminal') {
      termEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalHistory, mode]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleNavigate = (id: string) => {
    onClose();
    setTimeout(() => {
      smoothScrollTo('#' + id, { duration: 1.8 });
    }, 150);
  };

  const executeTerminalCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();

    if (!trimmed) return;

    let result: string | React.ReactNode = '';

    if (trimmed === 'clear') {
      setTerminalHistory([]);
      setTerminalInput('');
      return;
    } else if (trimmed === 'help') {
      result = (
        <div className="space-y-1 text-xs font-mono text-slate-300">
          <div>
            <strong className="text-[var(--accent)]">whoami</strong> - Display engineer profile
          </div>
          <div>
            <strong className="text-[var(--accent)]">stack</strong> - List core technologies & tools
          </div>
          <div>
            <strong className="text-[var(--accent)]">projects</strong> - Output featured engineering projects
          </div>
          <div>
            <strong className="text-[var(--accent)]">contact</strong> - Show communication endpoints
          </div>
          <div>
            <strong className="text-[var(--accent)]">goto &lt;home|about|skills|projects|contact&gt;</strong> - Jump to section
          </div>
          <div>
            <strong className="text-[var(--accent)]">sudo hire</strong> - Execute hiring protocol
          </div>
          <div>
            <strong className="text-[var(--accent)]">clear</strong> - Clear console screen
          </div>
        </div>
      );
    } else if (trimmed === 'whoami') {
      result = `${profile.fullName} (${profile.preferredName}) • ${profile.role} • Status: ${profile.status}`;
    } else if (trimmed === 'stack') {
      result = `Core: ${skills.ticker.join(' • ')}`;
    } else if (trimmed === 'projects') {
      result = (
        <div className="space-y-1.5 text-xs font-mono">
          {projects.items.map((p) => (
            <div key={p.id}>
              <span className="text-[var(--accent)] font-bold">[{p.num}]</span> {p.title} —{' '}
              <span className="text-slate-400">{p.tech.join(', ')}</span>
            </div>
          ))}
        </div>
      );
    } else if (trimmed === 'contact') {
      result = `Email: ${profile.email} | GitHub: ${profile.github} | Location: ${profile.location}`;
    } else if (trimmed.startsWith('goto ')) {
      const target = trimmed.replace('goto ', '').trim();
      const valid = ['home', 'about', 'skills', 'projects', 'contact'];
      if (valid.includes(target)) {
        const mapId: Record<string, string> = {
          home: 'hero',
          about: 'about',
          skills: 'skills',
          projects: 'projects',
          contact: 'contact',
        };
        handleNavigate(mapId[target]);
        result = `Navigating to #${mapId[target]}...`;
      } else {
        result = `Unknown section "${target}". Options: ${valid.join(', ')}`;
      }
    } else if (trimmed === 'sudo hire' || trimmed === 'hire') {
      result = (
        <div className="p-3 bg-[var(--accent)]/10 border border-[var(--accent)]/30 rounded-lg text-[var(--accent)] font-mono text-xs">
          <div className="font-bold flex items-center gap-1.5 mb-1">
            <Sparkles className="w-4 h-4" /> [ACCESS GRANTED]
          </div>
          <div>
            Hiring protocol initiated. Reach Farras directly at{' '}
            <a href={`mailto:${profile.email}`} className="underline font-bold text-white">
              {profile.email}
            </a>
            .
          </div>
        </div>
      );
    } else {
      result = `Command not recognized: "${trimmed}". Type "help" for command listing.`;
    }

    setTerminalHistory((prev) => [...prev, { cmd: cmdStr, output: result }]);
    setTerminalInput('');
  };

  const navItems = [
    { id: 'hero', label: 'Home / Hero', icon: Home, num: '01' },
    { id: 'about', label: 'About & Focus', icon: User, num: '02' },
    { id: 'skills', label: 'Technical Stack', icon: Cpu, num: '03' },
    { id: 'projects', label: 'Featured Projects', icon: Briefcase, num: '04' },
    { id: 'contact', label: 'Get in Touch', icon: Mail, num: '05' },
  ];

  const filteredNav = navItems.filter(
    (i) => i.label.toLowerCase().includes(query.toLowerCase()) || i.num.includes(query)
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-start justify-center pt-16 sm:pt-24 px-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
          />

          {/* Palette Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl bg-[#080b12] border border-[var(--accent)]/30 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_30px_var(--accent-muted)] overflow-hidden z-[121] flex flex-col max-h-[80vh]"
          >
            {/* Top Bar / Search Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/10 bg-white/[0.02]">
              {mode === 'search' ? (
                <Search className="w-5 h-5 text-slate-400 shrink-0" />
              ) : (
                <Terminal className="w-5 h-5 text-[var(--accent)] shrink-0" />
              )}

              {mode === 'search' ? (
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type a command or jump to section... (e.g. projects, about, email)"
                  className="w-full bg-transparent font-sans text-sm text-white placeholder-slate-500 focus:outline-none"
                />
              ) : (
                <div className="font-mono text-xs text-[var(--accent)] flex items-center gap-2 w-full">
                  <span>~/farras-cli</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">Interactive Terminal</span>
                </div>
              )}

              {/* Mode switcher pills */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  onClick={() => setMode(mode === 'search' ? 'terminal' : 'search')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-mono transition-all cursor-pointer ${
                    mode === 'terminal'
                      ? 'bg-[var(--accent)] text-[#07090e] font-bold'
                      : 'bg-white/5 text-slate-400 hover:text-white border border-white/10'
                  }`}
                >
                  {mode === 'search' ? '>_ CLI' : 'Search'}
                </button>

                <button
                  onClick={onClose}
                  className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-white/5 cursor-pointer"
                  aria-label="Close Command Palette"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Body */}
            {mode === 'search' ? (
              <div className="p-3 overflow-y-auto space-y-4 max-h-[60vh]">
                {/* Navigation Section */}
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500 px-3 py-1.5">
                    Jump to Section
                  </div>
                  <div className="space-y-1">
                    {filteredNav.map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNavigate(item.id)}
                          className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-white/5 text-slate-300 hover:text-white transition-colors group cursor-pointer text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className="p-1.5 rounded-lg bg-white/5 text-slate-400 group-hover:text-[var(--accent)] transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <span className="font-sans text-sm font-medium">{item.label}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs font-mono text-slate-500 group-hover:text-slate-300">
                            <span>#{item.id}</span>
                            <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quick Actions Section */}
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-wider text-slate-500 px-3 py-1.5">
                    Quick Actions & Controls
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={copyEmail}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-[var(--accent)]/10 border border-white/5 hover:border-[var(--accent)]/30 text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        {copied ? (
                          <Check className="w-4 h-4 text-[var(--accent)]" />
                        ) : (
                          <Copy className="w-4 h-4 text-slate-400 group-hover:text-[var(--accent)] transition-colors" />
                        )}
                        <div>
                          <div className="text-xs font-medium text-slate-200">
                            {copied ? 'Copied to Clipboard!' : 'Copy Email Address'}
                          </div>
                          <div className="text-[10px] font-mono text-slate-500 truncate max-w-[150px]">
                            {profile.email}
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-slate-500">EMAIL</span>
                    </button>

                    <a
                      href={profile.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-[var(--accent)]/10 border border-white/5 hover:border-[var(--accent)]/30 text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-[var(--accent)] transition-colors" />
                        <div>
                          <div className="text-xs font-medium text-slate-200">GitHub Profile</div>
                          <div className="text-[10px] font-mono text-slate-500">
                            github.com/Farras000
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-slate-500">LINK</span>
                    </a>

                    <button
                      onClick={() => setMode('terminal')}
                      className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] hover:bg-[var(--accent)]/10 border border-white/5 hover:border-[var(--accent)]/30 text-left transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Terminal className="w-4 h-4 text-[var(--accent)]" />
                        <div>
                          <div className="text-xs font-medium text-slate-200">
                            Open CLI Terminal
                          </div>
                          <div className="text-[10px] font-mono text-[var(--accent)]">
                            Interactive Shell
                          </div>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-[var(--accent)]">CLI</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Terminal CLI Shell */
              <div className="p-4 bg-[#05070c] font-mono text-xs max-h-[60vh] overflow-y-auto flex flex-col justify-between">
                <div className="space-y-3 mb-4">
                  {terminalHistory.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center gap-2 text-slate-400">
                        <span className="text-[var(--accent)]">$</span>
                        <span className="text-white">{item.cmd}</span>
                      </div>
                      <div className="text-slate-300 pl-4 border-l border-white/10 py-0.5">
                        {item.output}
                      </div>
                    </div>
                  ))}
                  <div ref={termEndRef} />
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    executeTerminalCommand(terminalInput);
                  }}
                  className="flex items-center gap-2 pt-2 border-t border-white/10"
                >
                  <span className="text-[var(--accent)] font-bold">$</span>
                  <input
                    type="text"
                    value={terminalInput}
                    onChange={(e) => setTerminalInput(e.target.value)}
                    placeholder="type 'help', 'whoami', 'stack', 'sudo hire'..."
                    autoFocus
                    className="w-full bg-transparent font-mono text-xs text-white focus:outline-none placeholder-slate-600"
                  />
                </form>
              </div>
            )}

            {/* Footer helper */}
            <div className="px-4 py-2.5 bg-white/[0.02] border-t border-white/10 flex items-center justify-between font-mono text-[11px] text-slate-500">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                    ESC
                  </kbd>{' '}
                  close
                </span>
                <span>
                  <kbd className="px-1.5 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                    ⌘K
                  </kbd>{' '}
                  toggle
                </span>
              </div>
              <span className="text-[var(--accent)]/80">Farras • Engineer Suite</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};


