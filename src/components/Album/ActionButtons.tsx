import { useUser } from "@clerk/nextjs";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { Fragment, useState } from "react";

const actions = [
  { name: "currently listening" },
  { name: "listened" },
  { name: "want to listen" },
];

function ActionButtons({}) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [selected, setSelected] = useState(actions[0]);

  console.log(user);

  return (
    <div className="fixed left-[calc(50%-50px)] bottom-0   mb-12">
      {/* <button
          disabled={!user}
          className="rounded-l-sm border-r-[1px] border-gray-700 px-4 py-4 transition-all hover:bg-white hover:text-black "
        >
          listening
        </button>
        <button
          disabled={!user}
          className="border-r-[1px] border-gray-700 px-4 py-4 transition-all hover:bg-white hover:text-black"
        >
          listened
        </button>
        <button
          className={`rounded-r-sm px-4 py-4 transition-all hover:bg-white hover:text-black disabled:${!user} disabled:cursor-not-allowed`}
        >
          want to listen
        </button> */}
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full cursor-default rounded-lg border-[1px] border-gray-700 bg-black py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
            <span className="block truncate">{selected?.name}</span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute bottom-full mt-1 max-h-60 w-72 divide-y-2 divide-gray-900 overflow-auto rounded-md border-[1px] border-gray-700 bg-black py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {actions.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-white text-black" : "text-white"
                    }`
                  }
                  value={person}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-bold" : "font-normal"
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 right-0 flex items-center pl-3 pr-3 text-parp-500">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

export default ActionButtons;
