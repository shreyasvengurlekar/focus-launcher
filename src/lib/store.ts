'use client';

import React, { createContext, useContext, useReducer, useEffect, type Dispatch, type ReactNode } from 'react';
import type { Settings } from './types';
import { getSettings, saveSettings, resetSettings as resetStorageSettings, defaultSettings } from './storage';

type State = Settings & {
    // Add an undefined state for initial load to prevent premature routing
    onboardingComplete: boolean | undefined;
};

type Action =
  | { type: 'INITIALIZE_SETTINGS'; payload: Settings }
  | { type: 'TOGGLE_HOUR_FORMAT' }
  | { type: 'TOGGLE_SHOW_DATE' }
  | { type: 'TOGGLE_SHOW_GREETING' }
  | { type: 'SET_FOCUS_MODE'; payload: boolean }
  | { type: 'SET_FAVORITES'; payload: string[] }
  | { type: 'SET_FOCUS_APPS'; payload: string[] }
  | { type: 'SET_HIDDEN_APPS'; payload: string[] }
  | { type: 'COMPLETE_ONBOARDING'; payload: Partial<Settings> }
  | { type: 'RESET_SETTINGS' };

const initialState: State = {
    ...defaultSettings,
    onboardingComplete: undefined, // Start as undefined
};

const settingsReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'INITIALIZE_SETTINGS':
      return action.payload;
    case 'TOGGLE_HOUR_FORMAT':
      return { ...state, hour12: !state.hour12 };
    case 'TOGGLE_SHOW_DATE':
      return { ...state, showDate: !state.showDate };
    case 'TOGGLE_SHOW_GREETING':
      return { ...state, showGreeting: !state.showGreeting };
    case 'SET_FOCUS_MODE':
      return { ...state, isFocusMode: action.payload };
    case 'SET_FAVORITES':
      return { ...state, favoriteAppIds: action.payload };
    case 'SET_FOCUS_APPS':
      return { ...state, focusModeAppIds: action.payload };
    case 'SET_HIDDEN_APPS':
      return { ...state, hiddenAppIds: action.payload };
    case 'COMPLETE_ONBOARDING':
      return { ...state, ...action.payload, onboardingComplete: true };
    case 'RESET_SETTINGS':
      // Here we need to make sure onboardingComplete is set to true after reset
      const newSettings = resetStorageSettings();
      return { ...newSettings, onboardingComplete: true };
    default:
      return state;
  }
};

interface SettingsContextType extends State {
  dispatch: Dispatch<Action>;
}

const SettingsContext = createContext<SettingsContextType>({
  ...initialState,
  dispatch: () => null,
});

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  // Load settings from localStorage on initial client-side render
  useEffect(() => {
    const loadedSettings = getSettings();
    dispatch({ type: 'INITIALIZE_SETTINGS', payload: loadedSettings });
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    // Only save if onboarding is not in its initial undefined state
    if (state.onboardingComplete !== undefined) {
      saveSettings(state as Settings);
    }
  }, [state]);

  return React.createElement(SettingsContext.Provider, { value: { ...state, dispatch } }, children);
};

export const useSettings = () => useContext(SettingsContext);
