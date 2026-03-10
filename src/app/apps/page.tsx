'use client';

import { AppList } from '@/components/AppList';
import { allApps } from '@/lib/apps';

export default function AppsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">All Apps</h1>
      </header>
      <AppList apps={allApps} />
    </div>
  );
}
