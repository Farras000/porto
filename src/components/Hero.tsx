import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center p-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-3xl text-center space-y-6"
      >
        <span className="text-emerald-400 font-semibold tracking-wider uppercase text-sm">
          Hey there, I am
        </span>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-4">
          John Doe
        </h1>
        <h2 className="text-2xl md:text-3xl text-slate-400 font-medium pb-2">
          Full Stack Software Engineer
        </h2>
        <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto pt-4">
          I build exceptional and accessible digital experiences for the web.
          Focused on crafting clean, user-friendly, and high-performance applications.
        </p>
        <div className="flex items-center justify-center gap-6 pt-8">
          <a href="#" className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full">
            <Github className="w-6 h-6" />
          </a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full">
            <Linkedin className="w-6 h-6" />
          </a>
          <a href="#" className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-slate-800 rounded-full">
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </motion.div>
    </section>
  );
};
