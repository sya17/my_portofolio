import type { Metadata } from 'next';
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/lib/constants';
import CopyEmail from '../components/copyEmail';

export const metadata: Metadata = { title: 'Contact' };

const ELSEWHERE = [
  { href: SOCIAL_LINKS.github, label: 'GitHub' },
  { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
  { href: SOCIAL_LINKS.instagram, label: 'Instagram' },
];

export default function Contact() {
  const mailto = `mailto:${PERSONAL_INFO.email}`;

  return (
    <>
      <header className="pb-10 pt-10 sm:pb-14 sm:pt-16">
        <h1 className="page-title">Contact</h1>
      </header>

      <section aria-label="Email" className="pb-12 sm:pb-16">
        <a
          href={mailto}
          className="inline-block text-[clamp(1.3rem,0.55rem_+_3.6vw,3.25rem)] font-extrabold leading-tight tracking-[-0.015em] [overflow-wrap:anywhere]"
        >
          <mark>{PERSONAL_INFO.email}</mark>
        </a>
        <div className="mt-8 flex flex-wrap items-start gap-3">
          <a href={mailto} className="btn-solid">
            Write an email
          </a>
          <CopyEmail email={PERSONAL_INFO.email} />
        </div>
      </section>

      <div className="space-y-12 sm:space-y-16">
        <section className="sheet" aria-labelledby="based">
          <h2 id="based" className="sheet-label">
            Based in
          </h2>
          <p>
            {PERSONAL_INFO.location.city}, {PERSONAL_INFO.location.country} (UTC+7)
          </p>
        </section>

        <section className="sheet" aria-labelledby="elsewhere">
          <h2 id="elsewhere" className="sheet-label">
            Elsewhere
          </h2>
          <ul className="-my-3 flex flex-wrap gap-x-6">
            {ELSEWHERE.map(({ href, label }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link inline-flex min-h-[2.75rem] items-center"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}
