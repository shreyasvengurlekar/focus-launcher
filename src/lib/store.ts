'use client';

import React, { createContext, useContext, useReducer, useEffect, type Dispatch, type ReactNode } from 'react';
import type { Settings } from './types';
import { getSettings, saveSettings, resetSettings } from './storage';

type State = Settings;

type Action =
  | { type: 'INITIALIZE_SETTINGS'; payload: Settings }
  | { type: 'TOGGLE_HOUR_FORMAT' }
  | { type: 'TOGGLE_SHOW_DATE' }
  | { type: 'TOGGLE_SHOW_GREETING' }
  | { type: 'TOGGLE_FOCUS_MODE' }
  | { type: 'SET_FAVORITES'; payload: string[] }
  | { type: 'RESET_SETTINGS' };

const initialState: State = {
  hour12: false,
  showDate: true,
  showGreeting: true,
  isFocusMode: false,
  favoriteAppIds: [],
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
    case 'TOGGLE_FOCUS_MODE':
      return { ...state, isFocusMode: !state.isFocusMode };
    case 'SET_FAVORITES':
      return { ...state, favoriteAppIds: action.payload };
    case 'RESET_SETTINGS':
      resetSettings();
      return getSettings();
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

let isInitialized = false;

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(settingsReducer, initialState);

  useEffect(() => {
    if (!isInitialized) {
      const loadedSettings = getSettings();
      dispatch({ type: 'INITIALIZE_SETTINGS', payload: loadedSettings });
      isInitialized = true;
    }
  }, []);

  useEffect(() => {
    if (isInitialized) {
      saveSettings(state);
    }
  }, [state]);

  return React.createElement(SettingsContext.Provider, { value: { ...state, dispatch } }, children);
};

export const useSettings = () => useContext(SettingsContext);
