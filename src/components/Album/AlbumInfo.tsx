import React from "react";
import { AlbumInfo } from "../../utils/types";
import { NumericFormat } from "react-number-format";
import Image from "next/image";
type Props = {
  album: AlbumInfo;
};

function AlbumInfo({ album }: Props) {
  const image = album?.image.filter((image) => image.size === "mega")[0];

  if (!image) {
    return null;
  }
  if (!album.name) {
    return null;
  }

  const imageURL = image["#text"];

  return (
    <>
      <div className="mt-24 mb-8  w-full justify-center border-2 shadow-[6px_6px_0px_rgb(255,255,255)]">
        <div className="flex flex-row justify-between">
          <div>
            <div className="p-4">
              <h1 className="text-5xl font-bold">{album.name}</h1>
              <h3 className="text-3xl ">{album.artist}</h3>
            </div>
          </div>
          <div className="h-96 w-96">
            {imageURL && (
              <picture className="lazyPicture aspect-ratio">
                <Image
                  src={imageURL}
                  alt={album.name}
                  className="asset"
                  fill
                  quality={100}
                />
              </picture>
            )}
          </div>
        </div>

        <div className="flex flex-col md:flex-row ">
          <div>
            <div className="m-2 flex justify-between ">
              <div className="space-y-2">
                <div className="i flex flex-row items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    className="h-4 w-4 fill-current"
                  >
                    <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                  </svg>
                  <NumericFormat
                    value={album.playcount}
                    displayType="text"
                    thousandSeparator={true}
                  />
                </div>

                <div className="flex flex-row items-center space-x-1 ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 640 512"
                    className="h-4 w-4 fill-current"
                  >
                    <path d="M144 160c-44.2 0-80-35.8-80-80S99.8 0 144 0s80 35.8 80 80s-35.8 80-80 80zm368 0c-44.2 0-80-35.8-80-80s35.8-80 80-80s80 35.8 80 80s-35.8 80-80 80zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM416 224c0 53-43 96-96 96s-96-43-96-96s43-96 96-96s96 43 96 96zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                  </svg>
                  <NumericFormat
                    value={album.listeners}
                    displayType="text"
                    thousandSeparator={true}
                  />
                </div>
              </div>
            </div>
            {album?.tags?.tag && (
              <div className="ml-2  flex flex-row flex-wrap ">
                {album?.tags?.tag.map((tag) => (
                  <div key={tag.name} className="group  m-1  ">
                    <span className="group-hover:shadow-highlight-blurple italic">
                      {" "}
                      {tag.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="mx-2">
            <p>{album.cleanedHTML?.content}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AlbumInfo;
