import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

import { trpc } from '../../utils/trpc';
import Spinner from '../Spinner';
import ActionButtons from './ActionButtons';

const AlbumInfo = dynamic(() => import('./AlbumInfo'), {
  suspense: true,
});

const Reviews = dynamic(() => import('../Reviews'), {
  suspense: true,
});

const Tracklist = dynamic(() => import('./Tracklist'), {
  suspense: true,
});

function AlbumPage({}) {
  const router = useRouter();

  const artist = router.query.artist as string;
  const album = router.query.album as string;
  const uri = router.query.uri as string;

  const albumTracks = trpc.spotify.getAlbumTracklist.useQuery(
    { uri },
    {
      enabled: !!uri,
    },
  );

  const albumInfo = trpc.spotify.getAlbum.useQuery(
    { uri },
    {
      enabled: !!uri,
    },
  );

  if (albumTracks.isLoading || albumInfo.isLoading) {
    return <Spinner loadingText={`fetching ${artist} - ${album}`} />;
  }
  if (albumInfo.error || !albumInfo.data) {
    return (
      <div className="flex min-h-screen items-center justify-center">error</div>
    );
  }

  if (albumInfo.data) {
    return (
      <>
        <div className="h-full pb-24">
          <ActionButtons album={albumInfo?.data} />
          <div className=" mx-auto  flex w-3/4  flex-col ">
            <AlbumInfo album={albumInfo?.data} />
            <div className=" flex w-full flex-col gap-8 md:flex-row  ">
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
      </>
    );
  }
}

export default AlbumPage;
