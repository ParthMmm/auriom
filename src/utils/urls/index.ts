export const tagTopAlbumsFetch = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&format=json&limit=10${process.env.NEXT_PUBLIC_LAST_FM_KEY}`;
export const albumInfoFetch = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&format=json${process.env.NEXT_PUBLIC_LAST_FM_KEY}`;
export const albumSearchFetch = `https://ws.audioscrobbler.com/2.0/?method=album.search&format=json${process.env.NEXT_PUBLIC_LAST_FM_KEY}`;
export const chartTopArtists = `https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&format=json&limit=10${process.env.NEXT_PUBLIC_LAST_FM_KEY}`;
export const chartTopTracks = `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&format=json&limit=10${process.env.NEXT_PUBLIC_LAST_FM_KEY}`;
