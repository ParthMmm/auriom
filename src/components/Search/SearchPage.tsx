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
      <div className="">
        <div className="mt-8 mb-12 w-full text-center md:mt-16 md:text-left">
          <h1 className="text-2xl font-bold md:text-4xl">{query}</h1>
          <span className=""> results</span>
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