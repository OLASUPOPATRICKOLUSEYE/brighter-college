// app/components/Redirect.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface RedirectProps {
  to?: string;
  message?: string;
  delay?: number;
}

export default function Redirect({
  to = '/sign-in',
  message = 'Redirecting...',
  delay = 1000,
}: RedirectProps) {
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace(to);
    }, delay);
    return () => clearTimeout(timeout);
  }, [router, to, delay]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-pascalBlue">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 border-4 border-pascalRed border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-lg font-semibold">{message}</p>
      </div>
    </div>
  );
}
