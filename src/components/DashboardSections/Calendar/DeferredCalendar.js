'use client';

import { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import dynamic from 'next/dynamic';

const Calendar = dynamic(() => import('./index').then((module) => module.EventCalendar), {
  ssr: false,
});

export function DeferredCalendar() {
  const target = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' },
    );
    observer.observe(target.current);
    return () => observer.disconnect();
  }, []);
  return (
    <Box ref={target} sx={{ minHeight: 450 }}>
      {visible ? (
        <Calendar />
      ) : (
        <Box sx={{ p: 3 }}>
          <h2>Important dates</h2>
          <p>
            <a href="https://josaa.nic.in/schedule/">Check the official JoSAA schedule</a>
          </p>
        </Box>
      )}
    </Box>
  );
}
