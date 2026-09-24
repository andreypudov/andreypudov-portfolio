import LazyImage from '@/components/ui/LazyImage';
import { getImage } from '@/lib/photographs';

interface FooterProps {
  /** Set when the footer holds the first image of the page (see LazyImage). */
  priority?: boolean;
}

const SOCIAL_IMAGES = [
  {
    href: 'https://www.instagram.com/andrey.pudov/p/CjGAQ0gMxUk/',
    path: '/photographs/2017-12-18_2018-01-05/2017-12-18_2018-01-05_001_large.webp',
    caption: 'A masterful spiral of stone and light in Vatican City, where Renaissance design meets perfect symmetry.',
  },
  {
    href: 'https://www.instagram.com/andrey.pudov/p/Cjw6stCs_s9/',
    path: '/photographs/2019-10-26/2019-10-26_004.webp',
    caption: 'A quiet detail of nature: delicate spruce needles glisten in soft light, capturing the forest’s serene essence.',
  },
  {
    href: 'https://www.instagram.com/andrey.pudov/p/C1bKfriog_6/',
    path: '/photographs/2022-08-15/2022-08-15_006.webp',
    caption: 'A lone hiker ascends Puigmal’s rugged slopes, dwarfed by a vast sea of clouds that blankets the landscape below.',
  },
  {
    href: 'https://www.instagram.com/andrey.pudov/p/C2MjPU6IGCp/',
    path: '/photographs/2022-08-27_09-10/2022-08-27_09-10_030.webp',
    caption: 'Urban life meets nature as a kayaker glides through the waterways at the heart of Stockholm.',
  },
  {
    href: 'https://www.instagram.com/andrey.pudov/p/C8JiwcEoZZ1/',
    path: '/photographs/2022-08-27_09-10/2022-08-27_09-10_055.webp',
    caption: 'A minimalist study of form and texture, capturing the sharp angles and sweeping lines of Oslo’s iconic opera house roof.',
  },
  {
    href: 'https://www.instagram.com/andrey.pudov/p/C9jntSqoCZO/',
    path: '/photographs/2023-11-18/2023-11-18_020.webp',
    caption: 'A powerful cascade plunges through steep canyon walls, showcasing the untamed beauty of the Pyrenees.',
  },
];

const INSTAGRAM_PATH =
  'M8.6672 12C8.6672 10.1591 10.1591 8.6664 12 8.6664C13.8409 8.6664 15.3336 10.1591 15.3336 12C15.3336 13.8409 13.8409 15.3336 12 15.3336C10.1591 15.3336 8.6672 13.8409 8.6672 12ZM6.86512 12C6.86512 14.836 9.164 17.1349 12 17.1349C14.836 17.1349 17.1349 14.836 17.1349 12C17.1349 9.164 14.836 6.86512 12 6.86512C9.164 6.86512 6.86512 9.164 6.86512 12ZM16.1382 6.66152C16.1381 6.89886 16.2084 7.13089 16.3401 7.32829C16.4719 7.52568 16.6593 7.67956 16.8785 7.77047C17.0977 7.86138 17.339 7.88525 17.5718 7.83904C17.8046 7.79283 18.0185 7.67862 18.1863 7.51087C18.3542 7.34311 18.4686 7.12934 18.515 6.89658C18.5614 6.66382 18.5377 6.42253 18.447 6.20322C18.3563 5.98392 18.2025 5.79644 18.0052 5.6645C17.808 5.53257 17.576 5.4621 17.3386 5.462H17.3382C17.02 5.46215 16.715 5.58856 16.49 5.81347C16.265 6.03837 16.1384 6.34339 16.1382 6.66152ZM7.96 20.1398C6.98504 20.0954 6.45512 19.933 6.10296 19.7958C5.63608 19.614 5.30296 19.3975 4.95272 19.0478C4.60248 18.698 4.38568 18.3652 4.20472 17.8983C4.06744 17.5463 3.90504 17.0162 3.86072 16.0413C3.81224 14.9872 3.80256 14.6706 3.80256 12.0001C3.80256 9.3296 3.81304 9.01384 3.86072 7.95888C3.90512 6.98392 4.06872 6.45488 4.20472 6.10184C4.38648 5.63496 4.60296 5.30184 4.95272 4.9516C5.30248 4.60136 5.63528 4.38456 6.10296 4.2036C6.45496 4.06632 6.98504 3.90392 7.96 3.8596C9.01408 3.81112 9.33072 3.80144 12 3.80144C14.6693 3.80144 14.9862 3.81192 16.0412 3.8596C17.0162 3.904 17.5452 4.0676 17.8982 4.2036C18.3651 4.38456 18.6982 4.60184 19.0485 4.9516C19.3987 5.30136 19.6147 5.63496 19.7965 6.10184C19.9338 6.45384 20.0962 6.98392 20.1405 7.95888C20.189 9.01384 20.1986 9.3296 20.1986 12.0001C20.1986 14.6706 20.189 14.9863 20.1405 16.0413C20.0961 17.0162 19.9329 17.5462 19.7965 17.8983C19.6147 18.3652 19.3982 18.6983 19.0485 19.0478C18.6987 19.3972 18.3651 19.614 17.8982 19.7958C17.5462 19.933 17.0162 20.0954 16.0412 20.1398C14.9871 20.1882 14.6705 20.1979 12 20.1979C9.32952 20.1979 9.01376 20.1882 7.96 20.1398ZM7.8772 2.06056C6.81264 2.10904 6.0852 2.27784 5.44992 2.52504C4.792 2.78032 4.23504 3.1228 3.67848 3.67848C3.12192 4.23416 2.78032 4.792 2.52504 5.44992C2.27784 6.0856 2.10904 6.81264 2.06056 7.8772C2.01128 8.94344 2 9.28432 2 12C2 14.7157 2.01128 15.0566 2.06056 16.1228C2.10904 17.1874 2.27784 17.9144 2.52504 18.5501C2.78032 19.2076 3.122 19.7661 3.67848 20.3215C4.23496 20.877 4.792 21.219 5.44992 21.475C6.0864 21.7222 6.81264 21.891 7.8772 21.9394C8.944 21.9879 9.28432 22 12 22C14.7157 22 15.0566 21.9887 16.1228 21.9394C17.1874 21.891 17.9144 21.7222 18.5501 21.475C19.2076 21.219 19.765 20.8772 20.3215 20.3215C20.8781 19.7658 21.219 19.2076 21.475 18.5501C21.7222 17.9144 21.8918 17.1874 21.9394 16.1228C21.9879 15.0558 21.9992 14.7157 21.9992 12C21.9992 9.28432 21.9879 8.94344 21.9394 7.8772C21.891 6.81256 21.7222 6.0852 21.475 5.44992C21.219 4.7924 20.8772 4.23504 20.3215 3.67848C19.7658 3.12192 19.2076 2.78032 18.5509 2.52504C17.9144 2.27784 17.1874 2.10824 16.1236 2.06056C15.0574 2.01208 14.7165 2 12.0008 2C9.28512 2 8.944 2.01128 7.8772 2.06056Z';

const VK_PATH =
  'M14.729 3H9.27097C4.19032 3 3 4.19032 3 9.27097V14.7871C3 19.8097 4.19032 21 9.27097 21H14.7871C19.8097 21 21 19.8097 21 14.729V9.27097C21 4.19032 19.8097 3 14.729 3ZM17.5161 15.8323H16.2097C15.7161 15.8323 15.5419 15.4258 14.6419 14.5258C13.8581 13.7419 13.5097 13.6548 13.3355 13.6548C13.1032 13.6548 13.0161 13.6839 13.0161 14.0613V15.2516C13.0161 15.571 12.929 15.7452 12.0871 15.7452C10.6935 15.7452 9.18387 14.8742 8.08065 13.3355C6.45484 11.0419 6.04839 9.32903 6.04839 8.95161C6.04839 8.74839 6.07742 8.57419 6.45484 8.57419H7.76129C8.08064 8.57419 8.22581 8.69032 8.34194 9.06774C9.00968 10.9548 10.0548 12.5806 10.5194 12.5806C10.6935 12.5806 10.7516 12.4935 10.7516 12.0871V10.171C10.7226 9.27097 10.2581 9.24194 10.2581 8.86452C10.2581 8.74839 10.3742 8.54516 10.5774 8.54516H12.6097C12.9 8.54516 12.9871 8.66129 12.9871 9.03871V11.6226C12.9871 11.9129 13.1032 12 13.1903 12C13.3645 12 13.5097 11.9129 13.8 11.5935C14.729 10.5194 15.3968 8.92258 15.3968 8.92258C15.4839 8.71935 15.629 8.54516 15.9774 8.54516H17.2839C17.6903 8.54516 17.7774 8.74839 17.6903 9.03871C17.5161 9.82258 15.9194 12.0581 15.9194 12.0581C15.8032 12.2613 15.7161 12.3774 15.9194 12.6387C16.0355 12.8419 16.529 13.2194 16.8194 13.5677C17.4 14.2355 17.8065 14.7581 17.9226 15.1355C18.0677 15.629 17.8935 15.8323 17.5161 15.8323Z';

const LINKEDIN_PATH =
  'M19.7065 3H4.34844C3.62264 3 3.04199 3.58065 3.04199 4.30645V19.6935C3.04199 20.3903 3.62264 21 4.34844 21H19.6485C20.3743 21 20.9549 20.4194 20.9549 19.6935V4.27742C21.013 3.58065 20.4323 3 19.7065 3ZM8.35491 18.3H5.71297V9.73548H8.35491V18.3ZM7.01942 8.54516C6.14846 8.54516 5.4807 7.84839 5.4807 7.00645C5.4807 6.16452 6.17749 5.46774 7.01942 5.46774C7.86136 5.46774 8.55813 6.16452 8.55813 7.00645C8.55813 7.84839 7.91942 8.54516 7.01942 8.54516ZM18.371 18.3H15.7291V14.1484C15.7291 13.1613 15.7001 11.8548 14.3356 11.8548C12.942 11.8548 12.7388 12.9581 12.7388 14.0613V18.3H10.0968V9.73548H12.6807V10.9258H12.7097C13.0872 10.229 13.9291 9.53226 15.2356 9.53226C17.9356 9.53226 18.4291 11.2742 18.4291 13.6548V18.3H18.371Z';

/**
 * Rendered width of the square, cover-cropped tiles (see footer.css), with
 * room for landscape images whose height fills the square.
 */
const SIZES = '(max-width: 576px) 38vw, (max-width: 992px) 180px, 290px';

export default function Footer({ priority = false }: FooterProps) {
  return (
    <footer>
      <div className="social container">
        <div className="title">
          <a href="https://www.instagram.com/andrey.pudov/" target="_blank">Where every frame tells a story</a>
        </div>
        <div className="images">
          {SOCIAL_IMAGES.map((social, index) => (
            <a href={social.href} target="_blank" aria-label={social.caption} key={social.href}>
              <LazyImage image={getImage(social.path, social.caption)} priority={priority && index === 0} sizes={SIZES} />
            </a>
          ))}
        </div>
      </div>

      <div className="links">
        <a href="https://www.instagram.com/andrey.pudov/" target="_blank" aria-label="Andrey Pudov's Instagram">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={INSTAGRAM_PATH} />
            <path d={INSTAGRAM_PATH} />
          </svg>
        </a>

        <a href="https://vk.com/andreypudov" target="_blank" aria-label="Andrey Pudov's VK profile">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={VK_PATH} />
          </svg>
        </a>

        <a href="https://www.linkedin.com/in/pudov/" target="_blank" aria-label="Andrey Pudov's LinkedIn profile">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d={LINKEDIN_PATH} />
          </svg>
        </a>
      </div>

      <div className="copyright">
        Copyright © {new Date().getFullYear()} Andrey Pudov
      </div>
    </footer>
  );
}
