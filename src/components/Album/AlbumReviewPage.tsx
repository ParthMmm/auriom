import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/router';
import InfiniteScroll from 'react-infinite-scroll-component';

import SmallSpinner from '@components/SmallSpinner';

import { api } from '@utils/trpc';

const Review = dynamic(() => import('@components/Reviews/Review'), {
  ssr: false,
});

const CondensedAlbumInfo = dynamic(
  () => import('@components/Album/CondensedAlbumInfo'),
  {
    ssr: false,
  }
);

function AlbumReviewPage({}) {
  const router = useRouter();

  const spotifyId = router.query.id as string;

  const { data, fetchNextPage, isError, isLoading } =
    api.review.getReviewsForAlbum.useInfiniteQuery(
      { spotifyId },
      {
        enabled: !!spotifyId,
        getNextPageParam: (lastPage) => lastPage?.nextCursor,
      }
    );

  const albumInfo = api.spotify.getAlbum.useQuery(
    { spotifyId },
    {
      enabled: !!spotifyId,
    }
  );

  const album = albumInfo?.data;

  const imageURL = albumInfo?.data?.images.filter(
    (image) => image.height === 300
  )[0]?.url;

  const artists = album?.artists.map((artist) => artist.name).join(', ');

  if (isLoading) {
    return (
      <div className="flex flex-row justify-between space-x-2 space-y-2 ">
        <div className="m-4 space-x-1">loading</div>
      </div>
    );
  }
  if (isError || !data) {
    return (
      <div className="flex flex-row justify-between space-x-2 space-y-2 ">
        <div className="m-4 space-x-1">error</div>
      </div>
    );
  }

  if (data.pages[0]?.reviews.length === 0) {
    return (
      <div className="flex flex-row justify-between space-x-2 space-y-2 ">
        <div className="m-4 space-x-1">no reviews, be the first!</div>
      </div>
    );
  }

  //get cursor from last page

  //   component breadcrumb based on album name and pages

  const cursor = data?.pages[data?.pages.length - 1]?.nextCursor;
  return (
    <div className="  ">
      <div className="0 flex flex-row gap-2 p-8 text-sm">
        <Link href={`/album/${spotifyId}`}>
          <div className="text-gray-500 transition-all hover:text-gray-400">
            {album?.name}
          </div>
        </Link>
        <span className="text-gray-700">/</span>
        <span className="text-gray-700">Reviews</span>
      </div>

      <div className=" mt-12 flex flex-col justify-evenly gap-8 px-8 pb-4 md:flex-row md:gap-24 md:px-24 md:pb-12">
        <div className=" flex w-24 basis-1/4 ">
          <CondensedAlbumInfo spotifyId={spotifyId} />
        </div>
        <div className="w-full basis-3/4">
          <div className="pb-8">
            <h1 className="font-bold text-4xl">
              Reviews for <br />
              {album?.name}
            </h1>
            <h3 className="text-2xl">{artists}</h3>
          </div>
          <div className=" rounded-2xl border-2 shadow-[6px_6px_0px_rgb(255,255,255)]">
            <InfiniteScroll
              next={() => fetchNextPage()}
              hasMore={cursor ? true : false}
              loader={<SmallSpinner />}
              dataLength={data?.pages?.length * 4 || 0}
            >
              <div className="flex flex-col justify-between space-y-2 divide-y-2">
                {data.pages.map((page) =>
                  page?.reviews.map((review) => (
                    <Review key={review.id} review={review} />
                  ))
                )}
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlbumReviewPage;
