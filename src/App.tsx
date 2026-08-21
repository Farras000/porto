import { useVisitorTracking } from './hooks/useVisitorTracking';
import { SmoothScroll } from './components/SmoothScroll';
import { NoiseBackground } from './components/NoiseBackground';
import { ScrollProgress } from './components/ScrollProgress';
import { Hero } from './components/Hero';
import { TextReveal } from './components/TextReveal';
import { Skills } from './components/Skills';
import { HorizontalProjects } from './components/HorizontalProjects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  useVisitorTracking();

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#07090e] text-[#e2e8f0] font-sans antialiased overflow-x-hidden selection:bg-[#c4f041] selection:text-[#07090e]">
        {/* Dynamic Film Grain & Interactive Glow Canvas */}
        <NoiseBackground />

        {/* Floating Minimal Navigation & Progress */}
        <ScrollProgress />

        {/* Main Content Flow */}
        <main className="relative z-10 w-full flex flex-col">
          <Hero />
          <TextReveal />
          <Skills />
          <HorizontalProjects />
          <Contact />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
