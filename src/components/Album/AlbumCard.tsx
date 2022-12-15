import type { Album } from "@utils/types";
import Image from "next/image";
import Link from "next/link";

type Props = {
  album: Album;
};

function AlbumCard({ album }: Props) {
  const image = album?.image.filter((image) => image.size === "extralarge")[0];

  if (!image) {
    return null;
  }
  const imageURL = image["#text"];
  console.log(imageURL);

  return (
    <Link
      href={{
        pathname: `/album/[album]/[artist]`,
        query: {
          artist: album.artist,
          album: album.name,
          mbid: album?.mbid,
        },
      }}
      as={`/album/${encodeURIComponent(album.name)}/${album.artist}`}
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
                {album.name}
              </span>
            </div>
            <div className="">
              <span className="text-sm md:text-lg">{album.artist}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default AlbumCard;
