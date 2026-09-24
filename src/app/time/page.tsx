import type { Metadata } from 'next';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import WorldClock from '@/components/ui/WorldClock';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Time',
  description: 'The current time, synchronized with the server, alongside clocks for New York, Barcelona, Cheboksary and Tainan.',
  path: '/time/',
});

export default function TimePage() {
  return (
    <>
      <Header />

      <main>
        <WorldClock />
      </main>

      <Footer priority />
    </>
  );
}
