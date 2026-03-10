'use client';

import { useState, useMemo } from 'react';
import type { App } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface AppListProps {
  apps: App[];
}

export function AppList({ apps }: AppListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const sortedAndFilteredApps = useMemo(() => {
    return apps
      .filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [apps, searchTerm]);

  const handleAppClick = (url?: string) => {
    if (!url) return;
    if (url.startsWith('/')) {
      router.push(url);
    } else {
      window.location.href = url;
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search apps..."
          className="h-11 w-full rounded-lg bg-secondary pl-10"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {sortedAndFilteredApps.length > 0 ? (
        <ul className="space-y-1">
          {sortedAndFilteredApps.map(app => (
            <li key={app.id}>
              <button
                onClick={() => handleAppClick(app.url)}
                className="w-full rounded-lg p-4 text-left text-lg transition-colors hover:bg-secondary"
              >
                {app.name}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="pt-8 text-center text-muted-foreground">No apps found.</p>
      )}
    </div>
  );
}
