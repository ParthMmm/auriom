import TrackCard from "@components/Track/Card";
import { trpc } from "@utils/trpc";
import { useRouter } from "next/router";
import type { TrackSearch } from "@utils/types";
function Tracks({}) {
  const router = useRouter();
  const query = router.query.input as string;

  const trackSearch = trpc.track.getTrackSearch.useQuery(
    { query },
    {
      enabled: !!query,
    }
  );
  return (
    <div className="grid-playlists-container">
      {trackSearch.data?.map((track: TrackSearch) => (
        <TrackCard key={`${track.name} + ${track.artist}`} track={track} />
      ))}
    </div>
  );
}

export default Tracks;
