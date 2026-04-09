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
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-12 border-b-[6px] border-black pb-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-serif mb-4 text-black flex items-center justify-center gap-4">
          <span className="text-red-600">⚽</span> Sports News Hub
        </h1>
        <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-xs">
          Match Updates • Transfer Rumors • Live Coverage
        </p>
      </div>

      <div className="space-y-10 relative">
        {news.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 border border-gray-100 rounded-sm">
            <span className="text-4xl mb-4 block">🏟️</span>
            <p className="text-gray-500 font-medium font-serif italic text-lg">The pitch is quiet today. Check back later for breaking sports news!</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-gray-100 ml-4 md:ml-6 pl-8 md:pl-12">
            {news.map((item) => (
              <article key={item.id} className="mb-12 relative group">
                {/* Timeline Dot */}
                <div className={`absolute top-2 -left-[45px] md:-left-[61px] w-5 h-5 bg-white border-4 ${item.category === 'Transfer News' ? 'border-red-600' : 'border-blue-600'} rounded-full transition-all duration-300 z-10 shadow-sm`} />

                <div className="bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden rounded-sm relative">
                  
                  {/* Category Bar Accent */}
                  <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${item.category === 'Transfer News' ? 'from-red-600' : 'from-blue-600'} to-black transform opacity-80 z-10`} />

                  {item.imageUrl && (
                    <div className="relative w-full h-64 md:h-80 overflow-hidden">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  )}

                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                      <div className="flex items-center gap-3">
                        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-sm text-white ${item.category === 'Transfer News' ? 'bg-red-600' : 'bg-blue-600'}`}>
                          {item.category.toUpperCase()}
                        </span>
                        <time className="text-xs font-bold text-gray-400 tracking-wider">
                          {new Date(item.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                        </time>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl md:text-3xl font-black text-gray-900 leading-tight mb-6 font-serif">
                      {item.title}
                    </h2>
                    
                    <div 
                      className="prose prose-sm md:prose-base max-w-none text-gray-700 prose-p:leading-relaxed prose-a:text-red-700 hover:prose-a:text-red-900 prose-a:font-bold prose-headings:font-black prose-img:rounded-sm border-t border-gray-100 pt-6"
                      dangerouslySetInnerHTML={{ __html: item.content }}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
