'use client';

import React, { useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * A slim, animated progress bar that appears at the top of the page
 * whenever a route transition starts — similar to YouTube / GitHub / Linear.
 */
export default function PageProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Track previous route to detect changes
  const prevRoute = useRef<string | null>(null);
  const currentRoute = `${pathname}${searchParams?.toString() ? '?' + searchParams.toString() : ''}`;

  useEffect(() => {
    if (prevRoute.current === null) {
      prevRoute.current = currentRoute;
      return;
    }
    if (prevRoute.current === currentRoute) return;
    prevRoute.current = currentRoute;

    // Route resolved — shoot to 100% and fade out
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setProgress(100);
    setVisible(true);

    timerRef.current = setTimeout(() => {
      setVisible(false);
      setTimeout(() => setProgress(0), 300);
    }, 300);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentRoute]);

  // Detect link clicks to start the fake-progress animation
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as Element).closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || href.startsWith('http') || href.startsWith('//') || href.startsWith('#') || href.startsWith('mailto')) return;

      // Start progress
      if (intervalRef.current) clearInterval(intervalRef.current);
      setProgress(0);
      setVisible(true);

      let p = 0;
      intervalRef.current = setInterval(() => {
        p += Math.random() * 12 * ((100 - p) / 100);
        if (p > 90) p = 90;
        setProgress(p);
      }, 120);
    };

    document.addEventListener('click', handleLinkClick);
    return () => {
      document.removeEventListener('click', handleLinkClick);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: '3px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #b91c1c 0%, #ef4444 60%, #fca5a5 100%)',
          transition: progress === 100
            ? 'width 0.2s ease-out'
            : 'width 0.12s ease-out',
          opacity: visible ? 1 : 0,
          boxShadow: '0 0 10px rgba(185,28,28,0.6), 0 0 4px rgba(185,28,28,0.4)',
          borderRadius: '0 2px 2px 0',
        }}
      />
    </div>
  );
}
