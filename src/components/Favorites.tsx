'use client';

import { useSettings } from '@/lib/store';
import { allApps } from '@/lib/apps';
import Link from 'next/link';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export function Favorites() {
  const { favoriteAppIds, hiddenAppIds } = useSettings();
  const router = useRouter();
  
  const favoriteApps = allApps.filter(
    app => favoriteAppIds.includes(app.id) && !hiddenAppIds.includes(app.id)
  );

  const handleAppClick = (url?: string) => {
    if (!url) return;
    if (url.startsWith('/')) {
      router.push(url);
    } else {
      window.location.href = url;
    }
  };

  if (favoriteApps.length === 0) {
    return (
      <div className="text-center text-muted-foreground py-8">
        <p>No favorite apps to show.</p>
        <Button variant="link" asChild>
          <Link href="/apps">Manage Favorites</Link>
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-4 text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">Favorites</h2>
      <div className="grid grid-cols-4 gap-x-4 gap-y-6">
        {favoriteApps.map(app => (
          <div
            key={app.id}
            onClick={() => handleAppClick(app.url)}
            className="flex cursor-pointer flex-col items-center gap-2 rounded-lg p-2 transition-colors hover:bg-secondary"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <span className="text-3xl font-bold">{app.name.charAt(0)}</span>
            </div>
            <span className="w-full truncate text-center text-xs">{app.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
