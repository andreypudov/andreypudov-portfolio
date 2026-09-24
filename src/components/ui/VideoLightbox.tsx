import LightboxEntry from './LightboxEntry';

export interface Video {
  title: string;
  description: string;
  /** Vimeo player video identifier. */
  vimeoId: string;
  /** Variant class of the video wrapper (see lightbox.css). */
  wrapperClass: string;
}

interface VideoLightboxProps {
  videos: Video[];
  /** Anchor prefix of the lightbox entries (e.g. "lightbox-timelapse"). */
  entryPrefix: string;
  /** Anchor prefix of the grid tiles the close button returns to. */
  tilePrefix: string;
}

/** CSS-only fullscreen gallery of embedded Vimeo players. */
export default function VideoLightbox({ videos, entryPrefix, tilePrefix }: VideoLightboxProps) {
  return (
    <div className="lightbox">
      {videos.map((video, index) => (
        <LightboxEntry
          index={index}
          length={videos.length}
          entryPrefix={entryPrefix}
          tilePrefix={tilePrefix}
          title={video.title}
          description={video.description}
          key={video.vimeoId}
        >
          <div className={`video-wrapper ${video.wrapperClass}`}>
            <iframe
              src={`https://player.vimeo.com/video/${video.vimeoId}?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0`}
              frameBorder="0"
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              loading="lazy"
              title={video.title}
            >
            </iframe>
          </div>
        </LightboxEntry>
      ))}
    </div>
  );
}
