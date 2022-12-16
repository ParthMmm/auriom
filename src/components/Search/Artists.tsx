import ArtistCard from "@components/Artist/Card";
import { trpc } from "@utils/trpc";
import type { Artist } from "@utils/types";
import { useRouter } from "next/router";

function Artists({}) {
  const router = useRouter();
  const query = router.query.input as string;

  const artistSearch = trpc.artist.getArtistSearch.useQuery(
    { query },
    {
      enabled: !!query,
    }
  );
  return (
    <div className="grid-playlists-container">
      {artistSearch.data?.map((artist: Artist) => (
        <ArtistCard key={`${artist.name}`} artist={artist} />
      ))}
    </div>
  );
}

export default Artists;
