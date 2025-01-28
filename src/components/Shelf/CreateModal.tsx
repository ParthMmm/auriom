import { useUser } from '@clerk/nextjs';
import { Dialog, Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { objectSans } from '@components/Layout';

import type { UserInputReview } from '@utils/schemas/review';
import { userInputReviewSchema } from '@utils/schemas/review';
import { api } from '@utils/trpc';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  artist: string;
  spotifyId: string;
  setNewReview: (newReview: boolean) => void;
};

export default function CreateReviewModal({
  isOpen,
  setIsOpen,
  title,
  spotifyId,
  artist,
  setNewReview,
}: Props) {
  const { user } = useUser();

  const [rating, setRating] = useState(0);
  const {
    register,
    handleSubmit,

    reset,
    formState: { errors },
  } = useForm<UserInputReview>({
    resolver: zodResolver(userInputReviewSchema),
  });

  const [error, setError] = useState('');

  const createReviewMutation = api.review.createReview.useMutation({
    onError: (error) => {
      setError(error.message);
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success('Review created!');
    },
  });
  const submitHandler = async (data: UserInputReview) => {
    if (!user) return;

    // if (favoriteTracks.length > 3) {
    //   toast.error("You can't select more than 3 tracks!");
    //   return;
    // }

    const res = await createReviewMutation.mutateAsync({
      ...data,
      rating,
      spotifyId,
      userId: user?.id,
    });

    if (res) {
      toast.success('Review created!');
      setNewReview(true);
      onClose();
      setRating(0);
    }
  };

  const onClose = () => {
    setIsOpen(false);
    createReviewMutation.reset();
    reset();
  };

  const modalState = () => {
    if (createReviewMutation.isSuccess) {
      return (
        <div className="flex flex-col items-center justify-center text-white">
          <div className="font-bold text-2xl">Review created!</div>
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
          <div className="font-bold text-2xl">{error}</div>
          {/* <div className="text-xl font-bold">Please try again later.</div> */}
        </div>
      );
    }
    if (createReviewMutation.isPending) {
      return (
        <div className="flex flex-col items-center justify-center text-white">
          <div className="font-bold text-2xl">Creating review...</div>
        </div>
      );
    }
    return (
      <>
        <Dialog.Title
          as="h3"
          className="-mt-12 mb-12 text-center font-medium text-4xl text-white"
        >
          Create Shelf
        </Dialog.Title>
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="-mb-8 mt-12 text-right">
            <button
              disabled={rating === 0}
              type="submit"
              className={` rounded-md border border-transparent bg-white px-4 py-2 font-medium text-black text-sm disabled:cursor-not-allowed`}
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
                  fill="white"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="white"
                  className="absolute top-12 right-12 h-8 w-8 cursor-pointer fill-white"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-y-scroll rounded-2xl border-2 border-white bg-black p-8 py-24 align-middle shadow-[6px_6px_0px_rgb(255,255,255)] transition-all">
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
