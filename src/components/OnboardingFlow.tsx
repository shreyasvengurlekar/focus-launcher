'use client';

import { useState } from 'react';
import { useSettings } from '@/lib/store';
import { allApps } from '@/lib/apps';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Progress } from '@/components/ui/progress';

type Step = 'welcome' | 'favorites' | 'focus' | 'time' | 'done';

const sortedApps = [...allApps].sort((a,b) => a.name.localeCompare(b.name));

export function OnboardingFlow() {
  const [step, setStep] = useState<Step>('welcome');
  const [tempFavorites, setTempFavorites] = useState<string[]>(['phone', 'messages', 'camera']);
  const [tempFocusApps, setTempFocusApps] = useState<string[]>(['phone', 'messages']);
  const [tempHour12, setTempHour12] = useState<boolean>(false);
  const { dispatch } = useSettings();

  const handleFavoriteChange = (appId: string, checked: boolean) => {
    setTempFavorites(prev => 
      checked ? [...prev, appId] : prev.filter(id => id !== appId)
    );
  };

  const handleFocusChange = (appId: string, checked: boolean) => {
    setTempFocusApps(prev => 
      checked ? [...prev, appId] : prev.filter(id => id !== appId)
    );
  };

  const finishOnboarding = () => {
    dispatch({
      type: 'COMPLETE_ONBOARDING',
      payload: {
        favoriteAppIds: tempFavorites,
        focusModeAppIds: tempFocusApps,
        hour12: tempHour12,
      },
    });
  };
  
  const skipOnboarding = () => {
    dispatch({
      type: 'COMPLETE_ONBOARDING',
      payload: {}, // Use default settings
    });
  }

  const progressValue = {
    welcome: 0,
    favorites: 25,
    focus: 50,
    time: 75,
    done: 100
  }[step];

  const renderStep = () => {
    switch (step) {
      case 'welcome':
        return (
          <div className="text-center space-y-10">
            <h1 className="text-5xl font-bold">Welcome to Mono</h1>
            <p className="text-2xl text-muted-foreground">
              A minimalist, distraction-free experience for intentional phone use.
            </p>
            <div className="flex flex-col gap-4 pt-12">
              <Button size="lg" onClick={() => setStep('favorites')}>Get Started</Button>
              <Button size="lg" variant="ghost" onClick={skipOnboarding}>Skip for Now</Button>
            </div>
          </div>
        );
      case 'favorites':
        return (
          <div className="w-full space-y-6">
            <h2 className="text-3xl font-bold text-center">Choose Your Favorites</h2>
            <p className="text-center text-muted-foreground">Select apps for quick access from the home screen.</p>
            <ScrollArea className="h-72 rounded-md border">
              <div className="p-4">
                {sortedApps.map(app => (
                  <div key={app.id} className="flex items-center space-x-3 py-3">
                    <Checkbox
                      id={`fav-${app.id}`}
                      checked={tempFavorites.includes(app.id)}
                      onCheckedChange={checked => handleFavoriteChange(app.id, !!checked)}
                    />
                    <Label htmlFor={`fav-${app.id}`} className="text-lg font-medium cursor-pointer">
                      {app.name}
                    </Label>
                  </div>
                ))}
              </div>
            </ScrollArea>
             <Button className="w-full" size="lg" onClick={() => setStep('focus')}>Continue</Button>
          </div>
        );
      case 'focus':
        return (
            <div className="w-full space-y-6">
                <h2 className="text-3xl font-bold text-center">Essential Apps</h2>
                <p className="text-center text-muted-foreground">Choose apps for when you need to focus.</p>
                <ScrollArea className="h-72 rounded-md border">
                    <div className="p-4">
                        {sortedApps.map(app => (
                        <div key={app.id} className="flex items-center space-x-3 py-3">
                            <Checkbox
                            id={`focus-${app.id}`}
                            checked={tempFocusApps.includes(app.id)}
                            onCheckedChange={checked => handleFocusChange(app.id, !!checked)}
                            />
                            <Label htmlFor={`focus-${app.id}`} className="text-lg font-medium cursor-pointer">
                            {app.name}
                            </Label>
                        </div>
                        ))}
                    </div>
                </ScrollArea>
                <Button className="w-full" size="lg" onClick={() => setStep('time')}>Continue</Button>
          </div>
        );
      case 'time':
        return (
            <div className="w-full space-y-8">
                <h2 className="text-3xl font-bold text-center">Time Format</h2>
                <p className="text-center text-muted-foreground">How would you like the time to be displayed?</p>
                <RadioGroup 
                    defaultValue={tempHour12 ? "12" : "24"} 
                    className="space-y-4"
                    onValueChange={(value) => setTempHour12(value === "12")}
                >
                    <div className="flex items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="r1" className="text-lg cursor-pointer">12-hour (e.g., 3:00 PM)</Label>
                        <RadioGroupItem value="12" id="r1" />
                    </div>
                     <div className="flex items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="r2" className="text-lg cursor-pointer">24-hour (e.g., 15:00)</Label>
                        <RadioGroupItem value="24" id="r2" />
                    </div>
                </RadioGroup>
                <Button className="w-full" size="lg" onClick={finishOnboarding}>Finish Setup</Button>
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center p-6 space-y-8">
      <div className="w-full max-w-sm">
        <Progress value={progressValue} className="w-full" />
      </div>
      <div className="flex-1 flex flex-col justify-center items-center w-full max-w-sm">
        {renderStep()}
      </div>
    </div>
  );
}
