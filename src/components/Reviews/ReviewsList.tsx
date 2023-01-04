import { trpc } from "@utils/trpc";
import React, { useEffect } from "react";
import Review from "./Review";

type Props = {
  uri: string;
  newReview: boolean;
};

function ReviewsList({ uri, newReview }: Props) {
  const review = trpc.review.getReviewsForAlbum.useQuery(
    { uri },
    {
      enabled: !!uri,
    }
  );

  useEffect(() => {
    review.refetch();
  }, [newReview]);

  if (review.isLoading) {
    return (
      <div className="flex flex-row justify-between space-x-2 space-y-2 ">
        <div className="m-4 space-x-1">loading</div>
      </div>
    );
  }
  if (review.error || !review.data) {
    return (
      <div className="flex flex-row justify-between space-x-2 space-y-2 ">
        <div className="m-4 space-x-1">error</div>
      </div>
    );
  }

  if (review.data.length === 0) {
    return (
      <div className="flex flex-row justify-between space-x-2 space-y-2 ">
        <div className="m-4 space-x-1">no reviews, be the first!</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between  space-y-2 divide-y-2">
      {review.data.map((review) => (
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        <Review review={review} key={review.id} />
      ))}
    </div>
  );
}

export default ReviewsList;
