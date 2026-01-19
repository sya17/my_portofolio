// Portfolio Projects Data
export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  category: 'web' | 'mobile' | 'backend' | 'fullstack';
}

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce platform with payment integration, inventory management, and admin dashboard.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Stripe'],
    featured: true,
    category: 'fullstack',
    githubUrl: 'https://github.com/sya17',
    liveUrl: '#',
  },
  {
    id: 'project-2',
    title: 'Task Management System',
    description:
      'Collaborative task management application with real-time updates and team collaboration features.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    featured: true,
    category: 'fullstack',
    githubUrl: 'https://github.com/sya17',
  },
  {
    id: 'project-3',
    title: 'Portfolio Website',
    description: 'Personal portfolio website built with Next.js and TypeScript.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    featured: false,
    category: 'web',
    githubUrl: 'https://github.com/sya17',
    liveUrl: '#',
  },
];

export const categories = ['all', 'web', 'mobile', 'backend', 'fullstack'] as const;
