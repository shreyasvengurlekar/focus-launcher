'use client';

import { useSettings } from '@/lib/store';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BottomNav } from '@/components/BottomNav';

export function AppContent({ children }: { children: React.ReactNode }) {
  const { onboardingComplete, isFocusMode } = useSettings();
  const router = useRouter();
  const pathname = usePathname();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Wait until settings are loaded from storage before routing
    if (onboardingComplete !== undefined) {
      setIsReady(true);
    }
  }, [onboardingComplete]);

  useEffect(() => {
    if (!isReady) return;

    if (!onboardingComplete && pathname !== '/onboarding') {
      router.replace('/onboarding');
    } else if (isFocusMode && pathname !== '/focus') {
      router.replace('/focus');
    } else if (!isFocusMode && pathname === '/focus') {
      router.replace('/');
    } else if (onboardingComplete && pathname === '/onboarding') {
      router.replace('/');
    }
  }, [isReady, onboardingComplete, isFocusMode, pathname, router]);
  
  const showNav = isReady && onboardingComplete && !isFocusMode;

  // Render a loading state or nothing until settings are initialized
  if (!isReady || (!onboardingComplete && pathname !== '/onboarding') || (isFocusMode && pathname !== '/focus')) {
    return (
        <div className="h-[100dvh] w-full bg-background" />
    );
  }

  return (
    <div className="relative mx-auto flex h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-background">
      <main className="flex-1 overflow-y-auto p-6 pb-24">
        {children}
      </main>
      {showNav && <BottomNav />}
    </div>
  );
}
