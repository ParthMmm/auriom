import { Dialog, Transition } from '@headlessui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { Fragment } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { LastFMLogo, SoundCloudLogo, TwitterLogo } from 'src/lib/svgs';
import SpotifyLogo from 'src/lib/svgs/spotify';

import { objectSans } from '@components/Layout';

import type { userBioInputType } from '@utils/schemas/userSchema';
import { userBioInputSchema } from '@utils/schemas/userSchema';
import { api } from '@utils/trpc';

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

  const userData = api.users.getUser.useQuery(
    { username },
    {
      enabled: !!username,
    }
  );

  const updateUserMutation = api.users.updateUser.useMutation();

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

  const initialValues = {
    bio: userData?.data?.bio,
    spotifyAccount: userData?.data?.spotifyAccount,
    twitterAccount: userData?.data?.twitterAccount,
    soundCloudAccount: userData?.data?.soundCloudAccount,
    lastFmAccount: userData?.data?.lastFmAccount,
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-y-scroll rounded-2xl border-2 border-white bg-black p-8 pb-12 align-middle text-white shadow-[6px_6px_0px_rgb(255,255,255)] transition-all">
                  <Dialog.Title>
                    <h2 className="pb-4 text-left font-bold text-4xl">
                      Settings
                    </h2>
                  </Dialog.Title>
                  <div>
                    <form onSubmit={handleSubmit(submitHandler)}>
                      <div className="mt-2 p-4">
                        {/* <div className="mb-4 flex flex-row items-center justify-between align-middle transition-all"></div> */}
                        <label
                          className="flex p-2 font-normal text-sm"
                          htmlFor="bio"
                        >
                          Bio
                        </label>
                        <textarea
                          defaultValue={initialValues.bio || ''}
                          id="bio"
                          {...register('bio')}
                          placeholder={userData.data?.bio || 'Bio'}
                          className=" w-full border-[1px] border-gray-800 bg-black p-2 text-white placeholder-gray-600 focus:outline-gray-700 "
                        />
                        <div className="my-8 w-full border-b-[1px] bg-gray-600"></div>
                        <div className="grid grid-cols-1 gap-6 md:grid-rows-2">
                          <div className="flex flex-col items-center justify-between gap-4 md:flex-row ">
                            <div className="flex w-full basis-0 flex-col items-start gap-2 align-middle md:basis-1/2 ">
                              <div className="flex flex-row items-center gap-2 align-middle">
                                <SpotifyLogo />
                                <label
                                  className="font-normal text-sm"
                                  htmlFor="Spotify"
                                >
                                  Spotify Username
                                </label>
                              </div>
                              <input
                                defaultValue={
                                  initialValues.spotifyAccount || ''
                                }
                                id="Spotify"
                                type="text"
                                placeholder="Spotify username"
                                {...register('spotifyAccount')}
                                // value={value}
                                className="w-full border-[1px] border-gray-800 bg-black p-2 text-md placeholder-gray-600 focus:outline-gray-700 dark:text-white "
                              />
                            </div>
                            <div className="flex w-full basis-0 flex-col items-start gap-2 align-middle md:basis-1/2 ">
                              <div className="flex flex-row items-center gap-2 align-middle">
                                <LastFMLogo />
                                <label
                                  className="font-normal text-sm"
                                  htmlFor="last.fm"
                                >
                                  Last.fm Username
                                </label>
                              </div>
                              <input
                                defaultValue={initialValues.lastFmAccount || ''}
                                id="last.fm"
                                type="text"
                                placeholder="Last.fm username"
                                {...register('lastFmAccount')}
                                // value={value}
                                className="w-full border-[1px] border-gray-800 bg-black p-2 text-md placeholder-gray-600 focus:outline-gray-700 dark:text-white "
                              />
                            </div>
                          </div>
                          <div className="flex flex-col items-center justify-between gap-4 md:flex-row ">
                            <div className="flex w-full basis-0 flex-col items-start gap-2 align-middle md:basis-1/2 ">
                              <div className="flex flex-row items-center gap-2 align-middle">
                                <SoundCloudLogo />
                                <label
                                  className="font-normal text-sm"
                                  htmlFor="SoundCloud"
                                >
                                  SoundCloud Username
                                </label>
                              </div>
                              <input
                                defaultValue={
                                  initialValues.soundCloudAccount || ''
                                }
                                id="SoundCloud"
                                type="text"
                                placeholder="SoundCloud username"
                                {...register('soundCloudAccount')}
                                // value={value}
                                className="w-full border-[1px] border-gray-800 bg-black p-2 text-md placeholder-gray-600 focus:outline-gray-700 dark:text-white "
                              />
                            </div>
                            <div className="flex w-full basis-0 flex-col items-start gap-2 align-middle md:basis-1/2 ">
                              <div className="flex flex-row items-center gap-2 align-middle">
                                <TwitterLogo />
                                <label
                                  className="font-normal text-sm"
                                  htmlFor="Twitter"
                                >
                                  Twitter Username
                                </label>
                              </div>
                              <input
                                defaultValue={
                                  initialValues.twitterAccount || ''
                                }
                                id="Twitter"
                                type="text"
                                placeholder="Twitter username"
                                {...register('twitterAccount')}
                                // value={value}
                                className="w-full border-[1px] border-gray-800 bg-black p-2 text-md placeholder-gray-600 focus:outline-gray-700 dark:text-white "
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="-mb-8 mt-12 flex flex-row justify-between">
                        <Link
                          className="text-gray-600 hover:text-gray-400"
                          href={`/auth/settings`}
                        >
                          security settings
                        </Link>
                        <button
                          type="submit"
                          className={` rounded-md border border-transparent bg-white px-4 py-2 font-medium text-black text-sm disabled:cursor-not-allowed`}
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
