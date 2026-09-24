import type { Metadata } from 'next';

import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import Carousel from '@/components/ui/Carousel';
import FeatureGrid from '@/components/ui/FeatureGrid';
import ImageGrid from '@/components/ui/ImageGrid';
import LazyImage from '@/components/ui/LazyImage';
import Lightbox from '@/components/ui/Lightbox';
import Parallax from '@/components/ui/Parallax';
import VideoLightbox, { type Video } from '@/components/ui/VideoLightbox';
import { pageMetadata } from '@/lib/metadata';
import { getImage, getPhotograph, getPhotographs, getSelfPortrait } from '@/lib/photographs';

const CAROUSEL = [
  '2026-01-22_03-08_001.webp',
  '2025-12-06_015.webp',
  '2025-05-11_008.webp',
  '2025-01-15_02-10_021.webp',
  '2023-10-06_08_004.webp',
];

const FEATURE_GRID = [
  // First column.
  '2026-01-22_03-08_031.webp',
  '2025-01-15_02-10_008.webp',
  '2023-11-18_002.webp',
  '2022-08-15_010.webp',
  '2023-06-16_18_011.webp',
  '2025-11-15_009.webp',
  '2022-08-27_09-10_104.webp',
  '2019-05-12_05-25_001.webp',
  '2021-07-24_08-02_018.webp',
  '2017-09-09_24_030_large.webp',
  '2016-04-27_05-04_002.webp',
  '2015-08-12_002.webp',
  '2016-12-15_001.webp',

  // Second column.
  '2026-08-12_001.webp',
  '2025-01-15_02-10_002.webp',
  '2022-07-08_001.webp',
  '2017-12-18_2018-01-05_022_large.webp',
  '2025-01-15_02-10_002_peipei.webp',
  '2016-04-27_05-04_004.webp',
  '2019-07-16_002.webp',
  '2016-10-15_11-05_009_large.webp',
  '2016-10-15_11-05_003_large.webp',
  '2019-09-30_002.webp',
  '2013-01-01_001.webp',
  '2013-09-17_015_large.webp',

  // Third column.
  '2025-02-08_003.webp',
  '2025-01-15_02-10_039.webp',
  '2022-08-27_09-10_076.webp',
  '2022-08-27_09-10_001.webp',
  '2022-08-07_019.webp',
  '2025-05-22_015.webp',
  '2023-05-17_008.webp',
  '2020-07-19_08-04_100.webp',
  '2015-07-27_08-08_022_large.webp',
  '2017-09-09_24_001_large.webp',
  '2017-01-30_001.webp',
  '2015-07-27_08-08_058_large.webp',
  '2012-11-09_21_037_large.webp',
];

export const metadata: Metadata = pageMetadata({
  title: 'Home',
  description:
    'Official website of Russian Landscape Photographer Andrey Pudov. Welcome to the portfolio of stunning landscape photography.',
  path: '/',
  image: getPhotograph(CAROUSEL[0]),
});

const TIMELAPSE_COVERS = [
  { path: '/images/covers/bank_of_russia.webp', name: 'Bank of Russia' },
  { path: '/images/covers/bolshaya_pokrovskaya_street.webp', name: 'Bolshaya Pokrovskaya Street' },
  { path: '/images/covers/kanavinsky_bridge.webp', name: 'Kanavinsky Bridge' },
  { path: '/images/covers/maxim_gorky_square.webp', name: 'Maxim Gorky Square' },
  { path: '/images/covers/switzerland_park.webp', name: 'Switzerland Park' },
  { path: '/images/covers/zelenskiy_syezd_street.webp', name: 'Zelenskiy Syezd Street' },
];

const TIMELAPSE_VIDEOS: Video[] = [
  {
    title: 'Bank of Russia',
    description: 'A dynamic time-lapse reveals the architectural grace and pulse of the city around the historic central bank.',
    vimeoId: '517762910',
    wrapperClass: 'bank-of-russia',
  },
  {
    title: 'Bolshaya Pokrovskaya Street',
    description: 'A time-lapse captures the vibrant rhythm of pedestrians and light dancing through Nizhny Novgorod’s historic promenade.',
    vimeoId: '517762737',
    wrapperClass: 'bolshaya-pokrovskaya-street',
  },
  {
    title: 'Kanavinsky Bridge',
    description: 'A sweeping time-lapse unveils the ceaseless flow of traffic and light across Nizhny Novgorod’s iconic river crossing.',
    vimeoId: '517762962',
    wrapperClass: 'kanavinsky-bridge',
  },
  {
    title: 'Maxim Gorky Square',
    description: 'A vibrant time-lapse reveals the constant motion and energy radiating from Nizhny Novgorod’s central square.',
    vimeoId: '517762848',
    wrapperClass: 'maxim-gorky-square',
  },
  {
    title: 'Switzerland Park',
    description: 'A tranquil time-lapse captures shifting light and passing moments in Nizhny Novgorod’s peaceful Switzerland Park.',
    vimeoId: '517763009',
    wrapperClass: 'switzerland-park',
  },
  {
    title: 'Zelenskiy Syezd Street',
    description: 'A flowing time-lapse traces the winding path and urban tempo of Zelenskiy Syezd in Nizhny Novgorod.',
    vimeoId: '517762791',
    wrapperClass: 'zelenskiy-syezd-street',
  },
];

export default function HomePage() {
  const carousel = getPhotographs(CAROUSEL);
  const featureGrid = getPhotographs(FEATURE_GRID);
  const covers = TIMELAPSE_COVERS.map((cover) => getImage(cover.path, cover.name));
  const portrait = getSelfPortrait();

  return (
    <>
      <Header variant="home" current="/" />

      <main>
        <Carousel photographs={carousel} />

        <FeatureGrid photographs={featureGrid} columns={[[0, 1], [13, 14], [25, 26]]} />

        <Parallax variant="about">
          <div className="image">
            <LazyImage image={portrait} sizes="(max-width: 1200px) 30vw, 340px" />
          </div>
          <div className="text">
            <h1>Meet Andrey</h1>

            <p>Andrey Pudov is a landscape and city photographer. He captures the soul of places, blending light, atmosphere, and emotion into his work.</p>
            <p>He combines natural scenery with urban life, creating images that reveal both serenity and energy. Through his lens, he makes fleeting moments last forever – from quiet landscapes to dynamic cityscapes filled with movement. His inspiration comes from the world around him: nature, people, and the rhythm of cities.</p>
            <p>Magic appears when we see the familiar in a new way. Andrey’s goal is to invite others to experience these worlds with him – to feel the stillness of mountains, the pulse of streets, and the beauty hidden within everyday life.</p>
          </div>
        </Parallax>

        <FeatureGrid photographs={featureGrid} columns={[[2, 12], [15, 24], [27, 37]]} />

        <Parallax variant="timelapse">
          Time-lapse photography
        </Parallax>

        <ImageGrid images={covers} tilePrefix="timelapse-grid" entryPrefix="lightbox-timelapse" />
      </main>

      <Footer />

      <Lightbox photographs={featureGrid} entryPrefix="lightbox" tilePrefix="feature-grid" />

      <VideoLightbox videos={TIMELAPSE_VIDEOS} entryPrefix="lightbox-timelapse" tilePrefix="timelapse-grid" />
    </>
  );
}
