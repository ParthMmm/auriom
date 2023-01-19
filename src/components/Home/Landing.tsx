import dynamic from 'next/dynamic';

import Hero from './Hero';

const NewReleases = dynamic(() => import('./NewReleases'), { suspense: true });

const Features = dynamic(() => import('./Features'), { suspense: true });

function Landing({}) {
  return (
    <div className=" flex flex-col items-center justify-start bg-black gap-4">
      <Hero />
      <NewReleases />
      <Features />
    </div>
  );
}

export default Landing;
