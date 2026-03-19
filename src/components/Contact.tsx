import { motion } from 'framer-motion';
import { Mail, Linkedin } from 'lucide-react';

export const Contact = () => {
  return (
    <section className="py-24 px-8 border-t border-slate-800/50 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-2xl mx-auto flex flex-col items-center"
      >
        <h2 className="text-3xl font-bold mb-6 text-white text-center">
          Get In Touch
        </h2>
        <p className="text-slate-400 mb-10 max-w-lg text-center leading-relaxed">
          I'm currently looking for new opportunities. Whether you have a question or just want to say hi,
          I'll try my best to get back to you!
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center w-full max-w-sm">
          <a
            href="mailto:hello@johndoe.com"
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 transition-all font-medium"
          >
            <Mail className="w-5 h-5" />
            Email Me
          </a>
          <a
            href="#"
            className="flex-1 flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 transition-all font-medium"
          >
            <Linkedin className="w-5 h-5" />
            LinkedIn
          </a>
        </div>
      </motion.div>
      <div className="mt-32 text-slate-500 text-sm">
        <p>© {new Date().getFullYear()} Designed & Built by AYAS.</p>
      </div>
    </section>
  );
};
