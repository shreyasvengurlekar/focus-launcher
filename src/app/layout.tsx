import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SettingsProvider } from '@/lib/store';
import { Toaster } from '@/components/ui/toaster';
import { AppContent } from './_components/AppContent';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Mono Launcher',
  description: 'A minimalist, distraction-free phone launcher experience as a PWA.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#000000',
  initialScale: 1,
  width: 'device-width',
  minimumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        <SettingsProvider>
          <AppContent>{children}</AppContent>
          <Toaster />
        </SettingsProvider>
      </body>
    </html>
  );
}
