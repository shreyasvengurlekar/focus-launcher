export interface App {
  id: string;
  name: string;
  url?: string;
}

export interface Settings {
  hour12: boolean;
  showDate: boolean;
  showGreeting: boolean;
  isFocusMode: boolean;
  favoriteAppIds: string[];
}
