import type { ReviewWithUserWithAlbum } from "@utils/types/review";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import ViewReviewModal from "./ViewReviewModal";

type Props = {
  review: ReviewWithUserWithAlbum;
};

function Review({ review }: Props) {
  // use state to show more/less
  const [isOpen, setIsOpen] = useState(false);

  // const [showMore, setShowMore] = useState(false);

  let showMore = false;

  let body = review.body;
  if (review.body.length > 400) {
    showMore = true;
    body = review.body.slice(0, 400) + "...";
  }

  // useEffect(() => {
  //   if (review.body.length > 400) {
  //     setShowMore(true);
  //     body = review.body.slice(0, 400) + "...";
  //   }
  // });

  return (
    <div>
      <div className="m-4   max-h-96 space-x-1 overflow-hidden bg-black p-4">
        <div className="flex flex-row items-center justify-between  align-middle">
          <div>
            <div className="flex flex-row items-center justify-start gap-2 align-middle">
              {review.user.profileImage ? (
                <Image
                  src={review.user.profileImage}
                  alt="user"
                  width={40}
                  height={40}
                  className="h-8 w-8 rounded-full"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gray-400" />
              )}
              <Link href={`/${review.user?.username}`}>
                <div className="font-bold text-gray-100">
                  {review.user.username}
                </div>
              </Link>
            </div>

            <div className="text-gray-500">
              {dayjs(review.createdAt).format("MMM D, YYYY")}
            </div>
          </div>
          <div className="">
            <div className=" text-right text-harlequin-500">
              {review.rating} <span className="text-gray-600">/ 5</span>
            </div>
          </div>
        </div>

        <p className=" mt-4 block text-white">{body}</p>
        {showMore && (
          <button
            className="text-harlequin-500"
            onClick={() => setIsOpen(true)}
          >
            Show more
          </button>
        )}
      </div>
      <ViewReviewModal isOpen={isOpen} setIsOpen={setIsOpen} review={review} />
    </div>
  );
}

export default Review;
