import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';

import { PlusIcon } from '@heroicons/react/20/solid';
import { api } from '@utils/trpc';
import type { AlbumInfoRoot } from '@utils/types/spotify/albumInfo';
import ShelvesModal from './ShelvesModal';

type Props = {
  album: AlbumInfoRoot;
};

function ActionButtons({ album }: Props) {
  const { isSignedIn, user } = useUser();
  const [selected, setSelected] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  // console.log(selected);

  const user_id = user?.id;
  // const artists = album.artists.map((artist) => artist.name).join(', ');

  const id = album.id;

  const getSelected = api.albumAction.getUserActionsForAlbum.useQuery(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    { spotifyId: id, user_id: user_id },
    {
      enabled: !!id && !!isSignedIn,
    }
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

  const actionMutation = api.albumAction.handleAction.useMutation();

  const handleClick = async (action: string) => {
    if (user) {
      setSelected(action);

      await actionMutation.mutateAsync({
        spotifyId: album?.id,
        user_id: user?.id,
        action,
      });
    }
  };

  //left-[calc(50%-120px)]
  return (
    // <div className="fixed bottom-0 left-2/4 -translate-x-2/4 -translate-y-2/4   ">
    <div className="flex flex-col rounded-md border-[1px] bg-black">
      <button
        disabled={!user || actionMutation.isPending || selected === 'listening'}
        onClick={() => handleClick('listening')}
        className={`rounded-t-sm border-gray-700 border-b-[1px] px-4 py-4 transition-all hover:bg-white hover:text-black ${
          selected === 'listening' && 'bg-white text-black'
        }`}
      >
        listening
      </button>
      <button
        disabled={!user || actionMutation.isPending || selected === 'listened'}
        onClick={() => handleClick('listened')}
        className={` border-gray-700 border-b-[1px] px-4 py-4 transition-all hover:bg-white hover:text-black ${
          selected === 'listened' && 'bg-white text-black'
        }`}
      >
        listened
      </button>
      <button
        disabled={
          !user || actionMutation.isPending || selected === 'wantToListen'
        }
        onClick={() => handleClick('wantToListen')}
        className={` border-gray-700 border-b-[1px] px-4 py-4 transition-all hover:bg-white hover:text-black ${
          selected === 'wantToListen' && 'bg-white text-black'
        }`}
      >
        want to listen
      </button>

      <button
        disabled={
          !user || actionMutation.isPending || selected === 'wantToListen'
        }
        onClick={() => setIsOpen(true)}
        className={` group relative rounded-b-sm px-4 py-4 transition-all hover:bg-white hover:text-black `}
      >
        add to shelf
        <PlusIcon
          className=" absolute top-4 right-4 mx-auto my-auto h-6 w-6 text-white group-hover:text-black "
          aria-hidden="true"
        />
      </button>

      <ShelvesModal isOpen={isOpen} setIsOpen={setIsOpen} album={album} />
    </div>
    // </div>
  );
}

export default ActionButtons;
