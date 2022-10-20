import React from "react";
import { Album } from "../../utils/types";
import Image from "next/future/image";
import Link from "next/link";

type Props = {
  album: Album;
};

function AlbumCard({ album }: Props) {
  return (
    <>
      <div className=" flex flex-col items-center justify-center rounded-md border-4  border-white ">
        <Link
          href={{
            pathname: `/album/[album]/[artist]`,
            query: {
              artist: album.artist,
              album: album.name,
              mbid: album?.mbid,
            },
          }}
          as={`/album/${album.name}/${album.artist}`}
        >
          <div className="">
            {album?.image[2]["#text"] && (
              <div>
                <div>
                  <Image
                    src={album?.image[2]["#text"]}
                    alt={"album cover"}
                    width="250"
                    height="250"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col items-center justify-center align-middle">
              <h2 className="font-bold">{album.name}</h2>
              <h3 className="italic">{album.artist}</h3>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
}

export default AlbumCard;
