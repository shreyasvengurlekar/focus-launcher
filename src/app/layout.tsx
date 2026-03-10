import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Providers } from './providers';
import { Toaster } from '@/components/ui/toaster';
import { BottomNav } from '@/components/BottomNav';

export const metadata: Metadata = {
  title: 'Minimalist Launcher',
  description: 'A minimalist, distraction-free phone launcher experience as a PWA.',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#141216',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-neutral-950">
        <Providers>
          <div className="relative mx-auto flex h-[100dvh] w-full max-w-md flex-col overflow-hidden bg-background shadow-2xl">
            <main className="flex-1 overflow-y-auto p-6 pb-24">
              {children}
            </main>
            <BottomNav />
            <Toaster />
          </div>
        </Providers>
      </body>
    </html>
  );
}
