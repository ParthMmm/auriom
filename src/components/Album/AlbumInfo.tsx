import React from "react";
import { AlbumInfo } from "../../utils/types";

type Props = {
  album: AlbumInfo;
};

function AlbumInfo({ album }: Props) {
  console.log(album);
  return (
    <>
      <div>
        <img src={album.image[3]["#text"]} alt={album.name} />
        <div>
          <h2>{album.name}</h2>
          <h3>{album.artist}</h3>
        </div>
        <div>
          <p>{album.cleanedHTML?.content}</p>
        </div>
      </div>
    </>
  );
}

export default AlbumInfo;
