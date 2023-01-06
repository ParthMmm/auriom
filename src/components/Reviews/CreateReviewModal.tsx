import { useUser } from '@clerk/nextjs';
import { objectSans } from '@components/Layout';
import TracklistSelect from '@components/Track/TracklistSelect';
import { Dialog, Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStore } from '@store/app';
import type { UserInputReview } from '@utils/schemas/review';
import { userInputReviewSchema } from '@utils/schemas/review';
import { trpc } from '@utils/trpc';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Rating } from 'react-simple-star-rating';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  uri: string;
  artist: string;
  setNewReview: (newReview: boolean) => void;
};

export default function CreateReviewModal({
  isOpen,
  setIsOpen,
  title,
  artist,
  uri,
  setNewReview,
}: Props) {
  const { user } = useUser();
  const [rating, setRating] = useState(0);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UserInputReview>({
    resolver: zodResolver(userInputReviewSchema),
  });
  const favoriteTracks = useStore((state) => state.favoriteTracks);
  const currentTracklist = useStore((state) => state.currentTracklist);
  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const onPointerLeave = () => {
    console.log(rating);
    if (rating === 0) {
      setRating(0);
    }
  };
  const onPointerMove = (value: number) => setRating(value);

  const createReviewMutation = trpc.review.createReview.useMutation();
  const submitHandler = async (data: UserInputReview) => {
    if (!user) return;
    console.log(userInputReviewSchema.parse(data));

    const res = await createReviewMutation.mutateAsync({
      ...data,
      rating,
      uri,
      userId: user?.id,
      // favoriteTracks,
    });

    if (res) {
      setNewReview(true);
      resetForm();
      onClose();
      setRating(0);
    }
  };

  const onClose = () => {
    setIsOpen(false);
    reset();
    // setRating(0);
  };

  const resetForm = () => {
    reset();
    // setRating(0);
  };

  const modalState = () => {
    if (createReviewMutation.isSuccess) {
      // resetForm();

      return (
        <div className="flex flex-col items-center justify-center text-white">
          <div className="text-2xl font-bold">Review created!</div>
          {/* <div className="text-xl font-bold">Thanks for your feedback!</div>
          <div className="text-xl font-bold">
            You can edit your review at any time.
          </div> */}
        </div>
      );
    }
    if (createReviewMutation.isError) {
      return (
        <div className="flex flex-col items-center justify-center text-white">
          <div className="text-2xl font-bold">Error creating review</div>
          <div className="text-xl font-bold">Please try again later.</div>
        </div>
      );
    }
    if (createReviewMutation.isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-white">
          <div className="text-2xl font-bold">Creating review...</div>
        </div>
      );
    }
    return (
      <>
        <Dialog.Title
          as="h3"
          className="mb-12 -mt-12 text-center text-4xl font-medium leading-6 text-white"
        >
          Reviewing {title}
        </Dialog.Title>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="mt-2 p-4">
            <div className="mb-4 flex flex-row items-center justify-between align-middle transition-all">
              <Rating
                onClick={handleRating}
                onPointerLeave={onPointerLeave}
                onPointerMove={onPointerMove}
                size={40}
                transition
                allowFraction
                fillColor="#3AF613"
                emptyColor="white"
              />
              {rating === 0 ? (
                <div className="text-gray-700">No rating</div>
              ) : (
                <div className="text-harlequin-500">{rating}</div>
              )}
            </div>
            <textarea
              {...register('body')}
              placeholder={`What did you think about ${title}?`}
              className="h-72 w-full resize-none border-[1px] border-gray-800 bg-black p-2 text-white transition-all  focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700   "
            />
            <TracklistSelect />
          </div>

          <div className="mt-12 -mb-8 text-right">
            <button
              disabled={rating === 0}
              type="submit"
              className={` rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-black disabled:cursor-not-allowed`}
            >
              Post Review
            </button>
          </div>
        </form>
      </>
    );
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className={`relative z-20 font-sans ${objectSans.variable}`}
          onClose={() => onClose()}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-90 " />
          </Transition.Child>

          <div className="fixed inset-0 ">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <button onClick={() => onClose()}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                  className="absolute top-12 right-1/4 h-6 w-6 cursor-pointer fill-white"
                >
                  <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                </svg>
              </button>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-y-scroll   rounded-2xl  border-2 border-white bg-black p-8  py-24   align-middle shadow-[6px_6px_0px_rgb(255,255,255)]  transition-all">
                  {modalState()}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
