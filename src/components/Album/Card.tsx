import Image from 'next/image';
import Link from 'next/link';

import type { AlbumInfo } from '@utils/types';

type Props = {
  album: AlbumInfo;
};

function Card({ album }: Props) {
  const imageURL = album?.images?.filter((image) => image.height === 300)[0]
    ?.url;

  const artists = () => {
    if (album?.artists instanceof Array) {
      return album?.artists?.map((artist) => (
        <Link
          href={{
            pathname: `/artist/[id]`,
            query: {
              artist: artist.name,
              id: artist.spotifyId,
            },
          }}
          key={artist?.id}
        >
          <span className="text-sm font-normal pr-2 transition-all md:text-2xl">
            {artist?.name}
          </span>
        </Link>
      ));
    } else {
      return (
        <Link
          href={{
            pathname: `/artist/[id]`,
            query: {
              artist: album?.artists?.name,
              id: album?.artists?.spotifyId,
            },
          }}
          key={album?.artists?.spotifyId}
        >
          <span className="text-sm font-normal transition-all  md:text-2xl">
            {album?.artists?.name}
          </span>
        </Link>
      );
    }
  };

  return (
    <Link
      href={{
        pathname: `/album/[id]`,
        query: {
          id: album?.spotifyId,
        },
      }}
      // as={`/album/${encodeURIComponent(album.name)}/${artists}`}
    >
      <div className="grid-playlist group cursor-pointer ">
        <div className="grid-playlist-hero">
          {imageURL && (
            <Image
              src={imageURL}
              alt={'album cover'}
              className="asset"
              height={300}
              width={300}
              quality={100}
            />
          )}
        </div>
        <div className="grid-playlist-info-container mb-8  lg:mb-0">
          <div className="">
            <div className="">
              <span className="group-hover:shadow-highlight-blurple text-md font-bold transition-all md:text-2xl">
                {album?.title}
              </span>
            </div>
            <div className="">{artists()}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Card;
