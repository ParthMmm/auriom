import { Dialog, Tab, Transition } from '@headlessui/react';
import React from 'react';
import { Fragment, useState } from 'react';

import { objectSans } from '@components/Layout';

// function classNames(...classes) {
//   return classes.filter(Boolean).join(' ');
// }

type Props = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

function SettingsModal({ isOpen, setIsOpen }: Props) {
  const onClose = () => {
    setIsOpen(false);
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
                    <Tab.Group>
                      <Tab.List className="flex gap-4 text-xl justify-start p-1 border-white border-b-2 ">
                        <Tab className="transition-colors hover:text-parp-500">
                          <div>P</div>
                        </Tab>
                        {/* <Tab className="transition-colors hover:text-parp-500">
                          Security
                        </Tab> */}
                      </Tab.List>

                      <Tab.Panels className="mt-2">
                        <Tab.Panel>profile</Tab.Panel>
                        {/* <Tab.Panel>security</Tab.Panel> */}
                      </Tab.Panels>
                    </Tab.Group>
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
