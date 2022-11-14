import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import React from "react";
import { fetchAlbumSearch } from "../../utils/queries";
import { Album } from "../../utils/types";
import AlbumCard from "../Album/AlbumCard";

type Props = {};

function SearchPage({}: Props) {
  const router = useRouter();
  const input = router.query.input as string;

  const { isLoading, data, error } = useQuery(
    ["search", input],
    () => fetchAlbumSearch(input),
    {
      enabled: !!input,
    }
  );

  console.log(data);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="grid-view">
      <div className="grid-season">
        <h1 className="season-heading text-2xl">{input}</h1>
        <div className="grid-playlists-container">
          {/* <div className="grid grid-cols-4 grid-rows-4 gap-6"> */}
          {data?.results.albummatches.album.map((album: Album) => (
            <AlbumCard key={`${album.name} + ${album.artist}`} album={album} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
