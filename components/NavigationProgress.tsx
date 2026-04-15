'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

const WATCHED_PATTERNS = [
  /^\/$/,
  /^\/category\//,
  /^\/article\//,
];

function isWatched(path: string) {
  return WATCHED_PATTERNS.some((pattern) => pattern.test(path));
}

export function NavigationProgress() {
  const pathname = usePathname();
  const [width, setWidth] = useState(0);
  const [opacity, setOpacity] = useState(0);
  const prevPath = useRef<string | null>(pathname);
  const isNavigating = useRef(false);
  const slowFillRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startBar = () => {
    if (isNavigating.current) return;
    isNavigating.current = true;

    if (slowFillRef.current) clearInterval(slowFillRef.current);
    if (fadeRef.current) clearTimeout(fadeRef.current);

    setWidth(0);
    setOpacity(1);

    setTimeout(() => setWidth(20), 10);

    let current = 20;
    slowFillRef.current = setInterval(() => {
      current += (85 - current) * 0.06;
      setWidth(current);
    }, 100);
  };

  const completeBar = () => {
    if (!isNavigating.current) return;
    isNavigating.current = false;

    if (slowFillRef.current) clearInterval(slowFillRef.current);

    setWidth(100);

    fadeRef.current = setTimeout(() => {
      setOpacity(0);
      fadeRef.current = setTimeout(() => {
        setWidth(0);
      }, 300);
    }, 200);
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      if (href.startsWith('/') && isWatched(href)) {
        startBar();
      }
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  useEffect(() => {
    const prev = prevPath.current;
    const current = pathname;

    if (prev !== current) {
      completeBar();
    }

    prevPath.current = current;
  }, [pathname]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '2px',
        zIndex: 99999,
        pointerEvents: 'none',
        opacity,
        transition: 'opacity 0.3s ease',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${width}%`,
          background: 'rgba(185, 28, 28, 0.5)',
          boxShadow: '0 0 8px rgba(185, 28, 28, 0.35)',
          transition: width === 0
            ? 'none'
            : width === 100
            ? 'width 0.2s ease-out'
            : 'width 0.4s ease-out',
        }}
      />
    </div>
  );
}
