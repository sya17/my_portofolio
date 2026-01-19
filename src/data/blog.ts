// Blog Posts Data
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Getting Started with Next.js 14',
    excerpt: 'Learn how to build modern web applications with Next.js 14 and the new App Router.',
    content: 'Full blog post content here...',
    author: 'Sarip Hidayatullah',
    date: '2026-01-15',
    readTime: '5 min read',
    tags: ['Next.js', 'React', 'Web Development'],
    featured: true,
  },
  {
    id: 'post-2',
    title: 'TypeScript Best Practices',
    excerpt: 'Essential TypeScript patterns and best practices for scalable applications.',
    content: 'Full blog post content here...',
    author: 'Sarip Hidayatullah',
    date: '2026-01-10',
    readTime: '8 min read',
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    featured: true,
  },
  {
    id: 'post-3',
    title: 'Building Responsive Layouts with Tailwind CSS',
    excerpt: 'Master responsive design with Tailwind CSS utility classes.',
    content: 'Full blog post content here...',
    author: 'Sarip Hidayatullah',
    date: '2026-01-05',
    readTime: '6 min read',
    tags: ['Tailwind CSS', 'CSS', 'Responsive Design'],
    featured: false,
  },
];
