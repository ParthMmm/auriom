import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { fetchAlbumInfo } from "../../utils/queries";
import AlbumInfo from "./AlbumInfo";
import Tracklist from "./Tracklist";
import Reviews from "./Reviews";

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
    return <>Loading...</>;
  }
  if (error || !data) {
    return <>error</>;
  }

  return (
    <>
      <div className="h-screen   ">
        <div className="mx-auto flex flex-col items-center justify-center">
          <AlbumInfo album={data} />
          <Tracklist albumTracks={data.tracks} />
          <Reviews />
        </div>
      </div>
    </>
  );
}

export default AlbumPage;
