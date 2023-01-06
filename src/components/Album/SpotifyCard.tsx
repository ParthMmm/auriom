import Image from 'next/image';
import Link from 'next/link';

import type { Artist } from '@utils/types/spotify';

type AlbumItem = {
  title: string;
  artist: string | Artist[];
  uri: string;
  images: {
    height: number;
    width: number;
    url: string;
  }[];
};

type Props = {
  album: AlbumItem;
};

function SpotifyCard({ title, artist, uri, images }: AlbumItem) {
  const imageURL = images.filter((image) => image.height === 300)[0]?.url;

  if (!imageURL) {
    return null;
  }

  if (typeof artist === 'object') {
    artist = artist.map((a) => a.name).join(', ');
  }

  return (
    <Link
      href={{
        pathname: `/album/[album]/[artist]`,
        query: {
          artist: artist,
          album: title,
          uri: uri,
        },
      }}
      // as={`/album/${encodeURIComponent(album.name)}/${artists}`}
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
                quality={100}
              />
            </picture>
          )}
        </div>
        <div className="grid-playlist-info-container mb-8  lg:mb-0">
          <div className="">
            <div className="">
              <span className="group-hover:shadow-highlight-blurple text-md font-bold transition-all md:text-2xl">
                {title}
              </span>
            </div>
            <div className="">
              <span className="text-sm md:text-lg">{artist}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default SpotifyCard;
