import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import Analytics from '@/components/layout/Analytics';
import { SITE_NAME, SITE_URL } from '@/lib/metadata';

import '@/styles/site.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  // Used by pages without their own metadata (the 404 page).
  title: SITE_NAME,
  description:
    'Official website of Russian Landscape Photographer Andrey Pudov. Welcome to the portfolio of stunning landscape photography.',
  icons: {
    icon: { url: '/media/images/favicon.png', type: 'image/png' },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-US">
      <body>
        <Analytics />

        {children}
      </body>
    </html>
  );
}
