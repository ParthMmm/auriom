import Link from 'next/link';
import { useState } from 'react';

import type { AlbumInfoRoot } from '@utils/types/spotify/albumInfo';

import CreateReviewModal from './CreateReviewModal';
import ReviewsList from './ReviewsList';

type Props = {
  album: AlbumInfoRoot;
};

function Reviews({ album }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const artists = album.artists.map((artist) => artist.name).join(', ');

  const [newReview, setNewReview] = useState(false);

  const spotifyId = album?.id;

  console.log(spotifyId);

  return (
    <div className="mb-12 w-full md:mb-24 ">
      <div className="flex flex-row items-center justify-between align-middle">
        <h2 className="text-4xl font-bold">reviews</h2>
        <button onClick={() => setIsOpen(true)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            className="h-6 w-6 fill-white"
          >
            <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
          </svg>
        </button>
      </div>
      <ReviewsList newReview={newReview} spotifyId={spotifyId} />

      <CreateReviewModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={album.name}
        spotifyId={spotifyId}
        artist={artists}
        setNewReview={setNewReview}
      />
    </div>
  );
}

export default Reviews;
