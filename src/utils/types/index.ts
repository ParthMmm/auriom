import type { EmailAddress } from "@clerk/nextjs/dist/api";

export type Album = {
  name: string;
  artist: string;
  url: string;
  image: Image[];
  streamable: string;
  mbid: string;
};

export type Image = {
  "#text": string;
  size: string;
};

export type Attr = {
  for: string;
};

export type Root = {
  album: Album;
};

export type AlbumInfo = {
  artist: string;
  mbid: string | undefined;
  tags: Tags | undefined;
  name: string;
  userplaycount: number;
  image: Image[];
  tracks: Tracks;
  listeners: string;
  playcount: string;
  url: string;
  wiki?: Wiki | undefined;
  cleanedHTML?: cleanedHTML | undefined;
};

export type cleanedHTML = {
  content: string;
  length: number;
};

export type Tags = {
  tag: Tag[];
};

export type Tag = {
  url: string;
  name: string;
};

export type Tracks = {
  track: Track[];
};

export type Track = {
  streamable: Streamable;
  duration: number;
  url: string;
  name: string;
  "@attr": AttrTrack;
  artist: Artist;
  image?: Image[];
  listeners?: string;
  mbid?: string;
};

export type TrackSearch = Omit<Track, "artist"> & {
  artist: string;
};

export type AttrTrack = {
  rank: string;
};

export type Streamable = {
  fulltrack: string;
  "#text": string;
};

export type TrackListAttr = {
  rank: number;
};

export type Artist = {
  url: string;
  name: string;
  mbid: string;
  listeners?: string;
  streamable?: string;
  image: Image[];
};

// export type ArtistInfo = Artist & {
//   listeners: string;
//   streamable: string;
//   image: Image[];
// };

export type Wiki = {
  published: string;
  summary: string;
  content: string;
};

export type User = {
  id: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string | null;
  username: string | null;
  profileImageURL: string | null;
  primaryEmailAddress: EmailAddress | null;
};
