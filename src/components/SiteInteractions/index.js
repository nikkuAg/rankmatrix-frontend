'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function SiteInteractions() {
  const pathname = usePathname();
  useEffect(() => {
    const target = document.querySelector('[data-footer-reveal]');
    if (!target || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    target.dataset.footerReveal = 'ready';
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          target.dataset.footerReveal = 'visible';
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);
  return null;
}
