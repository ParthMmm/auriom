import type { User } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import {
  LastFMLogo,
  SoundCloudLogo,
  SpotifyLogo,
  TwitterLogo,
} from 'src/lib/svgs';

type Props = { userInfo: User };

function ExternalAccounts({ userInfo }: Props) {
  //make urls for each external account
  const twitterUrl = `https://twitter.com/${userInfo.twitterAccount}`;
  const spotifyUrl = `https://open.spotify.com/user/${userInfo.spotifyAccount}`;
  const lastFMUrl = `https://www.last.fm/user/${userInfo.lastFmAccount}`;
  const soundcloudUrl = `https://soundcloud.com/${userInfo.soundCloudAccount}`;

  return (
    <div className="flex flex-row gap-4">
      {userInfo.spotifyAccount && (
        <div>
          <Link
            href={spotifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            <SpotifyLogo />
          </Link>
        </div>
      )}
      {userInfo.twitterAccount && (
        <div>
          <Link
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            <TwitterLogo />
          </Link>
        </div>
      )}
      {userInfo.soundCloudAccount && (
        <div>
          <Link
            href={soundcloudUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            <SoundCloudLogo />
          </Link>
        </div>
      )}
      {userInfo.lastFmAccount && (
        <div>
          <Link
            href={lastFMUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white"
          >
            <LastFMLogo />
          </Link>
        </div>
      )}
    </div>
  );
}

export default ExternalAccounts;
