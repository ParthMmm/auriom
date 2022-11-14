import React, { Dispatch, Fragment, SetStateAction } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { trpc } from "../../utils/trpc";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, ISignUp } from "../../pages/api/auth/auth";
type Props = { open: boolean; setOpen: Dispatch<SetStateAction<boolean>> };

function SignUpModal({ open, setOpen }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ISignUp>({
    resolver: zodResolver(signUpSchema),
  });

  const mutation = trpc.auth.signUp.useMutation();

  const onSubmit = async (data: ISignUp) => {
    // console.log(data);
    mutation.mutate(data);

    if (mutation.isSuccess) {
      console.log(mutation.data);
    }
    if (mutation.isError) {
      console.log(mutation.error.message);
    }
  };

  // if (mutation.isSuccess) {
  //   console.log(mutation.data);
  // }
  if (mutation.isSuccess) {
    console.log(mutation.data);
  }
  if (mutation.isError) {
    console.log(mutation.error.message);
  }

  return (
    <div>
      {" "}
      <Transition appear show={open} as={Fragment}>
        <Dialog
          onClose={() => setOpen(false)}
          as="div"
          className="relative z-10"
        >
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
                <Dialog.Panel className="bg-grod-500 w-full max-w-xl transform overflow-hidden rounded-2xl border-2 border-gray-600 p-6 text-left align-middle text-white shadow-xl transition-all">
                  <div className="flex flex-row justify-between">
                    <Dialog.Title className="text-lg font-light ">
                      Sign Up
                    </Dialog.Title>
                    <button onClick={() => setOpen(false)}>
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
                    This will permanently deactivate your account
                  </Dialog.Description>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-4">
                      <label className="block text-sm font-medium">email</label>
                      <input
                        {...register("email")}
                        type="email"
                        name="email"
                        id="email"
                        placeholder="email"
                        className="mt-1 block w-full rounded-md border-gray-300 p-2 text-black placeholder-slate-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <label className="block text-sm font-medium">
                        username
                      </label>
                      <input
                        {...register("username")}
                        type="username"
                        name="username"
                        id="username"
                        placeholder="username"
                        className="mt-1 block w-full rounded-md border-gray-300 p-2 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                      <label className="block text-sm font-medium">
                        password
                      </label>

                      <input
                        {...register("password")}
                        type="password"
                        name="password"
                        id="password"
                        placeholder="password"
                        className="mt-1 block w-full rounded-md border-gray-300 p-2 text-black shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </div>
                    <button type="submit">submit</button>
                  </form>
                  {mutation.isError && mutation.error.message}
                  {/* {mutation.isSuccess && mutation.data}  */}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default SignUpModal;
