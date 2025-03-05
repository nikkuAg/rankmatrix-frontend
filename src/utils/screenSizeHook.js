import { useEffect, useState } from 'react';

export const useIsMobile = (breakpoint = 600) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    checkScreenSize(); // Check on mount

    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, [breakpoint]);

  return isMobile;
};

export const useIsScreenAllowed = () => {
  const [isAllowed, setIsAllowed] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsAllowed(window.innerWidth > 350);
    };

    checkScreenSize(); // Check on mount

    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return isAllowed;
};
