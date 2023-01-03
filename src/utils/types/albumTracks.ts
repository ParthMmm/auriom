export type TracksRoot = {
  href: string;
  items: AlbumTracksItem[];
  limit: number;
  next: any;
  offset: number;
  previous: any;
  total: number;
};

export type AlbumTracksItem = {
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls2;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: any;
  track_number: number;
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
