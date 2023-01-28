import dynamic from 'next/dynamic';

import Hero from './Hero';

const NewReleases = dynamic(() => import('./NewReleases'), { suspense: true });

const Features = dynamic(() => import('./Features'), { suspense: true });

function Landing({}) {
  return (
    <div className=" flex flex-col items-center justify-start gap-4 bg-black">
      <Hero />
      <NewReleases />
      <Features />
    </div>
  );
}

export default Landing;
