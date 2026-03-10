'use client';

import { useState, useEffect } from 'react';
import { useSettings } from '@/lib/store';
import { format } from 'date-fns';

export function Clock() {
  const [time, setTime] = useState(new Date());
  const { hour12, showDate } = useSettings();

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const timeFormat = hour12 ? 'h:mm' : 'HH:mm';
  const ampmFormat = hour12 ? ' a' : '';
  const dateFormat = 'eeee, d MMMM';

  return (
    <div className="text-center">
      <div className="text-7xl font-bold tracking-tighter">
        <span>{format(time, timeFormat)}</span>
        {hour12 && <span className="text-4xl align-middle">{format(time, ampmFormat)}</span>}
      </div>
      {showDate && <p className="text-lg text-muted-foreground">{format(time, dateFormat)}</p>}
    </div>
  );
}
