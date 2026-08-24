import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SmoothScroll } from './components/SmoothScroll';
import { CustomCursor } from './components/CustomCursor';
import { Universe } from './three/Universe';
import { ScrollProgress } from './components/ScrollProgress';
import { Hero } from './components/Hero';
import { TextReveal } from './components/TextReveal';
import { Skills } from './components/Skills';
import { HorizontalProjects } from './components/HorizontalProjects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CommandPalette } from './components/CommandPalette';

function App() {
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen((prev) => !prev);
      } else if (
        e.key === '/' &&
        !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setIsCommandPaletteOpen(true);
      } else if (e.key === 'Escape' && isCommandPaletteOpen) {
        setIsCommandPaletteOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandPaletteOpen]);

  return (
    <>
      <CustomCursor />
      {/* Scroll-reactive 3D Particle Universe — fixed WebGL layer behind content */}
      <Universe />
      <SmoothScroll>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative min-h-screen bg-transparent text-[#e2e8f0] font-sans antialiased overflow-x-hidden selection:bg-[var(--accent)] selection:text-[#07090e]"
        >
          {/* Global Interactive Developer Console / Command Palette */}
          <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
          />

          {/* Floating Minimal Navigation & Progress */}
          <ScrollProgress />

          {/* Main Content Flow */}
          <main className="relative z-10 w-full flex flex-col">
            <Hero onOpenCommandPalette={() => setIsCommandPaletteOpen(true)} />
            <TextReveal />
            <Skills />
            <HorizontalProjects />
            <Contact />
          </main>

          <Footer />
        </motion.div>
      </SmoothScroll>
    </>
  );
}

export default App;
