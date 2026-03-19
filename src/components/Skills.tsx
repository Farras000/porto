import { motion } from 'framer-motion';
import { Code2, Database, Layout, Server } from 'lucide-react';

const skillCategories = [
  {
    title: 'Frontend',
    icon: <Layout className="w-6 h-6 text-emerald-400" />,
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Framer Motion']
  },
  {
    title: 'Backend',
    icon: <Server className="w-6 h-6 text-blue-400" />,
    skills: ['Node.js', 'Express', 'Go', 'Python', 'REST APIs']
  },
  {
    title: 'Database',
    icon: <Database className="w-6 h-6 text-purple-400" />,
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'Supabase']
  },
  {
    title: 'Tools & Others',
    icon: <Code2 className="w-6 h-6 text-orange-400" />,
    skills: ['Git', 'Docker', 'AWS', 'Vercel', 'Linux']
  }
];

export const Skills = () => {
  return (
    <section className="py-24 px-8 max-w-6xl mx-auto border-t border-slate-800/50">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl font-bold mb-12 text-center text-white">
          Technical Expertise
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                {category.icon}
                <h3 className="text-xl font-semibold text-slate-200">{category.title}</h3>
              </div>
              <ul className="space-y-2">
                {category.skills.map(skill => (
                  <li key={skill} className="text-slate-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 block"></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};
