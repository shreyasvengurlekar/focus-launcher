'use client';

import { AppList } from '@/components/AppList';
import { allApps } from '@/lib/apps';
import { useSettings } from '@/lib/store';

export default function AppsPage() {
  const { favoriteAppIds, hiddenAppIds, dispatch } = useSettings();

  const handleFavoriteToggle = (appId: string) => {
    const isFavorite = favoriteAppIds.includes(appId);
    let newFavorites;
    if (isFavorite) {
      newFavorites = favoriteAppIds.filter(id => id !== appId);
    } else {
      newFavorites = [...favoriteAppIds, appId];
    }
    dispatch({ type: 'SET_FAVORITES', payload: newFavorites });
  };
  
  const handleHideToggle = (appId: string) => {
    const isHidden = hiddenAppIds.includes(appId);
    let newHidden;
    if (isHidden) {
      newHidden = hiddenAppIds.filter(id => id !== appId);
    } else {
      newHidden = [...hiddenAppIds, appId];
    }
    dispatch({ type: 'SET_HIDDEN_APPS', payload: newHidden });
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold">All Apps</h1>
      </header>
      <AppList
        apps={allApps}
        favoriteAppIds={favoriteAppIds}
        hiddenAppIds={hiddenAppIds}
        onFavoriteToggle={handleFavoriteToggle}
        onHideToggle={handleHideToggle}
      />
    </div>
  );
}
