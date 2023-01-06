// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/router';

import SpotifyCard from '@components/Album/SpotifyCard';

import { trpc } from '@utils/trpc';

function ProfilePage({}) {
  const router = useRouter();

  if (!router.query.username) {
    return <div>no username</div>;
  }

  const username = router?.query?.username[0] as string;

  const data = trpc.albumAction.getAllUserActions.useQuery(
    {
      username,
    },
    {
      enabled: !!username,
    },
  );

  const reviews = trpc.review.getReviewsForUser.useQuery(
    {
      username,
    },
    {
      enabled: !!username,
    },
  );

  const listening = data.data?.listening;
  const listened = data.data?.listened;
  const wantToListen = data.data?.wantToListen;

  return (
    <div>
      <div className="mt-24 flex flex-row justify-center">
        hi, {router.query.username}
      </div>
      <div className="mt-24 flex flex-col gap-11 ">
        <div className="px-4">
          <h2 className=" text-2xl font-black">currently listening</h2>
          <div className=" flex flex-row gap-8  border-2 border-gray-700 p-4">
            {listening?.map((album) => (
              <SpotifyCard
                title={album?.Album?.title}
                uri={album?.Album?.uri}
                artist={album?.Album?.artist}
                images={album?.Album?.images}
                key={album.id}
              />
            ))}
          </div>
        </div>
        <div className="px-4">
          <h2 className=" text-2xl font-black"> listened</h2>
          <div className="flex flex-row gap-8 border-2 border-gray-700 p-4">
            {listened?.map((album) => (
              <SpotifyCard
                title={album?.Album?.title}
                uri={album?.Album?.uri}
                artist={album?.Album?.artist}
                images={album?.Album?.images}
                key={album.id}
              />
            ))}
          </div>
        </div>
        <div className="px-4">
          <h2 className=" text-2xl font-black">want to listen</h2>
          <div className="flex flex-row gap-8 border-2 border-gray-700 p-4">
            {wantToListen?.map((album) => (
              <SpotifyCard
                title={album?.Album?.title}
                uri={album?.Album?.uri}
                artist={album?.Album?.artist}
                images={album?.Album?.images}
                key={album.id}
              />
            ))}
          </div>
        </div>
        <div className="px-4">
          <h2 className=" text-2xl font-black">reviews</h2>
          <div className="flex flex-row gap-8 border-2 border-gray-700 p-4">
            {reviews.data?.map((review) => (
              <div className="gap flex flex-col" key={review.id}>
                {/* {review.Album.images && (
                  <picture className="lazyPicture aspect-ratio ">
                    <Image
                      src={review.Album.images[0].url}
                      alt={"album cover"}
                      className="asset"
                      fill
                      quality={100}
                    />
                  </picture>
                )} */}
                <div className="flex flex-row items-center justify-evenly gap-4 align-middle">
                  <div className="">
                    <div className="group-hover:shadow-highlight-blurple text-md font-bold transition-all md:text-2xl">
                      {review.Album.title}
                    </div>
                    <div className="text-sm md:text-lg">
                      {review.Album.artist}
                    </div>
                  </div>
                  <div className="text-harlequin-500">{review.rating}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
