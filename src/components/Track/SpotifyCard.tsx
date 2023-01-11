import Image from 'next/image';
import Link from 'next/link';

import type { TrackItem } from '@utils/types/spotify';

type Props = {
  track: TrackItem;
};

function SpotifyCard({ track }: Props) {
  const imageURL = track?.album.images.filter(
    (image) => image.height === 640,
  )[0]?.url;

  if (!imageURL) {
    return null;
  }

  const artists = track.artists.map((artist) => artist.name).join(', ');

  return (
    // <Link
    //   href={{
    //     pathname: `/album/[album]/[artist]`,
    //     query: {
    //       artist: artists,
    //       track: track.name,
    //       uriLink: track.uri,
    //     },
    //   }}
    //   as={`/album/${encodeURIComponent(album.name)}/${artists}`}
    // >
    <div className="grid-playlist group cursor-pointer ">
      <div className="grid-playlist-hero">
        {imageURL && (
          <picture className="lazyPicture aspect-ratio ">
            <Image
              src={imageURL}
              alt={'album cover'}
              className="asset"
              fill
              // height={300}
              // width={456}
              quality={100}
              // unoptimized={true}
            />
          </picture>
        )}
      </div>
      <div className="grid-playlist-info-container mb-8  lg:mb-0">
        <div className="">
          <div className="">
            <span className="group-hover:shadow-highlight-blurple text-md font-bold transition-all md:text-2xl">
              {track.name}
            </span>
          </div>
          <div className="">
            <span className="text-sm md:text-lg">{artists}</span>
          </div>
        </div>
      </div>
    </div>
    // </Link>
  );
}

export default SpotifyCard;
