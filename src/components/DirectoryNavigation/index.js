'use client';

import { useRouter } from 'next/navigation';
import { directoryNavigationHref } from '@/utils/directoryNavigation.mjs';

export function DirectoryNavigation({ children }) {
  const router = useRouter();
  return (
    <div
      onClick={(event) => {
        const href = directoryNavigationHref(event);
        if (href) {
          event.preventDefault();
          router.push(href);
        }
      }}
    >
      {children}
    </div>
  );
}
