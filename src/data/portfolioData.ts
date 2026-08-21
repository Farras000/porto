export interface ProjectItem {
  id: string;
  num: string;
  title: string;
  tagline: string;
  description: string;
  tech: string[];
  color: string;
  github: string;
  live: string;
  previewCode?: {
    filename: string;
    snippet: string[];
  };
}

export interface SkillGroup {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  iconName: 'layout' | 'server' | 'database' | 'cpu';
  skills: { name: string; note: string }[];
}

export const portfolioData = {
  // Personal & Profile Details
  profile: {
    name: 'FARRAS',
    fullName: 'Ravyanda Farras Ibrahim',
    preferredName: 'Farras',
    role: 'Full Stack Software Engineer',
    eyebrow: 'FULL STACK SOFTWARE ENGINEER',
    bioIntro: "Hi, I'm Ravyanda Farras Ibrahim — everyone calls me Farras.",
    bioShort:
      'Building clean, reliable, and user-focused web applications with modern architecture and thoughtful attention to detail.',
    email: 'farras@example.com', // Replace with your real email
    github: 'https://github.com/Farras000', // Replace with your GitHub URL
    linkedin: 'https://linkedin.com/in/farras', // Replace with your LinkedIn URL
    location: 'Indonesia',
    timeZone: 'Asia/Jakarta',
    status: 'Available for opportunities',
  },

  // About / Philosophy Statement
  about: {
    sectionLabel: '01 // ABOUT & FOCUS',
    manifesto:
      'I build reliable web applications and digital experiences with clean code, thoughtful architecture, and focused attention to detail from intuitive, accessible user interfaces to robust backend services.',
    highlights: ['reliable', 'clean', 'code,', 'thoughtful', 'architecture,', 'intuitive,', 'accessible', 'robust'],
    pillars: [
      {
        title: 'FRONTEND',
        desc: 'Responsive, accessible UIs built with React, TypeScript, and modern CSS.',
      },
      {
        title: 'BACKEND',
        desc: 'REST APIs, server logic, database design, and authentication flows.',
      },
      {
        title: 'PRACTICE',
        desc: 'Clean code, type safety, version control, and smooth user experiences.',
      },
    ],
  },

  // Skills & Technologies
  skills: {
    sectionLabel: '02 // TECHNICAL SKILLS',
    title: 'Skills & Tools',
    subtitle: 'Technologies and tools I use to bring ideas to life on the web.',
    ticker: [
      'REACT',
      'TYPESCRIPT',
      'NEXT.JS',
      'NODE.JS',
      'EXPRESS',
      'POSTGRESQL',
      'TAILWIND CSS',
      'FRAMER MOTION',
      'GSAP',
      'GIT',
      'DOCKER',
      'REST APIS',
    ],
    categories: [
      {
        id: 'frontend',
        index: '01',
        title: 'Frontend Development',
        subtitle: 'Creating responsive, dynamic, and accessible interfaces',
        iconName: 'layout',
        skills: [
          { name: 'React', note: 'Hooks, Component Architecture, State Management' },
          { name: 'TypeScript', note: 'Type safety, Interfaces, Clean Typing' },
          { name: 'Next.js', note: 'Routing, Server & Client Components' },
          { name: 'Tailwind CSS', note: 'Responsive design, Design Tokens' },
          { name: 'Framer Motion & GSAP', note: 'Smooth animations & Micro-interactions' },
        ],
      },
      {
        id: 'backend',
        index: '02',
        title: 'Backend Development',
        subtitle: 'Building reliable services, APIs, and business logic',
        iconName: 'server',
        skills: [
          { name: 'Node.js & Express', note: 'RESTful APIs, Middleware, Routing' },
          { name: 'Go / Python', note: 'Backend scripting & API development' },
          { name: 'Authentication', note: 'JWT, Session auth, OAuth integration' },
          { name: 'REST APIs', note: 'Endpoint design, API integration, JSON' },
          { name: 'WebSockets', note: 'Realtime bidirectional communication' },
        ],
      },
      {
        id: 'database',
        index: '03',
        title: 'Database & Storage',
        subtitle: 'Managing data persistence and schema structures',
        iconName: 'database',
        skills: [
          { name: 'PostgreSQL', note: 'Relational data modeling, SQL queries' },
          { name: 'MongoDB', note: 'Document schemas, Aggregations' },
          { name: 'Redis', note: 'In-memory caching, Key-value store' },
          { name: 'Prisma / ORMs', note: 'Schema migrations, Type-safe database client' },
          { name: 'Supabase / Firebase', note: 'Backend-as-a-service, Auth & DB' },
        ],
      },
      {
        id: 'tools',
        index: '04',
        title: 'Tools & Workflow',
        subtitle: 'Development tooling, testing, and deployment',
        iconName: 'cpu',
        skills: [
          { name: 'Git & GitHub', note: 'Version control, Pull requests, Collaboration' },
          { name: 'Docker', note: 'Containerization, Local development setups' },
          { name: 'Vercel / Cloud Hosting', note: 'Deployment, CI/CD pipeline integration' },
          { name: 'Postman / REST Client', note: 'API testing & Debugging' },
          { name: 'Linux / Command Line', note: 'Terminal workflows & Shell scripting' },
        ],
      },
    ] as SkillGroup[],
  },

  // Featured Projects
  projects: {
    sectionLabel: '03 // FEATURED PROJECTS',
    title: 'Selected Work',
    items: [
      {
        id: 'ecommerce',
        num: '01',
        title: 'E-Commerce Platform',
        tagline: 'Modern Online Store & Dashboard',
        description:
          'A full-stack e-commerce web application featuring a product catalog, shopping cart, secure checkout flow, and an administrative dashboard for managing orders and inventory.',
        tech: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind'],
        color: '#c4f041',
        github: 'https://github.com',
        live: 'https://demo.com',
        previewCode: {
          filename: 'CartController.ts',
          snippet: [
            '// Shopping cart state & checkout handler',
            'export const handleCheckout = async (items: CartItem[]) => {',
            '  const order = await createOrder({ items, status: "pending" });',
            '  return processPayment(order.id);',
            '};',
          ],
        },
      },
      {
        id: 'ai-chat',
        num: '02',
        title: 'AI Chat Application',
        tagline: 'Realtime Conversational Interface',
        description:
          'A real-time collaborative chat application featuring streaming AI responses, markdown code rendering, conversation history, and an intuitive clean interface.',
        tech: ['Next.js', 'TypeScript', 'OpenAI API', 'Tailwind', 'Framer Motion'],
        color: '#38bdf8',
        github: 'https://github.com',
        live: 'https://demo.com',
        previewCode: {
          filename: 'chatStream.ts',
          snippet: [
            '// Streaming AI token responses',
            'export async function* streamChatResponse(prompt: string) {',
            '  const stream = await aiClient.chat.completions.create({ stream: true });',
            '  for await (const chunk of stream) yield chunk.choices[0]?.delta;',
            '}',
          ],
        },
      },
      {
        id: 'task-manager',
        num: '03',
        title: 'Task Management System',
        tagline: 'Productivity & Workflow Board',
        description:
          'A responsive task management tool designed to help organize tasks, track project progress with Kanban boards, filter by tags, and persist state seamlessly.',
        tech: ['React', 'TypeScript', 'Zustand', 'Tailwind', 'PostgreSQL'],
        color: '#a855f7',
        github: 'https://github.com',
        live: 'https://demo.com',
        previewCode: {
          filename: 'taskStore.ts',
          snippet: [
            '// Task store with optimistic UI updates',
            'export const useTaskStore = create((set) => ({',
            '  tasks: [],',
            '  moveTask: (id, column) => set((s) => ({ ...s, /* reorder */ })),',
            '}));',
          ],
        },
      },
    ] as ProjectItem[],
  },

  // Contact Details
  contact: {
    sectionLabel: '04 // GET IN TOUCH',
    headingStart: "LET'S BUILD",
    headingStroke: 'SOMETHING GREAT',
    headingEnd: '.',
    description:
      "I'm always open to discussing new projects, full-stack opportunities, or creative collaborations. Feel free to reach out directly via email or connect through social links.",
    statusText: 'Open to opportunities',
    responseTime: 'Replies usually within 24 hours',
  },
};
