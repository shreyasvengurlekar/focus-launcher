'use client';

import { useSettings } from '@/lib/store';
import { Clock } from '@/components/Clock';
import { Button } from '@/components/ui/button';
import { allApps } from '@/lib/apps';
import { useRouter } from 'next/navigation';

export default function FocusModePage() {
  const { dispatch, focusModeAppIds } = useSettings();
  const router = useRouter();

  const handleAppClick = (url?: string) => {
    if (!url) return;
    if (url.startsWith('/')) {
      router.push(url);
    } else {
      window.location.href = url;
    }
  };

  const essentialApps = allApps.filter(app => focusModeAppIds.includes(app.id));

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-20">
      <Clock />
      
      <div className="flex min-h-24 items-center gap-8">
        {essentialApps.map(app => (
          <div
            key={app.id}
            onClick={() => handleAppClick(app.url)}
            className="flex cursor-pointer flex-col items-center gap-2 rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-2xl font-bold">
              {app.name.charAt(0)}
            </div>
            <span className="text-sm">{app.name}</span>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={() => dispatch({ type: 'SET_FOCUS_MODE', payload: false })}
      >
        Exit Focus Mode
      </Button>
    </div>
  );
}
