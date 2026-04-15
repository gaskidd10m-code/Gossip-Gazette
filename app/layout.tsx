import React from 'react';
import type { Metadata } from 'next';
import ClientLayout from './ClientLayout';
import './globals.css';
import { db } from '../lib/db';
import { Category } from '../types';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: {
    default: 'Gossip Gazette – Breaking News, Entertainment & More',
    template: '%s | Gossip Gazette',
  },
  description:
    'Delivering the truth, or something close to it. Your daily dose of world events, tech breakthroughs, and idle gossip.',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || 'https://gossipgazette.online'
  ),
  openGraph: {
    type: 'website',
    siteName: 'Gossip Gazette',
    images: ['/logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
  },
  icons: { icon: '/logo.png' },
};

async function getCategories(): Promise<Category[]> {
  try {
    const rows = await db.query<Category>(
      'SELECT id, name, slug FROM categories ORDER BY name ASC'
    );
    return rows;
  } catch (error) {
    console.error('Error fetching categories for layout:', error);
    return [];
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const categories = await getCategories();

  return (
    <html lang="en">
      <head>
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300&family=Public+Sans:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Quill Editor CSS */}
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/quill@2.0.2/dist/quill.snow.css" />
        {/* Tailwind CSS via CDN */}
        {/* eslint-disable-next-line @next/next/no-sync-scripts */}
        <script src="https://cdn.tailwindcss.com"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', function() {
                if (typeof tailwind !== 'undefined') {
                  tailwind.config = {
                    theme: {
                      extend: {
                        fontFamily: {
                          serif: ['"Merriweather"', 'serif'],
                          sans: ['"Public Sans"', 'sans-serif'],
                        },
                        colors: { brand: { black: '#111111', gray: '#f4f4f4' } }
                      }
                    }
                  }
                }
              });
            `
          }}
        />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7576680901198952"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className="bg-[#f4f4f4] text-[#111111] antialiased" style={{ fontFamily: "'Public Sans', sans-serif" }}>
        <ClientLayout initialCategories={categories}>{children}</ClientLayout>
      </body>
    </html>
  );
}
