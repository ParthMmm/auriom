import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import type { Album } from "../../utils/types";
import AlbumCard from "../Album/AlbumCard";
import Spinner from "../Spinner";

function SearchPage({}) {
  const router = useRouter();
  const query = router.query.input as string;

  const albumSearch = trpc.album.getAlbumSearch.useQuery(
    { query },
    {
      enabled: !!query,
    }
  );

  const { isLoading, data, error } = albumSearch;

  if (error) {
    return null;
  }

  if (isLoading) {
    return <Spinner loadingText={`fetching results for ${query}`} />;
  }

  return (
    <div className="grid-view">
      <div className="grid-season">
        <div className="text-left">
          <h1 className="text-3xl font-bold md:text-6xl">{query}</h1>
          <span> results</span>
        </div>

        <div className="grid-playlists-container">
          {data?.results.albummatches.album.map((album: Album) => (
            <AlbumCard key={`${album.name} + ${album.artist}`} album={album} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
