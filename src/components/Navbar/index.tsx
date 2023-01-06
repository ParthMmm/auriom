import dynamic from 'next/dynamic';
import Link from 'next/link';

const Search = dynamic(() => import('./Search'), {
  suspense: true,
});

const AuthButtons = dynamic(() => import('./AuthButtons'), {
  suspense: true,
});

function Navbar({}) {
  return (
    <nav>
      <div className="fixed top-0 z-20  w-full border-b-[1px] border-gray-50 bg-black  ">
        <div className="flex w-full    ">
          <div className="flex basis-2/12 items-center justify-center py-8 px-4  ">
            <h1 className=" text-4xl  font-black tracking-tight text-white md:text-6xl">
              <Link href="/">auriom</Link>
            </h1>
          </div>
          <div className="flex w-full basis-8/12 items-center justify-start  border-l-[1px] border-gray-700 py-8 px-4   ">
            <Search />
          </div>
          <div className="flex basis-2/12 items-center justify-center  border-l-[1px] border-gray-700 py-8 px-4  ">
            <AuthButtons />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
