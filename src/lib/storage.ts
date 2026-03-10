'use client';

import type { Settings } from './types';

const SETTINGS_KEY = 'mono-launcher-settings';

export const defaultSettings: Settings = {
  hour12: false,
  showDate: true,
  showGreeting: true,
  isFocusMode: false,
  favoriteAppIds: ['phone', 'messages', 'camera', 'chrome'],
  focusModeAppIds: ['phone', 'messages'],
  hiddenAppIds: [],
  onboardingComplete: false,
};

export function getSettings(): Settings {
  if (typeof window === 'undefined') {
    return defaultSettings;
  }
  try {
    const settings = localStorage.getItem(SETTINGS_KEY);
    if (settings) {
      const parsed = JSON.parse(settings);
      // Merge parsed settings with defaults to ensure all keys are present
      return { ...defaultSettings, ...parsed };
    }
    return defaultSettings;
  } catch (error) {
    console.error('Failed to parse settings from localStorage', error);
    return defaultSettings;
  }
}

export function saveSettings(settings: Settings): void {
  if (typeof window === 'undefined') {
    return;
  }
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save settings to localStorage', error);
  }
}

export function resetSettings(): Settings {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(SETTINGS_KEY);
  }
  // Return a fresh copy of defaultSettings for the reducer
  return { ...defaultSettings, onboardingComplete: true };
}
