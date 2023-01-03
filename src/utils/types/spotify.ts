export type Root = {
  albums: Albums;
  artists: Artists;
  tracks: Tracks;
};

export type Albums = {
  href: string;
  items: AlbumItem[];
  limit: number;
  next: string;
  offset: number;
  previous: any;
  total: number;
};

export type AlbumItem = {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls2;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

export type Artist = {
  external_urls: ExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type ExternalUrls = {
  spotify: string;
};

export type ExternalUrls2 = {
  spotify: string;
};

export type Image = {
  height: number;
  url: string;
  width: number;
};

export type Artists = {
  href: string;
  items: ArtistItem[];
  limit: number;
  next: string;
  offset: number;
  previous: any;
  total: number;
};

export type ArtistItem = {
  external_urls: ExternalUrls3;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image2[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

export type ExternalUrls3 = {
  spotify: string;
};

export type Followers = {
  href: any;
  total: number;
};

export type Image2 = {
  height: number;
  url: string;
  width: number;
};

export type Tracks = {
  href: string;
  items: TrackItem[];
  limit: number;
  next: string;
  offset: number;
  previous: any;
  total: number;
};

export type TrackItem = {
  album: Album;
  artists: Artist3[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls7;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url?: string;
  track_number: number;
  type: string;
  uri: string;
};

export type Album = {
  album_type: string;
  artists: Artist2[];
  available_markets: string[];
  external_urls: ExternalUrls5;
  href: string;
  id: string;
  images: Image3[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

export type Artist2 = {
  external_urls: ExternalUrls4;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type ExternalUrls4 = {
  spotify: string;
};

export type ExternalUrls5 = {
  spotify: string;
};

export type Image3 = {
  height: number;
  url: string;
  width: number;
};

export type Artist3 = {
  external_urls: ExternalUrls6;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
};

export type ExternalUrls6 = {
  spotify: string;
};

export type ExternalIds = {
  isrc: string;
};

export type ExternalUrls7 = {
  spotify: string;
};
