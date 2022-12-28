import Landing from "@components/Home/Landing";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <main className="h-screen bg-black">
        {/* <div className="h-full ">
          <div className="absolute top-[25%] p-20">
            <div className="flex flex-row items-center"></div>
            <div className="mt-12 flex flex-col items-start justify-start space-y-2"></div>
          </div>
        </div> */}
        <Landing />
      </main>
    </>
  );
};

export default Home;
