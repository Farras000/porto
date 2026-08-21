// ============================================================================
// SITE CONFIGURATION
// You can customize all your personal info, projects, skills, and links here.
// ============================================================================

export interface SkillItem {
  name: string;
  note?: string;
}

export interface SkillCategory {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  skills: SkillItem[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  github?: string;
  live?: string;
}

export const siteConfig = {
  // ── 1. PERSONAL INFORMATION ───────────────────────────────────────────────
  name: 'FARRAS', // TODO: Your name or handle
  role: 'Full Stack Software Engineer', // TODO: Your main professional title
  location: 'Indonesia (UTC+7)', // TODO: Your location / timezone
  timezone: 'Asia/Jakarta', // TODO: IANA timezone for live clock
  eyebrow: 'Full Stack & Web Engineering', // TODO: Short top eyebrow in Hero
  tagline:
    'I build clean, user-friendly, and high-performance applications with modern web technologies.', // TODO: Your hero description

  // ── 2. CONTACT & SOCIAL CHANNELS ──────────────────────────────────────────
  email: 'f4rrasi@gmail.com', // TODO: Your email address
  github: 'https://github.com', // TODO: Your GitHub profile URL (e.g. https://github.com/yourusername)
  linkedin: 'https://linkedin.com', // TODO: Your LinkedIn profile URL (e.g. https://linkedin.com/in/yourusername)
  availability: 'Open for Opportunities', // TODO: Your work status
  avgResponseTime: '< 24 Hours', // TODO: Average reply time

  // ── 3. ABOUT / MANIFESTO STATEMENT ────────────────────────────────────────
  aboutParagraph:
    'I build exceptional and accessible digital experiences for the web. Focused on crafting clean, user-friendly, and high-performance applications from database to interface.',
  // Words in the paragraph to highlight with color in the scroll-reveal:
  aboutHighlights: ['exceptional', 'accessible', 'digital', 'clean,', 'user-friendly,', 'high-performance'],
  focusAreas: 'Full-Stack Web Development, Modern APIs, Interactive UIs',
  methodology: 'Clean Code, Performance-First, User Centric',

  // ── 4. SKILLS & TECHNICAL CAPABILITIES ────────────────────────────────────
  // Infinite marquee ticker items:
  marqueeSkills: [
    'REACT',
    'TYPESCRIPT',
    'NEXT.JS',
    'NODE.JS',
    'TAILWIND CSS',
    'POSTGRESQL',
    'MONGODB',
    'EXPRESS',
    'GIT',
    'DOCKER',
    'SUPABASE',
    'REST APIS',
  ],

  // Categorized capability groups:
  skillCategories: [
    {
      id: 'frontend',
      index: '01',
      title: 'Frontend Development',
      subtitle: 'Building responsive, accessible, and fast web applications',
      skills: [
        { name: 'React', note: 'Hooks, Component Architecture' },
        { name: 'TypeScript', note: 'Type safety & maintainability' },
        { name: 'Tailwind CSS', note: 'Modern responsive styling' },
        { name: 'Next.js', note: 'SSR & App Router' },
        { name: 'Framer Motion / GSAP', note: 'Smooth interactive animations' },
      ],
    },
    {
      id: 'backend',
      index: '02',
      title: 'Backend & Services',
      subtitle: 'Server-side logic, API development, and integrations',
      skills: [
        { name: 'Node.js', note: 'Runtime environment' },
        { name: 'Express', note: 'RESTful API servers' },
        { name: 'Go / Python', note: 'Backend scripting & services' },
        { name: 'REST & GraphQL', note: 'API design & communication' },
        { name: 'WebSockets', note: 'Real-time communication' },
      ],
    },
    {
      id: 'database',
      index: '03',
      title: 'Database & Storage',
      subtitle: 'Data modeling, querying, and storage solutions',
      skills: [
        { name: 'PostgreSQL', note: 'Relational data & SQL queries' },
        { name: 'MongoDB', note: 'NoSQL document storage' },
        { name: 'Redis', note: 'In-memory caching' },
        { name: 'Prisma / ORMs', note: 'Type-safe database access' },
        { name: 'Supabase', note: 'Auth & PostgreSQL backend' },
      ],
    },
    {
      id: 'tools',
      index: '04',
      title: 'Tools & DevOps',
      subtitle: 'Development workflow, version control, and deployments',
      skills: [
        { name: 'Git & GitHub', note: 'Version control & collaboration' },
        { name: 'Docker', note: 'Containerization' },
        { name: 'Linux / Bash', note: 'CLI & server basics' },
        { name: 'Vercel / Cloud', note: 'Deployment & hosting' },
        { name: 'Testing', note: 'Unit & integration testing' },
      ],
    },
  ] as SkillCategory[],

  // ── 5. FEATURED PROJECTS ──────────────────────────────────────────────────
  // Edit or add your projects here:
  projects: [
    {
      id: 'ecommerce',
      title: 'E-Commerce Platform',
      tagline: 'Modern online storefront with cart and checkout',
      description:
        'A full-stack e-commerce solution with modern UI, shopping cart, user checkout, and admin dashboard built with React and Node.js.',
      tech: ['React', 'TypeScript', 'Tailwind', 'Node.js', 'PostgreSQL'],
      github: '#', // TODO: Your repository link or '#'
      live: '#', // TODO: Your live deployment link or '#'
    },
    {
      id: 'ai-chat',
      title: 'AI Chat Application',
      tagline: 'Real-time collaborative conversational interface',
      description:
        'Real-time collaborative chat application featuring AI-assisted responses, markdown support, and seamless synchronized state.',
      tech: ['Next.js', 'OpenAI API', 'WebSockets', 'Redis'],
      github: '#', // TODO: Your repository link or '#'
      live: '#', // TODO: Your live deployment link or '#'
    },
    {
      id: 'task-management',
      title: 'Task Management System',
      tagline: 'Kanban boards and workflow tracking tool',
      description:
        'A comprehensive productivity tool designed for teams to organize tasks, track progress and visualize workflows using Kanban boards.',
      tech: ['React', 'Zustand', 'Framer Motion', 'Supabase'],
      github: '#', // TODO: Your repository link or '#'
      live: '#', // TODO: Your live deployment link or '#'
    },
  ] as ProjectItem[],

  // ── 6. CONTACT COPY ───────────────────────────────────────────────────────
  contactHeading: "LET'S BUILD SOMETHING GREAT.",
  contactParagraph:
    "I'm currently looking for new opportunities. Whether you have a question, a project in mind, or just want to say hi, I'll try my best to get back to you!",
};
