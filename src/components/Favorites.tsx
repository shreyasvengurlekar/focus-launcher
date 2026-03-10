'use client';

import { useSettings } from '@/lib/store';
import { allApps } from '@/lib/apps';
import Link from 'next/link';
import { Button } from './ui/button';

export function Favorites() {
  const { favoriteAppIds } = useSettings();
  const favoriteApps = allApps.filter(app => favoriteAppIds.includes(app.id));

  const handleAppClick = (url?: string) => {
    if (url) {
      window.location.href = url;
    }
  };

  if (favoriteApps.length === 0) {
    return (
      <div className="text-center text-muted-foreground">
        <p>No favorite apps selected.</p>
        <Button variant="link" asChild>
          <Link href="/settings">Add favorites</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-center text-sm font-medium text-muted-foreground">FAVORITES</h2>
      <div className="grid grid-cols-4 gap-4">
        {favoriteApps.map(app => (
          <div
            key={app.id}
            onClick={() => handleAppClick(app.url)}
            className="flex cursor-pointer flex-col items-center gap-2 rounded-lg p-2 transition-colors hover:bg-secondary"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary">
              <span className="text-2xl font-bold">{app.name.charAt(0)}</span>
            </div>
            <span className="w-full truncate text-center text-xs">{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
