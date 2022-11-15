import Link from "next/link";

import AuthButtons from "./AuthButtons";
import Search from "./Search";

function Navbar({}) {
  return (
    <nav>
      <div className="sticky top-0 z-10 ">
        <div className="container mx-auto max-w-screen-xl p-5">
          <div className="flex flex-row items-center justify-between align-middle sm:h-16 lg:pt-4">
            <div>
              <h1 className="text-4xl font-bold italic tracking-tight text-white md:text-6xl">
                <Link href="/">albus</Link>
              </h1>
            </div>

            <Search />

            <AuthButtons />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
