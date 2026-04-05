import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-24 font-serif">
      <p className="text-sm font-sans font-bold uppercase tracking-widest text-red-700 mb-4">404 – Page Not Found</p>
      <h1 className="text-5xl font-black mb-6 text-gray-900">Story Not Found</h1>
      <p className="text-gray-500 mb-8">The article you&apos;re looking for may have been removed or never existed.</p>
      <Link href="/" className="bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest hover:bg-red-700 transition-colors">
        Back to Home
      </Link>
    </div>
  );
}
