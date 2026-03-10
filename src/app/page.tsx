'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSettings } from '@/lib/store';
import { Clock } from '@/components/Clock';
import { Favorites } from '@/components/Favorites';
import { SearchBar } from '@/components/SearchBar';
import { allApps } from '@/lib/apps';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function Home() {
  const { showGreeting, isFocusMode } = useSettings();
  const [greeting, setGreeting] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isFocusMode) {
      router.replace('/focus');
    }
  }, [isFocusMode, router]);

  useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  const handleSearch = (query: string) => {
    if (!query) return;
    const foundApp = allApps.find(app => app.name.toLowerCase().includes(query.toLowerCase()));
    if (foundApp?.url) {
      window.location.href = foundApp.url;
    } else if (foundApp) {
      // For internal apps or apps without URLs
      alert(`'Launching' ${foundApp.name}`);
    }
  };

  if (isFocusMode) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="flex h-full flex-col">
      <header className="flex-shrink-0">
        <Clock />
      </header>
      <div className="mt-16 flex-1 space-y-8">
        {showGreeting && <p className="text-center text-lg text-muted-foreground">{greeting}</p>}
        <SearchBar onSearch={handleSearch} />
        <Favorites />
      </div>
    </div>
  );
}
