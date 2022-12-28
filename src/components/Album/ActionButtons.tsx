import { useUser } from "@clerk/nextjs";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { trpc } from "@utils/trpc";
import { Fragment, useEffect, useState } from "react";

const actions = [
  { name: "currently listening", value: "listening" },
  { name: "listened", value: "listened" },
  { name: "want to listen", value: "wantToListen" },
];

type Props = {
  album: string;
  artist: string;
  mbid: string;
};

function ActionButtons({ album, artist, mbid }: Props) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [selected, setSelected] = useState("");
  // console.log(selected);

  const user_id = user?.id;

  const getSelected = trpc.albumAction.getActions.useQuery(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    { album, artist, user_id: user_id },
    {
      enabled: isLoaded && isSignedIn && !!user_id,
    }
  );

  useEffect(() => {
    if (getSelected.data?.ifListened) {
      setSelected("listened");
    } else if (getSelected.data?.ifListening) {
      setSelected("listening");
    } else if (getSelected.data?.ifWantToListen) {
      setSelected("wantToListen");
    }
  }, [getSelected.data]);

  const listenedMutation = trpc.albumAction.handleAction.useMutation();

  const handleClick = async (action: string) => {
    if (user) {
      setSelected(action);

      const res = await listenedMutation.mutateAsync({
        album,
        artist,
        mbid,
        user_id: user?.id,
        action,
      });
    }
  };

  return (
    <div className="fixed left-[calc(50%-120px)] bottom-0   mb-12">
      <div className="flex flex-row rounded-md border-[1px] border-gray-700 bg-black">
        <button
          disabled={
            !user || listenedMutation.isLoading || selected === "listening"
          }
          onClick={() => handleClick("listening")}
          className={`rounded-l-sm border-r-[1px] border-gray-700 px-4 py-4 transition-all hover:bg-white hover:text-black ${
            selected === "listening" && "bg-white text-black"
          }`}
        >
          listening
        </button>
        <button
          disabled={!user || listenedMutation.isLoading}
          onClick={() => handleClick("listened")}
          className={`rounded-l-sm border-r-[1px] border-gray-700 px-4 py-4 transition-all hover:bg-white hover:text-black ${
            selected === "listened" && "bg-white text-black"
          }`}
        >
          listened
        </button>
        <button
          disabled={!user || listenedMutation.isLoading}
          onClick={() => handleClick("wantToListen")}
          className={`rounded-l-sm border-r-[1px] border-gray-700 px-4 py-4 transition-all hover:bg-white hover:text-black ${
            selected === "wantToListen" && "bg-white text-black"
          }`}
        >
          want to listen
        </button>
      </div>
      {/* <Listbox value={selected} onChange={setSelected}>
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
              {actions.map((action, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 px-4 ${
                      active ? "bg-white text-black" : "text-white"
                    }`
                  }
                  value={action.value}
                  onClick={() => handleClick()}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? "font-bold" : "font-normal"
                        }`}
                      >
                        {action.name}
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
      </Listbox> */}
    </div>
  );
}

export default ActionButtons;
