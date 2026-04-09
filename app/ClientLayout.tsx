'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { Layout } from '../components/Layout';
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
    // Background refresh for freshness
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

  // Hide the global website Layout on the admin and login routes
  if (pathname && (pathname.startsWith('/admin') || pathname.startsWith('/login'))) {
    return <>{children}</>;
  }

  return <Layout categories={categories}>{children}</Layout>;
}
