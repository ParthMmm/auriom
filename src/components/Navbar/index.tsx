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
    <nav className="mx-auto max-w-7xl ">
      <div className=" z-20 border-b-[1px] border-gray-500 bg-black   ">
        <div className="flex  ">
          <div className="flex basis-2/12 items-center justify-center p-2 md:py-4 md:px-4  ">
            <h1 className=" text-xl  font-black tracking-tight text-white md:text-5xl">
              <Link href="/" className="group">
                <svg
                  className="h-10 w-10 "
                  viewBox="0 0 108 127"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M45.296 94.248C52.304 94.248 57.968 91.656 61.04 86.76H62V93H76.208V60.552C76.208 49.416 67.28 42.312 53.264 42.312C39.44 42.312 30.512 49.224 30.512 59.976H44.432C44.336 55.08 47.888 52.2 53.072 52.2C58.736 52.2 62 55.368 62 60.072V62.088L51.536 63.336C36.08 65.256 28.304 70.92 28.304 80.136C28.304 88.968 35.216 94.248 45.296 94.248ZM50 84.936C45.104 84.936 42.224 82.632 42.224 78.984C42.224 75.624 44.912 72.84 51.92 71.976L62 70.728V74.184C62 80.328 57.104 84.936 50 84.936Z"
                    fill="white"
                  />
                  <g filter="url(#filter0_d_112_9)">
                    <rect
                      x="8"
                      y="23"
                      width="92"
                      height="92"
                      rx="46"
                      stroke="white"
                      strokeWidth="8"
                      shapeRendering="crispEdges"
                      className="group-hover:stroke-harlequin-500"
                    />
                  </g>
                  <defs>
                    <filter
                      id="filter0_d_112_9"
                      x="0"
                      y="19"
                      width="108"
                      height="108"
                      filterUnits="userSpaceOnUse"
                      colorInterpolationFilters="sRGB"
                    >
                      <feFlood floodOpacity="0" result="BackgroundImageFix" />
                      <feColorMatrix
                        in="SourceAlpha"
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                        result="hardAlpha"
                      />
                      <feOffset dy="4" />
                      <feGaussianBlur stdDeviation="2" />
                      <feComposite in2="hardAlpha" operator="out" />
                      <feColorMatrix
                        type="matrix"
                        values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
                      />
                      <feBlend
                        mode="normal"
                        in2="BackgroundImageFix"
                        result="effect1_dropShadow_112_9"
                      />
                      <feBlend
                        mode="normal"
                        in="SourceGraphic"
                        in2="effect1_dropShadow_112_9"
                        result="shape"
                      />
                    </filter>
                  </defs>
                </svg>
              </Link>
            </h1>
          </div>
          <div className="flex w-full basis-8/12 items-center justify-start  border-l-[1px] border-gray-700 md:py-4 md:px-4   ">
            <Search />
          </div>
          <div className="flex basis-2/12 items-center justify-center  border-l-[1px] border-gray-700 md:py-4 md:px-4  ">
            <AuthButtons />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
