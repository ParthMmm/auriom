import Card from '@components/Album/Card';

import type { AlbumInfo } from '@utils/types';

type Props = {
  data: {
    id: number;
    userId: string;
    albumID: string;
    createdAt: Date;
    album: AlbumInfo;
  }[];
  title: string;
};

function List({ data, title }: Props) {
  console.log(data);
  return (
    <div>
      <h2 className=" text-2xl font-black">{title}</h2>
      <div className=" flex flex-row gap-8  border-2 border-gray-700 p-4">
        {data?.slice(0, 4).map((obj) => (
          <Card album={obj?.album} key={obj?.id.toString() + obj?.userId} />
        ))}
      </div>
    </div>
  );
}

export default List;
