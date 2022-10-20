import React from "react";
import { convertTime } from "../../utils/convertTime";
import { Tracks } from "../../utils/types";

type Props = {
  albumTracks: Tracks;
};

function Tracklist({ albumTracks }: Props) {
  return (
    <div>
      <div className="flex flex-col">
        {albumTracks.track.map((track) => (
          <div
            key={track.name}
            className="flex flex-row justify-between space-x-2"
          >
            <div className="space-x-1">
              <b>{track["@attr"].rank}.</b>

              <span>{track.name}</span>
            </div>

            <span>{convertTime(track.duration)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tracklist;
