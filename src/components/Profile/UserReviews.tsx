import Spinner from '@components/Spinner';

import { api } from '@utils/trpc';

import UserReviewCard from './UserReviewCard';

type Props = {
  username: string;
};

function UserReviews({ username }: Props) {
  const userReviews = api.review.getReviewsForUser.useQuery(
    { username },
    {
      enabled: !!username,
    }
  );

  if (userReviews.isLoading) {
    return <Spinner />;
  }

  if (userReviews.isError) {
    return <div>error</div>;
  }

  if (userReviews.data?.length === 0) return null;

  return (
    <div>
      <h2 className=" py-4 font-black text-2xl">reviews</h2>

      <div className="flex flex-row overflow-y-scroll ">
        {userReviews?.data?.map((review) => (
          <UserReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
}

export default UserReviews;
