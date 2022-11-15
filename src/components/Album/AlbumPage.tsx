import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { fetchAlbumInfo } from "../../utils/queries";
import AlbumInfo from "./AlbumInfo";
import Tracklist from "./Tracklist";
import Reviews from "./Reviews";
import Spinner from "../Spinner";

function AlbumPage({}) {
  const router = useRouter();

  const artist = router.query.artist as string;
  const album = router.query.album as string;
  const mbid = router.query.mbid as string;

  const { isLoading, data, error } = useQuery(
    ["fetchAlbumInfo", [artist, album, mbid]],
    () => fetchAlbumInfo(album, artist, mbid),
    {
      enabled: !!artist && !!album,
    }
  );

  //   console.log(data);

  if (isLoading) {
    return <Spinner loadingText={`fetching ${artist} - ${album}`} />;
  }
  if (error || !data) {
    return <>error</>;
  }

  return (
    <>
      <div className="h-full ">
        <div className=" mx-auto  flex w-3/4  flex-col ">
          <AlbumInfo album={data} />
          <div className="flex w-full flex-col justify-between md:flex-row ">
            <div className=" md:w-1/4">
              <Tracklist albumTracks={data.tracks} />
            </div>
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
