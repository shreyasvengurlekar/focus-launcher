'use client';

import { useEffect, useState } from 'react';
import { Clock } from '@/components/Clock';
import { Favorites } from '@/components/Favorites';
import { SearchBar } from '@/components/SearchBar';
import { allApps } from '@/lib/apps';
import { useSettings } from '@/lib/store';
import { useRouter } from 'next/navigation';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 5) return 'Good night';
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function Home() {
  const { showGreeting } = useSettings();
  const [greeting, setGreeting] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (showGreeting) {
      setGreeting(getGreeting());
    }
  }, [showGreeting]);

  const handleSearch = (query: string) => {
    if (!query) return;
    const foundApp = allApps.find(app =>
      app.name.toLowerCase().includes(query.toLowerCase())
    );
    if (foundApp?.url) {
      if (foundApp.url.startsWith('/')) {
        router.push(foundApp.url);
      } else {
        window.location.href = foundApp.url;
      }
    }
  };

  return (
    <div className="flex h-full flex-col">
      <header className="flex-shrink-0 pt-16">
        <Clock />
      </header>
      <div className="mt-16 flex-1 space-y-8 md:space-y-12">
        {showGreeting && greeting && (
          <p className="text-center text-lg text-muted-foreground">{greeting}</p>
        )}
        <SearchBar onSearch={handleSearch} />
        <Favorites />
      </div>
    </div>
  );
}
