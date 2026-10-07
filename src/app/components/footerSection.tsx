import { PERSONAL_INFO, SOCIAL_LINKS, getCurrentYear } from '@/lib/constants';

const LINKS = [
  { href: `mailto:${PERSONAL_INFO.email}`, label: 'Email' },
  { href: SOCIAL_LINKS.github, label: 'GitHub' },
  { href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
  { href: SOCIAL_LINKS.instagram, label: 'Instagram' },
];

const FooterSection = () => {
  return (
    <footer className="page mt-24 sm:mt-32">
      <div className="flex flex-col gap-2 border-t border-rule py-6 text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          &copy; {getCurrentYear()} {PERSONAL_INFO.name}, {PERSONAL_INFO.location.city}
        </p>
        <ul className="-mx-2 flex flex-wrap">
          {LINKS.map(({ href, label }) => (
            <li key={label}>
              <a
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex min-h-[2.75rem] items-center px-2 hover:text-ink hover:underline"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default FooterSection;
