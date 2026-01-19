import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="mb-4 text-9xl font-bold">404</h1>
        <h2 className="mb-4 text-3xl font-semibold">Page Not Found</h2>
        <p className="mb-8 text-gray-400">The page you are looking for does not exist.</p>
        <Link
          href="/"
          className="rounded-lg bg-white px-6 py-3 text-black transition-colors hover:bg-gray-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
