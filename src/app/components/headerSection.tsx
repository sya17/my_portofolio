'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PERSONAL_INFO } from '@/lib/constants';

const NAV = [
  { href: '/resume', label: 'Resume' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/contact', label: 'Contact' },
];

const ThemeToggle = () => {
  // null until mounted: the server cannot know the visitor's theme.
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    const set = document.documentElement.dataset.theme;
    setDark(set ? set === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches);
  }, []);

  const toggle = () => {
    const next = dark ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Storage blocked: the choice still applies for this visit.
    }
    setDark(!dark);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={dark ?? undefined}
      aria-label="Dark theme"
      className="inline-flex h-11 w-11 items-center justify-center rounded-md hover:bg-rule"
    >
      <svg viewBox="0 0 20 20" className="h-5 w-5" aria-hidden="true">
        <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.75" />
        <path d="M10 2a8 8 0 0 1 0 16z" fill="currentColor" />
      </svg>
    </button>
  );
};

const HeaderSection = () => {
  const pathname = usePathname();

  return (
    <header className="page flex flex-wrap items-center gap-x-4 pt-4 sm:pt-6">
      <Link
        href="/"
        aria-current={pathname === '/' ? 'page' : undefined}
        className="mr-auto inline-flex min-h-[2.75rem] items-center font-bold"
      >
        {PERSONAL_INFO.name}
      </Link>
      <nav aria-label="Main" className="order-last w-full sm:order-none sm:w-auto">
        <ul className="-mx-3 flex sm:mx-0">
          {NAV.map(({ href, label }) => (
            <li key={href}>
              <Link
                href={href}
                aria-current={pathname === href ? 'page' : undefined}
                className="inline-flex min-h-[2.75rem] items-center px-3 underline-offset-[0.4em] hover:underline aria-[current=page]:underline aria-[current=page]:decoration-2"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <ThemeToggle />
    </header>
  );
};

export default HeaderSection;
