import Link from 'next/link';
import React, { useEffect } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

import SmallSpinner from '@components/SmallSpinner';
import Spinner from '@components/Spinner';

import { trpc } from '@utils/trpc';

import Review from './Review';

type Props = {
  newReview: boolean;
  spotifyId: string;
};

function ReviewsList({ newReview, spotifyId }: Props) {
  const { data, isError, isLoading, refetch } =
    trpc.review.getReviewsForAlbum.useQuery(
      { spotifyId },
      {
        enabled: !!spotifyId,
        // getNextPageParam: (lastPage) => {
        //   lastPage?.nextCursor;
        // },
      },
    );

  useEffect(() => {
    refetch();
  }, [newReview]);

  if (isLoading) {
    return (
      <div className="flex flex-row justify-between space-x-2 space-y-2 ">
        <div className="m-4 space-x-1">
          <Spinner />
        </div>
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

  if (data.reviews.length === 0) {
    return (
      <div className="flex flex-row justify-between space-x-2 space-y-2 ">
        <div className="m-4 space-x-1">no reviews, be the first!</div>
      </div>
    );
  }

  //get cursor from last page
  // const cursor = data?.pages[data?.pages.length - 1]?.nextCursor;

  return (
    <>
      <div className=" rounded-2xl border-2 shadow-[6px_6px_0px_rgb(255,255,255)]">
        <div className="flex flex-col justify-between  space-y-2 divide-y-2">
          {data.reviews.map((review) => (
            <Review key={review.id} review={review} />
          ))}
        </div>
      </div>
      <div>
        <Link href={`/album/${spotifyId}/reviews`}>
          <div className="text-right  text-white rounded-md p-2">
            view all reviews
          </div>
        </Link>
      </div>
    </>
  );
}

export default ReviewsList;
