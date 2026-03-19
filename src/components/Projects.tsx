import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with modern UI, shopping cart, user checkout, and admin dashboard built with React and Node.js.',
    tech: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL'],
    github: '#',
    live: '#',
  },
  {
    title: 'AI Chat Application',
    description: 'Real-time collaborative chat application featuring AI-assisted responses, markdown support, and seamless synchronized state.',
    tech: ['Next.js', 'OpenAI API', 'WebSockets', 'Redis'],
    github: '#',
    live: '#',
  },
  {
    title: 'Task Management System',
    description: 'A comprehensive productivity tool designed for teams to organize tasks, track progress and visualize workflows using Kanban boards.',
    tech: ['React', 'Zustand', 'Framer Motion', 'Supabase'],
    github: '#',
    live: '#',
  }
];

export const Projects = () => {
  return (
    <section className="py-24 px-8 max-w-6xl mx-auto border-t border-slate-800/50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-12 text-center text-white">
          Featured Work
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group rounded-2xl bg-slate-900/50 border border-slate-800 overflow-hidden flex flex-col hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="h-48 bg-slate-800 w-full relative overflow-hidden flex items-center justify-center">
                <span className="text-slate-600 font-semibold tracking-wider uppercase text-sm group-hover:scale-110 transition-transform duration-500">
                  Project Preview
                </span>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-slate-200 mb-2 group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm mb-6 flex-1 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="px-3 py-1 text-xs rounded-full bg-slate-800 text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-4 mt-auto border-t border-slate-800 pt-4">
                  <a href={project.github} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors">
                    <Github className="w-4 h-4" /> Code
                  </a>
                  <a href={project.live} className="flex items-center gap-2 text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
