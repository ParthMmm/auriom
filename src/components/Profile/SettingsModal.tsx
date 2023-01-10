import { Dialog, Tab, Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Fragment, useState } from 'react';
import { Controller, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import { objectSans } from '@components/Layout';

import type { userBioInputType } from '@utils/schemas/userSchema';
import { userBioInputSchema } from '@utils/schemas/userSchema';
import { userSchema } from '@utils/schemas/userSchema';
import { trpc } from '@utils/trpc';

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  username: string;
};

function SettingsModal({ isOpen, setIsOpen, username }: Props) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<userBioInputType>({
    resolver: zodResolver(userBioInputSchema),
  });

  const onClose = () => {
    setIsOpen(false);
  };

  const userData = trpc.user.getUser.useQuery({ username });

  const updateUserMutation = trpc.user.updateUser.useMutation();

  console.log(errors);

  const submitHandler = async (data: userBioInputType) => {
    // console.log(data);
    const res = await updateUserMutation.mutateAsync({
      ...data,
      username,
    });

    if (res) {
      toast.success('Profile updated!');
      userData.refetch();
    }
  };

  return (
    <div>
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-y-scroll text-white   rounded-2xl  border-2 border-white bg-black p-8 pb-12   align-middle shadow-[6px_6px_0px_rgb(255,255,255)]  transition-all">
                  <Dialog.Title>
                    <h2 className="text-4xl font-bold text-left pb-4">
                      Settings
                    </h2>
                  </Dialog.Title>
                  <div>
                    <form onSubmit={handleSubmit(submitHandler)}>
                      <div className="mt-2 p-4">
                        {/* <div className="mb-4 flex flex-row items-center justify-between align-middle transition-all"></div> */}
                        <label
                          className="text-sm font-normal flex p-2"
                          htmlFor="bio"
                        >
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          {...register('bio')}
                          placeholder={userData.data?.bio || 'Bio'}
                          className=" w-full  border-[1px] border-gray-800 placeholder-gray-600 bg-black p-2 text-white     focus:outline-gray-700   "
                        />
                        <div className="w-full bg-gray-600 border-b-[1px] my-8"></div>
                        <div className="grid  md:grid-rows-2 grid-cols-1 gap-4">
                          <div className="flex flex-col md:flex-row items-center justify-between gap-4 ">
                            <div className="flex flex-col align-middle items-start gap-2 basis-0 w-full md:basis-1/2 ">
                              <div className="flex flex-row gap-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 496 512"
                                  className="h-6 w-6 fill-current text-green-500"
                                >
                                  <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z" />
                                </svg>
                                <label
                                  className="text-sm font-normal"
                                  htmlFor="Spotify"
                                >
                                  Spotify Username
                                </label>
                              </div>
                              <input
                                id="Spotify"
                                type="text"
                                placeholder="Spotify username"
                                {...register('spotifyAccount')}
                                // value={value}
                                className="text-md w-full  border-gray-800 border-[1px] p-2   bg-black placeholder-gray-600 dark:text-white     focus:outline-gray-700    "
                              />
                            </div>
                            <div className="flex flex-col align-middle items-start gap-2 basis-0 w-full md:basis-1/2 ">
                              <div className="flex flex-row gap-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 448 512"
                                  className="h-6 w-6 fill-current text-red-500"
                                >
                                  <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm-92.2 312.9c-63.4 0-85.4-28.6-97.1-64.1-16.3-51-21.5-84.3-63-84.3-22.4 0-45.1 16.1-45.1 61.2 0 35.2 18 57.2 43.3 57.2 28.6 0 47.6-21.3 47.6-21.3l11.7 31.9s-19.8 19.4-61.2 19.4c-51.3 0-79.9-30.1-79.9-85.8 0-57.9 28.6-92 82.5-92 73.5 0 80.8 41.4 100.8 101.9 8.8 26.8 24.2 46.2 61.2 46.2 24.9 0 38.1-5.5 38.1-19.1 0-19.9-21.8-22-49.9-28.6-30.4-7.3-42.5-23.1-42.5-48 0-40 32.3-52.4 65.2-52.4 37.4 0 60.1 13.6 63 46.6l-36.7 4.4c-1.5-15.8-11-22.4-28.6-22.4-16.1 0-26 7.3-26 19.8 0 11 4.8 17.6 20.9 21.3 32.7 7.1 71.8 12 71.8 57.5.1 36.7-30.7 50.6-76.1 50.6z" />
                                </svg>
                                <label
                                  className="text-sm font-normal"
                                  htmlFor="spotify"
                                >
                                  Last.fm Username
                                </label>
                              </div>
                              <input
                                id="last.fm"
                                type="text"
                                placeholder="Last.fm username"
                                {...register('lastFmAccount')}
                                // value={value}
                                className="text-md w-full  border-gray-800 border-[1px] p-2   bg-black placeholder-gray-600 dark:text-white     focus:outline-gray-700    "
                              />
                            </div>
                          </div>
                          <div className="flex flex-col md:flex-row items-center justify-between gap-4 ">
                            <div className="flex flex-col align-middle items-start gap-2 basis-0 w-full md:basis-1/2 ">
                              <div className="flex flex-row gap-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 640 512"
                                  className="h-6 w-6 fill-current text-orange-500"
                                >
                                  <path d="M111.4 256.3l5.8 65-5.8 68.3c-.3 2.5-2.2 4.4-4.4 4.4s-4.2-1.9-4.2-4.4l-5.6-68.3 5.6-65c0-2.2 1.9-4.2 4.2-4.2 2.2 0 4.1 2 4.4 4.2zm21.4-45.6c-2.8 0-4.7 2.2-5 5l-5 105.6 5 68.3c.3 2.8 2.2 5 5 5 2.5 0 4.7-2.2 4.7-5l5.8-68.3-5.8-105.6c0-2.8-2.2-5-4.7-5zm25.5-24.1c-3.1 0-5.3 2.2-5.6 5.3l-4.4 130 4.4 67.8c.3 3.1 2.5 5.3 5.6 5.3 2.8 0 5.3-2.2 5.3-5.3l5.3-67.8-5.3-130c0-3.1-2.5-5.3-5.3-5.3zM7.2 283.2c-1.4 0-2.2 1.1-2.5 2.5L0 321.3l4.7 35c.3 1.4 1.1 2.5 2.5 2.5s2.2-1.1 2.5-2.5l5.6-35-5.6-35.6c-.3-1.4-1.1-2.5-2.5-2.5zm23.6-21.9c-1.4 0-2.5 1.1-2.5 2.5l-6.4 57.5 6.4 56.1c0 1.7 1.1 2.8 2.5 2.8s2.5-1.1 2.8-2.5l7.2-56.4-7.2-57.5c-.3-1.4-1.4-2.5-2.8-2.5zm25.3-11.4c-1.7 0-3.1 1.4-3.3 3.3L47 321.3l5.8 65.8c.3 1.7 1.7 3.1 3.3 3.1 1.7 0 3.1-1.4 3.1-3.1l6.9-65.8-6.9-68.1c0-1.9-1.4-3.3-3.1-3.3zm25.3-2.2c-1.9 0-3.6 1.4-3.6 3.6l-5.8 70 5.8 67.8c0 2.2 1.7 3.6 3.6 3.6s3.6-1.4 3.9-3.6l6.4-67.8-6.4-70c-.3-2.2-2-3.6-3.9-3.6zm241.4-110.9c-1.1-.8-2.8-1.4-4.2-1.4-2.2 0-4.2.8-5.6 1.9-1.9 1.7-3.1 4.2-3.3 6.7v.8l-3.3 176.7 1.7 32.5 1.7 31.7c.3 4.7 4.2 8.6 8.9 8.6s8.6-3.9 8.6-8.6l3.9-64.2-3.9-177.5c-.4-3-2-5.8-4.5-7.2zm-26.7 15.3c-1.4-.8-2.8-1.4-4.4-1.4s-3.1.6-4.4 1.4c-2.2 1.4-3.6 3.9-3.6 6.7l-.3 1.7-2.8 160.8s0 .3 3.1 65.6v.3c0 1.7.6 3.3 1.7 4.7 1.7 1.9 3.9 3.1 6.4 3.1 2.2 0 4.2-1.1 5.6-2.5 1.7-1.4 2.5-3.3 2.5-5.6l.3-6.7 3.1-58.6-3.3-162.8c-.3-2.8-1.7-5.3-3.9-6.7zm-111.4 22.5c-3.1 0-5.8 2.8-5.8 6.1l-4.4 140.6 4.4 67.2c.3 3.3 2.8 5.8 5.8 5.8 3.3 0 5.8-2.5 6.1-5.8l5-67.2-5-140.6c-.2-3.3-2.7-6.1-6.1-6.1zm376.7 62.8c-10.8 0-21.1 2.2-30.6 6.1-6.4-70.8-65.8-126.4-138.3-126.4-17.8 0-35 3.3-50.3 9.4-6.1 2.2-7.8 4.4-7.8 9.2v249.7c0 5 3.9 8.6 8.6 9.2h218.3c43.3 0 78.6-35 78.6-78.3.1-43.6-35.2-78.9-78.5-78.9zm-296.7-60.3c-4.2 0-7.5 3.3-7.8 7.8l-3.3 136.7 3.3 65.6c.3 4.2 3.6 7.5 7.8 7.5 4.2 0 7.5-3.3 7.5-7.5l3.9-65.6-3.9-136.7c-.3-4.5-3.3-7.8-7.5-7.8zm-53.6-7.8c-3.3 0-6.4 3.1-6.4 6.7l-3.9 145.3 3.9 66.9c.3 3.6 3.1 6.4 6.4 6.4 3.6 0 6.4-2.8 6.7-6.4l4.4-66.9-4.4-145.3c-.3-3.6-3.1-6.7-6.7-6.7zm26.7 3.4c-3.9 0-6.9 3.1-6.9 6.9L227 321.3l3.9 66.4c.3 3.9 3.1 6.9 6.9 6.9s6.9-3.1 6.9-6.9l4.2-66.4-4.2-141.7c0-3.9-3-6.9-6.9-6.9z" />
                                </svg>
                                <label
                                  className="text-sm font-normal"
                                  htmlFor="SoundCloud"
                                >
                                  SoundCloud Username
                                </label>
                              </div>
                              <input
                                id="SoundCloud"
                                type="text"
                                placeholder="SoundCloud username"
                                {...register('soundCloudAccount')}
                                // value={value}
                                className="text-md w-full  border-gray-800 border-[1px] p-2   bg-black placeholder-gray-600 dark:text-white     focus:outline-gray-700    "
                              />
                            </div>
                            <div className="flex flex-col align-middle items-start gap-2 basis-0 w-full md:basis-1/2 ">
                              <div className="flex flex-row gap-2">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 512 512"
                                  className="h-6 w-6 fill-current text-blue-500"
                                >
                                  <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
                                </svg>
                                <label
                                  className="text-sm font-normal"
                                  htmlFor="Twitter"
                                >
                                  Twitter Username
                                </label>
                              </div>
                              <input
                                id="Twitter"
                                type="text"
                                placeholder="Twitter username"
                                {...register('twitterAccount')}
                                // value={value}
                                className="text-md w-full  border-gray-800 border-[1px] p-2   bg-black placeholder-gray-600 dark:text-white     focus:outline-gray-700    "
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-12 -mb-8 text-right">
                        <button
                          type="submit"
                          className={` rounded-md border border-transparent bg-white px-4 py-2 text-sm font-medium text-black disabled:cursor-not-allowed`}
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default SettingsModal;
