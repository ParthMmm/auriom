import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import ViewReviewModal from '@components/Reviews/ViewReviewModal';

import type { ReviewWithEverything } from '@utils/types/review';

type Props = {
  review: ReviewWithEverything;
};

function UserReviewCard({ review }: Props) {
  // use state to show more/less
  const [isOpen, setIsOpen] = useState(false);

  // const [showMore, setShowMore] = useState(false);

  let showMore = false;

  let body = review.body;

  if (review.body && review?.body.length > 200) {
    showMore = true;
    body = review?.body.slice(0, 200) + '...';
  }

  // useEffect(() => {
  //   if (review.body.length > 400) {
  //     setShowMore(true);
  //     body = review.body.slice(0, 400) + "...";
  //   }
  // });

  const imageURL = review.Album?.images?.filter(
    (image) => image.height === 300,
  )[0]?.url;

  const artists = () => {
    if (review.Album?.artists instanceof Array) {
      return review.Album?.artists?.map((artist) => (
        <Link
          href={{
            pathname: `/artist/[id]`,
            query: {
              artist: artist.name,
              id: artist.spotifyId,
            },
          }}
          key={artist?.id}
        >
          <span className="md:text-md pr-2 text-sm font-normal text-gray-500 transition-all hover:text-harlequin-500">
            {artist?.name}
          </span>
        </Link>
      ));
    } else {
      return null;
    }
  };

  return (
    <div className=" ">
      <div className="h-full border-[1px] border-gray-700  p-6 transition-all hover:border-gray-500">
        <div className="my-4 flex flex-row  gap-4">
          <div className="flex flex-row items-start justify-start  align-middle ">
            <Link
              href={{
                pathname: `/album/[id]`,
                query: {
                  id: review?.Album.spotifyId,
                },
              }}
              // as={`/album/${encodeURIComponent(album.name)}/${artists}`}
            >
              <div className=" h-36 w-36">
                {imageURL && (
                  <Image
                    src={imageURL}
                    alt={'album cover'}
                    height={150}
                    width={150}
                    quality={100}
                    className="inline-block "
                  />
                )}
              </div>
            </Link>
            {/* <Link href={`/${review.user?.username}`}>
                <div className="font-bold text-gray-100">
                  {review.user.username}
                </div>
              </Link> */}
          </div>
          <div className="flex w-48 flex-col justify-between">
            <div className="">
              <Link
                href={{
                  pathname: `/album/[id]`,
                  query: {
                    id: review?.Album?.spotifyId,
                  },
                }}
                // as={`/album/${encodeURIComponent(album.name)}/${artists}`}
              >
                <span className="overflow-hidden text-sm font-normal transition-all line-clamp-2 hover:text-harlequin-500 ">
                  {review?.Album.title}
                </span>
              </Link>{' '}
              <div className="">{artists()}</div>
              <div className=" text-left tabular-nums text-harlequin-500">
                {review.rating} <span className="text-gray-600">/ 5</span>
              </div>
            </div>
            <div className="pt-2 text-sm text-gray-500">
              {dayjs(review.createdAt).format('MMM D, YYYY')}
            </div>
          </div>
        </div>

        <p className=" mt-4 text-sm text-white line-clamp-3">{body}</p>

        {showMore && (
          <div className="text-right">
            <button
              className="text-sm text-harlequin-600 hover:text-harlequin-500"
              onClick={() => setIsOpen(true)}
            >
              Read full review
            </button>
          </div>
        )}
      </div>
      <ViewReviewModal isOpen={isOpen} setIsOpen={setIsOpen} review={review} />
    </div>
  );
}

export default UserReviewCard;
