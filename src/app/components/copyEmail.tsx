'use client';

import { useEffect, useState } from 'react';

const CopyEmail = ({ email }: { email: string }) => {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle');

  useEffect(() => {
    if (state !== 'copied') return;
    const timer = setTimeout(() => setState('idle'), 2500);
    return () => clearTimeout(timer);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setState('copied');
    } catch {
      // No clipboard access (insecure origin, denied permission, old browser).
      setState('failed');
    }
  };

  return (
    <div>
      <button type="button" onClick={copy} className="btn-line min-w-[9.5rem]">
        {state === 'copied' ? 'Copied' : 'Copy address'}
      </button>
      <p role="status" className="max-w-[30ch] text-muted">
        {state === 'copied' && <span className="sr-only">Email address copied.</span>}
        {state === 'failed' && (
          <span className="mt-2 block">
            Couldn&apos;t copy. Select the address above and copy it by hand.
          </span>
        )}
      </p>
    </div>
  );
};

export default CopyEmail;
