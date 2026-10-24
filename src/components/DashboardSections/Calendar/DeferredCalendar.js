'use client';

import { useEffect, useRef, useState } from 'react';
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
    <div ref={target} style={{ minHeight: 450 }}>
      {visible ? (
        <Calendar />
      ) : (
        <div className="notice">
          <h2>Important dates</h2>
          <p>
            <a href="https://josaa.nic.in/schedule/">Check the official JoSAA schedule</a>
          </p>
        </div>
      )}
    </div>
  );
}
