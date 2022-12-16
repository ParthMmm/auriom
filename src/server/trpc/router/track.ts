import { trackSearchFetch } from "@utils/urls/index";
import type { Image, Track, TrackSearch } from "@utils/types/index";
import { router, publicProcedure } from "../trpc";
import axios from "axios";
import { getTrackSearchSchema } from "@utils/schemas/albumSchema";

export const trackRouter = router({
  getTrackSearch: publicProcedure
    .input(getTrackSearchSchema)
    .query(async ({ input }) => {
      const res = await axios.get(trackSearchFetch + `&track=${input.query}`);
      const data = await res.data.results.trackmatches.track;

      const cleanedData = data.map((track: TrackSearch) => {
        if (!track.image) {
          return null;
        }

        const hasImage = track.image.map((image: Image) => {
          if (image["#text"].length === 0) {
            return false;
          }
          return true;
        });

        if (hasImage.includes(false)) {
          return null;
        }
        return track;
      });

      const filteredData: TrackSearch[] = cleanedData.filter(
        (track: TrackSearch) => track !== null
      );

      return filteredData;
    }),
});
