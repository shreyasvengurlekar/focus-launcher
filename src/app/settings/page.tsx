'use client';

import { SettingsPanel } from '@/components/SettingsPanel';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">Settings</h1>
      </header>
      <SettingsPanel />
    </div>
  );
}
