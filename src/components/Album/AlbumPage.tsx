import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { api } from '../../utils/trpc';
import Spinner from '../Spinner';

const AlbumInfo = dynamic(() => import('./AlbumInfo'), {
  ssr: false,
});

const Reviews = dynamic(() => import('../Reviews'), {
  ssr: false,
});

const Tracklist = dynamic(() => import('./Tracklist'), {
  ssr: false,
});

function AlbumPage({}) {
  const router = useRouter();

  const artist = router.query.artist as string;
  const album = router.query.album as string;
  const spotifyId = router.query.id as string;

  const albumTracks = api.spotify.getAlbumTracklist.useQuery(
    { spotifyId },
    {
      enabled: !!spotifyId,
    }
  );

  const albumInfo = api.spotify.getAlbum.useQuery(
    { spotifyId },
    {
      enabled: !!spotifyId,
    }
  );

  if (albumTracks.isLoading || albumInfo.isLoading) {
    return <Spinner />;
  }
  if (albumInfo.error || !albumInfo.data) {
    return (
      <div className="flex min-h-screen items-center justify-center">error</div>
    );
  }

  if (albumInfo.data) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-full pb-24">
          {/* <ActionButtons album={albumInfo?.data} /> */}
          <div className=" mx-auto flex flex-col ">
            <AlbumInfo album={albumInfo?.data} />
            <div className=" flex w-full flex-col gap-8 md:flex-row ">
              {albumTracks?.data?.items && (
                <div className="flex md:basis-5/12">
                  <Tracklist albumTracks={albumTracks?.data?.items} />
                </div>
              )}
              <div className="flex md:basis-7/12">
                <Reviews album={albumInfo?.data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AlbumPage;
