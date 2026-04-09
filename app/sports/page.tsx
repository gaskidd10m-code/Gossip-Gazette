export const dynamic = 'force-dynamic';
import React from 'react';
import { db } from '../../lib/db';
import { SportsNews } from '../../types';

export const metadata = {
  title: 'Sports News | Gossip Gazette',
  description: 'Latest sports news, scores, transfer rumors, and breaking updates.'
};

async function getPublishedSportsNews(): Promise<SportsNews[]> {
  try {
    const rows = await db.query(
      `SELECT id, title, content, image_url AS "imageUrl", category, status, created_at AS "createdAt"
       FROM sports_news 
       WHERE status = 'published'
       ORDER BY created_at DESC`
    );
    return rows;
  } catch (error) {
    console.error('Error fetching sports news:', error);
    return [];
  }
}

export default async function SportsNewsPage() {
  const news = await getPublishedSportsNews();

  return (
    <div className="w-full py-8 md:py-16 px-4 md:px-12 bg-white">
      <div className="mb-16 border-b-2 border-black pb-8 text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-sans font-black uppercase tracking-tighter mb-4 text-black">
          Sports Center
        </h1>
        <p className="text-gray-500 font-bold uppercase tracking-[0.2em] text-sm md:text-base">
          Match Updates • Transfer Rumors • Live Coverage
        </p>
      </div>

      <div>
        {news.length === 0 ? (
          <div className="text-center py-24 border border-gray-200 bg-gray-50 uppercase tracking-widest text-gray-500 font-bold text-sm">
            <span className="text-3xl mb-4 block">⚽</span>
            No breaking sports news at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {news.map((item) => (
              <article key={item.id} className="group flex flex-col border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-300">
                {item.imageUrl && (
                  <div className="relative w-full h-64 overflow-hidden bg-gray-100">
                    <img 
                      src={item.imageUrl} 
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-300"></div>
                  </div>
                )}
                <div className="p-8 flex flex-col flex-grow bg-white">
                  <div className="flex justify-between items-center mb-6">
                    <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-white ${item.category === 'Transfer News' ? 'bg-red-700' : 'bg-black'}`}>
                      {item.category.toUpperCase()}
                    </span>
                    <time className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </time>
                  </div>
                  
                  <h2 className="text-lg md:text-xl font-serif font-black text-gray-900 leading-snug mb-4 group-hover:text-red-700 transition-colors">
                    {item.title}
                  </h2>
                  
                  <div 
                    className="prose prose-sm xl:prose-xs text-xs md:text-sm text-gray-600 prose-p:text-xs md:prose-p:text-sm prose-p:leading-relaxed prose-a:text-red-700 hover:prose-a:underline prose-headings:font-black prose-img:hidden"
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
