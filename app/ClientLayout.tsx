'use client';

import React, { useEffect, useState } from 'react';
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

  return <Layout categories={categories}>{children}</Layout>;
}
