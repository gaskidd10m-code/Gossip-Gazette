import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Analytics } from '@vercel/analytics/react';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { ArticlePage } from './pages/ArticlePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { SearchPage } from './pages/SearchPage';
import { LoginPage } from './pages/LoginPage';
import { PrivacyPolicy } from './pages/PrivacyPolicy';
import { TermsOfService } from './pages/TermsOfService';
import { CategoryPage } from './pages/CategoryPage';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { AuthorPage } from './pages/AuthorPage';
import { EditorialGuidelines } from './pages/EditorialGuidelines';
import { FAQ } from './pages/FAQ';
import { AdvertiseWithUs } from './pages/AdvertiseWithUs';
import { Careers } from './pages/Careers';
import { CommunityGuidelines } from './pages/CommunityGuidelines';
import { ArchivePage } from './pages/ArchivePage';
import { TagsPage } from './pages/TagsPage';
import { AuthorDirectory } from './pages/AuthorDirectory';
import { api } from './services/api';
import { Category } from './types';

const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // Fetch global navigation data
    api.getCategories().then(setCategories);
  }, []);

  return (
    <HelmetProvider>
      <Analytics />
      <BrowserRouter>
        <Layout categories={categories}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/article/:slug" element={<ArticlePage />} />
            <Route path="/category/:slug" element={<CategoryPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/editorial-guidelines" element={<EditorialGuidelines />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/advertise" element={<AdvertiseWithUs />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/community-guidelines" element={<CommunityGuidelines />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/tags" element={<TagsPage />} />
            <Route path="/authors" element={<AuthorDirectory />} />
          </Routes>
        </Layout>
        <Analytics />
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;