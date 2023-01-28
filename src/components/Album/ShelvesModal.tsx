import React, { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { objectSans } from '@components/Layout';
import type { AlbumInfoRoot } from '@utils/types/spotify/albumInfo';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PlusIcon,
} from '@heroicons/react/20/solid';
import { trpc } from '@utils/trpc';
import { useUser } from '@clerk/nextjs';
import { toast } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { createShelfType } from '@utils/schemas/shelfSchema';
import { createShelfSchema } from '@utils/schemas/shelfSchema';
import Spinner from '@components/Spinner';
import SmallSpinner from '@components/SmallSpinner';
type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  album: AlbumInfoRoot;
};

function ShelvesModal({ isOpen, setIsOpen, album }: Props) {
  const { user } = useUser();
  const [showCreate, setShowCreate] = useState(false);

  const onClose = () => setIsOpen(false);
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<createShelfType>({
    resolver: zodResolver(createShelfSchema),
    defaultValues: {
      userId: user?.id,
    },
  });

  if (!user) {
    return null;
  }

  const utils = trpc.useContext();

  const getShelves = trpc.shelf.getShelves.useQuery(
    { userId: user?.id },
    {
      enabled: !!user?.id,
    },
  );

  const createShelfMutation = trpc.shelf.createShelf.useMutation();

  const createShelf = async (data: createShelfType) => {
    const { name } = data;

    if (user) {
      await createShelfMutation.mutateAsync(
        {
          name,
          userId: user?.id,
        },
        {
          onSettled: async () => {
            await utils.shelf.getShelves.invalidate({ userId: user?.id });

            await getShelves.refetch();
            toast.success('Shelf created');

            setShowCreate(false);
            reset();
          },
          onError: (err) => {
            toast.error(err.message);
          },
        },
      );
    }
  };

  const addAlbumToShelfMutation = trpc.shelf.addAlbumToShelf.useMutation();

  const addAlbumToShelf = async (shelfId: string) => {
    if (user) {
      await addAlbumToShelfMutation.mutateAsync(
        {
          spotifyId: album?.id,
          shelfId: shelfId,
          userId: user?.id,
        },
        {
          onSuccess: () => {
            toast.success('Album added to shelf');
          },
          onError: (err) => {
            toast.error(err.message);
          },
        },
      );
    }
  };

  const UserShelves = () => {
    if (getShelves.isLoading) {
      return <Spinner />;
    }

    if (getShelves.data) {
      return (
        <div className="w-full">
          {getShelves.data.map((shelf) => (
            <div
              key={shelf.id}
              className="group flex w-full items-center justify-between align-middle "
            >
              <button
                type="button"
                className="group flex w-full px-4 py-2   text-xl text-white hover:text-harlequin-500 focus:outline-none"
                onClick={() => addAlbumToShelf(shelf.id)}
              >
                <span>{shelf.name}</span>
              </button>
              <PlusIcon
                className="hidden h-6 w-6 text-gray-400 group-hover:block"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  console.log(errors);

  const ListView = () => (
    <div>
      {/* <Transition appear show={!showCreate} as={Fragment}>
        <Transition.Child
          enter="ease-out duration-300"
          enterFrom="translate-y-4 opacity-0 sm:translate-y-0 sm:translate-x-4"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="ease-in duration-200"
          leaveFrom="translate-y-0 opacity-100 sm:translate-x-0"
          leaveTo="translate-y-4 opacity-0 sm:translate-y-0 sm:translate-x-4"
        > */}

      <Dialog.Title className="text-lg font-bold text-white md:text-2xl">
        {`Add ${album.name} to a shelf`}
      </Dialog.Title>
      <Dialog.Description>
        <div className="m-4   space-x-1 overflow-hidden bg-black p-4">
          <div className="flex flex-col items-start justify-between  divide-y-2 divide-gray-600 align-middle">
            <UserShelves />

            <div className="group flex w-full items-center justify-between align-middle ">
              <button
                type="button"
                className="group flex w-full items-center px-4 py-2 align-middle   text-xl text-white hover:text-harlequin-500 focus:outline-none"
                // onClick={createShelf}
                onClick={() => setShowCreate(true)}
              >
                <span> create new shelf</span>
              </button>
              <ArrowRightIcon
                className="hidden h-6 w-6 text-gray-400 group-hover:block"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </Dialog.Description>

      {/* </Transition.Child>
      </Transition> */}
    </div>
  );
  const CreateView = () => (
    <div>
      {/* <Transition appear show={showCreate} as={Fragment}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="translate-y-4 opacity-0 sm:translate-y-0 sm:translate-x-4"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="ease-in duration-200"
          leaveFrom="translate-y-0 opacity-100 sm:translate-x-0"
          leaveTo="translate-y-4 opacity-0 sm:translate-y-0 sm:translate-x-4"
        > */}
      <>
        <Dialog.Title className="text-lg font-bold text-white md:text-2xl">
          <button type="button" onClick={() => setShowCreate(false)}>
            <ArrowLeftIcon className="absolute left-4 top-4 h-6 w-6 text-gray-400 " />
          </button>
          {`Create a new shelf`}
        </Dialog.Title>
        <Dialog.Description>
          <div className="m-4 space-x-1 overflow-hidden bg-black p-4">
            <form onSubmit={handleSubmit(createShelf)}>
              <div className="flex flex-col items-start">
                <label
                  htmlFor="name"
                  className="pb-2 text-sm font-medium text-white"
                >
                  Shelf Name
                </label>
                <input
                  {...register('name')}
                  type="text"
                  name="name"
                  id="name"
                  className="text-md w-full  border-[1px] border-gray-800 bg-black   p-2 placeholder-gray-600 focus:outline-gray-700     dark:text-white    "
                  placeholder="Name"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="flex flex-row justify-end pt-4">
                <button
                  type="submit"
                  disabled={createShelfMutation.isLoading}
                  className={` rounded-md border border-transparent bg-white px-4 py-2  text-sm font-medium text-black disabled:cursor-not-allowed`}
                >
                  Create
                </button>
              </div>
              {createShelfMutation.isLoading && <SmallSpinner />}
            </form>
          </div>
        </Dialog.Description>
      </>
      {/* </Transition.Child>
      </Transition> */}
    </div>
  );

  const ModalState = () => {
    if (showCreate) {
      return <CreateView />;
    }
    return <ListView />;
  };

  return (
    <div>
      {' '}
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
                  <ModalState />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default ShelvesModal;
