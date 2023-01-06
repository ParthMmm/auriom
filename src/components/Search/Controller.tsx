import { useStore } from '@store/app';

import Albums from './Albums';
import Artists from './Artists';
import Tracks from './Tracks';

function Controller({}) {
  const filter = useStore((state) => state.searchFilter);

  if (filter === 'album') {
    return <Albums />;
  }
  if (filter === 'track') {
    return <Tracks />;
  }
  if (filter === 'artist') {
    return <Artists />;
  }

  return <div>all</div>;
}

export default Controller;
