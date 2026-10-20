'use client';

import { useSearchParams } from 'next/navigation';
import Hero from './Hero';

// Separate client component so Next.js can Suspense-wrap the searchParams read
export function SearchParamsError() {
  const params = useSearchParams();
  const error = params.get('error') ?? undefined;
  return <Hero error={error} />;
}
