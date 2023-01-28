import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';

import SpotifyCard from '@components/Album/SpotifyCard';

import { trpc } from '@utils/trpc';
import type { AlbumItem } from '@utils/types/spotify/spotify';

function Albums({}) {
  const router = useRouter();
  const query = router.query.input as string;

  const { data, fetchNextPage, isLoading, error } =
    trpc.spotify.albumSearch.useInfiniteQuery(
      { query: query, type: 'album' },
      {
        enabled: !!query,
        getNextPageParam: (lastPage) => lastPage?.offset + lastPage?.limit,
      },
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
          <div className="grid grid-cols-2  gap-4 md:grid-cols-4 md:gap-12">
            {data?.pages.map((page) =>
              page?.items.map((album: AlbumItem) => (
                <SpotifyCard
                  key={album.uri}
                  title={album.name}
                  artist={album.artists}
                  uri={album.uri}
                  images={album.images}
                />
              )),
            )}
          </div>
        </InfiniteScroll>
      </div>
    );
  }

  return null;
}

export default Albums;
