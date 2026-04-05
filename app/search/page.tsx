'use client';
import { Suspense } from 'react';
import { SearchPage } from '../../views/SearchPage';

export default function Page() {
  return (
    <Suspense fallback={<div className="container mx-auto py-20 text-center font-serif text-gray-500">Preparing search...</div>}>
      <SearchPage />
    </Suspense>
  );
}
