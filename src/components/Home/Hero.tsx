import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="">
      <div className="mx-auto max-w-2xl py-16 px-6 text-center sm:py-20 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          <span className="block">Dive into new albums.</span>
          <span className="block">Keep track of what you like.</span>
          <span className="block">Share your thoughts.</span>
        </h2>
        <Link
          href="/auth/sign-up"
          className="mt-8 inline-flex w-full items-center align-middle transition-all gap-2 justify-center rounded-md border border-transparent bg-harlequin-500 px-5 py-3 text-base font-medium text-black  hover:text-white sm:w-auto"
        >
          Become a tastemaker today
          <ArrowRightIcon className="h-5 w-5" />
        </Link>
        <p className="mt-6 text-lg leading-6 text-gray-500">
          The social platform for music lovers.
        </p>
      </div>
    </div>
  );
}
