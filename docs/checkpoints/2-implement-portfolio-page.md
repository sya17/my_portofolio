# Checkpoint 2: Implement Portfolio Page

**Priority**: 🟡 High  
**Estimated Time**: 4-6 hours  
**Dependencies**: Checkpoint 1 (Layout Refactor)  
**Status**: 📋 Planned

---

## 🎯 Objective

Mengimplementasikan halaman Portfolio yang menampilkan proyek-proyek yang telah dikerjakan dengan desain yang menarik, responsif, dan interaktif.

---

## 🔍 Current State

**File**: `src/app/portofolio/page.tsx`

```typescript
export default function Portfolio() {
  return (
    <div className="flex justify-center items-center h-full text-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
        <p className="text-gray-400">Coming soon...</p>
      </div>
    </div>
  );
}
```

**Status**: Placeholder only

---

## 📋 Content Analysis

### Projects from Resume Page

Dari `resume/page.tsx`, terdapat 8 proyek yang bisa ditampilkan:

1. **Bank Syariah Mandiri (BSM)** - 2021
   - Implementasi Modul Incident & Request ITSM

2. **Assessment Center App** - 2021
   - Internal project
   - Aplikasi Assessment Center

3. **CRM Module** - 2021
   - Internal project
   - Development Modul CRM

4. **ESTIM Dayak** - 2021
   - Internal project

5. **Rantaipasok** - 2021
   - Internal project
   - Marketplace application

6. **PT Aplikanusa Lintasarta - Ultima** - 2022
   - Development Aplikasi Ultima

7. **PT Pelindo Terminal Petikemas (PTP)** - 2022
   - Implementasi ESTIM SPTP

8. **PT Aplikanusa Lintasarta - Complaint Module** - 2022-2023
   - Development dan implementasi module complaint
   - Integrasi dengan CRM

---

## 🎨 Design Concept

### Layout Options

#### Option A: Grid Layout (Recommended)

```
┌─────────────────────────────────────┐
│          PORTFOLIO                  │
│      Filter: All | Web | Mobile     │
├─────────────┬─────────────┬─────────┤
│   Project   │   Project   │ Project │
│     Card    │     Card    │  Card   │
├─────────────┼─────────────┼─────────┤
│   Project   │   Project   │ Project │
│     Card    │     Card    │  Card   │
└─────────────┴─────────────┴─────────┘
```

**Benefits**:

- Clean, organized
- Easy to scan
- Responsive (3 cols → 2 cols → 1 col)

---

#### Option B: Timeline Layout

```
┌─────────────────────────────────────┐
│          PORTFOLIO                  │
├─────────────────────────────────────┤
│  2023 ──────────────────────        │
│         │                            │
│         └─ Project Card              │
│                                      │
│  2022 ──────────────────────        │
│         │                            │
│         ├─ Project Card              │
│         └─ Project Card              │
└─────────────────────────────────────┘
```

**Benefits**:

- Shows chronological progression
- Matches resume timeline style
- Good storytelling

---

### Recommended: **Hybrid Approach**

- Hero section dengan filter
- Grid layout untuk projects
- Timeline indicator di setiap card
- Hover effects untuk interactivity

---

## 🧩 Component Structure

### New Components to Create

```
src/app/components/
├── portfolio/
│   ├── ProjectCard.tsx       # Individual project card
│   ├── ProjectGrid.tsx       # Grid container
│   ├── ProjectFilter.tsx     # Filter buttons
│   └── ProjectModal.tsx      # Detail modal (optional)
└── ui/
    ├── Badge.tsx             # Technology badges
    └── Card.tsx              # Reusable card component
```

---

## 📊 Data Structure

### Project Type Definition

**File**: `src/types/project.ts` (new)

```typescript
export interface Project {
  id: string;
  title: string;
  client: string;
  year: string;
  description: string;
  technologies: string[];
  category: "web" | "mobile" | "internal" | "client";
  image?: string;
  link?: string;
  highlights?: string[];
}
```

---

### Project Data

**File**: `src/data/projects.ts` (new)

```typescript
import { Project } from "@/types/project";

export const projects: Project[] = [
  {
    id: "bsm-itsm",
    title: "ITSM Module - Incident & Request",
    client: "Bank Syariah Mandiri (BSM)",
    year: "2021",
    description:
      "Implementasi modul Incident dan Request untuk IT Service Management",
    technologies: ["Java", "ZK Framework", "PostgreSQL"],
    category: "client",
    highlights: [
      "Ticket management system",
      "SLA tracking",
      "Email notifications",
    ],
  },
  {
    id: "assessment-center",
    title: "Assessment Center Application",
    client: "Internal Project",
    year: "2021",
    description: "Aplikasi untuk assessment dan evaluasi karyawan",
    technologies: ["Java", "ZK Framework", "MySQL"],
    category: "internal",
    highlights: [
      "Multi-level assessment",
      "Report generation",
      "Dashboard analytics",
    ],
  },
  {
    id: "crm-module",
    title: "CRM Module",
    client: "Internal Project",
    year: "2021",
    description: "Development modul Customer Relationship Management",
    technologies: ["Java", "ZK Framework"],
    category: "internal",
    highlights: ["Customer data management", "Lead tracking", "Sales pipeline"],
  },
  {
    id: "estim-dayak",
    title: "ESTIM Dayak",
    client: "Internal Project",
    year: "2021",
    description: "Platform pembelajaran online untuk institusi pendidikan",
    technologies: ["Java", "ZK Framework"],
    category: "internal",
    highlights: ["Course management", "Student portal", "Grade tracking"],
  },
  {
    id: "rantaipasok",
    title: "Rantaipasok",
    client: "Internal Project",
    year: "2021",
    description: "Aplikasi marketplace untuk supply chain management",
    technologies: ["Java", "ZK Framework"],
    category: "internal",
    highlights: ["Vendor management", "Order processing", "Inventory tracking"],
  },
  {
    id: "ultima-app",
    title: "Ultima Application",
    client: "PT Aplikanusa Lintasarta",
    year: "2022",
    description: "Development aplikasi enterprise untuk manajemen layanan",
    technologies: ["Java", "ZK Framework", "Oracle DB"],
    category: "client",
    highlights: ["Service management", "Customer portal", "Reporting system"],
  },
  {
    id: "estim-sptp",
    title: "ESTIM SPTP",
    client: "PT Pelindo Terminal Petikemas (PTP)",
    year: "2022",
    description: "Implementasi sistem pembelajaran untuk terminal petikemas",
    technologies: ["Java", "ZK Framework"],
    category: "client",
    highlights: [
      "Training modules",
      "Certification tracking",
      "Assessment system",
    ],
  },
  {
    id: "complaint-crm",
    title: "Complaint Module & CRM Integration",
    client: "PT Aplikanusa Lintasarta",
    year: "2022-2023",
    description:
      "Development dan implementasi module complaint dengan integrasi CRM",
    technologies: ["Java", "Spring Boot", "Vue.js", "PostgreSQL"],
    category: "client",
    highlights: [
      "Complaint tracking",
      "CRM integration",
      "Microservice architecture",
      "RESTful API",
    ],
  },
];
```

---

## 🎨 Component Implementation

### 1. ProjectCard Component

**File**: `src/app/components/portfolio/ProjectCard.tsx`

```typescript
import { Project } from '@/types/project';
import Badge from '@/app/components/ui/Badge';

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div
      className="bg-gray-900 border border-gray-800 rounded-lg p-6 hover:border-brandColor transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      {/* Year Badge */}
      <div className="flex justify-between items-start mb-4">
        <span className="text-xs text-gray-500 font-mono">{project.year}</span>
        <Badge variant={project.category}>{project.category}</Badge>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-brandColor transition-colors">
        {project.title}
      </h3>

      {/* Client */}
      <p className="text-sm text-gray-400 mb-3">{project.client}</p>

      {/* Description */}
      <p className="text-sm text-gray-300 mb-4 line-clamp-3">
        {project.description}
      </p>

      {/* Technologies */}
      <div className="flex flex-wrap gap-2 mb-4">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Highlights */}
      {project.highlights && project.highlights.length > 0 && (
        <ul className="text-xs text-gray-400 space-y-1">
          {project.highlights.slice(0, 3).map((highlight, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-brandColor mr-2">▸</span>
              {highlight}
            </li>
          ))}
        </ul>
      )}

      {/* Hover Indicator */}
      <div className="mt-4 text-sm text-brandColor opacity-0 group-hover:opacity-100 transition-opacity">
        View details →
      </div>
    </div>
  );
}
```

---

### 2. Badge Component

**File**: `src/app/components/ui/Badge.tsx`

```typescript
interface BadgeProps {
  children: React.ReactNode;
  variant?: 'web' | 'mobile' | 'internal' | 'client' | 'default';
}

export default function Badge({ children, variant = 'default' }: BadgeProps) {
  const variants = {
    web: 'bg-blue-500/20 text-blue-400 border-blue-500/50',
    mobile: 'bg-green-500/20 text-green-400 border-green-500/50',
    internal: 'bg-purple-500/20 text-purple-400 border-purple-500/50',
    client: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
    default: 'bg-gray-500/20 text-gray-400 border-gray-500/50',
  };

  return (
    <span className={`text-xs px-2 py-1 rounded border ${variants[variant]}`}>
      {children}
    </span>
  );
}
```

---

### 3. ProjectFilter Component

**File**: `src/app/components/portfolio/ProjectFilter.tsx`

```typescript
'use client';

interface ProjectFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

export default function ProjectFilter({ activeFilter, onFilterChange }: ProjectFilterProps) {
  const filters = [
    { id: 'all', label: 'All Projects' },
    { id: 'client', label: 'Client Projects' },
    { id: 'internal', label: 'Internal Projects' },
  ];

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
      {filters.map((filter) => (
        <button
          key={filter.id}
          onClick={() => onFilterChange(filter.id)}
          className={`px-6 py-2 rounded-full border transition-all duration-300 ${
            activeFilter === filter.id
              ? 'bg-brandColor text-black border-brandColor'
              : 'bg-transparent text-gray-400 border-gray-700 hover:border-brandColor hover:text-brandColor'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
```

---

### 4. Main Portfolio Page

**File**: `src/app/portofolio/page.tsx`

```typescript
'use client';

import { useState } from 'react';
import { projects } from '@/data/projects';
import ProjectCard from '@/app/components/portfolio/ProjectCard';
import ProjectFilter from '@/app/components/portfolio/ProjectFilter';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredProjects = projects.filter((project) => {
    if (activeFilter === 'all') return true;
    return project.category === activeFilter;
  });

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
          PORTFOLIO
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          A collection of projects I've worked on during my journey as a software developer.
          From enterprise applications to internal tools, each project represents a unique challenge and learning experience.
        </p>
      </div>

      {/* Filter */}
      <ProjectFilter
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
        <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-800">
          <div className="text-3xl font-bold text-brandColor">{projects.length}</div>
          <div className="text-sm text-gray-400">Total Projects</div>
        </div>
        <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-800">
          <div className="text-3xl font-bold text-brandColor">
            {projects.filter(p => p.category === 'client').length}
          </div>
          <div className="text-sm text-gray-400">Client Projects</div>
        </div>
        <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-800">
          <div className="text-3xl font-bold text-brandColor">2</div>
          <div className="text-sm text-gray-400">Years Experience</div>
        </div>
        <div className="text-center p-4 bg-gray-900 rounded-lg border border-gray-800">
          <div className="text-3xl font-bold text-brandColor">5+</div>
          <div className="text-sm text-gray-400">Technologies</div>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Empty State */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-400 text-lg">No projects found in this category.</p>
        </div>
      )}
    </div>
  );
}
```

---

## 🎨 Styling Enhancements

### Update Tailwind Config

**File**: `tailwind.config.js`

Add line-clamp plugin for text truncation:

```javascript
module.exports = {
  // ... existing config
  plugins: [require("@tailwindcss/line-clamp")],
};
```

**Install**:

```bash
npm install -D @tailwindcss/line-clamp
```

---

## 🌟 Advanced Features (Optional)

### 1. Project Detail Modal

**File**: `src/app/components/portfolio/ProjectModal.tsx`

```typescript
'use client';

import { Project } from '@/types/project';
import { AiOutlineClose } from 'react-icons/ai';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gray-900 border border-gray-800 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">{project.title}</h2>
            <p className="text-gray-400">{project.client} • {project.year}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <AiOutlineClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Description</h3>
            <p className="text-gray-300">{project.description}</p>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-bold text-white mb-2">Technologies</h3>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="bg-gray-800 text-gray-300 px-3 py-1 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div>
              <h3 className="text-lg font-bold text-white mb-2">Key Features</h3>
              <ul className="space-y-2">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start text-gray-300">
                    <span className="text-brandColor mr-2 mt-1">▸</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
```

**Usage in Portfolio Page**:

```typescript
const [selectedProject, setSelectedProject] = useState<Project | null>(null);

// In JSX:
<ProjectCard
  project={project}
  onClick={() => setSelectedProject(project)}
/>

<ProjectModal
  project={selectedProject}
  onClose={() => setSelectedProject(null)}
/>
```

---

### 2. Search Functionality

```typescript
const [searchQuery, setSearchQuery] = useState('');

const filteredProjects = projects.filter((project) => {
  const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
  const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       project.client.toLowerCase().includes(searchQuery.toLowerCase());
  return matchesFilter && matchesSearch;
});

// Search Input:
<input
  type="text"
  placeholder="Search projects..."
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  className="w-full max-w-md mx-auto px-4 py-2 bg-gray-900 border border-gray-800 rounded-lg text-white focus:border-brandColor focus:outline-none"
/>
```

---

### 3. Animations

Add Framer Motion for smooth animations:

```bash
npm install framer-motion
```

```typescript
import { motion } from 'framer-motion';

// Animated ProjectCard:
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>
  <ProjectCard project={project} />
</motion.div>
```

---

## 🧪 Testing Checklist

### Functionality:

- [ ] All projects display correctly
- [ ] Filter buttons work
- [ ] Clicking "All" shows all projects
- [ ] Clicking "Client" shows only client projects
- [ ] Clicking "Internal" shows only internal projects
- [ ] Project cards show all information
- [ ] Technology badges display correctly
- [ ] Hover effects work

### Responsive:

- [ ] Mobile: 1 column grid
- [ ] Tablet: 2 column grid
- [ ] Desktop: 3 column grid
- [ ] Stats section responsive
- [ ] Filter buttons wrap on mobile

### Performance:

- [ ] Page loads quickly
- [ ] Smooth transitions
- [ ] No layout shift

### Accessibility:

- [ ] Proper heading hierarchy (h1 → h3)
- [ ] Buttons have hover states
- [ ] Focus states visible
- [ ] Color contrast sufficient

---

## 📁 Files to Create

### New Directories:

- `src/types/`
- `src/data/`
- `src/app/components/portfolio/`
- `src/app/components/ui/`

### New Files:

- `src/types/project.ts`
- `src/data/projects.ts`
- `src/app/components/portfolio/ProjectCard.tsx`
- `src/app/components/portfolio/ProjectFilter.tsx`
- `src/app/components/portfolio/ProjectModal.tsx` (optional)
- `src/app/components/ui/Badge.tsx`

### Modified Files:

- `src/app/portofolio/page.tsx`
- `tailwind.config.js` (add line-clamp plugin)
- `package.json` (add dependencies)

---

## 🎯 Success Metrics

- ✅ 8 projects displayed
- ✅ Filter functionality works
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Hover effects and animations
- ✅ Clean, professional design
- ✅ Fast page load
- ✅ No console errors

---

## 🚀 Future Enhancements

1. **Project Images**: Add screenshots/mockups
2. **Live Links**: Add links to deployed projects (if available)
3. **GitHub Integration**: Fetch projects from GitHub API
4. **CMS Integration**: Use Contentful/Sanity for project data
5. **Sorting**: Add sort by date, name, etc.
6. **Pagination**: If projects > 12
7. **Tags**: More granular filtering by technology

---

## 📝 Notes

- Use `brandColor` (#5BC0BE) untuk accents
- Keep design consistent dengan resume page
- Focus on readability dan scannability
- Highlight technical skills through technology badges
- Show progression dari monolith ke microservices

---

**Estimated Completion**: 4-6 hours  
**Complexity**: Medium-High  
**Impact**: High (showcases work experience)
