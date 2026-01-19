'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black text-white">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold">Something went wrong!</h1>
        <p className="mb-8 text-gray-400">{error.message}</p>
        <button
          onClick={reset}
          className="rounded-lg bg-white px-6 py-3 text-black transition-colors hover:bg-gray-200"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
