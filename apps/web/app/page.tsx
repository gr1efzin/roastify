import { Suspense } from 'react';
import Hero from './components/Hero';
import Particles from './components/Particles';
import { SearchParamsError } from './components/SearchParamsError';

export default function Home() {
  return (
    <>
      <Particles />
      <Suspense fallback={<Hero />}>
        <SearchParamsError />
      </Suspense>
    </>
  );
}
