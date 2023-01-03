import { useRouter } from "next/router";
import Spinner from "../Spinner";
import { trpc } from "../../utils/trpc";
import dynamic from "next/dynamic";
import ActionButtons from "./ActionButtons";

const AlbumInfo = dynamic(() => import("./AlbumInfo"), {
  suspense: true,
});

const Reviews = dynamic(() => import("./Reviews"), {
  suspense: true,
});

const Tracklist = dynamic(() => import("./Tracklist"), {
  suspense: true,
});

function AlbumPage({}) {
  const router = useRouter();

  const artist = router.query.artist as string;
  const album = router.query.album as string;
  const uri = router.query.uri as string;

  // const albumInfo = trpc.album.getAlbumInfo.useQuery(
  //   { artist, album, mbid },
  //   {
  //     enabled: !!artist && !!album,
  //   }
  // );

  const albumTracks = trpc.spotify.albumTracks.useQuery(
    { uri },
    {
      enabled: !!uri,
    }
  );

  const albumInfo = trpc.spotify.getAlbum.useQuery(
    { uri },
    {
      enabled: !!uri,
    }
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
        <div className="h-full ">
          <ActionButtons album={albumInfo?.data} />
          <div className=" mx-auto  flex w-3/4  flex-col ">
            <AlbumInfo album={albumInfo?.data} />
            <div className="flex w-full flex-col justify-between md:flex-row ">
              {albumTracks?.data?.items && (
                <div className=" md:w-1/4">
                  <Tracklist albumTracks={albumTracks?.data?.items} />
                </div>
              )}
              <div className="md:w-2/4">
                <Reviews />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default AlbumPage;
