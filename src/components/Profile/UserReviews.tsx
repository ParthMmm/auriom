import React from 'react';

import Spinner from '@components/Spinner';

import { trpc } from '@utils/trpc';

import UserReviewCard from './UserReviewCard';

type Props = {
  username: string;
};

function UserReviews({ username }: Props) {
  const userReviews = trpc.review.getReviewsForUser.useQuery(
    { username },
    {
      enabled: !!username,
    },
  );

  if (userReviews.isLoading) {
    return <Spinner />;
  }

  if (userReviews.isError) {
    return <div>error</div>;
  }

  return (
    <div>
      <h2 className=" text-2xl py-4 font-black">reviews</h2>

      <div className="flex flex-row  overflow-y-scroll   ">
        {userReviews?.data.map((review) => (
          <UserReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}

export default UserReviews;
