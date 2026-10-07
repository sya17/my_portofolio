import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="pb-10 pt-10 sm:pt-16">
      <p className="text-muted">404</p>
      <h1 className="page-title mt-2">This page doesn&apos;t exist.</h1>
      <p className="lede mt-6 max-w-[40ch]">
        If an old link sent you to the blog, it has been taken down.
      </p>
      <Link href="/" className="btn-solid mt-8">
        Back to the home page
      </Link>
    </section>
  );
}
