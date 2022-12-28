import { artistInfoFetch, artistSearchFetch } from "@utils/urls/index";
import type { Album, Artist, Image } from "@utils/types/index";
import { router, publicProcedure } from "../trpc";
import axios from "axios";

import { getArtistSearchSchema } from "@utils/schemas/albumSchema";

export const artistRouter = router({
  getArtistSearch: publicProcedure
    .input(getArtistSearchSchema)
    .query(async ({ input }) => {
      const res = await axios.get(artistSearchFetch + `&artist=${input.query}`);
      const data = await res.data.results.artistmatches.artist;

      const cleanedData = data.map((artist: Artist) => {
        if (!artist.image) {
          return null;
        }
        const hasImage = artist?.image.map((image: Image) => {
          if (image["#text"].length === 0) {
            return false;
          }
          return true;
        });

        if (hasImage.includes(false)) {
          return null;
        }
        return artist;
      });

      const filteredData: Artist[] = cleanedData.filter(
        (artist: Artist) => artist !== null
      );

      return filteredData;
    }),
  getArtistInfoSearch: publicProcedure
    .input(getArtistSearchSchema)
    .query(async ({ input }) => {
      const res = await axios.get(artistInfoFetch + `&artist=${input.query}`);

      const data = await res.data;
      return data;
      // const cleanedData = data.map((artist: ArtistInfo) => {
      //   const hasImage = artist.image.map((image: Image) => {
      //     if (image["#text"].length === 0) {
      //       return false;
      //     }
      //     return true;
      //   });

      //   if (hasImage.includes(false)) {
      //     return null;
      //   }
      //   return artist;
      // });

      // const filteredData: Album[] = cleanedData.filter(
      //   (album: Album) => album !== null
      // );

      // return filteredData;
    }),
});
