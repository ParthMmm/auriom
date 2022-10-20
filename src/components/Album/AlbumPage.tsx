import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { fetchAlbumInfo } from "../../utils/queries";

function AlbumPage({}: Props) {
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

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div>AlbumPage</div>;
}

export default AlbumPage;
