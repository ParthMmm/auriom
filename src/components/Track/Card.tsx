import React from 'react';

import type { TrackItem } from '@utils/types/spotify';

type Props = {
  track: TrackItem;
};

function TrackCard({ track }: Props) {
  return (
    <div>
      {' '}
      <div>
        <div className="grid-playlist-info-container mb-8  lg:mb-0">
          <div className="">
            <div className="">
              <span className="group-hover:shadow-highlight-blurple text-md font-bold transition-all md:text-2xl">
                {track?.name}
              </span>
            </div>
            <div className="">
              <span className="text-sm md:text-lg">
                {track?.artists[0]?.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackCard;
