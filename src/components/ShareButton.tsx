import { ShareIcon } from '@heroicons/react/20/solid';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-hot-toast';

function ShareButton({}) {
  const router = useRouter();
  const url = `https://www.auriom.club${router.asPath}`;

  async function copyTextToClipboard(url: string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(url);
    }
  }

  const handleCopy = () => {
    copyTextToClipboard(url);
    toast.success('Copied to clipboard!');
  };

  return (
    <button onClick={handleCopy}>
      <ShareIcon className="h-6 w-6 text-gray-500" />
    </button>
  );
}

export default ShareButton;
