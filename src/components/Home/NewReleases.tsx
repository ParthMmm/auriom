import Marquee from 'react-fast-marquee';

import SmallSpinner from '@components/SmallSpinner';

import { trpc } from '@utils/trpc';

import AlbumCard from './AlbumCard';

function NewReleases({}) {
  // even:mt-[calc(100vw-100px)]
  const { data, isLoading, error } = trpc.spotify.getNewReleases.useQuery();

  if (isLoading) {
    return <SmallSpinner />;
  }

  if (error) {
    return null;
  }

  return (
    <div className="flex flex-col justify-start w-screen bg-black">
      <h2 className="text-center font-black text-2xl py-4">hot new releases</h2>
      <Marquee
        pauseOnHover
        gradientColor={[0, 0, 0]}
        speed={40}
        gradientWidth={100}
      >
        <div className="flex flex-row  overflow-y-scroll pb-4">
          {data?.items.map((album) => (
            <AlbumCard key={album.uri} album={album} />
          ))}
        </div>
      </Marquee>
    </div>
  );
}

export default NewReleases;
