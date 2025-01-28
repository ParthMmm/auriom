import dynamic from 'next/dynamic';
import Link from 'next/link';

const Search = dynamic(() => import('./Search'), {
  ssr: false,
});

const AuthButtons = dynamic(() => import('./AuthButtons'), {
  ssr: false,
});

function Navbar({}) {
  return (
    <nav className="mx-auto max-w-7xl ">
      <div className=" z-20 border-gray-500 border-b-[1px] bg-black ">
        <div className="flex ">
          <div className="flex basis-2/12 items-center justify-center p-2 md:px-4 md:py-4 ">
            <h1 className=" font-black text-white text-xl tracking-tight md:text-5xl">
              <Link href="/" className="group">
                <svg
                  className="h-10 w-10"
                  width="100"
                  height="100"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_112_9)">
                    <path
                      d="M42.296 74.248C49.304 74.248 54.968 71.656 58.04 66.76H59V73H73.208V40.552C73.208 29.416 64.28 22.312 50.264 22.312C36.44 22.312 27.512 29.224 27.512 39.976H41.432C41.336 35.08 44.888 32.2 50.072 32.2C55.736 32.2 59 35.368 59 40.072V42.088L48.536 43.336C33.08 45.256 25.304 50.92 25.304 60.136C25.304 68.968 32.216 74.248 42.296 74.248ZM47 64.936C42.104 64.936 39.224 62.632 39.224 58.984C39.224 55.624 41.912 52.84 48.92 51.976L59 50.728V54.184C59 60.328 54.104 64.936 47 64.936Z"
                      fill="white"
                    />
                  </g>
                  <rect
                    x="4"
                    y="4"
                    width="92"
                    height="92"
                    rx="46"
                    stroke="white"
                    strokeWidth="8"
                    className="group-hover:stroke-harlequin-500"
                  />
                  <defs>
                    <clipPath id="clip0_112_9">
                      <rect width="100" height="100" rx="50" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </Link>
            </h1>
          </div>
          <div className="flex w-full basis-8/12 items-center justify-start border-gray-700 border-l-[1px] md:px-4 md:py-4 ">
            <Search />
          </div>
          <div className="flex basis-2/12 items-center justify-center border-gray-700 border-l-[1px] md:px-4 md:py-4 ">
            <AuthButtons />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
