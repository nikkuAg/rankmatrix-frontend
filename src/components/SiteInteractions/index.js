'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function SiteInteractions() {
  const pathname = usePathname();
  useEffect(() => {
    const header = document.querySelector('[data-site-header]');
    if (!header) return;
    const menus = [...header.querySelectorAll('[data-site-menu]')];
    menus.forEach((menu) => {
      menu.open = false;
    });
    header.querySelectorAll('nav a').forEach((link) => {
      const href = link.getAttribute('href');
      if (pathname === href || pathname.startsWith(`${href}/`))
        link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    const closeMenus = (event) => {
      menus.forEach((menu) => {
        if (!menu.open) return;
        if (event.type === 'keydown' && event.key === 'Escape') {
          menu.open = false;
          menu.querySelector('summary').focus();
        } else if (
          event.type === 'click' &&
          (!menu.contains(event.target) || event.target.closest('a'))
        ) {
          menu.open = false;
        }
      });
    };
    document.addEventListener('click', closeMenus);
    document.addEventListener('keydown', closeMenus);
    return () => {
      document.removeEventListener('click', closeMenus);
      document.removeEventListener('keydown', closeMenus);
    };
  }, [pathname]);
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
