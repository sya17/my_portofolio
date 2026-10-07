import type { Metadata } from 'next';
import Link from 'next/link';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import {
  EDUCATION,
  EMAIL_PARTS,
  PERSONAL_INFO,
  WORK_EXPERIENCE,
  calculateAge,
} from '@/lib/constants';
import { projects } from '@/data/projects';

export const metadata: Metadata = { title: 'Resume' };

// Checked at build time: the download button only exists when the file does.
const hasCv = existsSync(join(process.cwd(), 'public', 'cv.pdf'));

const projectYears = projects.flatMap((p) => p.year.split('–').map(Number));

export default function Resume() {
  return (
    <>
      <header className="flex flex-wrap items-end justify-between gap-6 pb-10 pt-10 sm:pb-14 sm:pt-16">
        <h1 className="page-title">Resume</h1>
        {hasCv && (
          <a href="/cv.pdf" download className="btn-solid">
            Download CV (PDF)
          </a>
        )}
      </header>

      <div className="space-y-12 sm:space-y-16">
        <section className="sheet" aria-labelledby="about">
          <h2 id="about" className="sheet-label">
            About
          </h2>
          <p className="lede max-w-[46ch]">
            I&apos;ve worked at Indonesian software startups{' '}
            <mark>since {PERSONAL_INFO.careerStart}</mark>, mostly on web applications. I&apos;ve
            built ITSM tools, a learning platform and a marketplace app, developed microservices
            with Java Spring, and worked on applications for the finance sector.
          </p>
        </section>

        <section className="sheet" aria-labelledby="details">
          <h2 id="details" className="sheet-label">
            Details
          </h2>
          <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1">
            <dt className="text-muted">Age</dt>
            <dd>{calculateAge(PERSONAL_INFO.birthYear)}</dd>
            <dt className="text-muted">Citizenship</dt>
            <dd>{PERSONAL_INFO.citizenship}</dd>
            <dt className="text-muted">Based in</dt>
            <dd>
              {PERSONAL_INFO.location.city}, {PERSONAL_INFO.location.country}
            </dd>
            <dt className="text-muted">Email</dt>
            <dd className="min-w-0 [overflow-wrap:anywhere]">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="link">
                {EMAIL_PARTS[0]}
                <wbr />@{EMAIL_PARTS[1]}
              </a>
            </dd>
          </dl>
        </section>

        <section className="sheet" aria-labelledby="experience">
          <h2 id="experience" className="sheet-label">
            Experience
          </h2>
          <ol className="space-y-6">
            {WORK_EXPERIENCE.map((job) => (
              <li key={job.id} className="entry">
                <span className="text-muted">{job.period}</span>
                <div>
                  <h3 className="font-semibold">{job.company}</h3>
                  <p>{job.position}</p>
                  <p className="text-muted">{job.technologies.join(', ')}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="sheet" aria-labelledby="education">
          <h2 id="education" className="sheet-label">
            Education
          </h2>
          <ol className="space-y-6">
            {EDUCATION.map((school) => (
              <li key={school.id} className="entry">
                <span className="text-muted">{school.period}</span>
                <div>
                  <h3 className="font-semibold">{school.institution}</h3>
                  <p>{school.major}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="sheet" aria-labelledby="projects">
          <h2 id="projects" className="sheet-label">
            Projects
          </h2>
          <p>
            {projects.length} client and internal projects, {Math.min(...projectYears)} to{' '}
            {Math.max(...projectYears)}.{' '}
            <Link href="/portfolio" className="link">
              See them in the portfolio
            </Link>
          </p>
        </section>
      </div>
    </>
  );
}
