import Spinner from '@components/Spinner';

import { trpc } from '@utils/trpc';

import List from './List';
import UserReviews from './UserReviews';

type Props = {
  username: string;
};

function UserActionsActivity({ username }: Props) {
  const data = trpc.albumAction.getAllUserActions.useQuery(
    {
      username,
    },
    {
      enabled: !!username,
    },
  );

  // const reviews = trpc.review.getReviewsForUser.useQuery(
  //   {
  //     username,
  //   },
  //   {
  //     enabled: !!username,
  //   },
  // );

  if (data.isLoading) {
    return <Spinner />;
  }

  if (data.isError) {
    return <div>error</div>;
  }

  if (data.isSuccess) {
    const listening = data.data?.listening;
    const listened = data.data?.listened;
    const wantToListen = data.data?.wantToListen;

    return (
      <div className="mt-24 flex w-full flex-col gap-10 ">
        <div className="px-4">
          <List data={listening} title={'currently listening'} />
        </div>
        <div className="px-4">
          <List data={listened} title={'listened'} />
        </div>
        <div className="px-4">
          <List data={wantToListen} title={'want to listen'} />
        </div>
        <div className="px-4">
          <UserReviews username={username} />
        </div>
        {/* <div className="px-4">
          <h2 className=" text-2xl font-black">reviews</h2>
          <div className="flex flex-row gap-8 border-2 border-gray-700 p-4">
            {reviews?.data?.map((review) => (
              <div className="gap flex flex-col" key={review.id}>
                {review.Album.images && (
                  <picture className="lazyPicture aspect-ratio ">
                    <Image
                      src={review.Album.images[0].url}
                      alt={'album cover'}
                      className="asset"
                      fill
                      quality={100}
                    />
                  </picture>
                )}
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
        </div> */}
      </div>
    );
  }

  return <div>UserActions</div>;
}

export default UserActionsActivity;
