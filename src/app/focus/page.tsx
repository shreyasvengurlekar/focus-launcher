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
    <div className="flex h-full flex-col items-center justify-between py-24 px-6">
      <Clock />
      
      <div className="flex flex-col items-center gap-8 text-center">
        {essentialApps.map(app => (
          <div
            key={app.id}
            onClick={() => handleAppClick(app.url)}
            className="cursor-pointer rounded-lg px-4 py-2 text-xl text-muted-foreground transition-colors hover:text-foreground"
          >
            {app.name}
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        className="text-muted-foreground"
        onClick={() => dispatch({ type: 'SET_FOCUS_MODE', payload: false })}
      >
        Exit Focus Mode
      </Button>
    </div>
  );
}
