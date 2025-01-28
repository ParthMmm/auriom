import { useEffect } from 'react';

import { msToTime } from '@utils/convertTime';
import type { AlbumTracksItem } from '@utils/types/spotify/albumTracks';

import { useStore } from '@store/app';

type Props = {
  albumTracks: AlbumTracksItem[];
};

function Tracklist({ albumTracks }: Props) {
  const setCurrentTracklist = useStore(
    (state: { setCurrentTracklist: (tracks: AlbumTracksItem[]) => void }) =>
      state.setCurrentTracklist
  );

  useEffect(() => {
    setCurrentTracklist(albumTracks);
  }, [albumTracks]);

  return (
    <div className="mb-12 w-full md:mb-24">
      <h2 className="font-bold text-4xl">tracklist</h2>

      <div className=" rounded-2xl border-2 shadow-[6px_6px_0px_rgb(255,255,255)]">
        <div className=" ">
          {albumTracks?.map((track) => (
            <div key={track.name} className="group p-2">
              <div className=" flex flex-row justify-between ">
                <div className="">
                  <span className="mr-1 font-bold tabular-nums">
                    {track.track_number}.
                  </span>

                  <span className="group-hover:shadow-highlight-blurple">
                    {track.name}
                  </span>
                  {track.explicit && (
                    <div className="inline-block pl-2 text-gray-500 text-xs">
                      E
                    </div>
                  )}
                </div>

                <div className="flex flex-row justify-end">
                  <p className="w-8 tabular-nums">
                    {msToTime(track.duration_ms)}
                  </p>
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
