import {
  FolderIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  RocketLaunchIcon,
  StarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';

const features = [
  {
    name: 'Log albums',
    description:
      'Easily organize and keep track of your listening history with custom shelves for your albums and tracks.',
    icon: FolderIcon,
  },
  {
    name: 'Follow friends',
    description:
      'Stay in the loop with what your friends and other members are listening to.',
    icon: UserGroupIcon,
  },
  {
    name: 'Discover new music',
    description:
      'Expand your music library and discover new albums, artists, and tracks. Never run out of new music to listen to.',
    icon: MagnifyingGlassIcon,
  },
  {
    name: 'Rate albums',
    description: 'Leave your mark by rating albums.',
    icon: StarIcon,
  },
  {
    name: 'Write reviews',
    description:
      'Join the conversation and share your thoughts with the community.',
    icon: PencilSquareIcon,
  },
  {
    name: '..and more to come!',
    description:
      'Keep an eye out for updates and new additions to the platform.',
    icon: RocketLaunchIcon,
  },
];

export default function Features() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className=" py-20 sm:py-24 lg:py-32">
          <div className="mx-auto max-w-xl px-6 lg:max-w-7xl lg:px-8">
            {/* <h2 className="sr-only">A better way to send money.</h2> */}
            <dl className="grid grid-cols-1 gap-16 lg:grid lg:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.name}>
                  <dt className="flex flex-col items-center text-center md:text-left md:items-start ">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-harlequin-500 text-white">
                      <feature.icon className="h-8 w-8" aria-hidden="true" />
                    </div>
                    <p className="mt-6 text-lg font-semibold leading-8 tracking-tight text-white">
                      {feature.name}
                    </p>
                  </dt>
                  <dd className="mt-2 text-base leading-7 text-gray-200 text-center md:text-left">
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
