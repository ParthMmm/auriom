import Image from 'next/image';
import Link from 'next/link';

import type { ArtistItem } from '@utils/types/spotify';

type Props = {
  artist: ArtistItem;
};

function ArtistCard({ artist }: Props) {
  const imageURL = artist.images?.filter((image) => image.height === 300)[0]
    ?.url;

  return (
    <Link
      href={{
        pathname: `/artist/[artist]`,
        query: {
          artist: artist.name,
          // album: album.name,
        },
      }}
      as={`/album/${encodeURIComponent(artist.name)}/${artist}`}
    >
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
                {artist.name}
              </span>
            </div>
            <div className="">
              <span className="text-sm md:text-lg">{artist.name}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ArtistCard;
