import SmallSpinner from '@components/SmallSpinner';
import { api } from '@utils/trpc';
import type { AlbumItem } from '@utils/types/spotify';
import AlbumCard from './AlbumCard';
import { InfiniteSlider } from './marquee';

function NewReleases() {
  const { data, isPending, error } = api.spotify.getNewReleases.useQuery(
    undefined,
    {
      staleTime: 1000 * 60 * 60 * 24,
    }
  );

  if (isPending) {
    return <SmallSpinner />;
  }

  if (error) {
    console.error('Error in NewReleases:', error);
    return null;
  }

  if (!data || !data.items || data.items.length === 0) {
    return null;
  }

  const filteredAlbums = data.items.filter((album): album is AlbumItem => {
    return album.images.length > 0 && album.artists.length > 0;
  });

  if (filteredAlbums.length === 0) {
    return null;
  }

  return (
    <div className="flex w-screen flex-col justify-start bg-black">
      <h2 className="py-4 text-center font-black text-2xl">hot new releases</h2>
      <InfiniteSlider durationOnHover={1500} duration={700} gap={24}>
        {filteredAlbums.map((album) => (
          <AlbumCard key={album.uri} album={album} />
        ))}
      </InfiniteSlider>
    </div>
  );
}

export default NewReleases;
