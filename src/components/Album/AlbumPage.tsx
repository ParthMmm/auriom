import { useRouter } from "next/router";
import Spinner from "../Spinner";
import { trpc } from "../../utils/trpc";
import dynamic from "next/dynamic";

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
  const mbid = router.query.mbid as string;

  const albumInfo = trpc.album.getAlbumInfo.useQuery(
    { artist, album, mbid },
    {
      enabled: !!artist && !!album,
    }
  );

  const { isLoading, data, error } = albumInfo;

  if (isLoading) {
    return <Spinner loadingText={`fetching ${artist} - ${album}`} />;
  }
  if (error || !data) {
    return (
      <div className="flex min-h-screen items-center justify-center">error</div>
    );
  }

  return (
    <>
      <div className="h-full ">
        <div className=" mx-auto  flex w-3/4  flex-col ">
          <AlbumInfo album={data} />
          <div className="flex w-full flex-col justify-between md:flex-row ">
            {data?.tracks?.track && (
              <div className=" md:w-1/4">
                <Tracklist albumTracks={data?.tracks} />
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

export default AlbumPage;
