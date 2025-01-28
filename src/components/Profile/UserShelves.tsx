import Card from '@components/Album/Card';
import type { ShelfInfo } from '@utils/types';

type Props = {
  data: ShelfInfo[];
  title: string;
};

function UserShelves({ title, data }: Props) {
  if (data.length === 0) return null;
  return (
    <div className="  ">
      <h2 className=" py-4 font-black text-2xl">{title}</h2>
      <div className=" flex flex-row overflow-x-scroll ">
        {data?.map((obj) => (
          <Card album={obj} key={obj?.id.toString()} />
        ))}
      </div>
    </div>
  );
}

export default UserShelves;
