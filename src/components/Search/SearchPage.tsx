import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { fetchAlbumSearch } from "../../utils/queries";
import { Album } from "../../utils/types";
import AlbumCard from "../Album/AlbumCard";
import Spinner from "../Spinner";

function SearchPage({}) {
  const router = useRouter();
  const input = router.query.input as string;

  const { isLoading, data, error } = useQuery(
    ["search", input],
    () => fetchAlbumSearch(input),
    {
      enabled: !!input,
    }
  );

  console.log(data);

  if (error) {
    return null;
  }

  if (isLoading) {
    return <Spinner loadingText={`fetching results for ${input}`} />;
  }

  return (
    <div className="grid-view">
      <div className="grid-season">
        <div className="text-left">
          <h1 className="text-3xl font-bold md:text-6xl">{input}</h1>
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
