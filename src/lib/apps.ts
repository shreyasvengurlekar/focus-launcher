import type { App } from './types';

export const allApps: App[] = [
  { id: 'phone', name: 'Phone', url: 'tel:' },
  { id: 'messages', name: 'Messages', url: 'sms:' },
  { id: 'camera', name: 'Camera' },
  { id: 'whatsapp', name: 'WhatsApp', url: 'https://web.whatsapp.com' },
  { id: 'chrome', name: 'Chrome', url: 'https://google.com' },
  { id: 'settings', name: 'Settings', url: '/settings' },
  { id: 'gmail', name: 'Gmail', url: 'https://mail.google.com' },
  { id: 'maps', name: 'Maps', url: 'https://maps.google.com' },
  { id: 'calculator', name: 'Calculator' },
  { id: 'calendar', name: 'Calendar' },
  { id: 'youtube', name: 'YouTube', url: 'https://youtube.com' },
];
