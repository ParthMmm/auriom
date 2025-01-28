import { ArrowRightIcon } from '@heroicons/react/20/solid';
import Link from 'next/link';

export default function Hero() {
  return (
    <div className="">
      <div className="mx-auto max-w-2xl px-6 py-16 text-center sm:py-20 lg:px-8">
        <h2 className="font-bold text-3xl text-white tracking-tight sm:text-4xl">
          <span className="block">Dive into new albums.</span>
          <span className="block">Keep track of what you like.</span>
          <span className="block">Share your thoughts.</span>
        </h2>
        <Link
          href="/auth/sign-up"
          className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-md border border-transparent bg-harlequin-500 px-5 py-3 align-middle font-medium text-base text-black transition-all hover:text-white sm:w-auto"
        >
          Become a tastemaker today
          <ArrowRightIcon className="h-5 w-5" />
        </Link>
        <p className="mt-6 text-gray-500 text-lg leading-6">
          The social platform for music lovers.
        </p>
      </div>
    </div>
  );
}
