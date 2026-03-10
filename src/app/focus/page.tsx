'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSettings } from '@/lib/store';
import { Clock } from '@/components/Clock';
import { Button } from '@/components/ui/button';
import { Phone, MessageSquare } from 'lucide-react';

const essentialApps = [
  { id: 'phone', name: 'Phone', icon: Phone, url: 'tel:' },
  { id: 'messages', name: 'Messages', icon: MessageSquare, url: 'sms:' },
];

export default function FocusModePage() {
  const { isFocusMode, dispatch } = useSettings();
  const router = useRouter();

  useEffect(() => {
    if (!isFocusMode) {
      router.replace('/');
    }
  }, [isFocusMode, router]);

  const handleAppClick = (url: string) => {
    window.location.href = url;
  };
  
  if (!isFocusMode) {
    return null; // Render nothing while redirecting
  }

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-20">
      <Clock />
      
      <div className="flex items-center gap-8">
        {essentialApps.map(app => (
          <div
            key={app.id}
            onClick={() => handleAppClick(app.url)}
            className="flex cursor-pointer flex-col items-center gap-2 rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            <app.icon className="h-8 w-8" />
            <span className="text-sm">{app.name}</span>
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        onClick={() => dispatch({ type: 'TOGGLE_FOCUS_MODE' })}
      >
        Exit Focus Mode
      </Button>
    </div>
  );
}
