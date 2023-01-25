import Image from 'next/image';
import Link from 'next/link';

import type { AlbumInfo } from '@utils/types';
import type { AlbumItem } from '@utils/types/spotify';

type Props = {
  album: AlbumItem;
};

function AlbumCard({ album }: Props) {
  const imageURL = album?.images?.filter((image) => image.height === 300)[0]
    ?.url;

  const artists = () =>
    album?.artists?.map((artist) => (
      //   <Link
      //     href={{
      //       pathname: `/artist/[id]`,
      //       query: {
      //         artist: artist.name,
      //         id: artist.id,
      //       },
      //     }}
      //     key={artist?.id}
      //   >
      <>
        <span className="md:text-md pr-2 text-sm font-normal text-gray-500 transition-all hover:text-harlequin-500  ">
          {artist?.name}
        </span>
      </>
      //   </Link>
    ));

  //   const title: string = album?.title.toString();

  if (!imageURL) return null;

  return (
    <div className="flex border-[1px] border-gray-700  transition-all hover:border-gray-500">
      <div className=" ">
        <div className=" align-center flex w-full flex-col ">
          <div className=" flex cursor-pointer flex-col items-center gap-4 p-6  ">
            <Link
              href={{
                pathname: `/album/[id]`,
                query: {
                  id: album?.id,
                },
              }}

              // as={`/album/${encodeURIComponent(album.name)}/${artists}`}
            >
              <div className=" h-36 w-36">
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
            <div className="flex flex-col  items-center justify-center text-center ">
              <Link
                href={{
                  pathname: `/album/[id]`,
                  query: {
                    id: album?.id,
                  },
                }}
                // as={`/album/${encodeURIComponent(album.name)}/${artists}`}
              >
                <span className="overflow-hidden text-sm font-normal transition-all hover:text-harlequin-500 sm:line-clamp-1 md:line-clamp-3  ">
                  {album.name.length > 30
                    ? album.name.substring(0, 30) + '...'
                    : album.name}
                  {/* {album?.name} */}
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

export default AlbumCard;
