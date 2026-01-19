'use client';

import HeaderSection from '../components/headerSection';
import FooterSection from '../components/footerSection';
import Link from 'next/link';
import { projects, categories } from '@/data/projects';
import { useState } from 'react';
import { AiFillGithub, AiOutlineLink } from 'react-icons/ai';

const Portfolio = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div className="flex min-h-screen flex-col bg-black font-mono">
      <HeaderSection />
      <main className="flex-1 px-6 py-4">
        {/* Hero Section */}
        <section className="flex min-h-[40vh] flex-col items-center justify-center space-y-4 text-white">
          <h1 className="text-5xl font-bold md:text-7xl">PORTFOLIO</h1>
          <div className="flex space-x-2">
            <Link href="/">
              <span className="hover:underline">Home</span>
            </Link>
            <span>/</span>
            <span>Portfolio</span>
          </div>
        </section>

        {/* Filter Section */}
        <section className="mx-auto mb-8 max-w-6xl">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-lg px-6 py-2 text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-white text-black'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </section>

        {/* Projects Grid */}
        <section className="mx-auto max-w-6xl pb-12">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group overflow-hidden rounded-lg border border-gray-800 bg-gray-900 transition-transform hover:scale-105"
              >
                {/* Project Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-gray-700 to-gray-900"></div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    {project.featured && (
                      <span className="rounded bg-yellow-500 px-2 py-1 text-xs font-bold text-black">
                        Featured
                      </span>
                    )}
                  </div>

                  <p className="mb-4 text-sm text-gray-400">{project.description}</p>

                  {/* Technologies */}
                  <div className="mb-4 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded bg-gray-800 px-2 py-1 text-xs text-gray-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                        aria-label={`View ${project.title} on GitHub`}
                      >
                        <AiFillGithub className="h-5 w-5" />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-gray-400 transition-colors hover:text-white"
                        aria-label={`View ${project.title} live demo`}
                      >
                        <AiOutlineLink className="h-5 w-5" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="py-12 text-center text-gray-400">
              <p>No projects found in this category.</p>
            </div>
          )}
        </section>
      </main>
      <FooterSection />
    </div>
  );
};

export default Portfolio;
