'use client';

import Link from 'next/link';

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="pb-10 pt-10 sm:pt-16">
      <h1 className="page-title">Something broke on this page.</h1>
      <p className="lede mt-6 max-w-[40ch]">
        Load it again. If it keeps failing, the email link in the footer still works.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button type="button" onClick={reset} className="btn-solid">
          Try again
        </button>
        <Link href="/" className="btn-line">
          Back to the home page
        </Link>
      </div>
    </section>
  );
}
