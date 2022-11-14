import { cleanHTML } from "./../cleanHTML";
import { albumInfoFetch } from "./../urls/index";
import axios from "axios";
import { albumSearchFetch } from "../urls";
import { AlbumInfo } from "../types";
import { User } from "../../pages/api/user";

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

  const cleanedHTML = cleanHTML(data.wiki.content);

  const modifiedData = { ...data, cleanedHTML };

  return modifiedData as AlbumInfo;
};

export const logIn = async (username: string) => {
  const res = await axios.post("/api/login", {
    username,
  });

  const data = await res.data;

  return data;
};

export const register = async (user: User) => {
  const res = await axios.post("/api/register", {
    user,
  });

  const data = await res.data;

  return data;
};
