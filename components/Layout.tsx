'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Category } from '../types';
import { api } from '../services/api';

interface LayoutProps {
  children: React.ReactNode;
  categories: Category[];
}

export const Layout: React.FC<LayoutProps> = ({ children, categories }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tickerText, setTickerText] = useState(
    '🔴 LIVE: Global markets rally as tech sector booms • Historic climate treaty signed in Geneva • Local cat stuck in tree actually fine, just wanted a view •'
  );
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    api.getSetting('ticker_text').then((text) => {
      if (text) setTickerText(text);
    });
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm('');
    }
  };

  const isAuthenticated = typeof window !== 'undefined' ? api.checkAuth() : false;

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-white">

      {/* 1. Breaking News Ticker */}
      <div className="bg-[#111111] text-white text-[10px] md:text-xs font-bold py-2 overflow-hidden relative whitespace-nowrap z-50 tracking-widest uppercase">
        <div className="animate-ticker inline-block">
          {tickerText}
        </div>
      </div>

      {/* 2. Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm transition-all duration-300">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center relative">

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-2xl p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors order-1 md:order-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>

          {/* Logo */}
          <Link href="/" className="order-2 md:order-none">
            <img src="/logo.png" alt="Gossip Gazette" className="h-16 md:h-20 w-auto object-contain" />
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center gap-8 mx-8">
            <ul className="flex flex-row font-sans font-bold text-xs tracking-[0.2em] uppercase gap-8">
              <li><Link href="/" className="hover:text-red-700 transition-colors">Home</Link></li>
              <li><Link href="/sports" className="hover:text-red-700 transition-colors text-red-600">Sports News</Link></li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/category/${cat.slug}`} className="hover:text-red-700 transition-colors">{cat.name}</Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Search Bar */}
          <div className="flex items-center gap-4 order-3 md:order-none">
            <form onSubmit={handleSearch} className="relative hidden md:block group">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-3 pr-8 py-1.5 border-b border-gray-300 focus:border-black outline-none text-sm transition-colors bg-transparent w-32 focus:w-48 duration-300"
              />
              <button type="submit" className="absolute right-0 top-1.5 text-gray-400 group-hover:text-black transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
            </form>
            <button className="md:hidden text-gray-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <nav className={`md:hidden border-t border-gray-100 ${isMenuOpen ? 'block' : 'hidden'} bg-white`}>
          <div className="container mx-auto px-6 py-4">
            <ul className="flex flex-col gap-4 font-sans font-bold text-xs tracking-[0.2em] uppercase">
              <li><Link href="/" className="hover:text-red-700 block transition-colors">Home</Link></li>
              <li><Link href="/sports" className="hover:text-red-700 block transition-colors text-red-600">Sports News</Link></li>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/category/${cat.slug}`} className="hover:text-red-700 block transition-colors">{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* 3. Main Content */}
      <main className="flex-grow container mx-auto px-4 md:px-6 py-8 md:py-12 max-w-7xl">
        {children}
      </main>

      {/* 4. Footer */}
      <footer className="bg-[#111111] text-white pt-16 pb-8">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-serif font-bold text-2xl tracking-tight">Gossip<span className="text-red-700">.</span>Gazette</h3>
            <p className="text-gray-400 text-sm leading-relaxed">Delivering the truth, or something close to it, since 2024. Your daily dose of world events, tech breakthroughs, and idle gossip.</p>
            <div className="flex gap-4 pt-2">
              <a href="https://x.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-white hover:text-black transition-colors flex items-center justify-center cursor-pointer font-bold">X</a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-white hover:text-black transition-colors flex items-center justify-center cursor-pointer font-bold">In</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-white hover:text-black transition-colors flex items-center justify-center cursor-pointer font-bold">Fb</a>
            </div>
          </div>

          {/* Sections */}
          <div>
            <h4 className="font-bold uppercase tracking-widest mb-6 text-xs text-gray-500">Sections</h4>
            <ul className="text-sm text-gray-300 space-y-3">
              {categories.slice(0, 4).map((c) => (
                <li key={c.id}>
                  <Link href={`/category/${c.slug}`} className="hover:text-white hover:underline decoration-red-700 underline-offset-4 transition-all">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold uppercase tracking-widest mb-6 text-xs text-gray-500">Company</h4>
            <ul className="text-sm text-gray-300 space-y-3">
              <li><Link href="/about" className="hover:text-white hover:underline decoration-red-700 underline-offset-4 transition-all">About</Link></li>
              <li><Link href="/contact" className="hover:text-white hover:underline decoration-red-700 underline-offset-4 transition-all">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-white hover:underline decoration-red-700 underline-offset-4 transition-all">Careers</Link></li>
              <li><Link href="/advertise" className="hover:text-white hover:underline decoration-red-700 underline-offset-4 transition-all">Advertise</Link></li>
              <li><Link href="/faq" className="hover:text-white hover:underline decoration-red-700 underline-offset-4 transition-all">FAQ</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold uppercase tracking-widest mb-6 text-xs text-gray-500">Newsletter</h4>
            <p className="text-xs text-gray-400 mb-4">Get the latest breaking news directly in your inbox.</p>
            <div className="flex flex-col gap-2">
              <input type="email" placeholder="Email address" className="bg-gray-900 border border-gray-800 text-white px-4 py-3 text-sm w-full outline-none focus:border-gray-600 transition-colors" />
              <button onClick={() => alert("Thank you for subscribing! \n(This is a demo, no email was sent)")} className="bg-white text-black font-bold uppercase text-xs py-3 hover:bg-red-700 hover:text-white transition-colors tracking-widest">Subscribe</button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="container mx-auto px-6 border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>© 2026 Gossip Gazette Media. All rights reserved.
            <Link href={isAuthenticated ? "/admin" : "/login"} className="ml-2 hover:opacity-100 opacity-50 grayscale hover:grayscale-0 transition-all text-base no-underline" title="Staff Login">🔐</Link>
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-gray-400">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-gray-400">Terms of Service</Link>
            <Link href="/editorial-guidelines" className="hover:text-gray-400">Editorial Guidelines</Link>
            <Link href="/community-guidelines" className="hover:text-gray-400">Community Guidelines</Link>
            <Link href="#" className="hover:text-gray-400">Cookie Settings</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};