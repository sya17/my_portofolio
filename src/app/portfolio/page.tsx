import type { Metadata } from 'next';
import { projects, type Project } from '@/data/projects';
import { SOCIAL_LINKS } from '@/lib/constants';

export const metadata: Metadata = { title: 'Portfolio' };

// Grouped by the year each project started; projects are already newest first.
const byYear = projects.reduce<Record<string, Project[]>>((groups, project) => {
  (groups[project.year.slice(0, 4)] ??= []).push(project);
  return groups;
}, {});

export default function Portfolio() {
  const years = Object.keys(byYear).sort().reverse();

  return (
    <>
      <header className="pb-10 pt-10 sm:pb-14 sm:pt-16">
        <h1 className="page-title">Portfolio</h1>
        <p className="lede mt-6 max-w-[44ch]">
          Client and internal projects I&apos;ve worked on, newest first. Code I can share is on{' '}
          <a href={SOCIAL_LINKS.github} target="_blank" rel="noopener noreferrer" className="link">
            GitHub
          </a>
          .
        </p>
      </header>

      {years.length === 0 ? (
        <p className="border-t border-rule pt-6 text-muted">No projects listed yet.</p>
      ) : (
        <div className="space-y-12 sm:space-y-16">
          {years.map((year) => (
            <section key={year} className="sheet" aria-labelledby={`year-${year}`}>
              <h2
                id={`year-${year}`}
                className="text-[clamp(2rem,1.6rem_+_1.6vw,3rem)] font-extrabold leading-none tracking-[-0.02em]"
              >
                {year}
              </h2>
              <ul className="divide-y divide-rule">
                {byYear[year].map((project) => (
                  <li key={project.work} className="py-4 first:pt-0 last:pb-0">
                    <p className="font-semibold">{project.work}</p>
                    <p className="text-muted">
                      {project.client}
                      {project.year.length > 4 && <>, {project.year}</>}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
    </>
  );
}
