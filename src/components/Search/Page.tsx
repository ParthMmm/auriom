import { useRouter } from 'next/router';

import { useStore } from '@store/app';

import Controller from './Controller';

function Page({}) {
  const router = useRouter();
  const query = router.query.input as string;

  const searchFilter = useStore(
    (state: { searchFilter: string }) => state.searchFilter
  );

  // console.log(data);

  return (
    <div className="grid-view">
      <div className="">
        <div className="container mx-auto mt-8 mb-12 flex items-center justify-between align-middle md:mt-16 md:max-w-7xl">
          <div className="w-full text-center md:text-left">
            <h1 className="font-bold text-2xl md:text-4xl">{query}</h1>
            <span className=""> results</span>
          </div>

          {/* <Filter /> */}
        </div>

        <div className="container mx-auto flex items-center justify-center pb-12 md:max-w-7xl">
          <Controller />
        </div>
      </div>
    </div>
  );
}

export default Page;
