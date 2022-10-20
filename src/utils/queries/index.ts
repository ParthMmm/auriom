import { albumInfoFetch } from "./../urls/index";
import axios from "axios";
import { albumSearchFetch } from "../urls";
import { AlbumInfo } from "../types";

export const fetchAlbumSearch = async (query: string) => {
  const res = await axios.get(albumSearchFetch + `&album=${query}`);
  const data = await res.data;

  return data;
};

export const fetchAlbumInfo = async (
  album: string,
  artist: string,
  mbid: string
) => {
  if (mbid) {
    const res = await axios.get(albumInfoFetch + `&mbid=${mbid}`);
    const data = await res.data;
    return data as AlbumInfo;
  }

  const res = await axios.get(
    albumInfoFetch + `&album=${album} + &artist=${artist}`
  );
  const data = await res.data.album;

  return data as AlbumInfo;
};
