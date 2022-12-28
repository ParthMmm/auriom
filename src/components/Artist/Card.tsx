import type { Artist } from "@utils/types";
import Link from "next/link";
import Image from "next/image";

function ArtistCard({ artist }: { artist: Artist }) {
  const image = artist?.image.filter((image) => image.size === "extralarge")[0];
  if (!image) {
    return null;
  }
  const imageURL = image["#text"];
  return (
    <Link
      href={{
        pathname: `/artist/[artist]`,
        query: {
          artist: artist.name,
          // album: album.name,
          mbid: artist?.mbid,
        },
      }}
      as={`/album/${encodeURIComponent(artist.name)}/${artist}`}
    >
      <div className="grid-playlist group cursor-pointer ">
        <div className="grid-playlist-hero">
          {imageURL && (
            <picture className="lazyPicture aspect-ratio ">
              <Image
                src={imageURL}
                alt={"album cover"}
                className="asset"
                fill
                // height={300}
                // width={456}
                quality={100}
                // unoptimized={true}
              />
            </picture>
          )}
        </div>
        <div className="grid-playlist-info-container mb-8  lg:mb-0">
          <div className="">
            <div className="">
              <span className="group-hover:shadow-highlight-blurple text-md font-bold transition-all md:text-2xl">
                {artist.name}
              </span>
            </div>
            <div className="">
              <span className="text-sm md:text-lg">{artist.name}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ArtistCard;
