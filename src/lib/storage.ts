'use client';

import type { Settings } from './types';

const SETTINGS_KEY = 'minimalist-launcher-settings';

const defaultSettings: Settings = {
  hour12: false,
  showDate: true,
  showGreeting: true,
  isFocusMode: false,
  favoriteAppIds: ['phone', 'messages', 'camera', 'chrome'],
};

export function getSettings(): Settings {
  if (typeof window === 'undefined') {
    return defaultSettings;
  }
  try {
    const settings = localStorage.getItem(SETTINGS_KEY);
    if (settings) {
      return { ...defaultSettings, ...JSON.parse(settings) };
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

export function resetSettings(): void {
  if (typeof window === 'undefined') {
    return;
  }
  localStorage.removeItem(SETTINGS_KEY);
}
