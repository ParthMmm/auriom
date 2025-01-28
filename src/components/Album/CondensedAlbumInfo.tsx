import Image from 'next/image';

import Spinner from '@components/Spinner';

import { api } from '@utils/trpc';

type Props = {
  spotifyId: string;
};

function CondensedAlbumInfo({ spotifyId }: Props) {
  const albumInfo = api.spotify.getAlbum.useQuery(
    { spotifyId },
    {
      enabled: !!spotifyId,
    }
  );

  const album = albumInfo?.data;

  const imageURL = albumInfo?.data?.images.filter(
    (image) => image.height === 300
  )[0]?.url;

  const artists = album?.artists.map((artist) => artist.name).join(', ');

  if (albumInfo.isLoading) return <Spinner />;

  if (albumInfo.isError) return <div>error</div>;

  if (album) {
    return (
      <div className="flex flex-col md:w-[300px] md:items-start md:justify-start">
        <div className="h-48 w-48 md:h-72 md:w-72">
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
