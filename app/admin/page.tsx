'use client';
import { Suspense } from 'react';
import { AdminDashboard } from '../../views/AdminDashboard';

export default function Page() {
  return (
    <Suspense fallback={<div className="container mx-auto py-20 text-center font-serif text-gray-500">Loading dashboard...</div>}>
      <AdminDashboard />
    </Suspense>
  );
}
