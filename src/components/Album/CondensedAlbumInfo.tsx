import dayjs from 'dayjs';
import Image from 'next/image';

import Spinner from '@components/Spinner';

import { trpc } from '@utils/trpc';

type Props = {
  spotifyId: string;
};

function CondensedAlbumInfo({ spotifyId }: Props) {
  const albumInfo = trpc.spotify.getAlbum.useQuery(
    { spotifyId },
    {
      enabled: !!spotifyId,
    },
  );

  const album = albumInfo?.data;

  const imageURL = albumInfo?.data?.images.filter(
    (image) => image.height === 300,
  )[0]?.url;

  const artists = album?.artists.map((artist) => artist.name).join(', ');

  if (albumInfo.isLoading) return <Spinner />;

  if (albumInfo.isError) return <div>error</div>;

  if (album) {
    return (
      <div className="flex w-[300px] flex-col items-start justify-start">
        <div className="">
          {imageURL && (
            <Image
              src={imageURL}
              alt={album?.name}
              height={300}
              width={300}
              className=""
              quality={100}
            />
          )}
        </div>
      </div>
    );
  }

  return null;
}

export default CondensedAlbumInfo;
