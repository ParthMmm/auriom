import type { ArtistItem } from "@utils/types/spotify";
import Image from "next/image";
import Link from "next/link";

type Props = {
  artist: ArtistItem;
};

function SpotifyCard({ artist }: Props) {
  const imageURL = artist?.images.filter((image) => image.height === 640)[0]
    ?.url;

  if (!imageURL) {
    return null;
  }

  return (
    // <Link
    //   href={{
    //     pathname: `/artist/[artist]`,
    //     query: {
    //       artist: artist.name,

    //       uriLink: artist.uri,
    //     },
    //   }}
    //   as={`/artist/${encodeURIComponent(artist.name)}`}
    // >
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
            <span className="text-sm md:text-lg">{artist.followers.total}</span>
          </div>
        </div>
      </div>
    </div>
    // </Link>
  );
}

export default SpotifyCard;
