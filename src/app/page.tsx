import Image from 'next/image';
import Link from 'next/link';
import profilePic from '../../public/profile_sya.jpg';
import { PERSONAL_INFO, WORK_EXPERIENCE } from '@/lib/constants';
import { projects } from '@/data/projects';

export default function Home() {
  const [current] = WORK_EXPERIENCE;

  return (
    <>
      <section className="grid items-end gap-8 pb-16 pt-10 sm:pt-16 lg:grid-cols-[1fr_15rem] lg:gap-12 lg:pb-24 lg:pt-24 xl:grid-cols-[1fr_18rem]">
        <div>
          <h1 className="text-[clamp(3rem,1.75rem_+_6vw,5.75rem)] font-extrabold leading-[0.92] tracking-[-0.025em]">
            Sarip
            <br />
            Hidayatullah
          </h1>
          <p className="mt-6 max-w-[28ch] text-[clamp(1.3rem,1.1rem_+_1vw,1.75rem)] leading-snug sm:mt-8">
            <mark>Java developer</mark> in {PERSONAL_INFO.location.city}, building back-office
            systems since {PERSONAL_INFO.careerStart}.
          </p>
        </div>
        <Image
          src={profilePic}
          alt="Black-and-white portrait of Sarip Hidayatullah"
          priority
          placeholder="blur"
          sizes="(min-width: 1280px) 18rem, (min-width: 1024px) 15rem, 8rem"
          className="order-first aspect-[4/5] w-32 object-cover lg:order-none lg:w-full"
        />
      </section>

      <div className="space-y-12 sm:space-y-16">
        <section className="sheet" aria-labelledby="now">
          <h2 id="now" className="sheet-label">
            Now
          </h2>
          <div>
            <p>
              <span className="font-semibold">{current.position}</span> at {current.company},
              since {current.period.slice(0, 4)}.
            </p>
            <p className="text-muted">{current.technologies.join(', ')}</p>
          </div>
        </section>

        <section className="sheet" aria-labelledby="recent">
          <h2 id="recent" className="sheet-label">
            Recent work
          </h2>
          <div>
            <ul className="divide-y divide-rule">
              {projects.slice(0, 3).map((project) => (
                <li key={project.work} className="entry py-3 first:pt-0">
                  <span className="text-muted">{project.year}</span>
                  <div>
                    <p>{project.work}</p>
                    <p className="text-muted">{project.client}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link href="/portfolio" className="link mt-2 inline-flex min-h-[2.75rem] items-center">
              All {projects.length} projects
            </Link>
          </div>
        </section>

        <section className="sheet" aria-labelledby="talk">
          <h2 id="talk" className="sheet-label">
            Contact
          </h2>
          <div>
            <p>Want to talk about a Java role?</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="btn-solid">
                Email me
              </a>
              <Link href="/resume" className="btn-line">
                Read the resume
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
