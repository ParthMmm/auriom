import { Dialog, Transition } from '@headlessui/react';
import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useState } from 'react';

import { objectSans } from '@components/Layout';

import type { ReviewWithUserWithAlbum } from '@utils/types/review';

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  review: ReviewWithUserWithAlbum;
};

function ViewReviewModal({ isOpen, setIsOpen, review }: Props) {
  const onClose = () => setIsOpen(false);

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
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl  border-2 border-white bg-black p-4 align-middle  shadow-[6px_6px_0px_rgb(255,255,255)]   transition-all md:px-8  md:py-8">
                  <button
                    onClick={() => onClose()}
                    className="fill-white hover:fill-parp-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 384 512"
                      className="absolute top-4 right-4 h-6 w-6 cursor-pointer "
                    >
                      <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
                    </svg>
                  </button>
                  <Dialog.Title className="text-lg font-bold text-white md:text-2xl">
                    {`${review.user.username}'s review of`}
                    <br />
                    {`${review.Album.title} `}
                  </Dialog.Title>
                  <Dialog.Description>
                    <div className="m-4    space-x-1 overflow-hidden bg-black p-4">
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
                            {dayjs(review.createdAt).format('MMM D, YYYY')}
                          </div>
                        </div>
                        <div className="">
                          <div className=" text-right text-harlequin-500">
                            {review.rating}{' '}
                            <span className="text-gray-600">/ 5</span>
                          </div>
                        </div>
                      </div>

                      <p className=" mt-4 block whitespace-pre-line text-left text-white">
                        {review.body}
                      </p>
                    </div>
                  </Dialog.Description>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default ViewReviewModal;
