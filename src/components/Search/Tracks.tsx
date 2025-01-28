import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';

import SpotifyCard from '@components/Track/SpotifyCard';

import { api } from '@utils/trpc';
import type { TrackItem } from '@utils/types/spotify';

function Tracks({}) {
  const router = useRouter();
  const query = router.query.input as string;

  const { data, fetchNextPage, isLoading, error } =
    api.spotify.trackSearch.useInfiniteQuery(
      { query: query, type: 'track' },
      {
        enabled: !!query,
        getNextPageParam: (lastPage) => lastPage?.offset + lastPage?.limit,
      }
    );
  if (isLoading) {
    return <div>loading</div>;
  }

  if (error) {
    return <div>error</div>;
  }

  if (data?.pages) {
    return (
      <div>
        <InfiniteScroll
          next={() => fetchNextPage()}
          hasMore={true}
          loader={<div>loading</div>}
          dataLength={data?.pages?.length * 20 || 0}
        >
          <div className="grid-playlists-container">
            {data?.pages.map((page) =>
              page?.items.map((track: TrackItem) => (
                <SpotifyCard key={track.uri} track={track} />
              ))
            )}
          </div>
        </InfiniteScroll>
      </div>
    );
  }

  return null;
}

export default Tracks;
