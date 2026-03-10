'use client';

import { SettingsProvider } from '@/lib/store';
import type { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return <SettingsProvider>{children}</SettingsProvider>;
}
