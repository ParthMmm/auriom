import React from 'react';

import Review from '@components/Reviews/Review';
import Spinner from '@components/Spinner';

import { trpc } from '@utils/trpc';

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

  console.log(userReviews.data);

  if (userReviews.isLoading) {
    return <Spinner />;
  }

  if (userReviews.isError) {
    return <div>error</div>;
  }

  return (
    <div>
      <div className="flex flex-col justify-between w-1/3  space-y-2 divide-y-2">
        {userReviews?.data.map((review) => (
          <Review key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}

export default UserReviews;
