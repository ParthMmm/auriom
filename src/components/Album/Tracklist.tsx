import { useEffect } from 'react';

import { msToTime } from '@utils/convertTime';
import type { AlbumTracksItem } from '@utils/types/albumTracks';

import { useStore } from '@store/app';

type Props = {
  albumTracks: AlbumTracksItem[];
};

function Tracklist({ albumTracks }: Props) {
  const setCurrentTracklist = useStore((state) => state.setCurrentTracklist);

  useEffect(() => {
    setCurrentTracklist(albumTracks);
  }, [albumTracks]);

  return (
    <div className="mb-12 w-full md:mb-24">
      <h2 className="text-4xl font-bold">tracklist</h2>

      <div className=" rounded-2xl border-2 shadow-[6px_6px_0px_rgb(255,255,255)]">
        <div className=" ">
          {albumTracks?.map((track) => (
            <div key={track.name} className="group p-2">
              <div className="   flex flex-row justify-between space-x-1">
                <div className="">
                  <span className="mr-1 font-bold">{track.track_number}.</span>

                  <span className="group-hover:shadow-highlight-blurple">
                    {track.name}
                  </span>
                  {track.explicit && (
                    <div className="inline-block pl-2 text-xs text-gray-500">
                      E
                    </div>
                  )}
                </div>

                <div>
                  <span>{msToTime(track.duration_ms)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Tracklist;
// box-shadow: 4px 4px 0px #000000;
// border-radius: 4px;
