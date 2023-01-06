import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

import { trpc } from '@utils/trpc';
import type { AlbumInfoRoot } from '@utils/types/albumInfo';

const actions = [
  { name: 'currently listening', value: 'listening' },
  { name: 'listened', value: 'listened' },
  { name: 'want to listen', value: 'wantToListen' },
];

type Props = {
  album: AlbumInfoRoot;
};

function ActionButtons({ album }: Props) {
  const { isLoaded, isSignedIn, user } = useUser();
  const [selected, setSelected] = useState('');
  // console.log(selected);

  const user_id = user?.id;
  const artists = album.artists.map((artist) => artist.name).join(', ');

  const getSelected = trpc.albumAction.getUserActionsForAlbum.useQuery(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    { uri: album?.uri, user_id: user_id },
    {
      enabled: !!user_id && !!isSignedIn,
    },
  );

  useEffect(() => {
    if (getSelected.data?.ifListened) {
      setSelected('listened');
    } else if (getSelected.data?.ifListening) {
      setSelected('listening');
    } else if (getSelected.data?.ifWantToListen) {
      setSelected('wantToListen');
    }
  }, [getSelected.data]);

  const actionMutation = trpc.albumAction.handleAction.useMutation();

  const handleClick = async (action: string) => {
    if (user) {
      setSelected(action);

      await actionMutation.mutateAsync({
        uri: album?.uri,
        user_id: user?.id,
        action,
      });
    }
  };

  //left-[calc(50%-120px)]
  return (
    <div className="fixed bottom-0 left-2/4 -translate-x-2/4 -translate-y-2/4   ">
      <div className="flex flex-row rounded-md border-[1px] border-gray-700 bg-black">
        <button
          disabled={
            !user || actionMutation.isLoading || selected === 'listening'
          }
          onClick={() => handleClick('listening')}
          className={`rounded-l-sm border-r-[1px] border-gray-700 px-4 py-4 transition-all hover:bg-white hover:text-black ${
            selected === 'listening' && 'bg-white text-black'
          }`}
        >
          listening
        </button>
        <button
          disabled={
            !user || actionMutation.isLoading || selected === 'listened'
          }
          onClick={() => handleClick('listened')}
          className={`rounded-l-sm border-r-[1px] border-gray-700 px-4 py-4 transition-all hover:bg-white hover:text-black ${
            selected === 'listened' && 'bg-white text-black'
          }`}
        >
          listened
        </button>
        <button
          disabled={
            !user || actionMutation.isLoading || selected === 'wantToListen'
          }
          onClick={() => handleClick('wantToListen')}
          className={`rounded-l-sm border-r-[1px] border-gray-700 px-4 py-4 transition-all hover:bg-white hover:text-black ${
            selected === 'wantToListen' && 'bg-white text-black'
          }`}
        >
          want to listen
        </button>
      </div>
    </div>
  );
}

export default ActionButtons;
