'use client';

import { useState, useEffect } from 'react';
import { useSettings } from '@/lib/store';
import { format } from 'date-fns';

export function Clock() {
  const [time, setTime] = useState<Date | null>(null);
  const { hour12, showDate } = useSettings();

  useEffect(() => {
    // Set time on the client after hydration to avoid mismatch
    setTime(new Date()); 
    
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeFormat = hour12 ? 'h:mm' : 'HH:mm';
  const ampmFormat = hour12 ? ' a' : '';
  const dateFormat = 'eeee, d MMMM';

  // To prevent layout shift, we render an invisible placeholder on the server
  // that matches the final component's structure and size.
  if (!time) {
    return (
      <div className="text-center">
        <div className="text-9xl font-light tracking-tight opacity-0">
          <span>00:00</span>
          {hour12 && <span className="text-5xl align-middle font-normal">AM</span>}
        </div>
        {showDate && <p className="mt-2 text-xl text-muted-foreground opacity-0">Thursday, 1 January</p>}
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="text-9xl font-light tracking-tight">
        <span>{format(time, timeFormat)}</span>
        {hour12 && <span className="text-5xl align-middle font-normal">{format(time, ampmFormat)}</span>}
      </div>
      {showDate && <p className="mt-2 text-xl text-muted-foreground">{format(time, dateFormat)}</p>}
    </div>
  );
}
