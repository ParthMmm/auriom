import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { objectSans } from "@components/Layout";
import { Rating } from "react-simple-star-rating";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { UserInputReview } from "src/server/trpc/schemas/review";
import { userInputReviewSchema } from "src/server/trpc/schemas/review";
import { trpc } from "@utils/trpc";
import { useUser } from "@clerk/nextjs";

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: string;
  uri: string;
  artist: string;
};

export default function CreateReviewModal({
  isOpen,
  setIsOpen,
  title,
  uri,
  artist,
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

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const onPointerEnter = () => console.log("Enter");
  const onPointerLeave = () => {
    if (rating === 0) {
      setRating(0);
    }
  };
  const onPointerMove = (value: number) => setRating(value);

  const createReviewMutation = trpc.review.createReview.useMutation();
  const submitHandler = async (data: UserInputReview) => {
    console.log(data);
    console.log(userInputReviewSchema.parse(data));
    if (!user) return;
    await createReviewMutation.mutateAsync({
      ...data,
      rating,
      title,
      artist,
      uri,
      userId: user?.id,
    });

    if (createReviewMutation.isSuccess) {
      setIsOpen(false);
      reset();
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className={`relative z-20 font-sans ${objectSans.variable}`}
          onClose={() => setIsOpen(false)}
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

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl  border-2 border-white bg-black p-8  py-24   align-middle shadow-[6px_6px_0px_rgb(255,255,255)]  transition-all">
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
                          onPointerEnter={onPointerEnter}
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
                        {...register("body")}
                        placeholder={`What did you think about ${title}?`}
                        className="h-72 w-full resize-none border-[1px] border-gray-800 bg-black p-2 text-white transition-all  focus:border-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700   "
                      />
                    </div>

                    <div className="mt-12 -mb-8 text-right">
                      <button
                        disabled={rating === 0}
                        type="submit"
                        className={` rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-black  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed`}
                      >
                        Post Review
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
