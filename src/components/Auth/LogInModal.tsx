import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

function LogInModal({}) {
  return (
    <div>
      {" "}
      <Transition appear show={false} as={Fragment}>
        <Dialog
          onClose={() => {
            console.log("yo");
          }}
          as="div"
          className="relative z-10"
        >
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center  p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className=" w-full max-w-xl transform overflow-hidden rounded-2xl border-2 border-gray-600 bg-black p-12 text-left align-middle text-white shadow-xl transition-all">
                  <div className=" mb-12 flex flex-row justify-between">
                    <Dialog.Title className="text-lg font-light ">
                      log in
                    </Dialog.Title>
                    <button>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <Dialog.Description>
                    {/* This will permanently deactivate your account */}
                  </Dialog.Description>
                  <form onSubmit={() => console.log("yo")}>
                    <div className=" space-y-6 ">
                      <input
                        type="username"
                        name="username"
                        id="username"
                        placeholder="username"
                        className=" mt-1 block w-full rounded-md  bg-gray-800 p-2 text-lg text-white placeholder-gray-500 shadow-sm  transition-all focus:bg-black  focus:outline-none focus:ring focus:ring-harlequin-500 sm:text-sm"
                      />

                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        className=" mt-1 block w-full rounded-md  bg-gray-800 p-2 text-lg text-white placeholder-gray-500 shadow-sm  transition-all focus:bg-black  focus:outline-none focus:ring focus:ring-harlequin-500 sm:text-sm"
                      />
                    </div>
                    <div className="mt-8 ml-auto mr-0 flex justify-end">
                      <button
                        type="submit"
                        className="text-harlequin-500 hover:text-harlequin-700"
                      >
                        submit
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default LogInModal;
