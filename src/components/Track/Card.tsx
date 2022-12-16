import type { TrackSearch } from "@utils/types";
import React from "react";

function TrackCard({ track }: { track: TrackSearch }) {
  return (
    <div>
      {" "}
      <div>
        <div className="grid-playlist-info-container mb-8  lg:mb-0">
          <div className="">
            <div className="">
              <span className="group-hover:shadow-highlight-blurple text-md font-bold transition-all md:text-2xl">
                {track?.name}
              </span>
            </div>
            <div className="">
              <span className="text-sm md:text-lg">{track?.artist}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackCard;
