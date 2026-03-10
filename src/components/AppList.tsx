'use client';

import { useState, useMemo } from 'react';
import type { App } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Eye, EyeOff, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from './ui/separator';

interface AppListProps {
  apps: App[];
  favoriteAppIds: string[];
  hiddenAppIds: string[];
  onFavoriteToggle: (appId: string) => void;
  onHideToggle: (appId: string) => void;
}

export function AppList({
  apps,
  favoriteAppIds,
  hiddenAppIds,
  onFavoriteToggle,
  onHideToggle,
}: AppListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const sortedAndFilteredApps = useMemo(() => {
    return apps
      .filter(app => !hiddenAppIds.includes(app.id))
      .filter(app => app.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [apps, searchTerm, hiddenAppIds]);

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
          className="h-12 w-full rounded-full bg-secondary pl-10 text-base"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      {sortedAndFilteredApps.length > 0 ? (
        <ul className="space-y-1">
          {sortedAndFilteredApps.map(app => {
            const isFavorite = favoriteAppIds.includes(app.id);
            const isHidden = hiddenAppIds.includes(app.id);
            return (
              <li key={app.id}>
                <Popover>
                  <PopoverTrigger asChild>
                    <button
                      className="w-full rounded-lg p-4 text-left text-lg transition-colors hover:bg-accent"
                    >
                      {app.name}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-64 p-1">
                    <div className="flex flex-col">
                      <Button variant="ghost" className="justify-start p-4" onClick={() => handleAppClick(app.url)}>Launch</Button>
                      <Separator />
                      <Button variant="ghost" className="justify-start p-4" onClick={() => onFavoriteToggle(app.id)}>
                        <Star className={`mr-2 h-4 w-4 ${isFavorite ? 'text-primary fill-primary' : ''}`} />
                        {isFavorite ? 'Unfavorite' : 'Favorite'}
                      </Button>
                       <Separator />
                       <Button variant="ghost" className="justify-start p-4" onClick={() => onHideToggle(app.id)}>
                        {isHidden ? (
                          <><Eye className="mr-2 h-4 w-4" /> Unhide</>
                        ) : (
                          <><EyeOff className="mr-2 h-4 w-4" /> Hide</>
                        )}
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="pt-8 text-center text-muted-foreground">No apps found.</p>
      )}
    </div>
  );
}
