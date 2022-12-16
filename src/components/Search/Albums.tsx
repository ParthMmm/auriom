import AlbumCard from "@components/Album/Card";
import { trpc } from "@utils/trpc";
import type { Album } from "@utils/types";
import { useRouter } from "next/router";

function Albums({}) {
  const router = useRouter();
  const query = router.query.input as string;

  const albumSearch = trpc.album.getAlbumSearch.useQuery(
    { query },
    {
      enabled: !!query,
    }
  );
  return (
    <div className="grid-playlists-container">
      {albumSearch.data?.map((album: Album) => (
        <AlbumCard key={`${album.name} + ${album.artist}`} album={album} />
      ))}
    </div>
  );
}

export default Albums;
