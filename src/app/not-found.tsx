'use client';

import Redirect from '@/components/Redirect';

export default function NotFound() {
  return (
    <Redirect
      to="/"
      message="Page 404 Not Found. Redirecting to Home..."
      delay={1000} 
    />
  );
}
