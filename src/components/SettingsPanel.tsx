'use client';

import { useSettings } from '@/lib/store';
import { allApps } from '@/lib/apps';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export function SettingsPanel() {
  const {
    hour12,
    showDate,
    showGreeting,
    isFocusMode,
    favoriteAppIds,
    dispatch,
  } = useSettings();

  const handleFavoriteChange = (appId: string, checked: boolean) => {
    let newFavorites;
    if (checked) {
      newFavorites = [...favoriteAppIds, appId];
    } else {
      newFavorites = favoriteAppIds.filter(id => id !== appId);
    }
    dispatch({ type: 'SET_FAVORITES', payload: newFavorites });
  };

  return (
    <div className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Display</h2>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <Label htmlFor="hour-format">Use 12-hour format</Label>
          <Switch id="hour-format" checked={hour12} onCheckedChange={() => dispatch({ type: 'TOGGLE_HOUR_FORMAT' })} />
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <Label htmlFor="show-date">Show date</Label>
          <Switch id="show-date" checked={showDate} onCheckedChange={() => dispatch({ type: 'TOGGLE_SHOW_DATE' })} />
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <Label htmlFor="show-greeting">Show greeting</Label>
          <Switch id="show-greeting" checked={showGreeting} onCheckedChange={() => dispatch({ type: 'TOGGLE_SHOW_GREETING' })} />
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Favorite Apps</h2>
        <p className="text-sm text-muted-foreground">Select apps to show on the home screen.</p>
        <ScrollArea className="h-64 rounded-md border">
          <div className="p-4">
            {allApps.map(app => (
              <div key={app.id} className="flex items-center space-x-2 py-2">
                <Checkbox
                  id={`fav-${app.id}`}
                  checked={favoriteAppIds.includes(app.id)}
                  onCheckedChange={(checked) => handleFavoriteChange(app.id, !!checked)}
                />
                <label
                  htmlFor={`fav-${app.id}`}
                  className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {app.name}
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Modes</h2>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <Label htmlFor="focus-mode">Enable Focus Mode</Label>
          <Switch id="focus-mode" checked={isFocusMode} onCheckedChange={() => dispatch({ type: 'TOGGLE_FOCUS_MODE' })} />
        </div>
      </section>

      <Separator />

      <section>
        <Button variant="destructive" onClick={() => dispatch({ type: 'RESET_SETTINGS' })}>
          Reset All Settings
        </Button>
      </section>
    </div>
  );
}
