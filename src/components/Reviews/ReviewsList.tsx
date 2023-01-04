import { trpc } from "@utils/trpc";
import React from "react";
import Review from "./Review";

type Props = {
  uri: string;
};

function ReviewsList({ uri }: Props) {
  const review = trpc.review.getReviewsForAlbum.useQuery(
    { uri },
    {
      enabled: !!uri,
    }
  );

  if (review.isLoading) {
    return <div>loading...</div>;
  }
  if (review.error || !review.data) {
    return <div>error</div>;
  }

  if (review.data.length === 0) {
    return (
      <div className="flex flex-row justify-between space-x-2 space-y-2 ">
        <div className="m-4 space-x-1">no reviews, be the first!</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between space-x-2 space-y-2 divide-y-2">
      {review.data.map((review) => (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Review review={review} key={review.id} />
      ))}
    </div>
  );
}

export default ReviewsList;
