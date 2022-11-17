import { router, publicProcedure } from "../trpc";
import axios from "axios";
import { albumInfoFetch, albumSearchFetch } from "../../../utils/urls";
import type { AlbumInfo } from "../../../utils/types";
import { cleanHTML } from "../../../utils/cleanHTML";
import {
  getAlbumInfoSchema,
  getAlbumSearchSchema,
} from "../../../utils/schemas/albumSchema";

export const albumRouter = router({
  getAlbumInfo: publicProcedure
    .input(getAlbumInfoSchema)
    .query(async ({ input }) => {
      if (input?.mbid) {
        const res = await axios.get(albumInfoFetch + `&mbid=${input.mbid}`);
        const data = await res.data;
        return data as AlbumInfo;
      }
      const res = await axios.get(
        albumInfoFetch + `&album=${input.album} + &artist=${input.artist}`
      );
      const data = await res.data.album;

      const cleanedHTML = cleanHTML(data.wiki.content);

      const modifiedData: AlbumInfo = { ...data, cleanedHTML };

      return modifiedData;
    }),

  getAlbumSearch: publicProcedure
    .input(getAlbumSearchSchema)
    .query(async ({ input }) => {
      const res = await axios.get(albumSearchFetch + `&album=${input.query}`);
      const data = await res.data;

      return data;
    }),
});
