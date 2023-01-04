import type { ReviewWithUser } from "@utils/types/review";
import React from "react";

type Props = {
  review: ReviewWithUser;
};

function Review({ review }: Props) {
  return (
    <div>
      <div className="m-4 space-x-1 p-4" key={review.id}>
        <div className="flex flex-row justify-between px-4">
          <div className="font-bold">{review.user.username}</div>
          <div className="text-harlequin-500">{review.rating}</div>
        </div>
        <div className="text-gray-400">{review.body}</div>
      </div>
    </div>
  );
}

export default Review;
