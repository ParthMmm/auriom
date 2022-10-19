import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <main className="h-screen bg-black">
        <div className="h-full ">
          <div className="absolute top-[25%] p-20">
            <div className="flex flex-row items-center">
              <h1 className="text-8xl font-bold italic text-harlequin-500">
                albus
              </h1>
            </div>
            <div className="mt-12 flex flex-col items-start justify-start space-y-2"></div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
