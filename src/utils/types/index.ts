export interface Album {
  name: string;
  artist: string;
  url: string;
  image: Image[];
  streamable: string;
  mbid: string;
}

export interface Image {
  "#text": string;
  size: string;
}

export interface Attr {
  for: string;
}

export interface Root {
  album: Album;
}

export interface AlbumInfo {
  artist: string;
  mbid: string;
  tags: Tags;
  name: string;
  userplaycount: number;
  image: Image[];
  tracks: Tracks;
  listeners: string;
  playcount: string;
  url: string;
  wiki: Wiki;
}

export interface Tags {
  tag: Tag[];
}

export interface Tag {
  url: string;
  name: string;
}

export interface Tracks {
  track: Track[];
}

export interface Track {
  streamable: Streamable;
  duration: number;
  url: string;
  name: string;
  "@attr": Attr;
  artist: Artist;
}

export interface Streamable {
  fulltrack: string;
  "#text": string;
}

export interface TrackListAttr {
  rank: number;
}

export interface Artist {
  url: string;
  name: string;
  mbid: string;
}

export interface Wiki {
  published: string;
  summary: string;
  content: string;
}
