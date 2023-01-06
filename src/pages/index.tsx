import Landing from "@components/Home/Landing";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <main className="h-screen bg-black">
        <Landing />
      </main>
    </>
  );
};

export default Home;
