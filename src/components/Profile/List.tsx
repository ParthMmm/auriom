import Card from '@components/Album/Card';

import type { ActionInfo } from '@utils/types';

type Props = {
  data: ActionInfo[];
  title: string;
};

function List({ data, title }: Props) {
  return (
    <div className="  ">
      <h2 className=" text-2xl py-4 font-black">{title}</h2>
      <div className=" flex flex-row  overflow-x-scroll    ">
        {data?.map((obj) => (
          <Card album={obj?.album} key={obj?.id.toString() + obj?.userId} />
        ))}
      </div>
    </div>
  );
}

export default List;
