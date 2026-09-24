import type { Metadata } from 'next';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import NetworkInformation from '@/components/ui/NetworkInformation';
import { pageMetadata } from '@/lib/metadata';

export const metadata: Metadata = pageMetadata({
  title: 'Network',
  description: 'Your public IP address, user agent and approximate location, as seen by the server.',
  path: '/ip/',
});

export default function NetworkPage() {
  return (
    <>
      <Header />

      <main>
        <NetworkInformation />
      </main>

      <Footer priority />
    </>
  );
}
