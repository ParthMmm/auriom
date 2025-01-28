import type { AlbumItem } from '@utils/types/spotify';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  album: AlbumItem;
};

function AlbumCard({ album }: Props) {
  const imageURL = album?.images?.filter((image) => image.height === 300)[0]
    ?.url;

  const artists = () =>
    album?.artists?.map((artist, index) => (
      <>
        <span
          key={artist?.id}
          className="truncate font-normal text-gray-500 text-sm transition-all hover:text-harlequin-500"
        >
          {artist?.name}
          {index < album.artists.length - 1 ? ', ' : ''}
        </span>
      </>
    ));

  //   const title: string = album?.title.toString();

  if (!imageURL) return null;

  return (
    <div className="flex h-[280px] w-[200px] overflow-clip border-[1px] border-gray-700 transition-all hover:border-gray-500">
      <div className="w-full">
        <div className="flex w-full flex-col">
          <div className="flex h-full cursor-pointer flex-col items-center gap-4 p-6">
            <Link
              href={{
                pathname: `/album/[id]`,
                query: {
                  id: album?.id,
                },
              }}
            >
              <div className="h-36 w-36">
                {imageURL && (
                  <Image
                    src={imageURL}
                    alt={'album cover'}
                    height={150}
                    width={150}
                    quality={100}
                    className="inline-block"
                  />
                )}
              </div>
            </Link>
            <div className="flex w-full flex-col items-start justify-center gap-0.5 text-left">
              <Link
                href={{
                  pathname: `/album/[id]`,
                  query: {
                    id: album?.id,
                  },
                }}
              >
                <span className="line-clamp-2 w-full max-w-[168px] font-normal text-sm transition-all hover:text-harlequin-500">
                  {album.name}
                </span>
              </Link>

              <div className="w-full max-w-[168px] truncate text-gray-500">
                {artists()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumCard;
