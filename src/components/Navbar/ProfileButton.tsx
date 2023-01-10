import { useClerk, useUser } from '@clerk/nextjs';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Fragment, useState } from 'react';

import { trpc } from '@utils/trpc';

function ProfileButton({}) {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const deleteMutation = trpc.auth.deleteAll.useMutation();

  return (
    <div>
      <div className="">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="inline-flex w-full items-center justify-center rounded-md bg-black bg-opacity-20 px-4 py-2 align-middle text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
              {user?.profileImageUrl && (
                <Image
                  src={user?.profileImageUrl}
                  alt="profile image"
                  className="rounded-full"
                  width={40}
                  height={40}
                />
              )}
              <ChevronDownIcon
                className="ml-2 -mr-1 h-5 w-5 text-violet-200 hover:text-violet-100"
                aria-hidden="true"
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right  rounded-md bg-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? ' text-harlequin-500' : 'text-white'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => router.push(`/${user?.username}`)}
                    >
                      Profile
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={() => router.push('/auth/settings')}
                      className={`${
                        active ? ' text-harlequin-500' : 'text-white'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    >
                      Settings
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? ' text-harlequin-500' : 'text-white'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => signOut()}
                    >
                      Sign Out
                    </button>
                  )}
                </Menu.Item>
              </div>
              <div className="px-1 py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? ' text-harlequin-500' : 'text-white'
                      } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                      onClick={() => deleteMutation.mutate()}
                    >
                      delete DB
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
}

export default ProfileButton;
