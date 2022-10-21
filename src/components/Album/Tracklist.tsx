import React from "react";
import { convertTime } from "../../utils/convertTime";
import { Tracks } from "../../utils/types";

type Props = {
  albumTracks: Tracks;
};

function Tracklist({ albumTracks }: Props) {
  return (
    <div className="mb-12 md:mb-24">
      <h2 className="text-4xl font-bold">tracklist</h2>

      <div className=" border-2 shadow-[6px_6px_0px_rgb(255,255,255)]">
        <div className=" ">
          {albumTracks.track.map((track) => (
            <div key={track.name} className="group p-2">
              <div className="   flex flex-row justify-between space-x-1">
                <div className="">
                  <span className="mr-1 font-bold">{track["@attr"].rank}.</span>

                  <span className="group-hover:shadow-highlight-blurple">
                    {track.name}
                  </span>
                </div>

                <div>
                  <span>{convertTime(track.duration)}</span>
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
