import type { Album, Image } from "@utils/types/index";
import { router, publicProcedure } from "../trpc";
import axios from "axios";
import { albumInfoFetch, albumSearchFetch } from "@utils/urls";
import type { AlbumInfo } from "@utils/types";
import { cleanHTML } from "@utils/cleanHTML";
import {
  getAlbumInfoSchema,
  getAlbumSearchSchema,
} from "@utils/schemas/albumSchema";

export const albumRouter = router({
  getAlbumInfo: publicProcedure
    .input(getAlbumInfoSchema)
    .query(async ({ input }) => {
      if (input?.mbid) {
        const res = await axios.get(albumInfoFetch + `&mbid=${input.mbid}`);
        const data = await res.data.album;

        if (data.wiki) {
          const cleanedHTML = cleanHTML(data?.wiki?.content);

          const modifiedData: AlbumInfo = { ...data, cleanedHTML };

          return modifiedData;
        }
        const modifiedData: AlbumInfo = data;
        return modifiedData;
      }

      if (input?.album && input?.artist) {
        const res = await axios.get(
          albumInfoFetch + `&album=${input.album} + &artist=${input.artist}`
        );
        const data = await res.data.album;

        if (data.wiki) {
          const cleanedHTML = cleanHTML(data?.wiki?.content);

          const modifiedData: AlbumInfo = { ...data, cleanedHTML };

          return modifiedData;
        }
        const modifiedData: AlbumInfo = data;
        return modifiedData;
      }

      return null;
    }),

  getAlbumSearch: publicProcedure
    .input(getAlbumSearchSchema)
    .query(async ({ input }) => {
      const res = await axios.get(albumSearchFetch + `&album=${input.query}`);
      const data = await res.data.results.albummatches.album;

      // return data;

      const cleanedData = data.map((album: Album) => {
        const hasImage = album.image.map((image: Image) => {
          if (image["#text"].length === 0) {
            return false;
          }
          return true;
        });

        if (hasImage.includes(false)) {
          return null;
        }
        return album;
      });

      const filteredData: Album[] = cleanedData.filter(
        (album: Album) => album !== null
      );

      return filteredData;
    }),
});
