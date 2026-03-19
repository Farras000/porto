import { useVisitorTracking } from './hooks/useVisitorTracking';
import { Hero } from './components/Hero';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';

function App() {
  useVisitorTracking();

  return (
    <div className="bg-[#0b1120] min-h-screen text-slate-50 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 antialiased overflow-hidden">
      <main className="relative">
        {/* Ambient background glow */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob animation-delay-2000"></div>

        <div className="relative z-10 w-full h-full">
          <Hero />
          <Skills />
          <Projects />
          <Contact />
        </div>
      </main>
    </div>
  );
}

export default App;
