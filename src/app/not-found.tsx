'use client';

import Redirect from '@/components/Redirect';

export default function NotFound() {
  return (
    <Redirect
      to="/"
      message="Page Not Found. Redirecting to Home..."
      delay={2000} 
    />
  );
}
