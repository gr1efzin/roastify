import { Suspense } from 'react';
import Hero from './components/Hero';
import { SearchParamsError } from './components/SearchParamsError';

export default function Home() {
  return (
    <Suspense fallback={<Hero />}>
      <SearchParamsError />
    </Suspense>
  );
}
