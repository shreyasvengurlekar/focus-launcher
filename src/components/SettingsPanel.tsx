'use client';

import { useSettings } from '@/lib/store';
import { allApps } from '@/lib/apps';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export function SettingsPanel() {
  const {
    hour12,
    showDate,
    showGreeting,
    isFocusMode,
    favoriteAppIds,
    focusModeAppIds,
    hiddenAppIds,
    dispatch,
  } = useSettings();

  const handleMultiSelectChange = (
    appId: string,
    checked: boolean,
    currentList: string[],
    actionType: 'SET_FAVORITES' | 'SET_FOCUS_APPS' | 'SET_HIDDEN_APPS'
  ) => {
    let newList;
    if (checked) {
      newList = [...currentList, appId];
    } else {
      newList = currentList.filter(id => id !== appId);
    }
    dispatch({ type: actionType, payload: newList });
  };
  
  const sortedApps = [...allApps].sort((a,b) => a.name.localeCompare(b.name));

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Display</h2>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <Label htmlFor="hour-format" className="cursor-pointer">Use 12-hour format</Label>
          <Switch id="hour-format" checked={hour12} onCheckedChange={() => dispatch({ type: 'TOGGLE_HOUR_FORMAT' })} />
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <Label htmlFor="show-date" className="cursor-pointer">Show date</Label>
          <Switch id="show-date" checked={showDate} onCheckedChange={() => dispatch({ type: 'TOGGLE_SHOW_DATE' })} />
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <Label htmlFor="show-greeting" className="cursor-pointer">Show greeting</Label>
          <Switch id="show-greeting" checked={showGreeting} onCheckedChange={() => dispatch({ type: 'TOGGLE_SHOW_GREETING' })} />
        </div>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Favorite Apps</h2>
        <p className="text-sm text-muted-foreground">Select apps to show on the home screen.</p>
        <ScrollArea className="h-64 rounded-md border">
          <div className="p-4">
            {sortedApps.map(app => (
              <div key={`fav-${app.id}`} className="flex items-center space-x-3 py-3">
                <Checkbox
                  id={`fav-${app.id}`}
                  checked={favoriteAppIds.includes(app.id)}
                  onCheckedChange={(checked) => handleMultiSelectChange(app.id, !!checked, favoriteAppIds, 'SET_FAVORITES')}
                />
                <label htmlFor={`fav-${app.id}`} className="text-base font-medium leading-none cursor-pointer">
                  {app.name}
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </section>
      
      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Hidden Apps</h2>
        <p className="text-sm text-muted-foreground">Hide apps from all lists and search results.</p>
        <ScrollArea className="h-64 rounded-md border">
          <div className="p-4">
            {sortedApps.map(app => (
              <div key={`hide-${app.id}`} className="flex items-center space-x-3 py-3">
                <Checkbox
                  id={`hide-${app.id}`}
                  checked={hiddenAppIds.includes(app.id)}
                  onCheckedChange={(checked) => handleMultiSelectChange(app.id, !!checked, hiddenAppIds, 'SET_HIDDEN_APPS')}
                />
                <label htmlFor={`hide-${app.id}`} className="text-base font-medium leading-none cursor-pointer">
                  {app.name}
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </section>

      <Separator />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Focus Mode</h2>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className='flex flex-col gap-1.5'>
            <Label htmlFor="focus-mode" className="cursor-pointer">Enable Focus Mode</Label>
            <p className="text-sm text-muted-foreground">An ultra-minimal screen to help you focus.</p>
          </div>
          <Switch id="focus-mode" checked={isFocusMode} onCheckedChange={(checked) => dispatch({ type: 'SET_FOCUS_MODE', payload: checked })} />
        </div>
        <p className="text-sm text-muted-foreground">Select essential apps for Focus Mode.</p>
        <ScrollArea className="h-64 rounded-md border">
          <div className="p-4">
            {sortedApps.map(app => (
              <div key={`focus-${app.id}`} className="flex items-center space-x-3 py-3">
                <Checkbox
                  id={`focus-${app.id}`}
                  checked={focusModeAppIds.includes(app.id)}
                  onCheckedChange={(checked) => handleMultiSelectChange(app.id, !!checked, focusModeAppIds, 'SET_FOCUS_APPS')}
                />
                <label htmlFor={`focus-${app.id}`} className="text-base font-medium leading-none cursor-pointer">
                  {app.name}
                </label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </section>

      <Separator />

      <section>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Reset All Settings</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will reset all your personalized settings, including favorites and hidden apps, to their default values. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => dispatch({ type: 'RESET_SETTINGS' })}>
                Reset
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </div>
  );
}
