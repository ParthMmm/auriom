import type { NextPage } from 'next';

import Landing from '@components/Home/Landing';

const Home: NextPage = () => (
  <>
    <main className="h-screen bg-black">
      <Landing />
    </main>
  </>
);

export default Home;
