'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Layout } from '../components/Layout';
import { NavigationProgress } from '../components/NavigationProgress';
import { Category } from '../types';
import { api } from '../services/api';

export default function ClientLayout({ 
  children, 
  initialCategories = [] 
}: { 
  children: React.ReactNode, 
  initialCategories?: Category[] 
}) {
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  const pathname = usePathname();

  useEffect(() => {
    const loadData = async () => {
      try {
        const freshCats = await api.getCategories();
        if (freshCats.length > 0) {
          setCategories(freshCats);
        }
      } catch (err) {
        console.error('Failed to refresh categories from client:', err);
      }
    };
    
    if (categories.length === 0) {
      loadData();
    }
  }, []);

  if (pathname && (pathname.startsWith('/admin') || pathname.startsWith('/login'))) {
    return <>{children}</>;
  }

  return (
    <>
      <NavigationProgress />
      <Layout categories={categories}>{children}</Layout>
    </>
  );
}
