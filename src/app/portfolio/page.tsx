import type { Metadata } from 'next';
import { Fragment } from 'react';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Lightbox from '@/components/ui/Lightbox';
import MasonryGrid from '@/components/ui/MasonryGrid';
import { getPhotographs } from '@/lib/photographs';

export const metadata: Metadata = {
  title: 'Portfolio - Andrey Pudov',
};

const SECTIONS = [
  {
    id: 'travel',
    title: 'Travel',
    photographs: [
      '2026-06-05_19_055.webp',
      '2026-06-21_001.webp',
      '2026-04-03_003.webp',
      '2026-01-22_03-08_001.webp',
      '2026-01-22_03-08_031.webp',
      '2025-05-11_008.webp',
      '2025-01-15_02-10_039.webp',
      '2025-01-15_02-10_037.webp',
      '2025-01-15_02-10_021.webp',
      '2025-01-15_02-10_008.webp',
      '2023-10-06_08_004.webp',
      '2023-05-17_008.webp',
      '2022-08-27_09-10_104.webp',
      '2022-08-27_09-10_076.webp',
      '2022-08-27_09-10_070.webp',
      '2022-08-27_09-10_055.webp',
      '2022-08-27_09-10_030.webp',
      '2022-08-27_09-10_001.webp',
      '2022-07-08_001.webp',
      '2021-07-24_08-02_089.webp',
      '2019-07-16_002.webp',
      '2019-07-16_001.webp',
      '2019-05-12_05-25_001.webp',
      '2017-12-18_2018-01-05_084_large.webp',
      '2017-12-18_2018-01-05_022_large.webp',
      '2017-12-18_2018-01-05_016_large.webp',
      '2017-12-18_2018-01-05_001_large.webp',
      '2017-09-09_24_030_large.webp',
      '2017-09-09_24_001_large.webp',
      '2017-01-30_001.webp',
      '2016-12-15_001.webp',
      '2016-10-15_11-05_019_large.webp',
      '2016-10-15_11-05_009_large.webp',
      '2016-10-15_11-05_003_large.webp',
      '2016-08-24_30_010_large.webp',
      '2016-04-27_05-04_004.webp',
      '2015-08-12_002.webp',
      '2013-09-17_015_large.webp',
      '2013-01-01_001.webp',
      '2012-11-09_21_037_large.webp',
    ],
  },
  {
    id: 'nature',
    title: 'Nature',
    photographs: [
      '2026-06-05_19_007.webp',
      '2026-06-05_19_027.webp',
      '2026-06-05_19_043.webp',
      '2026-08-12_001.webp',
      '2025-01-15_02-10_002.webp',
      '2023-11-18_020.webp',
      '2023-11-18_002.webp',
      '2023-06-16_18_011.webp',
      '2023-05-07_019.webp',
      '2022-08-15_010.webp',
      '2022-08-15_009.webp',
      '2022-08-15_006.webp',
      '2022-08-07_019.webp',
      '2021-07-24_08-02_018.webp',
      '2020-07-19_08-04_100.webp',
      '2020-07-19_08-04_039.webp',
      '2020-07-19_08-04_035.webp',
      '2020-07-19_08-04_031.webp',
      '2019-10-26_007.webp',
      '2019-10-26_004.webp',
      '2015-07-27_08-08_058_large.webp',
      '2015-07-27_08-08_035_large.webp',
      '2015-07-27_08-08_027_large.webp',
      '2015-07-27_08-08_022_large.webp',
    ],
  },
  {
    id: 'portraits',
    title: 'Portraits',
    photographs: [
      '2026-06-27_001.webp',
      '2026-06-27_013.webp',
      '2026-05-24_006.webp',
      '2025-11-27_003.webp',
      '2025-11-15_009.webp',
      '2025-11-15_005.webp',
      '2025-06-03_017.webp',
      '2025-06-03_003.webp',
      '2025-05-31_005.webp',
      '2025-05-22_026.webp',
      '2025-05-22_015.webp',
      '2025-05-22_005.webp',
      '2025-01-15_02-10_002_peipei.webp',
      '2018-08-18_005.webp',
      '2018-05-27_007.webp',
      '2017-10-22_016_large.webp',
      '2016-04-16_009.webp',
    ],
  },
  {
    id: 'events',
    title: 'Events',
    photographs: [
      '2026-01-22_03-08_018.webp',
      '2026-01-22_03-08_020.webp',
      '2025-12-06_011.webp',
      '2025-12-06_015.webp',
      '2025-05-17_18_001.webp',
      '2025-02-08_006.webp',
      '2024-08-18_003.webp',
      '2019-09-30_003.webp',
      '2019-09-30_002.webp',
      '2018-02-24_002.webp',
      '2017-08-23_001.webp',
      '2017-07-22_012.webp',
      '2016-04-27_05-04_002.webp',
    ],
  },
];

export default function PortfolioPage() {
  const sections = SECTIONS.map((section) => ({
    ...section,
    photographs: getPhotographs(section.photographs),
  }));

  return (
    <>
      <Header
        secondaryItems={sections.map((section) => ({
          href: `#${section.id}`,
          label: section.title,
        }))}
      />

      <main className="container-fluid">
        {sections.map((section, index) => (
          <Fragment key={section.id}>
            <h1 id={section.id}>{section.title}</h1>

            <MasonryGrid
              photographs={section.photographs}
              section={section.id}
              priority={index === 0}
            />
          </Fragment>
        ))}
      </main>

      <Footer />

      {sections.map((section) => (
        <Lightbox
          photographs={section.photographs}
          entryPrefix={`lightbox-${section.id}`}
          tilePrefix={`${section.id}-grid`}
          variant={section.id}
          key={section.id}
        />
      ))}
    </>
  );
}
