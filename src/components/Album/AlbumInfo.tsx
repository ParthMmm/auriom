import dayjs from 'dayjs';
import Image from 'next/image';
import Link from 'next/link';

import type { AlbumInfoRoot } from '@utils/types/spotify/albumInfo';
import ActionButtons from './ActionButtons';

type Props = {
  album: AlbumInfoRoot;
};

function AlbumInfo({ album }: Props) {
  const imageURL = album?.images.filter((image) => image.height === 300)[0]
    ?.url;

  if (!imageURL) {
    return null;
  }
  //border-2 shadow-[6px_6px_0px_rgb(255,255,255)]
  const artists = album.artists.map((artist) => artist.name).join(', ');
  return (
    <div className="container">
      <div className="mt-24 mb-8 flex flex-col justify-between rounded-2xl   md:flex-row ">
        <div className="flex flex-col items-center md:flex-row ">
          <div className="">
            {imageURL && (
              <Image
                src={imageURL}
                alt={album.name}
                height={300}
                width={300}
                className=""
                quality={100}
              />
            )}
          </div>
          <div className="flex flex-col items-center gap-4  p-4 md:items-start md:justify-between  ">
            <div className="flex flex-col items-center md:items-start">
              <h1 className="text-3xl  font-bold md:w-3/4 md:text-4xl">
                {album.name}
              </h1>
              <h3 className=" text-xl md:text-3xl ">{artists}</h3>
              <span>{dayjs(album.release_date).format('MM-YYYY')}</span>
            </div>
            <div className="flex w-24 grow-0 flex-col items-center justify-center md:items-start md:justify-start">
              <Link href={album.external_urls.spotify}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                  className="h-6 w-6 fill-white"
                >
                  <path d="M248 8C111.1 8 0 119.1 0 256s111.1 248 248 248 248-111.1 248-248S384.9 8 248 8zm100.7 364.9c-4.2 0-6.8-1.3-10.7-3.6-62.4-37.6-135-39.2-206.7-24.5-3.9 1-9 2.6-11.9 2.6-9.7 0-15.8-7.7-15.8-15.8 0-10.3 6.1-15.2 13.6-16.8 81.9-18.1 165.6-16.5 237 26.2 6.1 3.9 9.7 7.4 9.7 16.5s-7.1 15.4-15.2 15.4zm26.9-65.6c-5.2 0-8.7-2.3-12.3-4.2-62.5-37-155.7-51.9-238.6-29.4-4.8 1.3-7.4 2.6-11.9 2.6-10.7 0-19.4-8.7-19.4-19.4s5.2-17.8 15.5-20.7c27.8-7.8 56.2-13.6 97.8-13.6 64.9 0 127.6 16.1 177 45.5 8.1 4.8 11.3 11 11.3 19.7-.1 10.8-8.5 19.5-19.4 19.5zm31-76.2c-5.2 0-8.4-1.3-12.9-3.9-71.2-42.5-198.5-52.7-280.9-29.7-3.6 1-8.1 2.6-12.9 2.6-13.2 0-23.3-10.3-23.3-23.6 0-13.6 8.4-21.3 17.4-23.9 35.2-10.3 74.6-15.2 117.5-15.2 73 0 149.5 15.2 205.4 47.8 7.8 4.5 12.9 10.7 12.9 22.6 0 13.6-11 23.3-23.2 23.3z" />
                </svg>
              </Link>
              <span>{album.total_tracks} songs</span>
            </div>

            <div className="flex flex-col items-center md:items-start">
              <span className=" text-sm text-gray-500">Label</span>
              <h5>{album.label}</h5>
            </div>
          </div>
        </div>
        <div className="mx-auto w-1/2 md:mx-0 md:w-2/12">
          <ActionButtons album={album} />
        </div>
      </div>
    </div>
  );
}

export default AlbumInfo;
