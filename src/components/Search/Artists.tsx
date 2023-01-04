import SpotifyCard from "@components/Artist/SpotifyCard";
import { trpc } from "@utils/trpc";
import type { ArtistItem } from "@utils/types/spotify";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";

function Artists({}) {
  const router = useRouter();
  const query = router.query.input as string;

  const { data, fetchNextPage, isLoading, error } =
    trpc.spotify.artistSearch.useInfiniteQuery(
      { query: query, type: "artist" },
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

  return (
    <div className="grid-playlists-container">
      <InfiniteScroll
        next={() => fetchNextPage()}
        hasMore={true}
        loader={<div>yo</div>}
        dataLength={data?.pages?.length * 20 || 0}
      >
        <div className="grid-playlists-container">
          {data?.pages.map((page) =>
            page?.items.map((artist: ArtistItem) => (
              <SpotifyCard key={artist.uri} artist={artist} />
            ))
          )}
        </div>
      </InfiniteScroll>
    </div>
  );

  return null;
}

export default Artists;
