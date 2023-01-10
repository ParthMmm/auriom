import { Disclosure, Listbox } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { Fragment, useState } from 'react';

import { msToTime } from '@utils/convertTime';

import { useStore } from '@store/app';

function TracklistSelect({}) {
  const currentTracklist = useStore((state) => state.currentTracklist);

  const [tracks, setTracks] = useState([]);

  const setFavoriteTracks = useStore((state) => state.setFavoriteTracks);

  setFavoriteTracks(tracks);

  return (
    <div className=" absolute w-96">
      <Disclosure as="div" className="mt-2">
        {({ open }) => (
          <>
            <Disclosure.Button className="flex w-full items-center justify-between rounded-lg px-4 py-2 text-left align-middle text-xl  text-white hover:text-parp-500 focus:outline-none focus-visible:text-parp-500 focus-visible:ring focus-visible:ring-opacity-75">
              <div>
                <div>What were your favorite track(s)?</div>
                <div className="text-sm text-gray-500">3 max</div>
              </div>

              <ChevronUpIcon
                className={`${
                  open ? 'rotate-180 transform' : ''
                } h-5 w-5 text-parp-500`}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="px-4  pb-2 text-sm text-white">
              <Listbox value={tracks} onChange={setTracks} multiple>
                <div className="relative mt-1 ">
                  {true && (
                    <Listbox.Options
                      static
                      className="absolute mt-1 w-full overflow-scroll rounded-md  py-1  ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                      {currentTracklist.map((track) => (
                        <Listbox.Option
                          key={track.id}
                          className={({ active, disabled, selected }) =>
                            `relative cursor-pointer select-none py-2  pr-4 ${
                              active ? ' text-parp-500' : 'text-white'
                            } `
                          }
                          value={track}
                          //   disabled={!selected && tracks.length >= 3}
                        >
                          {({ selected, disabled }) => (
                            <div
                              className={` ${
                                selected
                                  ? '  font-black text-parp-500'
                                  : 'bg-black text-white'
                              } 
                              ${
                                disabled && !selected
                                  ? 'cursor-not-allowed'
                                  : ' cursor-pointer'
                              }
                              `}
                            >
                              <div className="flex flex-row justify-between">
                                <div className="flex flex-row items-center justify-start text-left align-middle ">
                                  <div className="mr-2  font-black">
                                    {track.track_number}.
                                  </div>
                                  <div
                                    className={` w-60 truncate   ${
                                      selected ? 'font-black' : 'font-normal'
                                    }`}
                                  >
                                    {track.name}
                                    {track.explicit && (
                                      <div className="inline-block pl-2 text-xs text-gray-500">
                                        E
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div>{msToTime(track.duration_ms)}</div>
                              </div>
                            </div>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  )}
                </div>
              </Listbox>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </div>
  );
}

export default TracklistSelect;
