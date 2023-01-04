import type { ReviewWithUser } from "@utils/types/review";
import Image from "next/image";
import Link from "next/link";
type Props = {
  review: ReviewWithUser;
};

function Review({ review }: Props) {
  return (
    <div>
      <div className="m-4 space-x-1 p-4" key={review.id}>
        <div className="flex flex-row items-center justify-between  align-middle">
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
              <div className="font-bold">{review.user.username}</div>
            </Link>
          </div>
          <div className="my-2 text-right text-harlequin-500">
            {review.rating}
          </div>
        </div>

        <div className="text-gray-400">{review.body}</div>
      </div>
    </div>
  );
}

export default Review;
