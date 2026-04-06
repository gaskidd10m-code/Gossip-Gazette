import React from 'react';
import { db } from '../../lib/db';
import { TransferNews } from '../../types';

export const metadata = {
  title: 'Transfer News | Gossip Gazette',
  description: 'Latest football transfer rumors, done deals, and breaking news updates.'
};

async function getPublishedTransferNews(): Promise<TransferNews[]> {
  try {
    const rows = await db.query(
      `SELECT id, title, content, status, created_at AS "createdAt"
       FROM transfer_news 
       WHERE status = 'published'
       ORDER BY created_at DESC`
    );
    return rows;
  } catch (error) {
    console.error('Error fetching transfer news:', error);
    return [];
  }
}

export default async function TransferNewsPage() {
  const news = await getPublishedTransferNews();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-12 border-b-[6px] border-black pb-6 text-center">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-serif mb-4 text-black flex items-center justify-center gap-4">
          <span className="text-red-600">⚡</span> Transfer News Hub
        </h1>
        <p className="text-gray-500 font-bold uppercase tracking-[0.3em] text-xs">
          Live Updates • Rumors • Done Deals
        </p>
      </div>

      <div className="space-y-10 relative">
        {news.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 border border-gray-100 rounded-sm">
            <span className="text-4xl mb-4 block">🔮</span>
            <p className="text-gray-500 font-medium font-serif italic text-lg">The transfer window is quiet today. Check back later.</p>
          </div>
        ) : (
          <div className="relative border-l-2 border-gray-100 ml-4 md:ml-6 pl-8 md:pl-12">
            {news.map((item) => (
              <article key={item.id} className="mb-12 relative group">
                {/* Timeline Dot */}
                <div className="absolute top-2 -left-[45px] md:-left-[61px] w-5 h-5 bg-white border-4 border-black rounded-full group-hover:border-red-600 group-hover:scale-125 transition-all duration-300 z-10 shadow-sm" />

                <div className="bg-white border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden rounded-sm relative">
                  
                  {/* Subtle Top Red Bar Accent */}
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-black transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out z-10" />

                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
                      <div className="flex items-center gap-3">
                        <span className="bg-black text-white px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-sm">
                          BREAKING
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
