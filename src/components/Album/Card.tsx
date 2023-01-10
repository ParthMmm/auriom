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
          <span className="text-sm font-normal pr-2 transition-all text-gray-500 md:text-md hover:text-harlequin-500">
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
          <span className="text-sm font-normal transition-all  md:text-md hover:text-harlequin-500">
            {album?.artists?.name}
          </span>
        </Link>
      );
    }
  };

  return (
    <div className="flex hover:border-gray-500 transition-all  first:border-l-2 border-t-2 border-b-2 border-r-2 border-gray-700">
      <div className=" ">
        <div className=" flex flex-col align-center w-full ">
          <div className=" cursor-pointer flex flex-col gap-4 p-6  ">
            <Link
              href={{
                pathname: `/album/[id]`,
                query: {
                  id: album?.spotifyId,
                },
              }}
              // as={`/album/${encodeURIComponent(album.name)}/${artists}`}
            >
              <div className=" w-36 h-36">
                {imageURL && (
                  <Image
                    src={imageURL}
                    alt={'album cover'}
                    height={150}
                    width={150}
                    quality={100}
                    className="inline-block "
                  />
                )}
              </div>
            </Link>
            <div className="flex flex-col justify-center items-center text-center">
              <Link
                href={{
                  pathname: `/album/[id]`,
                  query: {
                    id: album?.spotifyId,
                  },
                }}
                // as={`/album/${encodeURIComponent(album.name)}/${artists}`}
              >
                <span className="hover:text-harlequin-500 font-normal transition-all text-sm overflow-hidden line-clamp-2 ">
                  {album?.title}
                </span>
              </Link>

              <div className="">{artists()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
